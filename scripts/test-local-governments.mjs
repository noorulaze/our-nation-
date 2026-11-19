import fs from "fs";
import path from "path";
import assert from "assert";

const rootDir = process.cwd();

console.log("===============================================================================");
console.log("OUR NATION — TANUR LOCAL GOVERNMENT & REPRESENTATIVES DIRECTORY TEST SUITE");
console.log("Urban (Tanur Municipality) & Rural (Tanur Block + 7 Grama Panchayats)");
console.log("===============================================================================\n");

let passedTests = 0;
let totalTests = 0;

function runTest(description, testFn) {
  totalTests++;
  try {
    testFn();
    console.log(`  ✓ ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${description}`);
    console.error(`    ${err.message}`);
  }
}

// -----------------------------------------------------------------------------
// TEST 1: Types and Database Architecture
// -----------------------------------------------------------------------------
console.log("TEST 1: Types and Database Architecture");

const typesFile = path.join(rootDir, "src/types/localGovernment.ts");
runTest("src/types/localGovernment.ts exists", () => {
  assert(fs.existsSync(typesFile));
});

const typesContent = fs.readFileSync(typesFile, "utf8");
runTest("Defines LocalBodyCategory with 'urban' and 'rural'", () => {
  assert(typesContent.includes('"urban" | "rural"'));
});

runTest("Defines LocalBodyType with municipality, block_panchayat, and grama_panchayat", () => {
  assert(typesContent.includes('"municipality"') && typesContent.includes('"block_panchayat"') && typesContent.includes('"grama_panchayat"'));
});

runTest("Defines VerificationStatus with verified, pending_verification, and disputed", () => {
  assert(typesContent.includes('"verified"') && typesContent.includes('"pending_verification"') && typesContent.includes('"disputed"'));
});

const migrationFile = path.join(rootDir, "supabase/migrations/20241117000004_local_governments.sql");
runTest("Supabase Migration exists at supabase/migrations/20241117000004_local_governments.sql", () => {
  assert(fs.existsSync(migrationFile));
});

const migrationContent = fs.readFileSync(migrationFile, "utf8");
runTest("Migration creates local_government_bodies, local_government_wards, local_representatives tables", () => {
  assert(migrationContent.includes("CREATE TABLE IF NOT EXISTS public.local_government_bodies"));
  assert(migrationContent.includes("CREATE TABLE IF NOT EXISTS public.local_government_wards"));
  assert(migrationContent.includes("CREATE TABLE IF NOT EXISTS public.local_representatives"));
  assert(migrationContent.includes("CREATE TABLE IF NOT EXISTS public.local_representative_audits"));
});

runTest("Migration enforces Row Level Security (RLS) on all local government tables", () => {
  assert(migrationContent.includes("ALTER TABLE public.local_government_bodies ENABLE ROW LEVEL SECURITY"));
  assert(migrationContent.includes("ALTER TABLE public.local_government_wards ENABLE ROW LEVEL SECURITY"));
  assert(migrationContent.includes("ALTER TABLE public.local_representatives ENABLE ROW LEVEL SECURITY"));
});

// -----------------------------------------------------------------------------
// TEST 2: Data Integrity & Authentic Local Bodies
// -----------------------------------------------------------------------------
console.log("\nTEST 2: Data Integrity & Authentic Local Bodies");

const dataFile = path.join(rootDir, "src/lib/data/localGovernmentData.ts");
runTest("localGovernmentData.ts exists", () => {
  assert(fs.existsSync(dataFile));
});

const dataContent = fs.readFileSync(dataFile, "utf8");

runTest("Includes Urban Local Government: Tanur Municipality with 44 wards", () => {
  assert(dataContent.includes("tanur-municipality"));
  assert(dataContent.includes("total_wards: 44"));
  assert(dataContent.includes("P. P. Shamseer") || dataContent.includes("Shamseer"));
  assert(dataContent.includes("Mallika Teacher"));
});

runTest("Includes Rural Local Government: Tanur Block Panchayat with 17 divisions", () => {
  assert(dataContent.includes("tanur-block-panchayat"));
  assert(dataContent.includes("total_wards: 17"));
  assert(dataContent.includes("Noushad C.") || dataContent.includes("Noushad Chelatt"));
  assert(dataContent.includes("Nasreen M."));
});

runTest("Includes All 7 Constituent Grama Panchayats under Tanur Block Panchayat", () => {
  assert(dataContent.includes("tanalur") && dataContent.includes("total_wards: 23"), "Tanalur GP has 23 wards");
  assert(dataContent.includes("niramaruthur") && dataContent.includes("total_wards: 17"), "Niramaruthur GP has 17 wards");
  assert(dataContent.includes("ozhur") && dataContent.includes("total_wards: 18"), "Ozhur GP has 18 wards");
  assert(dataContent.includes("ponmundam") && dataContent.includes("total_wards: 16"), "Ponmundam GP has 16 wards");
  assert(dataContent.includes("cheriyamundam") && dataContent.includes("total_wards: 18"), "Cheriyamundam GP has 18 wards");
  assert(dataContent.includes("valavannur") && dataContent.includes("total_wards: 19"), "Valavannur GP has 19 wards");
  assert(dataContent.includes("perumanna-klari") && dataContent.includes("total_wards: 16"), "Perumanna-Klari GP has 16 wards");
});

runTest("Constituent Grama Panchayat Presidents are correctly attributed", () => {
  assert(dataContent.includes("N. Mujeeb Haji"), "Tanalur President: N. Mujeeb Haji");
  assert(dataContent.includes("Ismail"), "Niramaruthur President: Ismail");
  assert(dataContent.includes("Prajitha"), "Ozhur President: Prajitha");
  assert(dataContent.includes("R. Komukutty"), "Ponmundam President: R. Komukutty");
  assert(dataContent.includes("Kallery Mymoona"), "Cheriyamundam President: Kallery Mymoona");
  assert(dataContent.includes("Mayyeri Naseeba Thappy"), "Valavannur President: Mayyeri Naseeba Thappy");
  assert(dataContent.includes("Libas Moidheen"), "Perumanna-Klari President: Libas Moidheen");
});

// -----------------------------------------------------------------------------
// TEST 3: Discrepancy Investigation Record (Kalpakanchery vs Perumanna-Klari)
// -----------------------------------------------------------------------------
console.log("\nTEST 3: Discrepancy Investigation Record");

runTest("Documents and explains the Kalpakanchery vs Perumanna-Klari discrepancy transparently", () => {
  assert(dataContent.includes("kalpakanchery"), "Includes Kalpakanchery administrative entry/reference");
  assert(dataContent.includes("Kuttippuram Block Panchayat"), "Explicitly notes Kalpakanchery is under Kuttippuram Block in LSGD records");
  assert(dataContent.includes("Perumanna-Klari") || dataContent.includes("Perumanna Klari"), "Confirms Perumanna-Klari as statutory 7th panchayat");
});

// -----------------------------------------------------------------------------
// TEST 4: Frontend Routes & Page Integration
// -----------------------------------------------------------------------------
console.log("\nTEST 4: Frontend Routes & Page Integration");

const localGovPage = path.join(rootDir, "src/app/local-governments/page.tsx");
runTest("Public Local Governments page exists at src/app/local-governments/page.tsx", () => {
  assert(fs.existsSync(localGovPage));
});

const localGovContent = fs.readFileSync(localGovPage, "utf8");
runTest("Local Governments page contains Hero heading 'Explore Your Local Government'", () => {
  assert(localGovContent.includes("Explore Your Local Government"));
});

runTest("Local Governments page distinguishes Urban vs Rural Local Government", () => {
  assert(localGovContent.includes("Urban Local Government"));
  assert(localGovContent.includes("Rural Local Government"));
});

const dynamicPage = path.join(rootDir, "src/app/local-governments/[slug]/page.tsx");
runTest("Individual Local Body route exists at src/app/local-governments/[slug]/page.tsx", () => {
  assert(fs.existsSync(dynamicPage));
});

const adminPage = path.join(rootDir, "src/app/admin/local-governments/page.tsx");
runTest("Admin Local Governments dashboard exists at src/app/admin/local-governments/page.tsx", () => {
  assert(fs.existsSync(adminPage));
});

const navbarFile = path.join(rootDir, "src/components/layout/Navbar.tsx");
const navbarContent = fs.readFileSync(navbarFile, "utf8");
runTest("Navbar main navigation links to /local-governments", () => {
  assert(navbarContent.includes("/local-governments"));
});

const footerFile = path.join(rootDir, "src/components/layout/Footer.tsx");
const footerContent = fs.readFileSync(footerFile, "utf8");
runTest("Footer navigation links to /local-governments", () => {
  assert(footerContent.includes("/local-governments"));
});

const homeFile = path.join(rootDir, "src/app/page.tsx");
const homeContent = fs.readFileSync(homeFile, "utf8");
runTest("Homepage provides direct link to /local-governments", () => {
  assert(homeContent.includes("/local-governments"));
});

// -----------------------------------------------------------------------------
// TEST 5: Neutral Dignified Avatars (Anti-AI Fake Face Compliance)
// -----------------------------------------------------------------------------
console.log("\nTEST 5: Neutral Dignified Avatars & Photograph Integrity");

const leaderSvg = path.join(rootDir, "public/placeholder-leader.svg");
const repSvg = path.join(rootDir, "public/placeholder-representative.svg");

runTest("Neutral dignified leader SVG placeholder exists", () => {
  assert(fs.existsSync(leaderSvg));
});

runTest("Neutral dignified representative SVG placeholder exists", () => {
  assert(fs.existsSync(repSvg));
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log("\n===============================================================================");
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
console.log("===============================================================================");

if (passedTests === totalTests) {
  console.log("\n🎉 ALL LOCAL GOVERNMENT & REPRESENTATIVES TESTS PASSED (100%)!\n");
  process.exit(0);
} else {
  console.error(`\n❌ ${totalTests - passedTests} tests failed.`);
  process.exit(1);
}
