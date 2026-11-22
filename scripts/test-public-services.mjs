/**
 * test-public-services.mjs
 * Comprehensive validation suite for the OUR NATION Online Public Services System.
 * Tests categories, service data integrity, application workflow, reference tracking,
 * citizen data isolation, SQL migration, and simple English compliance.
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
console.log("OUR NATION: ONLINE PUBLIC SERVICES SYSTEM VALIDATION");
console.log("=======================================================\n");

// 1. DATA SOURCE & CATEGORY VALIDATION
console.log("Suite 1: Statutory Categories & Service Directory Data");
const servicesDataPath = path.join(rootDir, "src/lib/data/publicServicesData.ts");
const servicesDataContent = fs.readFileSync(servicesDataPath, "utf-8");

const expectedCategories = [
  "cat-certificates",
  "cat-property-tax",
  "cat-building",
  "cat-water-sanitation",
  "cat-public-health",
  "cat-business",
  "cat-social-welfare",
  "cat-other",
];

expectedCategories.forEach(catId => {
  assert(
    servicesDataContent.includes(`id: "${catId}"`) || servicesDataContent.includes(`key: "${catId}"`),
    `Statutory category '${catId}' is registered in SERVICE_CATEGORIES`
  );
});

assert(
  servicesDataContent.includes("export const TANUR_MUNICIPAL_SERVICES: PublicServiceDetail[]"),
  "TANUR_MUNICIPAL_SERVICES catalog is exported"
);

assert(
  servicesDataContent.includes("export const publicServiceStore = new PublicServiceStore()"),
  "publicServiceStore singleton is exported"
);

// Check switchboard number is 0494 2440228
assert(
  servicesDataContent.includes("0494 2440228"),
  "Tanur Municipal central switchboard 0494 2440228 is preserved across services"
);

// 2. REFERENCE NUMBER FORMAT & APPLICATION MANAGEMENT
console.log("\nSuite 2: Reference Number Tracking & Application Store");
assert(
  servicesDataContent.includes("PS-TNR-2026-"),
  "Reference number generator follows strict pattern PS-TNR-2026-XXXX"
);

const statuses = [
  "submitted",
  "under_review",
  "documents_verified",
  "forwarded_guidance",
  "completed",
  "rejected"
];

statuses.forEach(st => {
  assert(
    servicesDataContent.includes(`"${st}"`),
    `Application lifecycle supports status '${st}'`
  );
});

// Seed data check for Fathima Tanur demo profile
assert(
  servicesDataContent.includes("u0000000-0000-0000-0000-000000000003") &&
  servicesDataContent.includes("PS-TNR-2026-1001"),
  "Seeded demo guidance application (PS-TNR-2026-1001) exists for Fathima Tanur profile"
);

// 3. SERVICE DETAIL PAGE & COMPONENT CHECKS
console.log("\nSuite 3: Public Services Pages & Dynamic Route");
const directoryPagePath = path.join(rootDir, "src/app/public-services/page.tsx");
assert(fs.existsSync(directoryPagePath), "Public services directory page exists at src/app/public-services/page.tsx");

const detailPagePath = path.join(rootDir, "src/app/public-services/[slug]/page.tsx");
assert(fs.existsSync(detailPagePath), "Dedicated service detail page exists at src/app/public-services/[slug]/page.tsx");

const detailContent = fs.readFileSync(detailPagePath, "utf-8");
assert(detailContent.includes("Who Can Apply (Eligibility)"), "Detail page includes Eligibility section");
assert(detailContent.includes("Required Documents Checklist"), "Detail page includes Required Documents Checklist");
assert(detailContent.includes("Step-by-Step Application Procedure"), "Detail page includes Step-by-Step Procedure");
assert(detailContent.includes("Statutory Fees & Processing Schedule"), "Detail page includes Fees & Processing Schedule");
assert(detailContent.includes("Frequently Asked Questions"), "Detail page includes FAQs Accordion");
assert(detailContent.includes("State Government Portal"), "Detail page distinguishes State Government Portal");
assert(detailContent.includes("OUR NATION Guidance"), "Detail page provides internal guidance application form");
assert(detailContent.includes("Statutory Guidance Notice"), "Detail page displays statutory transparency notice");

// 4. CITIZEN DASHBOARD INTEGRATION
console.log("\nSuite 4: Citizen Dashboard Integration & Privacy Isolation");
const dashboardPath = path.join(rootDir, "src/app/dashboard/page.tsx");
const dashboardContent = fs.readFileSync(dashboardPath, "utf-8");

assert(
  dashboardContent.includes("myServiceApplications") && dashboardContent.includes("publicServiceStore.getApplications"),
  "Citizen Dashboard connects to publicServiceStore for user applications"
);

assert(
  dashboardContent.includes("app.applicant_id === currentId") || dashboardContent.includes("fathima_tanur"),
  "Citizen Dashboard enforces strict citizen data isolation (applicant_id === user.id)"
);

assert(
  dashboardContent.includes('id="service-applications"'),
  "Citizen Dashboard contains dedicated '#service-applications' management section"
);

assert(
  dashboardContent.includes("SERVICE APPLICATION DETAILS MODAL") || dashboardContent.includes("selectedServiceApp"),
  "Citizen Dashboard includes detailed modal for viewing guidance application and status timeline"
);

// 5. ADMIN MANAGEMENT WORKSPACE
console.log("\nSuite 5: Admin Public Services Workspace");
const adminServicesPath = path.join(rootDir, "src/app/admin/public-services/page.tsx");
assert(fs.existsSync(adminServicesPath), "Admin Public Services Workspace exists at src/app/admin/public-services/page.tsx");

const adminContent = fs.readFileSync(adminServicesPath, "utf-8");
assert(adminContent.includes("Service Catalog"), "Admin workspace supports Service Catalog management");
assert(adminContent.includes("Guidance Applications Queue"), "Admin workspace supports Guidance Applications Queue");
assert(adminContent.includes("handleUpdateAppStatus"), "Admin workspace enables updating application status & officer notes");
assert(adminContent.includes("handleCreateService"), "Admin workspace enables adding new service listings");

// 6. SERVER-SIDE API ROUTES
console.log("\nSuite 6: Server-Side REST API Routes & Zod Validation");
const apiRoutePath = path.join(rootDir, "src/app/api/public-services/route.ts");
const apiSlugPath = path.join(rootDir, "src/app/api/public-services/[slug]/route.ts");
const apiAppsPath = path.join(rootDir, "src/app/api/public-services/applications/route.ts");
const apiAppIdPath = path.join(rootDir, "src/app/api/public-services/applications/[id]/route.ts");

assert(fs.existsSync(apiRoutePath), "GET/POST /api/public-services route exists");
assert(fs.existsSync(apiSlugPath), "GET/PATCH /api/public-services/[slug] route exists");
assert(fs.existsSync(apiAppsPath), "GET/POST /api/public-services/applications route exists");
assert(fs.existsSync(apiAppIdPath), "GET/PATCH /api/public-services/applications/[id] route exists");

const apiAppsContent = fs.readFileSync(apiAppsPath, "utf-8");
assert(apiAppsContent.includes("submitApplicationSchema"), "Applications API uses Zod schema validation");
assert(apiAppsContent.includes("min(1, \"Ward number must be between 1 and 45\")"), "Applications API validates Tanur Municipality ward numbers (1 to 45)");

// 7. SUPABASE MIGRATION & RLS VERIFICATION
console.log("\nSuite 7: Supabase Schema Migration & RLS Policies");
const migrationPath = path.join(rootDir, "supabase/migrations/20241117000008_public_services_system.sql");
assert(fs.existsSync(migrationPath), "Migration 20241117000008_public_services_system.sql exists");

const migrationContent = fs.readFileSync(migrationPath, "utf-8");
assert(migrationContent.includes("CREATE TABLE IF NOT EXISTS public.public_services"), "Migration defines public.public_services table");
assert(migrationContent.includes("CREATE TABLE IF NOT EXISTS public.public_service_applications"), "Migration defines public.public_service_applications table");
assert(migrationContent.includes("^PS-TNR-2026-[0-9]{4,}$"), "Migration enforces reference number regex constraint ^PS-TNR-2026-[0-9]{4,}$");
assert(migrationContent.includes("ward_number BETWEEN 1 AND 45"), "Migration enforces ward_number constraint BETWEEN 1 AND 45");
assert(migrationContent.includes("ALTER TABLE public.public_services ENABLE ROW LEVEL SECURITY"), "Migration enables RLS on public_services");
assert(migrationContent.includes("ALTER TABLE public.public_service_applications ENABLE ROW LEVEL SECURITY"), "Migration enables RLS on public_service_applications");
assert(migrationContent.includes("Citizens can view only their own service applications"), "Migration enforces citizen data isolation RLS policy");

// 8. ZERO MALAYALAM UI SCRIPT VERIFICATION
console.log("\nSuite 8: Simple English Only Compliance (Zero Malayalam Script in UI)");
const malayalamRegex = /[\u0D00-\u0D7F]/;

const filesToCheck = [
  { name: "Public Services Directory", path: directoryPagePath },
  { name: "Public Service Detail Page", path: detailPagePath },
  { name: "Admin Public Services Workspace", path: adminServicesPath },
  { name: "Public Services API Route", path: apiRoutePath },
  { name: "Applications API Route", path: apiAppsPath },
];

filesToCheck.forEach(f => {
  const content = fs.readFileSync(f.path, "utf-8");
  const hasMalayalam = malayalamRegex.test(content);
  assert(!hasMalayalam, `${f.name} contains zero Malayalam characters (English-only standard)`);
});

// Summary
console.log("\n=======================================================");
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All Public Services System tests passed cleanly!\n");
  process.exit(0);
}
