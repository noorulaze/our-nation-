import { NextRequest, NextResponse } from "next/server";
import { naaduAiQuerySchema } from "@/lib/validation/schemas";
import { retrieveGroundedContext } from "@/lib/ai/retriever";
import { 
  getGeminiModel, 
  isGeminiConfigured, 
  buildSystemPrompt, 
  generateDeterministicResponse 
} from "@/lib/gemini/client";
import { checkRateLimit } from "@/lib/ai/rateLimiter";

// Suspicious injection patterns for defense in depth
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /system\s+prompt/i,
  /you\s+are\s+now\s+(in\s+)?developer\s+mode/i,
  /bypass\s+all\s+restrictions/i,
  /DAN\s+mode/i,
  /jailbreak/i,
  /reveal\s+(the\s+)?api\s*key/i,
  /print\s+environment\s+variables/i,
];

function detectPromptInjection(query: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(query));
}

function sanitizeInput(text: string): string {
  // Strip control characters and dangerous delimiters
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || 
               req.headers.get("x-real-ip") || 
               "127.0.0.1";
    
    const rateLimit = checkRateLimit(ip, 30, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please wait a minute before sending more queries to Naadu AI.",
          resetMs: rateLimit.resetMs,
        },
        { 
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateLimit.resetMs / 1000)),
          }
        }
      );
    }

    // 2. Body parsing and Zod Validation
    const rawBody = await req.json();
    const validation = naaduAiQuerySchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const { query, userId, userName } = validation.data;
    const cleanQuery = sanitizeInput(query);

    if (!cleanQuery) {
      return NextResponse.json(
        { error: "Invalid query text" },
        { status: 400 }
      );
    }

    // 3. Prompt Injection Defense
    if (detectPromptInjection(query)) {
      return NextResponse.json({
        answer: "I am Naadu AI, an independent civic assistant for Tanur Municipality. I am programmed to provide verified municipal information, public service guides, and development tracking only. I cannot alter system instructions, execute code, or bypass safety boundaries.",
        sources: [],
        suggestedActions: [
          {
            label: "Public Services",
            link: "/public-services",
            description: "Explore 8 statutory municipal categories"
          },
          {
            label: "Development Tracker",
            link: "/development",
            description: "View verified civic projects across Wards 1 to 45"
          }
        ],
        engine: "safety_gate",
        isGeminiActive: isGeminiConfigured(),
      });
    }

    // 4. Grounded Knowledge Retrieval
    const isAuthenticated = Boolean(userId);
    const retrieval = retrieveGroundedContext(cleanQuery, {
      userId: userId || undefined,
      userName: userName || undefined,
      isAuthenticated,
    });

    let answerText = "";
    let engineType: "gemini" | "grounded_retrieval" = "grounded_retrieval";

    // 5. Model Inference (Gemini) or Grounded Deterministic Fallback
    if (isGeminiConfigured()) {
      try {
        const model = getGeminiModel();
        const systemPrompt = buildSystemPrompt(userName || undefined);

        // Format grounded context blocks
        const contextLines: string[] = [];

        // Exact match if any
        if (retrieval.exactReferenceMatch) {
          contextLines.push(
            `EXACT REFERENCE LOOKUP: ${retrieval.exactReferenceMatch.referenceNumber}\n` +
            `Type: ${retrieval.exactReferenceMatch.type}\n` +
            `Status: ${retrieval.exactReferenceMatch.status}\n` +
            `Details: ${retrieval.exactReferenceMatch.details}\n` +
            `Public Link: ${retrieval.exactReferenceMatch.link}`
          );
        }

        // Authenticated citizen personal records
        if (retrieval.citizenPersonalRecords && retrieval.citizenPersonalRecords.length > 0) {
          contextLines.push(
            `AUTHENTICATED CITIZEN PERSONAL RECORDS:\n` +
            retrieval.citizenPersonalRecords.map(r => 
              `- Ref: ${r.referenceNumber} | Title: ${r.title} | Status: ${r.status} | Category: ${r.category} | Date: ${r.date} | Link: ${r.link}`
            ).join("\n")
          );
        }

        // Top retrieved knowledge items
        if (retrieval.items.length > 0) {
          contextLines.push(
            retrieval.items.map((item, idx) => 
              `RECORD ${idx + 1} [${item.domain.toUpperCase()}]: ${item.title}\n` +
              `Summary: ${item.summary}\n` +
              `Details:\n${item.details}\n` +
              `Link: ${item.link}\n` +
              `Source: ${item.verifiedSource} (Verified: ${item.verificationDate})`
            ).join("\n\n")
          );
        }

        const groundedRecordsString = contextLines.length > 0 
          ? contextLines.join("\n\n====================\n\n")
          : "NO PUBLISHED RECORDS MATCHED THIS QUERY IN THE MUNICIPAL DATABASE.";

        const prompt = `${systemPrompt}

<verified_records>
${groundedRecordsString}
</verified_records>

CITIZEN QUESTION:
"${cleanQuery}"

Provide a clear, grounded, and concise answer in Simple English. Always cite the verified source name and link if available. If no record contains the answer, state that explicitly and provide the Tanur Municipal Switchboard (0494 2440228).`;

        const result = await model.generateContent(prompt);
        answerText = result.response.text();
        engineType = "gemini";
      } catch (geminiError: any) {
        console.error("Gemini API error, falling back to grounded deterministic engine:", geminiError);
        // Fall back gracefully to deterministic grounded engine
      }
    }

    if (!answerText) {
      answerText = generateDeterministicResponse(cleanQuery, retrieval, {
        userName: userName || undefined,
        isAuthenticated,
      });
      engineType = "grounded_retrieval";
    }

    // 6. Return Structured Output
    return NextResponse.json({
      answer: answerText,
      sources: retrieval.items.map(item => ({
        id: item.id,
        title: item.title,
        domain: item.domain,
        summary: item.summary,
        link: item.link,
        verifiedSource: item.verifiedSource,
        verificationDate: item.verificationDate,
      })),
      suggestedActions: retrieval.suggestedActions,
      exactReferenceMatch: retrieval.exactReferenceMatch,
      personalRecordsCount: retrieval.citizenPersonalRecords?.length ?? 0,
      engine: engineType,
      isGeminiActive: isGeminiConfigured(),
    });
  } catch (error: any) {
    console.error("Naadu AI POST Handler Error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred while processing your query. Please try again.",
      },
      { status: 500 }
    );
  }
}
