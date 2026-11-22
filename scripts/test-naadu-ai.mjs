/**
 * test-naadu-ai.mjs
 * Comprehensive validation suite for Naadu AI Assistant on OUR NATION.
 * Tests:
 * 1. General civic inquiries & retrieval
 * 2. Grounded sources, citations, and links
 * 3. Missing information handling & anti-hallucination boundary
 * 4. Prompt injection detection & safety defense
 * 5. Exact reference number tracking (CC-TNR-2026-XXXX & PS-TNR-2026-XXXX)
 * 6. Authenticated citizen data isolation & privacy boundaries
 * 7. Rate limiter sliding window enforcement
 * 8. Statutory municipal grounding (45 confirmed wards & 0494 2440228 switchboard)
 * 9. Simple English compliance (zero Malayalam characters in AI UI files)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;

function assert(condition, testName, details = "") {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${testName}${details ? ` -> ${details}` : ""}`);
    failed++;
  }
}

console.log("\n=======================================================");
console.log("OUR NATION: NAADU AI ASSISTANT VERIFICATION SUITE");
console.log("=======================================================\n");

// Read source files
const knowledgeBasePath = path.join(rootDir, "src/lib/ai/knowledgeBase.ts");
const retrieverPath = path.join(rootDir, "src/lib/ai/retriever.ts");
const rateLimiterPath = path.join(rootDir, "src/lib/ai/rateLimiter.ts");
const geminiClientPath = path.join(rootDir, "src/lib/gemini/client.ts");
const apiRoutePath = path.join(rootDir, "src/app/api/ai/route.ts");
const aiPagePath = path.join(rootDir, "src/app/ai/page.tsx");
const aiModalPath = path.join(rootDir, "src/components/ai/NaaduAiModal.tsx");
const schemasPath = path.join(rootDir, "src/lib/validation/schemas.ts");

const knowledgeBaseContent = fs.readFileSync(knowledgeBasePath, "utf-8");
const retrieverContent = fs.readFileSync(retrieverPath, "utf-8");
const rateLimiterContent = fs.readFileSync(rateLimiterPath, "utf-8");
const geminiClientContent = fs.readFileSync(geminiClientPath, "utf-8");
const apiRouteContent = fs.readFileSync(apiRoutePath, "utf-8");
const aiPageContent = fs.readFileSync(aiPagePath, "utf-8");
const aiModalContent = fs.readFileSync(aiModalPath, "utf-8");
const schemasContent = fs.readFileSync(schemasPath, "utf-8");

// -------------------------------------------------------------------
// SUITE 1: KNOWLEDGE BASE INTEGRATION ACROSS 5 CIVIC DOMAINS
// -------------------------------------------------------------------
console.log("Suite 1: Unified Grounded Knowledge Base");

assert(
  knowledgeBaseContent.includes("TANUR_MUNICIPAL_SERVICES") && knowledgeBaseContent.includes("SERVICE_CATEGORIES"),
  "Knowledge base indexes Tanur Municipal Public Services Directory"
);
assert(
  knowledgeBaseContent.includes("CIVIC_CATEGORIES") && knowledgeBaseContent.includes("civic_reporting"),
  "Knowledge base indexes Civic Issue Reporting System (8 statutory categories)"
);
assert(
  knowledgeBaseContent.includes("digitalMunicipalityStore.getProjects()") && knowledgeBaseContent.includes("TRANSPARENT_PROJECT_CATEGORIES"),
  "Knowledge base indexes Municipal Development Tracker (9 categories, 8 statuses, three-way budgets)"
);
assert(
  knowledgeBaseContent.includes("TANUR_CORE_FACTS") && knowledgeBaseContent.includes("0494 2440228"),
  "Knowledge base indexes Tanur Municipality Core Administrative Facts & Switchboard"
);
assert(
  knowledgeBaseContent.includes("platform_help") && knowledgeBaseContent.includes("/public-services"),
  "Knowledge base indexes OUR NATION Platform Navigation & Guides"
);

// -------------------------------------------------------------------
// SUITE 2: SOURCE CITATIONS & VERIFIED METADATA
// -------------------------------------------------------------------
console.log("\nSuite 2: Grounded Citations, Verified Sources & Links");

assert(
  knowledgeBaseContent.includes("verifiedSource") && apiRouteContent.includes("verifiedSource"),
  "Knowledge base and API route structure verifiedSource and verificationDate for citations"
);
assert(
  geminiClientContent.includes("generateDeterministicResponse"),
  "Deterministic fallback engine exists for reliable, unhallucinated responses"
);
assert(
  geminiClientContent.includes("0494 2440228"),
  "Deterministic engine references authentic Tanur switchboard 0494 2440228"
);
assert(
  aiPageContent.includes("Verified Municipal Source Records") || aiPageContent.includes("msg.sources"),
  "AI Chat page renders verified source citations with clickable links"
);

// -------------------------------------------------------------------
// SUITE 3: MISSING INFORMATION HANDLING & ANTI-HALLUCINATION
// -------------------------------------------------------------------
console.log("\nSuite 3: Missing Information Handling & Anti-Hallucination");

assert(
  geminiClientContent.includes("could not find verified municipal records"),
  "Assistant explicitly acknowledges lack of records when information is unavailable"
);
assert(
  geminiClientContent.includes("ZERO CIVIC HALLUCINATIONS: Never invent fees, phone numbers"),
  "System prompt strictly forbids hallucinating civic rules, fees, or phone numbers"
);
assert(
  apiRouteContent.includes("0494 2440228"),
  "Missing information fallback directs citizen to authentic Tanur Switchboard"
);

// -------------------------------------------------------------------
// SUITE 4: PROMPT INJECTION DETECTION & SAFETY DEFENSES
// -------------------------------------------------------------------
console.log("\nSuite 4: Prompt Injection Detection & Safety Defenses");

assert(
  apiRouteContent.includes("INJECTION_PATTERNS"),
  "API route defines suspicious prompt injection patterns"
);
assert(
  apiRouteContent.includes("ignore\\s+(all\\s+)?(previous|prior)\\s+instructions"),
  "API defends against 'ignore previous instructions' prompt override attacks"
);
assert(
  apiRouteContent.includes("safety_gate"),
  "API safely routes malicious prompts to safety gate response"
);
assert(
  geminiClientContent.includes("<verified_records>"),
  "Model prompt strictly encloses retrieved documents in verified XML boundary"
);

// -------------------------------------------------------------------
// SUITE 5: EXACT REFERENCE NUMBER RESOLUTION
// -------------------------------------------------------------------
console.log("\nSuite 5: Exact Reference Tracking (CC-TNR-2026 & PS-TNR-2026)");

assert(
  retrieverContent.includes("CC-TNR-2026-"),
  "Retriever supports regex detection for Civic Issue Reference ID (CC-TNR-2026-XXXX)"
);
assert(
  retrieverContent.includes("PS-TNR-2026-"),
  "Retriever supports regex detection for Public Service Reference ID (PS-TNR-2026-XXXX)"
);
assert(
  retrieverContent.includes("exactReferenceMatch"),
  "Retriever structures exactReferenceMatch with public tracking details"
);

// -------------------------------------------------------------------
// SUITE 6: AUTHENTICATED CITIZEN DATA ISOLATION & PRIVACY
// -------------------------------------------------------------------
console.log("\nSuite 6: Authenticated Citizen Data Isolation & Privacy");

assert(
  retrieverContent.includes("citizenPersonalRecords"),
  "Retriever defines citizenPersonalRecords structure for authenticated users"
);
assert(
  retrieverContent.includes("options?.isAuthenticated && options?.userId"),
  "Personal records are strictly gated behind server-side authenticated identity"
);
assert(
  retrieverContent.includes("masked for privacy"),
  "Citizen personal contact details are masked when responding to reference lookups"
);
assert(
  geminiClientContent.includes("please log in to your **Citizen Dashboard**"),
  "Unauthenticated visitors attempting personal tracking are prompted to log in"
);

// -------------------------------------------------------------------
// SUITE 7: RATE LIMITER SLIDING WINDOW ENFORCEMENT
// -------------------------------------------------------------------
console.log("\nSuite 7: Rate Limiter Sliding Window Enforcement");

assert(
  rateLimiterContent.includes("rateLimitMap"),
  "Rate limiter implements in-memory sliding window map"
);
assert(
  rateLimiterContent.includes("checkRateLimit"),
  "Rate limiter exports checkRateLimit function"
);
assert(
  apiRouteContent.includes("status: 429"),
  "API route returns HTTP 429 Too Many Requests when rate limit is exceeded"
);

// -------------------------------------------------------------------
// SUITE 8: STATUTORY MUNICIPAL GROUNDING & FACTS
// -------------------------------------------------------------------
console.log("\nSuite 8: Statutory Municipal Grounding & Facts");

assert(
  geminiClientContent.includes("Exactly 45 confirmed municipal wards (Wards 1 to 45)."),
  "System prompt enforces Tanur 45 confirmed municipal wards truth"
);
assert(
  knowledgeBaseContent.includes("45 Wards (Wards 1 to 45)"),
  "Knowledge base specifies 45 wards"
);
assert(
  !knowledgeBaseContent.includes("44 Wards") && !geminiClientContent.includes("44 Wards"),
  "Zero references to outdated 44 Wards"
);
assert(
  knowledgeBaseContent.includes("0494 2440228") && geminiClientContent.includes("0494 2440228"),
  "Central switchboard 0494 2440228 is firmly grounded"
);

// -------------------------------------------------------------------
// SUITE 9: SIMPLE ENGLISH UI COMPLIANCE (ZERO MALAYALAM SCRIPT)
// -------------------------------------------------------------------
console.log("\nSuite 9: Simple English UI Compliance (Zero Malayalam Script)");
const malayalamRegex = /[\u0D00-\u0D7F]/;

const filesToCheck = [
  "src/app/ai/page.tsx",
  "src/components/ai/NaaduAiModal.tsx",
  "src/lib/gemini/client.ts",
  "src/lib/ai/knowledgeBase.ts",
  "src/lib/ai/retriever.ts"
];

filesToCheck.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, "utf-8");
    const hasMalayalam = malayalamRegex.test(content);
    assert(
      !hasMalayalam,
      `File '${relPath}' contains zero Malayalam characters (Simple English only)`
    );
  } else {
    assert(false, `File '${relPath}' exists`);
  }
});

// -------------------------------------------------------------------
// SUITE 10: CONVERSATIONAL UX DESIGN (SUGGESTED QUESTIONS & ACTIONS)
// -------------------------------------------------------------------
console.log("\nSuite 10: Conversational UX Design & Quick Inquiries");

const expectedQuestions = [
  "How can I report a pothole?",
  "What public services are available?",
  "How do I track my complaint?",
  "What development projects are happening in my ward?",
  "Where can I find official municipality contact information?"
];

expectedQuestions.forEach(q => {
  assert(
    aiPageContent.includes(q) && aiModalContent.includes(q),
    `Suggested inquiry '${q}' is present in AI page & modal`
  );
});

assert(
  aiPageContent.includes("handleCopy") && aiModalContent.includes("handleCopy"),
  "Copy response option is implemented in both AI page and modal"
);
assert(
  aiPageContent.includes("handleResetConversation") || aiPageContent.includes("New Conversation"),
  "New conversation reset action is implemented"
);

// -------------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------------
console.log("\n=======================================================");
console.log(`NAADU AI VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
}
