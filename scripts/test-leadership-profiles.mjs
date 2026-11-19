import fs from "fs";
import path from "path";
import assert from "assert";

console.log("==================================================================");
console.log("OUR NATION — LEADERSHIP PROFILES & DESIGN VERIFICATION SUITE");
console.log("==================================================================\n");

const ROOT = process.cwd();

// Test 1: Leadership Profile Type Definition
console.log("1. Verifying Leadership Profile Type Contract...");
const typePath = path.join(ROOT, "src", "types", "leadershipProfile.ts");
assert.ok(fs.existsSync(typePath), "src/types/leadershipProfile.ts must exist");
const typeContent = fs.readFileSync(typePath, "utf-8");
assert.ok(typeContent.includes("fullName: string"), "Contract must include fullName");
assert.ok(typeContent.includes("designation: string"), "Contract must include designation");
assert.ok(typeContent.includes("leadershipCategory: LeadershipCategory"), "Contract must include leadershipCategory");
assert.ok(typeContent.includes("shortIntroduction"), "Contract must include shortIntroduction");
assert.ok(typeContent.includes("fullBiography"), "Contract must include fullBiography");
assert.ok(typeContent.includes("verificationStatus: LeadershipVerificationStatus"), "Contract must include verificationStatus");
assert.ok(typeContent.includes("isContactPubliclyAuthorized"), "Contract must enforce isContactPubliclyAuthorized check");
console.log("  ✓ Leadership Profile TypeScript interfaces and types validated.");

// Test 2: Seed Data Integrity & Anti-Fabrication Invariants
console.log("\n2. Verifying Seed Data & Zero-Fabrication Invariant for PK Nawas...");
const seedPath = path.join(ROOT, "src", "lib", "data", "leadershipData.ts");
assert.ok(fs.existsSync(seedPath), "src/lib/data/leadershipData.ts must exist");
const seedContent = fs.readFileSync(seedPath, "utf-8");
assert.ok(seedContent.includes('fullName: "PK Nawas"'), "PK Nawas profile must be present");
assert.ok(seedContent.includes('designation: "Overall Community Leader & Project Guidance"'), "Designation must be Overall Community Leader & Project Guidance");
assert.ok(seedContent.includes('organization: "OUR NATION – Tanur"'), "Organization must be OUR NATION – Tanur");
assert.ok(seedContent.includes('verificationStatus: "pending_admin_approval"'), "Verification status must be pending_admin_approval");
assert.ok(seedContent.includes('shortIntroduction: "To be added after confirmation."'), "Short introduction must not be fabricated");
assert.ok(seedContent.includes('fullBiography: "Pending verified information."'), "Full biography must not be fabricated");
assert.ok(seedContent.includes('"To be confirmed with the individual."'), "Responsibilities must not be fabricated");
assert.ok(!seedContent.includes("MLA"), "Must not contain speculative political or legislative claims");
console.log("  ✓ Zero-fabrication invariants strictly upheld for PK Nawas.");

// Test 3: Separation of Community Leadership and Statutory Municipal Government
console.log("\n3. Verifying Strict Separation of Community Leadership and Municipal ULB...");
const localGovPath = path.join(ROOT, "src", "lib", "data", "localGovernmentData.ts");
const muniPath = path.join(ROOT, "src", "lib", "data", "digitalMunicipalityData.ts");
const localGovContent = fs.readFileSync(localGovPath, "utf-8");
const muniContent = fs.readFileSync(muniPath, "utf-8");

assert.ok(localGovContent.includes('slug: "tanur-municipality"'), "Tanur Municipality must exist as urban local government");
assert.ok(muniContent.includes("45"), "Tanur Municipality must have 45 statutory wards");
assert.ok(!muniContent.includes("PK Nawas"), "Elected councillor list must not conflate community mentors with statutory representatives");
console.log("  ✓ Strict separation confirmed: 45 municipal councillors vs separate community leadership.");

// Test 4: Supabase Schema & Row-Level Security
console.log("\n4. Verifying Supabase SQL Schema & Row-Level Security Migration...");
const migrationPath = path.join(ROOT, "supabase", "migrations", "20241117000005_leadership_profiles.sql");
assert.ok(fs.existsSync(migrationPath), "Migration 20241117000005_leadership_profiles.sql must exist");
const sqlContent = fs.readFileSync(migrationPath, "utf-8");
assert.ok(sqlContent.includes("leadership_profiles"), "Table must be created");
assert.ok(sqlContent.includes("ROW LEVEL SECURITY"), "RLS must be enabled on leadership_profiles");
assert.ok(sqlContent.includes("verification_status = 'verified'"), "Public RLS policy must restrict read access to verified records");
console.log("  ✓ Supabase migration and RLS policies verified.");

// Test 5: UI Pages & Components Existence
console.log("\n5. Verifying Leadership UI Pages & Components...");
const publicDirPage = path.join(ROOT, "src", "app", "leadership", "page.tsx");
const detailPage = path.join(ROOT, "src", "app", "leadership", "[slug]", "page.tsx");
const adminPage = path.join(ROOT, "src", "app", "admin", "leadership", "page.tsx");
assert.ok(fs.existsSync(publicDirPage), "Public directory /leadership must exist");
assert.ok(fs.existsSync(detailPage), "Public detail page /leadership/[slug] must exist");
assert.ok(fs.existsSync(adminPage), "Admin management editor /admin/leadership must exist");
console.log("  ✓ All leadership UI pages created and in place.");

// Test 6: Design System Alignment with Image Reference
console.log("\n6. Verifying Homepage & Sub-Pages Design Alignment...");
const homePage = fs.readFileSync(path.join(ROOT, "src", "app", "page.tsx"), "utf-8");
const navbar = fs.readFileSync(path.join(ROOT, "src", "components", "layout", "Navbar.tsx"), "utf-8");
const contactPage = fs.readFileSync(path.join(ROOT, "src", "app", "contact", "page.tsx"), "utf-8");
const tanurPage = fs.readFileSync(path.join(ROOT, "src", "app", "tanur", "page.tsx"), "utf-8");

assert.ok(homePage.includes("Together for a"), "Homepage must feature 'Together for a'");
assert.ok(homePage.includes("Smarter Tanur"), "Homepage must feature 'Smarter Tanur'");
assert.ok(homePage.includes("Digital Services. Transparent Governance. A Progressive Municipality."), "Homepage must have exact subtitle");
assert.ok(homePage.includes("Explore Services"), "Homepage CTA must be Explore Services");
assert.ok(homePage.includes("Citizen Services"), "Right column card must feature Citizen Services");
assert.ok(homePage.includes("Grievance Redressal"), "Right column card must feature Grievance Redressal");
assert.ok(homePage.includes("Municipal Updates"), "Right column card must feature Municipal Updates");
assert.ok(homePage.includes("Pay Property Tax"), "Overlapping strip must include Pay Property Tax");
assert.ok(homePage.includes("Our Municipality"), "Below hero section must feature Our Municipality");
assert.ok(homePage.includes("A vibrant community, a progressive Tanur"), "Section subtitle must match design reference");

assert.ok(navbar.includes('label: "Home"'), "Navbar must have Home");
assert.ok(navbar.includes('label: "Services"'), "Navbar must have Services");
assert.ok(navbar.includes('label: "About Tanur"'), "Navbar must have About Tanur");
assert.ok(navbar.includes('label: "Civic Connect"'), "Navbar must have Civic Connect");
assert.ok(navbar.includes('label: "News & Updates"'), "Navbar must have News & Updates");
assert.ok(navbar.includes('label: "Contact"'), "Navbar must have Contact");
assert.ok(navbar.includes("Citizen Login"), "Navbar must have Citizen Login button");

assert.ok(contactPage.includes("0494 2440228"), "Contact page must feature official switchboard 0494 2440228");
assert.ok(tanurPage.includes("Our History, Our Pride"), "About Tanur page must feature Our History, Our Pride");
console.log("  ✓ Homepage, navigation, and sub-pages match official OUR NATION design reference.");

console.log("\n==================================================================");
console.log("ALL TESTS PASSED SUCCESSFULLY (6/6 SUITES)");
console.log("==================================================================");
