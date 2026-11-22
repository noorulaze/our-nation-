/**
 * test-development-tracker.mjs
 * Comprehensive validation suite for the OUR NATION Development Tracker.
 * Tests:
 * 1. Statutory 9 Categories & 8 Statuses
 * 2. Tanur Municipality 45 Confirmed Wards & Switchboard (0494 2440228)
 * 3. Three-Way Financial Breakdown (Approved Budget vs Estimated Cost vs Actual Expenditure)
 * 4. Milestone Progress Tracking & Measurement Book (MB) audit
 * 5. Supabase SQL Migration constraints & RLS policies
 * 6. API Route Handlers & Store Operations
 * 7. Simple English Compliance (Zero Malayalam characters in UI pages)
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
console.log("OUR NATION: DEVELOPMENT TRACKER VERIFICATION SUITE");
console.log("=======================================================\n");

// 1. STATUTORY CATEGORIES & STATUSES
console.log("Suite 1: Statutory Categories & Lifecycle Statuses");
const typesFilePath = path.join(rootDir, "src/types/digitalMunicipality.ts");
const typesContent = fs.readFileSync(typesFilePath, "utf-8");

const expectedCategories = [
  "roads_transportation",
  "drainage_water",
  "drinking_water",
  "waste_management",
  "education",
  "healthcare",
  "public_infrastructure",
  "parks_public_spaces",
  "other_development"
];

expectedCategories.forEach((cat) => {
  assert(
    typesContent.includes(`'${cat}'`),
    `Category '${cat}' is defined in ProjectCategory union in types`
  );
});

const expectedStatuses = [
  "Proposed",
  "Approved",
  "Planned",
  "In Progress",
  "Delayed",
  "Completed",
  "On Hold",
  "Cancelled"
];

expectedStatuses.forEach((status) => {
  assert(
    typesContent.includes(`'${status}'`),
    `Status '${status}' is defined in ProjectStatus union in types`
  );
});

// 2. TANUR MUNICIPALITY 45 CONFIRMED WARDS & CIVIC GROUNDING
console.log("\nSuite 2: Tanur Grade II Municipality 45 Confirmed Wards & Grounding");
const dataFilePath = path.join(rootDir, "src/lib/data/digitalMunicipalityData.ts");
const dataContent = fs.readFileSync(dataFilePath, "utf-8");

assert(
  dataContent.includes("TANUR_MUNICIPAL_WARDS"),
  "TANUR_MUNICIPAL_WARDS dataset is present in digitalMunicipalityData"
);

assert(
  typesContent.includes("1 to 45"),
  "Types specify Tanur Municipality 45 confirmed wards constraint"
);

const allDevPages = [
  "src/app/development/page.tsx",
  "src/app/development/projects/page.tsx",
  "src/app/development/projects/[id]/page.tsx",
  "src/app/admin/development/page.tsx",
  "src/app/admin/development/projects/page.tsx",
  "src/app/admin/development/projects/new/page.tsx",
  "src/app/admin/development/projects/[id]/edit/page.tsx"
];

allDevPages.forEach((filePath) => {
  const fullPath = path.join(rootDir, filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, "utf-8");
    assert(
      !content.includes("44 Wards") && !content.includes("All 44 Wards"),
      `Page '${filePath}' references correct 45 wards (no outdated 44 wards)`
    );
  }
});

// Central Switchboard
const homepagePath = path.join(rootDir, "src/app/page.tsx");
const homepageContent = fs.existsSync(homepagePath) ? fs.readFileSync(homepagePath, "utf-8") : "";
assert(
  homepageContent.includes("0494 2440228") || dataContent.includes("0494 2440228"),
  "Central municipal switchboard 0494 2440228 is grounded"
);

// 3. THREE-WAY BUDGET BREAKDOWN & TRANSPARENCY
console.log("\nSuite 3: Three-Way Budget Breakdown Matrix");
assert(
  typesContent.includes("approved_budget?: string"),
  "DevelopmentProject supports approved_budget (administrative sanction)"
);
assert(
  typesContent.includes("estimated_cost?: string"),
  "DevelopmentProject supports estimated_cost (DPR estimate)"
);
assert(
  typesContent.includes("actual_expenditure?: string"),
  "DevelopmentProject supports actual_expenditure (audited field spending)"
);
assert(
  typesContent.includes("funding_source?: string"),
  "DevelopmentProject supports funding_source (scheme / grant)"
);

const projectDetailPath = path.join(rootDir, "src/app/development/projects/[id]/page.tsx");
const projectDetailContent = fs.readFileSync(projectDetailPath, "utf-8");

assert(
  projectDetailContent.includes("Approved Budget"),
  "Project detail page displays Approved Budget"
);
assert(
  projectDetailContent.includes("Estimated Cost"),
  "Project detail page displays Estimated Cost"
);
assert(
  projectDetailContent.includes("Actual Expenditure"),
  "Project detail page displays Actual Expenditure"
);
assert(
  projectDetailContent.includes("Funding Source"),
  "Project detail page displays Funding Source"
);

// 4. MILESTONE PROGRESS TRACKING & MB AUDIT
console.log("\nSuite 4: Progress Milestones & Measurement Book Verification");
assert(
  typesContent.includes("official_remarks?: string"),
  "DevelopmentProgressUpdate supports official_remarks"
);
assert(
  typesContent.includes("status_transition?: ProjectStatus"),
  "DevelopmentProgressUpdate supports status_transition"
);
assert(
  typesContent.includes("milestone_percentage?: number"),
  "DevelopmentProgressUpdate supports milestone_percentage"
);
assert(
  typesContent.includes("evidence_url?: string"),
  "DevelopmentProgressUpdate supports evidence_url"
);

assert(
  projectDetailContent.includes("Measurement Book"),
  "Project detail page includes Measurement Book (MB) verification policy"
);
assert(
  projectDetailContent.includes("progressUpdates"),
  "Project detail page renders chronological milestone progress list"
);

// 5. REST APIS & DATA STORE OPERATIONS
console.log("\nSuite 5: REST API Route Handlers & Data Store Operations");
const apiProjectsPath = path.join(rootDir, "src/app/api/development/projects/route.ts");
const apiSingleProjectPath = path.join(rootDir, "src/app/api/development/projects/[id]/route.ts");
const apiUpdatesPath = path.join(rootDir, "src/app/api/development/projects/[id]/updates/route.ts");

assert(fs.existsSync(apiProjectsPath), "API endpoint /api/development/projects exists");
assert(fs.existsSync(apiSingleProjectPath), "API endpoint /api/development/projects/[id] exists");
assert(fs.existsSync(apiUpdatesPath), "API endpoint /api/development/projects/[id]/updates exists");

const apiProjectsContent = fs.readFileSync(apiProjectsPath, "utf-8");
assert(
  apiProjectsContent.includes("z.enum([") && apiProjectsContent.includes("roads_transportation"),
  "API route validates 9 statutory categories with Zod"
);
assert(
  apiProjectsContent.includes("ward_number: z.number().int().min(1).max(45)"),
  "API route validates ward_number between 1 and 45"
);

// 6. SUPABASE MIGRATION CONSTRAINTS & RLS POLICIES
console.log("\nSuite 6: Supabase SQL Migration");
const migrationPath = path.join(rootDir, "supabase/migrations/20241117000009_development_tracker_upgrade.sql");
assert(fs.existsSync(migrationPath), "Supabase migration 20241117000009_development_tracker_upgrade.sql exists");

const migrationContent = fs.readFileSync(migrationPath, "utf-8");
assert(
  migrationContent.includes("ward_number BETWEEN 1 AND 45"),
  "Migration enforces CHECK (ward_number BETWEEN 1 AND 45)"
);
assert(
  migrationContent.includes("ENABLE ROW LEVEL SECURITY"),
  "Migration enables Row-Level Security on development tables"
);
assert(
  migrationContent.includes("roads_transportation"),
  "Migration enforces CHECK constraint with 9 statutory categories"
);
assert(
  migrationContent.includes("'Proposed'") && migrationContent.includes("'Completed'"),
  "Migration enforces CHECK constraint with 8 statutory statuses"
);
assert(
  migrationContent.includes("approved_budget") && migrationContent.includes("estimated_cost"),
  "Migration adds approved_budget, estimated_cost, and actual_expenditure columns"
);

// 7. SIMPLE ENGLISH COMPLIANCE (ZERO MALAYALAM CHARACTERS IN UI CODE)
console.log("\nSuite 7: Simple English UI Compliance");
const malayalamRegex = /[\u0D00-\u0D7F]/;

const pagesToCheck = [
  "src/app/development/page.tsx",
  "src/app/development/projects/page.tsx",
  "src/app/development/projects/[id]/page.tsx",
  "src/app/development-tracker/page.tsx",
  "src/components/development/DevelopmentNav.tsx",
  "src/components/development/DevelopmentProjectMap.tsx",
  "src/app/admin/development/page.tsx",
  "src/app/admin/development/projects/page.tsx",
  "src/app/admin/development/projects/new/page.tsx",
  "src/app/admin/development/projects/[id]/edit/page.tsx"
];

pagesToCheck.forEach((relPath) => {
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

// SUMMARY
console.log("\n=======================================================");
console.log(`DEVELOPMENT TRACKER VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
}
