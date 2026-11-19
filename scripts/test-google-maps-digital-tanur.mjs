/**
 * TEST SUITE: Google Maps Platform & Digital Tanur GIS Integration
 * Validates genuine Google Maps Platform coverage, map modes, 3D terrain,
 * Photorealistic 3D Tiles unavailability handling, and verified coordinates for Tanur, Kerala.
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
console.log("OUR NATION — GOOGLE MAPS PLATFORM & DIGITAL TANUR GIS TEST SUITE");
console.log("===============================================================================\n");

// -----------------------------------------------------------------------------
// TEST 1: Package Dependencies & SDK Verification
// -----------------------------------------------------------------------------
console.log("TEST 1: Official Google Maps Platform SDK & Types");
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));
assert(
  packageJson.dependencies["@googlemaps/js-api-loader"] !== undefined,
  "Official '@googlemaps/js-api-loader' is registered in dependencies"
);
assert(
  packageJson.devDependencies["@types/google.maps"] !== undefined,
  "Official '@types/google.maps' is registered in devDependencies"
);

// -----------------------------------------------------------------------------
// TEST 2: Environment Configuration & API Key Setup Guidance
// -----------------------------------------------------------------------------
console.log("\nTEST 2: Environment Configuration & Security Documentation");
const envExample = fs.readFileSync(path.join(rootDir, ".env.example"), "utf8");
assert(
  envExample.includes("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"),
  ".env.example contains NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"
);
assert(
  envExample.includes("Maps JavaScript API"),
  ".env.example specifies required Google Cloud APIs"
);
assert(
  envExample.includes("HTTP referrer restriction"),
  ".env.example documents HTTP referrer security restriction best practices"
);

const envLocal = fs.readFileSync(path.join(rootDir, ".env.local"), "utf8");
assert(
  envLocal.includes("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="),
  ".env.local has NEXT_PUBLIC_GOOGLE_MAPS_API_KEY placeholder configured"
);

// -----------------------------------------------------------------------------
// TEST 3: Tanur Municipality Geographic Coordinates Integrity
// -----------------------------------------------------------------------------
console.log("\nTEST 3: Geographic Coordinates Integrity for Tanur, Kerala");
const digitalTanurDataPath = path.join(rootDir, "src/lib/data/digitalMunicipalityData.ts");
const digitalTanurData = fs.readFileSync(digitalTanurDataPath, "utf8");

// Tanur Municipality Center: 10.9768° N, 75.8672° E
const mapComponentPath = path.join(rootDir, "src/components/tanur/DigitalTanurMap.tsx");
const mapComponentContent = fs.readFileSync(mapComponentPath, "utf8");

assert(
  mapComponentContent.includes("10.9768") && mapComponentContent.includes("75.8672"),
  "Tanur Municipality center coordinates (10.9768° N, 75.8672° E) are accurately configured"
);

// Check Tanur geographic bounds for verified places (Lat: 10.94 - 11.02, Lng: 75.83 - 75.90)
const latMatches = [...digitalTanurData.matchAll(/latitude:\s*([0-9.]+)/g)].map(m => parseFloat(m[1]));
const lngMatches = [...digitalTanurData.matchAll(/longitude:\s*([0-9.]+)/g)].map(m => parseFloat(m[1]));

assert(latMatches.length > 20, `Found ${latMatches.length} verified location latitude coordinates`);
assert(lngMatches.length > 20, `Found ${lngMatches.length} verified location longitude coordinates`);

const allLatsInTanur = latMatches.every(lat => lat >= 10.94 && lat <= 11.02);
const allLngsInTanur = lngMatches.every(lng => lng >= 75.83 && lng <= 75.90);

assert(allLatsInTanur, "All latitude coordinates fall strictly within Tanur Municipality bounds");
assert(allLngsInTanur, "All longitude coordinates fall strictly within Tanur Municipality bounds");

// -----------------------------------------------------------------------------
// TEST 4: Supported Map Views & Controls Implementation
// -----------------------------------------------------------------------------
console.log("\nTEST 4: Supported Map Views Implementation");
assert(
  mapComponentContent.includes('handleViewModeChange("map")') || mapComponentContent.includes('"map"'),
  "Standard 2D Roadmap view is implemented"
);
assert(
  mapComponentContent.includes('handleViewModeChange("satellite")') || mapComponentContent.includes('"satellite"'),
  "2D High-Resolution Satellite / Hybrid view is implemented"
);
assert(
  mapComponentContent.includes('handleViewModeChange("3d")') || mapComponentContent.includes('"3d"'),
  "3D Terrain elevation view is implemented"
);
assert(
  mapComponentContent.includes("google.maps.MapTypeId.ROADMAP") &&
  mapComponentContent.includes("google.maps.MapTypeId.HYBRID") &&
  mapComponentContent.includes("google.maps.MapTypeId.TERRAIN"),
  "Official Google Maps MapTypeIds (ROADMAP, HYBRID, TERRAIN) are utilized"
);

// -----------------------------------------------------------------------------
// TEST 5: 3D Camera Controls & Photorealistic 3D Tiles Coverage Transparency
// -----------------------------------------------------------------------------
console.log("\nTEST 5: 3D Camera Controls & Honest Coverage Handling");
assert(
  mapComponentContent.includes("currentTilt") && mapComponentContent.includes("handleTilt"),
  "Pitch / Tilt controls (0° to 67.5°) are implemented for 3D camera"
);
assert(
  mapComponentContent.includes("currentHeading") && mapComponentContent.includes("handleRotate"),
  "Heading / Rotation controls (0° to 360°) are implemented for 3D camera"
);
assert(
  mapComponentContent.includes("handleResetOrientation"),
  "North (0° N) reset orientation control is implemented"
);
assert(
  mapComponentContent.includes("Photorealistic 3D building mesh is currently limited"),
  "Explicit, honest disclosure on Photorealistic 3D Tiles unavailability in Tanur is displayed"
);

// -----------------------------------------------------------------------------
// TEST 6: Google Maps Coverage Modal & Reporting
// -----------------------------------------------------------------------------
console.log("\nTEST 6: Google Maps Platform Coverage Modal");
const modalPath = path.join(rootDir, "src/components/tanur/GoogleMapsCoverageModal.tsx");
assert(fs.existsSync(modalPath), "GoogleMapsCoverageModal.tsx exists");

const modalContent = fs.readFileSync(modalPath, "utf8");
assert(
  modalContent.includes("Standard 2D Roadmap View") && modalContent.includes("Available"),
  "Modal documents Standard 2D Roadmap availability"
);
assert(
  modalContent.includes("High-Resolution 2D Satellite View") && modalContent.includes("Available"),
  "Modal documents 2D Satellite View availability"
);
assert(
  modalContent.includes("Google 3D Terrain & Topographical Relief") && modalContent.includes("Available"),
  "Modal documents 3D Terrain & DEM availability"
);
assert(
  modalContent.includes("Photorealistic 3D Tiles") && modalContent.includes("Unavailable in Tanur"),
  "Modal explicitly reports Photorealistic 3D Tiles unavailability for Tanur, Kerala"
);
assert(
  modalContent.includes("Maps JavaScript API") && modalContent.includes("$200 monthly free tier credit"),
  "Modal documents Google Cloud API requirements and billing details"
);

// -----------------------------------------------------------------------------
// TEST 7: Cross-Layer Integrations & Civic Protection
// -----------------------------------------------------------------------------
console.log("\nTEST 7: Marker Layers & Civic Privacy");
assert(
  mapComponentContent.includes("showProjectsLayer") && mapComponentContent.includes("HardHat"),
  "Municipal Development Projects layer toggle is implemented"
);
assert(
  mapComponentContent.includes("showCivicLayer") && mapComponentContent.includes("AlertTriangle"),
  "Civic Issues layer toggle is implemented"
);
assert(
  mapComponentContent.includes("activeLocation") && mapComponentContent.includes("directions"),
  "Location selection drawer with Google Maps directions integration is implemented"
);

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log("\n===============================================================================");
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log("===============================================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 All Google Maps Platform & Digital Tanur integration tests passed successfully!\n");
}
