/**
 * OUR NATION — DIGITAL MUNICIPALITY TRANSFORMATION VERIFICATION SUITE
 * 
 * Validates the complete transformation of OUR NATION into the flagship
 * Digital Municipality Platform for Tanur Municipality, Kerala:
 * 1. Six Primary Core Public Features existence and routing
 * 2. Navigation simplification & retired features exclusion from primary navbar
 * 3. 8-section homepage layout centered on Tanur Municipality
 * 4. Geographic coordinates integrity for all 44 wards and facilities (10.94-11.02 N, 75.83-75.90 E)
 * 5. Authentic government portal integrations (K-Smart, LSGD, Sanchitha, Sevana)
 * 6. Non-emergency safety banners and independent civic platform disclaimers
 * 7. Google Maps Platform genuine coverage integration (Roadmap, Satellite, 3D Terrain, 3D Tiles disclosure)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log("===============================================================================");
console.log("OUR NATION — DIGITAL MUNICIPALITY TRANSFORMATION VERIFICATION SUITE");
console.log("Tanur Municipality, Malappuram District, Kerala, India");
console.log("===============================================================================\n");

// -----------------------------------------------------------------------------
// TEST 1: The Six Primary Core Public Feature Routes
// -----------------------------------------------------------------------------
console.log("TEST 1: The Six Primary Core Public Feature Routes");

const coreRoutes = [
  { feature: "Feature 01: Digital Municipality", path: "src/app/digital-municipality/page.tsx" },
  { feature: "Feature 02: Civic Connect", path: "src/app/civic-connect/page.tsx" },
  { feature: "Feature 03: Development Tracker", path: "src/app/development-tracker/page.tsx" },
  { feature: "Feature 04: Public Services", path: "src/app/public-services/page.tsx" },
  { feature: "Feature 05: Documents & Notices", path: "src/app/documents/page.tsx" },
  { feature: "Feature 06: People's Voice", path: "src/app/peoples-voice/page.tsx" },
];

coreRoutes.forEach(({ feature, path: relPath }) => {
  const fullPath = path.join(rootDir, relPath);
  assert(fs.existsSync(fullPath), `${feature} exists at ${relPath}`);
});

// -----------------------------------------------------------------------------
// TEST 2: Primary Public Navigation Simplification (Navbar & BottomNav)
// -----------------------------------------------------------------------------
console.log("\nTEST 2: Primary Public Navigation Simplification");

const navbarContent = fs.readFileSync(path.join(rootDir, "src/components/layout/Navbar.tsx"), "utf8");
const bottomNavContent = fs.readFileSync(path.join(rootDir, "src/components/layout/BottomNav.tsx"), "utf8");

// Verify that the main pill links in Navbar contain Home and the Six Core Features
const expectedPillHrefs = [
  "/",
  "/digital-municipality",
  "/civic-connect",
  "/development-tracker",
  "/public-services",
  "/documents",
  "/peoples-voice",
];

expectedPillHrefs.forEach(href => {
  assert(
    navbarContent.includes(`href: "${href}"`),
    `Navbar main navigation includes primary route: ${href}`
  );
});

// Verify that retired/unfocused features are ABSENT from the primary pill navigation
const mainPillSection = navbarContent.substring(
  navbarContent.indexOf("const mainPillLinks"),
  navbarContent.indexOf("const civicDropdownModules")
);

const retiredRoutes = ["/community", "/marketplace", "/jobs", "/professionals", "/discover", "/culture", "/events"];
retiredRoutes.forEach(route => {
  assert(
    !mainPillSection.includes(`"${route}"`),
    `Retired/secondary route '${route}' is correctly excluded from primary navigation pills`
  );
});

// Verify mobile bottom nav
assert(
  bottomNavContent.includes("/digital-municipality") &&
  bottomNavContent.includes("/civic-connect") &&
  bottomNavContent.includes("/development-tracker") &&
  bottomNavContent.includes("/public-services"),
  "BottomNav cleanly exposes core municipal destinations"
);

// -----------------------------------------------------------------------------
// TEST 3: Homepage Redesign (Tanur-Centered 8-Section Architecture)
// -----------------------------------------------------------------------------
console.log("\nTEST 3: Homepage Redesign (Tanur-Centered Architecture)");

const homeContent = fs.readFileSync(path.join(rootDir, "src/app/page.tsx"), "utf8");

assert(homeContent.includes("താനൂർ നഗരസഭ"), "Homepage features Tanur Municipality header");
assert(homeContent.includes("The Six Primary Public Features") || homeContent.includes("ആറ് അടിസ്ഥാന പൗര സേവനങ്ങൾ"), "Homepage contains Six Core Features grid");
assert(homeContent.includes("ഔദ്യോഗിക അറിയിപ്പുകൾ") || homeContent.includes("Municipal Announcements"), "Homepage displays Municipal Announcements");
assert(homeContent.includes("വികസന പദ്ധതികൾ") || homeContent.includes("Development Projects"), "Homepage highlights Development Projects");
assert(homeContent.includes("സിവിക് കണക്ട്") || homeContent.includes("Civic Connect"), "Homepage shows Civic Connect reports");
assert(homeContent.includes("ഔദ്യോഗിക രേഖകൾ") || homeContent.includes("Public Documents"), "Homepage highlights Official Documents repository");
assert(homeContent.includes("പീപ്പിൾസ് വോയ്സ്") || homeContent.includes("People's Voice"), "Homepage features Citizen Participation");
assert(homeContent.includes("നാട് AI") || homeContent.includes("Naadu AI"), "Homepage integrates Naadu AI Civic Assistant");

// -----------------------------------------------------------------------------
// TEST 4: Geographic Coordinates Integrity for Tanur, Kerala
// -----------------------------------------------------------------------------
console.log("\nTEST 4: Geographic Coordinates Integrity for Tanur, Kerala");

const digitalDataContent = fs.readFileSync(path.join(rootDir, "src/lib/data/digitalMunicipalityData.ts"), "utf8");

// Parse all latitude and longitude coordinates
const latMatches = [...digitalDataContent.matchAll(/latitude:\s*([0-9.]+)/g)].map(m => parseFloat(m[1]));
const lngMatches = [...digitalDataContent.matchAll(/longitude:\s*([0-9.]+)/g)].map(m => parseFloat(m[1]));

assert(latMatches.length >= 44, `Found ${latMatches.length} latitude coordinates for Tanur entities`);
assert(lngMatches.length >= 44, `Found ${lngMatches.length} longitude coordinates for Tanur entities`);

// Tanur Envelope: 10.94 - 11.02 N, 75.83 - 75.90 E
const invalidLats = latMatches.filter(lat => lat < 10.94 || lat > 11.02);
const invalidLngs = lngMatches.filter(lng => lng < 75.83 || lng > 75.90);

assert(invalidLats.length === 0, `All ${latMatches.length} latitudes strictly inside Tanur bounds (10.94° - 11.02° N)`);
assert(invalidLngs.length === 0, `All ${lngMatches.length} longitudes strictly inside Tanur bounds (75.83° - 75.90° E)`);

// -----------------------------------------------------------------------------
// TEST 5: Authentic Government Links & Statutory Datasets
// -----------------------------------------------------------------------------
console.log("\nTEST 5: Authentic Government Links & Statutory Datasets");

const servicesData = fs.readFileSync(path.join(rootDir, "src/lib/data/publicServicesData.ts"), "utf8");
const docsData = fs.readFileSync(path.join(rootDir, "src/lib/data/documentsData.ts"), "utf8");

assert(servicesData.includes("ksmart.lsgkerala.gov.in"), "Public Services links to official K-Smart Kerala portal");
assert(servicesData.includes("tax.lsgkerala.gov.in") || servicesData.includes("Sanchitha"), "Property Tax links to official Sanchitha tax portal");
assert(servicesData.includes("welfarepension.lsgkerala.gov.in") || servicesData.includes("Sevana"), "Pensions links to official Sevana portal");
assert(docsData.includes("TNR/FIN/2024-25/BUD-01") || docsData.includes("വാർഷിക ബജറ്റും"), "Documents repository contains authentic municipal budget records");
assert(docsData.includes("etenders.kerala.gov.in") || docsData.includes("താനൂർ നഗരസഭ ഇ-ടെൻഡർ"), "Documents repository contains authentic e-tender records");

// -----------------------------------------------------------------------------
// TEST 6: Non-Emergency Safety Disclaimers & Independent Civic Status
// -----------------------------------------------------------------------------
console.log("\nTEST 6: Non-Emergency Safety Disclaimers & Civic Integrity");

const civicPageContent = fs.readFileSync(path.join(rootDir, "src/app/civic-connect/page.tsx"), "utf8");
const footerContent = fs.readFileSync(path.join(rootDir, "src/components/layout/Footer.tsx"), "utf8");

assert(
  civicPageContent.includes("അടിയന്തര രക്ഷാപ്രവർത്തന") || civicPageContent.includes("not an emergency service"),
  "Civic Connect contains prominent non-emergency response safety disclaimer"
);
assert(
  civicPageContent.includes("112") || civicPageContent.includes("101"),
  "Civic Connect emergency contacts (112 Police, 101 Fire) are clearly surfaced"
);
assert(
  footerContent.includes("സ്വതന്ത്ര സിവിക്") || footerContent.includes("Independent Platform"),
  "Footer discloses independent civic technology platform status"
);

// -----------------------------------------------------------------------------
// TEST 7: Google Maps Platform Integration & Honest Coverage
// -----------------------------------------------------------------------------
console.log("\nTEST 7: Google Maps Platform Integration & Honest Coverage");

const mapContent = fs.readFileSync(path.join(rootDir, "src/components/tanur/DigitalTanurMap.tsx"), "utf8");
const coverageModalContent = fs.readFileSync(path.join(rootDir, "src/components/tanur/GoogleMapsCoverageModal.tsx"), "utf8");

assert(mapContent.includes("@googlemaps/js-api-loader"), "Google Maps Platform JS API Loader is utilized");
assert(mapContent.includes("ROADMAP") && mapContent.includes("HYBRID") && mapContent.includes("TERRAIN"), "Google Maps Roadmap, Hybrid/Satellite, and Terrain modes supported");
assert(coverageModalContent.includes("Photorealistic 3D Tiles") && coverageModalContent.includes("Unavailable"), "Coverage modal honestly declares Photorealistic 3D Tiles unavailability in Tanur");

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log("\n===============================================================================");
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log("===============================================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL DIGITAL MUNICIPALITY TRANSFORMATION TESTS PASSED (100%)!\n");
}
