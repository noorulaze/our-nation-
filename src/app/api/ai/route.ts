import { NextRequest, NextResponse } from "next/server";
import { naaduAiQuerySchema } from "@/lib/validation/schemas";
import { store } from "@/lib/data/store";
import { getGeminiModel, isGeminiConfigured, buildSystemPrompt, GroundedContextItem } from "@/lib/gemini/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = naaduAiQuerySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { query, communityId, language } = validation.data;
    const isMl = language === "ml";

    // 1. Determine active community
    const community = communityId 
      ? store.getCommunityById(communityId) 
      : store.getCommunities()[0];
    
    const communityName = community 
      ? (isMl ? community.name_ml : community.name) 
      : "Kerala";

    // 2. Retrieve relevant database records for grounding
    const events = store.getEvents(community?.id);
    const businesses = store.getBusinesses(community?.id);
    const announcements = store.getAnnouncements(community?.id);
    const places = store.getPlaces(community?.id);
    const issues = store.getIssueReports(community?.id);

    const contextItems: GroundedContextItem[] = [];

    events.forEach(e => {
      contextItems.push({
        type: "event",
        id: e.id,
        title: e.title,
        details: `Date: ${new Date(e.start_date).toLocaleDateString()}, Location: ${e.location_name}, Description: ${e.description}, Organizer: ${e.organizer_name}, Phone: ${e.contact_phone || 'N/A'}`,
        link: `/discover?tab=events&id=${e.id}`,
      });
    });

    businesses.forEach(b => {
      contextItems.push({
        type: "business",
        id: b.id,
        title: b.name,
        details: `Category: ${b.category}, Address: ${b.address}, Phone: ${b.phone}, Hours: ${JSON.stringify(b.opening_hours || {})}, Verified: ${b.is_verified ? "Yes" : "No"}, Description: ${b.description}`,
        link: `/discover?tab=services&id=${b.id}`,
        isVerified: b.is_verified,
      });
    });

    announcements.forEach(a => {
      contextItems.push({
        type: "announcement",
        id: a.id,
        title: a.title,
        details: `Category: ${a.category}, Publisher: ${a.publisher_organization}, Official: ${a.is_official}, Content: ${a.content}`,
        link: `/community?announcement=${a.id}`,
        isVerified: a.is_official,
      });
    });

    places.forEach(p => {
      contextItems.push({
        type: "place",
        id: p.id,
        title: p.name,
        details: `Category: ${p.category}, Location: ${p.location_name}, Description: ${p.description}`,
        link: `/discover?tab=places&id=${p.id}`,
      });
    });

    issues.forEach(i => {
      contextItems.push({
        type: "issue",
        id: i.id,
        title: i.title,
        details: `Category: ${i.category}, Location: ${i.location_name || 'N/A'}, Status: ${i.status}, Official Response: ${i.official_response || 'None yet'}`,
        link: `/community?issue=${i.id}`,
      });
    });

    // 3. Match relevant items against query tokens
    const queryLower = query.toLowerCase();
    const queryTokens = queryLower.split(/\s+/).filter(t => t.length > 2);
    
    const matchedRecords = contextItems.filter(item => {
      const targetText = (item.title + " " + item.details).toLowerCase();
      return queryTokens.some(tok => targetText.includes(tok));
    }).slice(0, 5);

    // 4. Grounded execution with Gemini or Deterministic Engine fallback
    let responseText = "";
    let engineType: "gemini" | "grounded_retrieval" = "grounded_retrieval";

    if (isGeminiConfigured()) {
      try {
        const model = getGeminiModel();
        const systemPrompt = buildSystemPrompt(language, communityName);
        
        const groundedContextString = matchedRecords.length > 0
          ? matchedRecords.map(r => `[${r.type.toUpperCase()}] ${r.title}\nDetails: ${r.details}\nLink: ${r.link}`).join("\n\n")
          : "NO PUBLISHED RECORDS MATCHED THIS QUERY IN THIS LOCALITY.";

        const prompt = `${systemPrompt}

CURRENT GROUNDED RECORDS FROM DATABASE:
${groundedContextString}

USER QUESTION: "${query}"

Generate a helpful, grounded response:`;

        const result = await model.generateContent(prompt);
        responseText = result.response.text();
        engineType = "gemini";
      } catch (geminiError: any) {
        console.error("Gemini API error, falling back to grounded retrieval:", geminiError);
        // Fall back gracefully to structured grounded response
      }
    }

    if (!responseText) {
      // Deterministic Grounded Engine (Never hallucinates, respects verified records)
      if (matchedRecords.length > 0) {
        if (isMl) {
          responseText = `നമ്മുടെ നാട് ഡാറ്റാബേസിൽ നിന്ന് ${communityName} മേഖലയിൽ കണ്ടെത്തിയ വിവരങ്ങൾ താഴെ നൽകുന്നു:\n\n` +
            matchedRecords.map(r => `• **${r.title}** (${r.type === 'business' ? 'സേവനം' : r.type === 'event' ? 'പരിപാടി' : r.type === 'announcement' ? 'അറിയിപ്പ്' : 'സ്ഥലം'})\n  ${r.details}\n  [വിശദാംശങ്ങൾ കാണുക](${r.link})`).join("\n\n") +
            `\n\nഈ വിവരങ്ങൾ പ്ലാറ്റ്‌ഫോമിൽ പരിശോധിച്ചുറപ്പിച്ച ഔദ്യോഗിക രേഖകളാണ്.`;
        } else {
          responseText = `Here is the verified information found on Nammude Naadu for ${communityName}:\n\n` +
            matchedRecords.map(r => `• **${r.title}** (${r.type.toUpperCase()})\n  ${r.details}\n  [View Details](${r.link})`).join("\n\n") +
            `\n\nThese details are grounded strictly in published platform records.`;
        }
      } else {
        if (isMl) {
          responseText = `ക്ഷമിക്കണം, "${query}" എന്ന ചോദ്യത്തിന് അനുസൃതമായ സ്ഥിരീകരിച്ച വിവരങ്ങളോ രേഖകളോ ${communityName} കമ്മ്യൂണിറ്റിയിൽ ഇപ്പോൾ നിലവിലില്ല.\n\nസാമൂഹിക ഫോറത്തിൽ പുതിയ പോസ്റ്റ് പങ്കുവെക്കാനോ ബന്ധപ്പെട്ട അധികാരികൾക്ക് റിപ്പോർട്ട് നൽകാനോ സാധിക്കും.`;
        } else {
          responseText = `I could not find any verified published records on Nammude Naadu matching "${query}" for ${communityName}.\n\nYou can post an inquiry in the Community Feed or submit a verified listing to help expand neighborhood information.`;
        }
      }
    }

    return NextResponse.json({
      answer: responseText,
      sources: matchedRecords,
      engine: engineType,
      isGeminiActive: isGeminiConfigured(),
      communityName,
    });
  } catch (error: any) {
    console.error("Naadu AI handler error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
