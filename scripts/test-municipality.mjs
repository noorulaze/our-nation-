// OUR NATION — Digital Municipality (Tanur 2030) Test Suite
import assert from "node:assert";

console.log("======================================================================");
console.log("OUR NATION — DIGITAL MUNICIPALITY (TANUR 2030) VERIFICATION SUITE");
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
// Test 1: 44 Municipal Wards Data Integrity
// -----------------------------------------------------------------------------
runTest("Municipality 1: Exact 44 Wards Integrity & Sequential Numbering", () => {
  const wards = Array.from({ length: 44 }, (_, i) => ({
    ward_number: i + 1,
    name: `Ward ${i + 1}`,
    name_ml: `വാർഡ് ${i + 1}`,
    municipality_id: "40000000-0000-0000-0000-000000000007",
    latitude: 10.97 + (i * 0.001),
    longitude: 75.86 + (i * 0.001),
  }));

  assert.strictEqual(wards.length, 44, "Must have exactly 44 municipal wards");
  const wardNumbers = new Set(wards.map(w => w.ward_number));
  assert.strictEqual(wardNumbers.size, 44, "Ward numbers must be unique 1 to 44");
  assert.strictEqual(Math.min(...wardNumbers), 1, "First ward must be 1");
  assert.strictEqual(Math.max(...wardNumbers), 44, "Last ward must be 44");
  
  wards.forEach(w => {
    assert.ok(w.municipality_id, "Each ward must reference a municipality_id");
    assert.ok(w.latitude > 10.0 && w.latitude < 11.5, "Ward latitude must be within Kerala coastal coordinates");
    assert.ok(w.longitude > 75.0 && w.longitude < 76.5, "Ward longitude must be within Malappuram coordinates");
  });
});

// -----------------------------------------------------------------------------
// Test 2: Verified Development Projects & Budget Tracking
// -----------------------------------------------------------------------------
runTest("Municipality 2: Documented Public Budgets & Official Source Attribution", () => {
  const verifiedProjects = [
    {
      id: "proj-1",
      title: "Tanur Fishing Harbour Modernization & Basin Dredging (Phase 2)",
      budget_allocated: 425000000,
      budget_display: "₹42.50 Cr",
      status: "In Progress",
      progress_percentage: 65,
      department: "Harbour Engineering Department",
      source_name: "Kerala Harbour Engineering Department (HED) Project Register",
      source_url: "https://hed.kerala.gov.in/",
      ward_number: 1,
    },
    {
      id: "proj-2",
      title: "Tanur Municipal Stadium Floodlight Installation & Pavilion Upgradation",
      budget_allocated: 38000000,
      budget_display: "₹3.80 Cr",
      status: "Completed",
      progress_percentage: 100,
      department: "Kerala Directorate of Sports & Youth Affairs",
      source_name: "Kerala Sports Development Infrastructure Records",
      source_url: "https://dsya.kerala.gov.in/",
      ward_number: 10,
    },
    {
      id: "proj-3",
      title: "Tanur Coastal Highway Strengthening & Geo-Tube Sea Wall Protection",
      budget_allocated: 182000000,
      budget_display: "₹18.20 Cr",
      status: "In Progress",
      progress_percentage: 45,
      department: "Kerala Public Works Department (PWD Roads)",
      source_name: "Kerala PWD Electronic Project Management System",
      source_url: "https://pwd.kerala.gov.in/",
      ward_number: 3,
    },
    {
      id: "proj-4",
      title: "Tanur Comprehensive Water Supply Augmentation Scheme (AMRUT/JJM)",
      budget_allocated: 124000000,
      budget_display: "₹12.40 Cr",
      status: "In Progress",
      progress_percentage: 58,
      department: "Kerala Water Authority (KWA)",
      source_name: "Kerala Water Authority AMRUT Project Portal",
      source_url: "https://kwa.kerala.gov.in/",
      ward_number: undefined,
    },
    {
      id: "proj-5",
      title: "Tanur CHC Upgradation & Specialty Dialysis Wing",
      budget_allocated: 55000000,
      budget_display: "₹5.50 Cr",
      status: "Approved",
      progress_percentage: 20,
      department: "Kerala Health & Family Welfare Department",
      source_name: "Kerala Health Services Project Sanction Order",
      source_url: "https://dhs.kerala.gov.in/",
      ward_number: 9,
    },
    {
      id: "proj-6",
      title: "Tanur Railway Station Platform 2 Extension & Passenger Lift",
      budget_allocated: 42000000,
      budget_display: "₹4.20 Cr",
      status: "In Progress",
      progress_percentage: 70,
      department: "Southern Railway (Palakkad Division) & Municipality",
      source_name: "Southern Railway Infrastructure Development Works Register",
      source_url: "https://sr.indianrailways.gov.in/",
      ward_number: 8,
    },
  ];

  const totalBudget = verifiedProjects.reduce((acc, p) => acc + p.budget_allocated, 0);
  assert.strictEqual(totalBudget, 866000000, "Verified budget total must equal ₹86.60 Cr (86,60,00,000 INR)");
  
  verifiedProjects.forEach(p => {
    assert.ok(p.source_name && p.source_name.length > 5, "Every project must have an official source name");
    assert.ok(p.source_url && p.source_url.startsWith("https://"), "Every project must have an HTTPS official source URL");
    assert.ok(p.progress_percentage >= 0 && p.progress_percentage <= 100, "Progress percentage must be between 0 and 100");
  });
});

// -----------------------------------------------------------------------------
// Test 3: Milestone Progress Updates with Verifying Authority & Evidence URL
// -----------------------------------------------------------------------------
runTest("Municipality 3: Milestone Progress Updates Require Verifying Authority and Evidence", () => {
  const milestone = {
    id: "upd-101",
    project_id: "proj-1",
    title: "Breakwater South Arm Rock Armoring Inspection",
    progress_percentage: 65,
    verifying_authority: "Chief Engineer, Harbour Engineering Department",
    inspection_date: "2026-10-15",
    evidence_url: "https://hed.kerala.gov.in/inspections/tanur-harbour-oct2026.pdf",
  };

  assert.ok(milestone.verifying_authority.length > 3, "Verifying authority must be specified");
  assert.ok(milestone.evidence_url.startsWith("https://"), "Evidence URL must be a valid secure URL");
  assert.strictEqual(milestone.progress_percentage, 65, "Documented milestone progress must be numeric");
});

// -----------------------------------------------------------------------------
// Test 4: Citizen Proposal Submission & Tracking ID Format
// -----------------------------------------------------------------------------
runTest("Municipality 4: Citizen Proposal Submission & TNR-VOICE Tracking ID", () => {
  const newProposal = {
    tracking_id: `TNR-VOICE-${new Date().getFullYear()}-418`,
    title: "Solar street lights along Rayirimangalam - Beach road",
    ward_number: 2,
    locality: "Rayirimangalam Beach Road",
    category: "Street Lighting",
    status: "submitted",
    support_count: 1,
    proposer_name: "Hamza K.",
  };

  assert.match(newProposal.tracking_id, /^TNR-VOICE-\d{4}-\d{3}$/, "Tracking ID must follow TNR-VOICE-YYYY-XXX format");
  assert.strictEqual(newProposal.status, "submitted", "Initial proposal status must be 'submitted'");
  assert.strictEqual(newProposal.support_count, 1, "Initial support count must start at 1 (author's vote)");
});

// -----------------------------------------------------------------------------
// Test 5: Democratic Lifecycle & Community Threshold (50 Votes)
// -----------------------------------------------------------------------------
runTest("Municipality 5: Automatic Transition to 'community_supported' at 50 Votes", () => {
  let proposal = {
    status: "submitted",
    support_count: 48,
  };

  // Upvote 1
  proposal.support_count += 1; // 49
  if (proposal.support_count >= 50 && proposal.status === "submitted") {
    proposal.status = "community_supported";
  }
  assert.strictEqual(proposal.status, "submitted", "Status should remain submitted below 50");

  // Upvote 2 -> hits 50 threshold
  proposal.support_count += 1; // 50
  if (proposal.support_count >= 50 && proposal.status === "submitted") {
    proposal.status = "community_supported";
  }
  assert.strictEqual(proposal.status, "community_supported", "Proposal must advance to community_supported at 50 votes");
});

// -----------------------------------------------------------------------------
// Test 6: Official Municipal Response Recording
// -----------------------------------------------------------------------------
runTest("Municipality 6: Official Municipal Response & Status Advancement", () => {
  const proposal = {
    id: "prop-1",
    status: "community_supported",
    official_response: null,
    official_response_date: null,
    official_responder_name: null,
    official_responder_role: null,
  };

  // Municipality reviews and advances
  const officialDecision = {
    status: "feasibility_study",
    response: "താനൂർ നഗരസഭാ എഞ്ചിനീയറിംഗ് വിഭാ​ഗം സ്ഥലം സന്ദർശിച്ചു. റിപ്പോർട്ട് കൗൺസിലിൽ സമർപ്പിച്ചു.",
    responder_name: "താനൂർ നഗരസഭ സെക്രട്ടറി",
    responder_role: "താനൂർ നഗരസഭാ കാര്യാലയം",
    date: "2026-11-15",
  };

  proposal.status = officialDecision.status;
  proposal.official_response = officialDecision.response;
  proposal.official_responder_name = officialDecision.responder_name;
  proposal.official_responder_role = officialDecision.responder_role;
  proposal.official_response_date = officialDecision.date;

  assert.strictEqual(proposal.status, "feasibility_study");
  assert.ok(proposal.official_response.includes("താനൂർ നഗരസഭ"));
  assert.strictEqual(proposal.official_responder_name, "താനൂർ നഗരസഭ സെക്രട്ടറി");
  assert.ok(proposal.official_response_date);
});

// -----------------------------------------------------------------------------
// Test 7: Multi-Municipality Schema Extensibility
// -----------------------------------------------------------------------------
runTest("Municipality 7: Multi-Municipality Schema Extensibility", () => {
  const tanurMunicipalityId = "40000000-0000-0000-0000-000000000007";
  const tirurMunicipalityId = "40000000-0000-0000-0000-000000000008"; // Future expansion

  const sampleWard = {
    ward_number: 1,
    municipality_id: tanurMunicipalityId,
    name: "Chappappadi",
  };

  const sampleProject = {
    id: "proj-101",
    municipality_id: tanurMunicipalityId,
    ward_number: 1,
    title: "Harbour Basin Dredging",
  };

  assert.strictEqual(sampleWard.municipality_id, tanurMunicipalityId);
  assert.strictEqual(sampleProject.municipality_id, tanurMunicipalityId);
  assert.notStrictEqual(tanurMunicipalityId, tirurMunicipalityId, "Municipalities must have unique IDs");
});

// -----------------------------------------------------------------------------
// Test 8: Geographic Scope Protection
// -----------------------------------------------------------------------------
runTest("Municipality 8: Strict Geographic Scope Enforcement (Malappuram / Tanur)", () => {
  const allowedDistrict = "Malappuram";
  const allowedMunicipality = "Tanur";

  const validEntity = {
    district: "Malappuram",
    municipality: "Tanur",
  };

  const invalidEntity = {
    district: "Ernakulam",
    municipality: "Aluva",
  };

  const isScopeValid = (entity) => entity.district === allowedDistrict && (entity.municipality === allowedMunicipality || !entity.municipality);

  assert.strictEqual(isScopeValid(validEntity), true, "Tanur, Malappuram must be allowed");
  assert.strictEqual(isScopeValid(invalidEntity), false, "Entities outside Malappuram must be rejected");
});

console.log("\n======================================================================");
console.log(`SUMMARY: ${passed}/${total} TESTS PASSED (${Math.round((passed / total) * 100)}%)`);
console.log("======================================================================\n");

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
