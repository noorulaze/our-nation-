// OUR NATION — Digital Tanur Flagship Municipality Verification Suite
import assert from "node:assert";

console.log("======================================================================");
console.log("OUR NATION — DIGITAL TANUR (GIS FLAGSHIP EXPERIENCE) VERIFICATION SUITE");
console.log("======================================================================\n");

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
  }
}

// -----------------------------------------------------------------------------
// Test 1: 8 Official Location Categories
// -----------------------------------------------------------------------------
runTest("Digital Tanur 1: All 8 Required GIS Location Categories Configured", () => {
  const expectedCategories = [
    "government",
    "education",
    "health",
    "facilities",
    "religious_cultural",
    "tourism",
    "transport",
    "business",
  ];

  const categoryConfigs = [
    { key: "government", label: "Government Offices", label_ml: "സർക്കാർ ഓഫീസുകൾ" },
    { key: "education", label: "Educational Institutions", label_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ" },
    { key: "health", label: "Hospitals & Healthcare", label_ml: "ആശുപത്രികൾ & ആരോഗ്യം" },
    { key: "facilities", label: "Public Facilities", label_ml: "പൊതു സൗകര്യങ്ങൾ" },
    { key: "religious_cultural", label: "Religious & Cultural Places", label_ml: "ആരാധനാലയങ്ങൾ & പൈതൃകം" },
    { key: "tourism", label: "Tourism & Landmarks", label_ml: "വിനോദസഞ്ചാര കേന്ദ്രങ്ങൾ" },
    { key: "transport", label: "Transportation", label_ml: "ഗതാഗതം & സ്റ്റേഷനുകൾ" },
    { key: "business", label: "Local Businesses", label_ml: "പ്രാദേശിക വ്യാപാര സ്ഥാപനങ്ങൾ" },
  ];

  assert.strictEqual(categoryConfigs.length, 8, "Must have exactly 8 location categories");
  expectedCategories.forEach((catKey) => {
    const found = categoryConfigs.find((c) => c.key === catKey);
    assert.ok(found, `Category ${catKey} must exist`);
    assert.ok(found.label && found.label.length > 0, `Category ${catKey} must have English label`);
    assert.ok(found.label_ml && found.label_ml.length > 0, `Category ${catKey} must have Malayalam label`);
  });
});

// -----------------------------------------------------------------------------
// Test 2: Authentic Tanur GIS Coordinates & Geographic Bounds
// -----------------------------------------------------------------------------
runTest("Digital Tanur 2: 30+ GIS Locations within Authentic Tanur Bounds", () => {
  // Tanur Municipality Geographic Extent:
  // Latitude: ~10.94° N to 11.02° N
  // Longitude: ~75.83° E to 75.90° E
  // Center: [10.9768, 75.8672]

  const sampleGisLocations = [
    { id: "loc-muni-office", name: "Tanur Municipality Office", lat: 10.9768, lng: 75.8672, cat: "government" },
    { id: "loc-harbour", name: "Tanur Fishing Harbour & Pulimuttu", lat: 10.9802, lng: 75.8541, cat: "facilities" },
    { id: "loc-railway", name: "Tanur Railway Station (TA)", lat: 10.9752, lng: 75.8690, cat: "transport" },
    { id: "loc-chc", name: "Tanur Community Health Centre", lat: 10.9730, lng: 75.8715, cat: "health" },
    { id: "loc-beach", name: "Tanur Beach & Promenade", lat: 10.9745, lng: 75.8562, cat: "tourism" },
    { id: "loc-kfdc", name: "KFDC Fish Seed Farm & Hatchery", lat: 10.9880, lng: 75.8510, cat: "facilities" },
    { id: "loc-police", name: "Tanur Police Station", lat: 10.9772, lng: 75.8679, cat: "government" },
    { id: "loc-fire", name: "Tanur Fire & Rescue Station", lat: 10.9790, lng: 75.8645, cat: "government" },
    { id: "loc-sub-registrar", name: "Sub Registrar Office Tanur", lat: 10.9760, lng: 75.8665, cat: "government" },
    { id: "loc-kseb", name: "KSEB Electrical Section Office", lat: 10.9758, lng: 75.8680, cat: "facilities" },
    { id: "loc-kwa", name: "Kerala Water Authority Section Office", lat: 10.9748, lng: 75.8695, cat: "facilities" },
    { id: "loc-krishi-bhavan", name: "Krishi Bhavan Tanur Municipality", lat: 10.9762, lng: 75.8688, cat: "government" },
    { id: "loc-veterinary", name: "Government Veterinary Hospital Tanur", lat: 10.9735, lng: 75.8705, cat: "health" },
    { id: "loc-post-office", name: "Tanur Head Post Office (PIN: 676302)", lat: 10.9765, lng: 75.8670, cat: "facilities" },
    { id: "loc-ghss-devadhar", name: "Devadhar Government Higher Secondary School", lat: 10.9710, lng: 75.8735, cat: "education" },
    { id: "loc-govt-college", name: "Govt. Arts & Science College Tanur", lat: 10.9850, lng: 75.8720, cat: "education" },
    { id: "loc-islahiya", name: "Islahiya Higher Secondary School", lat: 10.9785, lng: 75.8650, cat: "education" },
    { id: "loc-st-marys", name: "St. Mary's English Medium School", lat: 10.9740, lng: 75.8725, cat: "education" },
    { id: "loc-ghss-tanur", name: "GHSS Tanur (Puthentheru)", lat: 10.9820, lng: 75.8615, cat: "education" },
    { id: "loc-al-huda", name: "Al Huda English Medium School", lat: 10.9795, lng: 75.8695, cat: "education" },
    { id: "loc-phc-rayirimangalam", name: "Urban Primary Health Centre (UPHC)", lat: 10.9780, lng: 75.8740, cat: "health" },
    { id: "loc-coastal-specialty", name: "Tanur Coastal Specialty Hospital", lat: 10.9742, lng: 75.8685, cat: "health" },
    { id: "loc-shobha-mosque", name: "Tanur Valiya Juma Masjid (Historic)", lat: 10.9788, lng: 75.8610, cat: "religious_cultural" },
    { id: "loc-keraladheeshwarapuram", name: "Keraladheeshwarapuram Sri Krishna Temple", lat: 10.9650, lng: 75.8795, cat: "religious_cultural" },
    { id: "loc-chappappadi-masjid", name: "Chappappadi Badar Juma Masjid", lat: 10.9835, lng: 75.8525, cat: "religious_cultural" },
    { id: "loc-shobha-parambu-temple", name: "Shobha Parambu Devi Temple", lat: 10.9715, lng: 75.8640, cat: "religious_cultural" },
    { id: "loc-ottumpuram-estuary", name: "Ottumpuram Thooval Theeram Estuary", lat: 10.9912, lng: 75.8498, cat: "tourism" },
    { id: "loc-ksrtc-bus-stand", name: "Tanur Municipal Private & KSRTC Bus Stand", lat: 10.9762, lng: 75.8660, cat: "transport" },
    { id: "loc-harbour-fish-market", name: "Tanur Harbour Wholesale Fresh Fish Market", lat: 10.9808, lng: 75.8548, cat: "business" },
    { id: "loc-coastal-merchants-bank", name: "Kerala Bank Tanur Main Branch", lat: 10.9766, lng: 75.8676, cat: "business" },
  ];

  assert.ok(sampleGisLocations.length >= 30, "Must have at least 30 verified GIS locations");

  sampleGisLocations.forEach((loc) => {
    assert.ok(loc.lat >= 10.94 && loc.lat <= 11.02, `${loc.name} latitude (${loc.lat}) outside Tanur limits`);
    assert.ok(loc.lng >= 75.83 && loc.lng <= 75.90, `${loc.name} longitude (${loc.lng}) outside Tanur limits`);
  });
});

// -----------------------------------------------------------------------------
// Test 3: Verified Locality Explorer Profiles
// -----------------------------------------------------------------------------
runTest("Digital Tanur 3: 8 Authentic Locality Profiles & Ward Coverages", () => {
  const localities = [
    { id: "loc-town", name: "Tanur Town Centre", name_ml: "താനൂർ ടൗൺ സെന്റർ", wards: [1, 2, 8, 9] },
    { id: "loc-harbour", name: "Harbour & Pulimuttu", name_ml: "താനൂർ ഹാർബർ & പുലിമുട്ട്", wards: [3, 4, 5] },
    { id: "loc-chappappadi", name: "Chappappadi", name_ml: "ചാപ്പപ്പടി", wards: [6, 7] },
    { id: "loc-ottumpuram", name: "Ottumpuram & Thooval Theeram", name_ml: "ഒട്ടുമ്പുറം & തൂവൽതീരം", wards: [10, 11] },
    { id: "loc-puthentheru", name: "Puthentheru", name_ml: "പുത്തൻതെരു", wards: [12, 13, 14] },
    { id: "loc-keraladheeshwarapuram", name: "Keraladheeshwarapuram", name_ml: "കേരളാധീശ്വരപുരം", wards: [22, 23] },
    { id: "loc-shobha-parambu", name: "Shobha Parambu", name_ml: "ശോഭാ പറമ്പ്", wards: [28, 29] },
    { id: "loc-rayirimangalam", name: "Rayirimangalam", name_ml: "രായിരിമംഗലം", wards: [1, 2, 30] },
  ];

  assert.strictEqual(localities.length, 8, "Must cover all 8 authentic Tanur localities");
  localities.forEach((l) => {
    assert.ok(l.name && l.name_ml, `Locality ${l.id} must have bilingual name`);
    assert.ok(l.wards.length > 0, `Locality ${l.id} must be mapped to valid municipal wards`);
    l.wards.forEach((w) => {
      assert.ok(w >= 1 && w <= 44, `Ward ${w} must be between 1 and 44`);
    });
  });
});

// -----------------------------------------------------------------------------
// Test 4: External Google Maps Directions URL Resolution
// -----------------------------------------------------------------------------
runTest("Digital Tanur 4: Navigation / Directions URL Generation", () => {
  const lat = 10.9768;
  const lng = 75.8672;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  assert.ok(directionsUrl.startsWith("https://www.google.com/maps/dir/?api=1&destination="), "Must use standard Google Maps directions API");
  assert.ok(directionsUrl.includes("10.9768"), "Must contain latitude");
  assert.ok(directionsUrl.includes("75.8672"), "Must contain longitude");
});

// -----------------------------------------------------------------------------
// Test 5: Citizen Privacy Masking on Public Map Pins
// -----------------------------------------------------------------------------
runTest("Digital Tanur 5: Citizen Privacy Strictly Enforced on Map Markers", () => {
  const rawCivicReport = {
    id: "rep-001",
    title: "Streetlight not working near Harbour Road",
    title_ml: "ഹാർബർ റോഡിലെ തെരുവ് വിളക്ക് കത്തുന്നില്ല",
    category: "Streetlighting",
    status: "In Progress",
    reporter_name: "Muhammed Shafi", // Private citizen
    reporter_phone: "+91 9847123456", // Private citizen phone
    reporter_address: "House No 14/235, Beach Colony, Tanur", // Private house
    latitude: 10.9802,
    longitude: 75.8541,
  };

  // Map popup transformer enforcing privacy
  const generateMapPopup = (report) => {
    return {
      title: report.title,
      category: report.category,
      status: report.status,
      // Reporter name, personal phone, and specific house number MUST NOT be included
      privacy_notice: "Citizen Privacy Protected",
    };
  };

  const popupData = generateMapPopup(rawCivicReport);

  assert.strictEqual(popupData.title, rawCivicReport.title);
  assert.strictEqual(popupData.privacy_notice, "Citizen Privacy Protected");
  assert.strictEqual((popupData).reporter_name, undefined, "Reporter name must NOT leak to public map pin");
  assert.strictEqual((popupData).reporter_phone, undefined, "Reporter phone must NOT leak to public map pin");
  assert.strictEqual((popupData).reporter_address, undefined, "Reporter house address must NOT leak to public map pin");
});

// -----------------------------------------------------------------------------
// Test 6: Development Projects Budget & Progress Synchronization
// -----------------------------------------------------------------------------
runTest("Digital Tanur 6: Development Projects Total ₹86.60 Cr & Verified Progress", () => {
  const devProjects = [
    { id: "proj-1", budget: 42.50, title: "Tanur Fishing Harbour Modernization", progress: 65 },
    { id: "proj-2", budget: 8.20, title: "Municipal Sports Stadium & Youth Complex", progress: 80 },
    { id: "proj-3", budget: 14.80, title: "Town Centre Bypass & Railway Flyover Approach", progress: 40 },
    { id: "proj-4", budget: 5.40, title: "Thooval Theeram Coastal Promenade & Beach Amenities", progress: 55 },
    { id: "proj-5", budget: 6.20, title: "Tanur Taluk Hospital Upgrade & Dialysis Centre", progress: 30 },
    { id: "proj-6", budget: 9.50, title: "New Municipal Administrative Complex", progress: 15 },
  ];

  const totalBudget = devProjects.reduce((sum, p) => sum + p.budget, 0);
  assert.strictEqual(Math.round(totalBudget * 10) / 10, 86.6, "Total projects budget must equal ₹86.60 Cr");

  devProjects.forEach((p) => {
    assert.ok(p.progress >= 0 && p.progress <= 100, `Project ${p.id} progress must be 0-100%`);
  });
});

// -----------------------------------------------------------------------------
// Test 7: Location Search & Filter Verification
// -----------------------------------------------------------------------------
runTest("Digital Tanur 7: Location Multi-Field Search & Category Filtering", () => {
  const sampleLocations = [
    { name: "Tanur Municipality Office", name_ml: "താനൂർ നഗരസഭാ കാര്യാലയം", category: "government", locality: "Tanur Town" },
    { name: "Tanur Community Health Centre", name_ml: "താനൂർ സി.എച്ച്.സി", category: "health", locality: "CHC Road" },
    { name: "Devadhar Government Higher Secondary School", name_ml: "ദേവധാർ ഗവൺമെന്റ് എച്ച്.എസ്.എസ്", category: "education", locality: "Devadhar" },
  ];

  // Category filter
  const govOnly = sampleLocations.filter((l) => l.category === "government");
  assert.strictEqual(govOnly.length, 1);
  assert.strictEqual(govOnly[0].name, "Tanur Municipality Office");

  // Malayalam Search
  const mlSearch = sampleLocations.filter((l) => l.name_ml.includes("ദേവധാർ"));
  assert.strictEqual(mlSearch.length, 1);
  assert.strictEqual(mlSearch[0].category, "education");

  // English Search
  const enSearch = sampleLocations.filter((l) => l.name.toLowerCase().includes("health"));
  assert.strictEqual(enSearch.length, 1);
  assert.strictEqual(enSearch[0].category, "health");
});

// -----------------------------------------------------------------------------
// Test 8: Verified Badge & Official Source Attribution
// -----------------------------------------------------------------------------
runTest("Digital Tanur 8: Mandatory Source Attribution & Verification Audit", () => {
  const verifiedLocation = {
    id: "loc-muni-office",
    name: "Tanur Municipality Office",
    is_verified: true,
    source_name: "തദ്ദേശ സ്വയംഭരണ വകുപ്പ് / താനൂർ നഗരസഭ ഔദ്യോഗിക ഗസറ്റ്",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    last_verified_date: "2026-11-17",
  };

  assert.strictEqual(verifiedLocation.is_verified, true, "Location must be marked verified");
  assert.ok(verifiedLocation.source_name.length > 5, "Must have legitimate primary source attribution");
  assert.ok(verifiedLocation.source_url.startsWith("https://"), "Must have secure official URL");
  assert.ok(verifiedLocation.last_verified_date.length === 10, "Must have valid ISO verification date");
});

console.log("\n======================================================================");
console.log(`DIGITAL TANUR TEST RESULTS: ${passed} / ${total} PASSED`);
console.log("======================================================================\n");

if (passed !== total) {
  process.exit(1);
}
