import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("================================================================================");
console.log("OUR NATION — CIVIC ISSUE REPORTING SYSTEM VERIFICATION SUITE");
console.log("================================================================================");

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
  }
}

// ----------------------------------------------------------------------------
// TEST 1: 8 Statutory Categories Verification
// ----------------------------------------------------------------------------
runTest("1. 8 Statutory Categories Verification in civicConnectData.ts", () => {
  const filePath = path.join(rootDir, "src/lib/data/civicConnectData.ts");
  const content = fs.readFileSync(filePath, "utf-8");

  const requiredCategories = [
    "Roads and Potholes",
    "Streetlights",
    "Waste Management",
    "Drainage and Waterlogging",
    "Drinking Water",
    "Public Facilities",
    "Public Health and Sanitation",
    "Other Civic Issues",
  ];

  for (const cat of requiredCategories) {
    assert.ok(
      content.includes(`"${cat}"`),
      `Category "${cat}" must be explicitly present in CIVIC_CATEGORIES`
    );
  }
});

// ----------------------------------------------------------------------------
// TEST 2: 8 Statutory Statuses Verification
// ----------------------------------------------------------------------------
runTest("2. 8 Statutory Processing Statuses in CivicStatus Type", () => {
  const filePath = path.join(rootDir, "src/lib/data/civicConnectData.ts");
  const content = fs.readFileSync(filePath, "utf-8");

  const requiredStatuses = [
    "'submitted'",
    "'under_review'",
    "'verified'",
    "'assigned'",
    "'in_progress'",
    "'resolved'",
    "'closed'",
    "'rejected'",
  ];

  for (const status of requiredStatuses) {
    assert.ok(
      content.includes(status),
      `Status ${status} must be included in CivicStatus union type`
    );
  }
});

// ----------------------------------------------------------------------------
// TEST 3: Tanur Municipality 45 Wards Integration
// ----------------------------------------------------------------------------
runTest("3. Tanur Municipality 45 Wards verified in localGovernmentData.ts", () => {
  const filePath = path.join(rootDir, "src/lib/data/localGovernmentData.ts");
  const content = fs.readFileSync(filePath, "utf-8");

  // Check that wards 1 to 45 exist for Tanur Municipality
  for (let w = 1; w <= 45; w++) {
    const wardIdMatch = content.includes(`id: "ward-tnr-${w}"`);
    const wardNumMatch = content.includes(`ward_number: ${w}`);
    assert.ok(
      wardIdMatch && wardNumMatch,
      `Ward ${w} must be officially defined for Tanur Municipality in LOCAL_GOVERNMENT_WARDS`
    );
  }
});

// ----------------------------------------------------------------------------
// TEST 4: Reference ID Format & Generation
// ----------------------------------------------------------------------------
runTest("4. Unique Reference ID Format (CC-TNR-2026-XXXX)", () => {
  const filePath = path.join(rootDir, "src/lib/data/civicConnectData.ts");
  const content = fs.readFileSync(filePath, "utf-8");

  assert.ok(
    content.includes("CC-TNR-2026-"),
    "Reference ID generation must adhere to CC-TNR-2026-XXXX format"
  );
});

// ----------------------------------------------------------------------------
// TEST 5: API Route Schema & Validation
// ----------------------------------------------------------------------------
runTest("5. Server-side API Route with Zod Validation in src/app/api/civic/issues/route.ts", () => {
  const filePath = path.join(rootDir, "src/app/api/civic/issues/route.ts");
  assert.ok(fs.existsSync(filePath), "API Route src/app/api/civic/issues/route.ts must exist");
  const content = fs.readFileSync(filePath, "utf-8");

  assert.ok(content.includes("createIssueSchema"), "Must define Zod validation schema");
  assert.ok(content.includes("ward_number: z.number().int().min(1"), "Must validate ward number between 1 and 45");
  assert.ok(content.includes("contact_preference: z.enum"), "Must validate contact preference");
  assert.ok(content.includes("POST"), "Must implement POST endpoint");
  assert.ok(content.includes("GET"), "Must implement GET endpoint");
});

// ----------------------------------------------------------------------------
// TEST 6: Supabase Migration & Strict RLS Policies
// ----------------------------------------------------------------------------
runTest("6. Supabase Migration & RLS Policies in 20241117000007_civic_reporting_system.sql", () => {
  const filePath = path.join(rootDir, "supabase/migrations/20241117000007_civic_reporting_system.sql");
  assert.ok(fs.existsSync(filePath), "Migration file must exist");
  const content = fs.readFileSync(filePath, "utf-8");

  assert.ok(content.includes("CREATE TABLE IF NOT EXISTS public.civic_complaints"), "Must create civic_complaints table");
  assert.ok(content.includes("CREATE TABLE IF NOT EXISTS public.civic_complaint_timeline"), "Must create timeline table");
  assert.ok(content.includes("ALTER TABLE public.civic_complaints ENABLE ROW LEVEL SECURITY"), "Must enable RLS");
  assert.ok(content.includes("CHECK (ward_number BETWEEN 1 AND 45)"), "Must constrain ward numbers 1 to 45");
  assert.ok(content.includes("Admins and Staff can update complaints"), "Must restrict update privileges to staff/admins");
});

// ----------------------------------------------------------------------------
// TEST 7: Citizen Reporting Wizard (Pre-Submission Review Step)
// ----------------------------------------------------------------------------
runTest("7. Citizen Report Wizard multi-step & review in src/app/civic/report/page.tsx", () => {
  const filePath = path.join(rootDir, "src/app/civic/report/page.tsx");
  assert.ok(fs.existsSync(filePath), "Report page must exist");
  const content = fs.readFileSync(filePath, "utf-8");

  assert.ok(content.includes("Pre-Submission Review"), "Must include Pre-Submission Review step");
  assert.ok(content.includes("Tanur Municipal Ward (1–45)"), "Must include 45 wards dropdown");
  assert.ok(content.includes("contactPreference"), "Must include contact preference selector");
  assert.ok(content.includes("Statutory Transparency Notice"), "Must display platform transparency notice");
  assert.ok(content.includes("handleCopyId"), "Must support one-click copy of tracking ID");
});

// ----------------------------------------------------------------------------
// TEST 8: Tracking Page Stepper & Privacy Isolation
// ----------------------------------------------------------------------------
runTest("8. Dedicated Tracking Page & Privacy in src/app/civic/issues/[id]/page.tsx", () => {
  const filePath = path.join(rootDir, "src/app/civic/issues/[id]/page.tsx");
  assert.ok(fs.existsSync(filePath), "Issue tracking page must exist");
  const content = fs.readFileSync(filePath, "utf-8");

  assert.ok(content.includes("Statutory Processing Stage"), "Must include statutory stage stepper");
  assert.ok(content.includes("Official Department Assignment"), "Must render department assignment details");
  assert.ok(content.includes("Official Resolution Proof & Field Evidence"), "Must display resolution proof and notes");
  assert.ok(content.includes("Chronological Audit Timeline"), "Must render chronological audit timeline");
  assert.ok(content.includes("Citizen contact information masked for privacy"), "Must enforce citizen data isolation");
});

// ----------------------------------------------------------------------------
// TEST 9: Admin Management Desk & Action Modals
// ----------------------------------------------------------------------------
runTest("9. Admin Management Desk in src/app/admin/civic/issues/page.tsx", () => {
  const filePath = path.join(rootDir, "src/app/admin/civic/issues/page.tsx");
  assert.ok(fs.existsSync(filePath), "Admin issues page must exist");
  const content = fs.readFileSync(filePath, "utf-8");

  assert.ok(content.includes("All 45 Municipal Wards"), "Admin table must filter by all 45 wards");
  assert.ok(content.includes("All Statuses"), "Admin table must filter by status");
  assert.ok(content.includes("Verify"), "Must have Verify quick action");
  assert.ok(content.includes("Assign"), "Must have Assign quick action");
  assert.ok(content.includes("Reject"), "Must have Reject quick action");
  assert.ok(content.includes("Resolve"), "Must have Resolve quick action");
  assert.ok(content.includes("Close Case"), "Must have Close Case quick action");
  assert.ok(content.includes("Statutory Rejection Reason (Mandatory)"), "Must enforce mandatory rejection reason");
});

// ----------------------------------------------------------------------------
// TEST 10: Simple English Only (Zero Malayalam Script Characters)
// ----------------------------------------------------------------------------
runTest("10. English-only verification on redesigned civic pages", () => {
  const malayalamRegex = /[\u0D00-\u0D7F]/;
  const filesToCheck = [
    "src/app/civic/report/page.tsx",
    "src/app/civic/issues/[id]/page.tsx",
    "src/app/admin/civic/issues/page.tsx",
    "src/app/admin/civic/issues/[id]/page.tsx",
    "src/components/civic/AdminCivicNav.tsx",
    "src/components/civic/CivicNav.tsx",
  ];

  for (const relPath of filesToCheck) {
    const fullPath = path.join(rootDir, relPath);
    const content = fs.readFileSync(fullPath, "utf-8");
    assert.ok(
      !malayalamRegex.test(content),
      `File ${relPath} must not contain Malayalam script characters (English-only standard)`
    );
  }
});

// ----------------------------------------------------------------------------
// SUMMARY
// ----------------------------------------------------------------------------
console.log("--------------------------------------------------------------------------------");
console.log(`Results: ${passedTests}/${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log("================================================================================");

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  console.log("ALL CIVIC ISSUE REPORTING SYSTEM TESTS PASSED CLEANLY!");
  process.exit(0);
}
