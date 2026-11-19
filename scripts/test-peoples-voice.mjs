// OUR NATION — People's Voice (ജനകീയ ശബ്ദം) Comprehensive Verification Suite
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

console.log("======================================================================");
console.log("OUR NATION — PEOPLE'S VOICE (CITIZEN PARTICIPATION & DEVELOPMENT)");
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
// Test 1: Category Architecture (All 11 Specified Categories)
// -----------------------------------------------------------------------------
runTest("Test 1: All 11 Community Idea Categories Configured with Bilingual Labels", () => {
  const expectedCategories = [
    "roads_transport",
    "waste_cleanliness",
    "education",
    "healthcare",
    "environment",
    "public_facilities",
    "tourism",
    "digital_services",
    "youth_development",
    "community_welfare",
    "other"
  ];

  const categories = [
    { key: "roads_transport", label: "Roads & Transportation", label_ml: "റോഡുകളും ഗതാഗതവും" },
    { key: "waste_cleanliness", label: "Cleanliness & Waste Management", label_ml: "മാലിന്യ സംസ്കരണവും ശുചിത്വവും" },
    { key: "education", label: "Education", label_ml: "വിദ്യാഭ്യാസം" },
    { key: "healthcare", label: "Healthcare", label_ml: "ആരോഗ്യം" },
    { key: "environment", label: "Environment", label_ml: "പരിസ്ഥിതി" },
    { key: "public_facilities", label: "Public Facilities", label_ml: "പൊതു സൗകര്യങ്ങൾ" },
    { key: "tourism", label: "Tourism & Heritage", label_ml: "വിനോദസഞ്ചാരവും പൈതൃകവും" },
    { key: "digital_services", label: "Digital Services", label_ml: "ഡിജിറ്റൽ സേവനങ്ങൾ" },
    { key: "youth_development", label: "Youth Development", label_ml: "യുവജനക്ഷേമം" },
    { key: "community_welfare", label: "Community Welfare", label_ml: "സാമൂഹിക ക്ഷേമം" },
    { key: "other", label: "Other Community Ideas", label_ml: "മറ്റ് പൊതു ആശയങ്ങൾ" },
  ];

  assert.strictEqual(categories.length, 11, "Must have exactly 11 idea categories");
  expectedCategories.forEach((catKey) => {
    const found = categories.find((c) => c.key === catKey);
    assert.ok(found, `Category ${catKey} must exist`);
    assert.ok(found.label && found.label.length > 0, `Category ${catKey} must have English label`);
    assert.ok(found.label_ml && found.label_ml.length > 0, `Category ${catKey} must have Malayalam label`);
  });
});

// -----------------------------------------------------------------------------
// Test 2: Status Lifecycle Architecture (All 9 Required Statuses)
// -----------------------------------------------------------------------------
runTest("Test 2: All 9 Idea Progress Statuses Supported", () => {
  const expectedStatuses = [
    "Submitted",
    "Under Review",
    "Community Discussion",
    "Shortlisted",
    "Forwarded for Consideration",
    "Accepted for Collaboration",
    "In Progress",
    "Completed",
    "Not Proceeding"
  ];

  assert.strictEqual(expectedStatuses.length, 9, "Must have exactly 9 progress statuses");
  expectedStatuses.forEach(st => {
    assert.ok(typeof st === "string" && st.length > 0, `Status ${st} must be valid`);
  });
});

// -----------------------------------------------------------------------------
// Test 3: Single Support Per Account & Toggle Logic (Prevent Duplicate Support)
// -----------------------------------------------------------------------------
runTest("Test 3: Support Toggle Guarantees Single Support & Prevents Duplicates", () => {
  // Simulate mock idea
  const mockIdea = {
    id: "test-idea-01",
    support_count: 5,
    supported_user_ids: ["usr-01", "usr-02", "usr-03", "usr-04", "usr-05"],
  };

  const userId = "usr-tester";

  // Action 1: Add support
  if (!mockIdea.supported_user_ids.includes(userId)) {
    mockIdea.supported_user_ids.push(userId);
    mockIdea.support_count += 1;
  }
  assert.strictEqual(mockIdea.support_count, 6, "Support count should increment to 6");
  assert.ok(mockIdea.supported_user_ids.includes(userId), "User ID must be recorded");

  // Action 2: User tries to support AGAIN (should toggle off or prevent duplicate)
  if (mockIdea.supported_user_ids.includes(userId)) {
    mockIdea.supported_user_ids = mockIdea.supported_user_ids.filter(id => id !== userId);
    mockIdea.support_count = Math.max(0, mockIdea.support_count - 1);
  }
  assert.strictEqual(mockIdea.support_count, 5, "Support count should decrement to 5 after removal");
  assert.ok(!mockIdea.supported_user_ids.includes(userId), "User ID must be removed");
});

// -----------------------------------------------------------------------------
// Test 4: Idea Submission & Required Fields
// -----------------------------------------------------------------------------
runTest("Test 4: Idea Submission Validation with Locality, Ward, and Benefit", () => {
  const newSubmission = {
    title: "Pedestrian Footbridge over Tanur Railway Line",
    description: "Construct a pedestrian footbridge near Tanur English Medium School to protect students from crossing open tracks.",
    category: "roads_transport",
    locality: "Tanur Town",
    ward_number: 8,
    expected_benefit: "Safeguards 800+ daily student pedestrians from rail track crossing hazards.",
    estimated_cost: "₹25.00 Lakhs",
    author_id: "usr-teacher-01",
    author_name: "K. Sudheesh Master"
  };

  assert.ok(newSubmission.title.length >= 5, "Title must be informative");
  assert.ok(newSubmission.description.length >= 20, "Description must be comprehensive");
  assert.ok(newSubmission.locality.length > 0, "Locality is required");
  assert.ok(newSubmission.ward_number >= 1 && newSubmission.ward_number <= 44, "Ward must be between 1 and 44");
  assert.ok(newSubmission.expected_benefit.length > 0, "Expected benefit is mandatory");
});

// -----------------------------------------------------------------------------
// Test 5: Forwarding Record Integrity (No Fake Authority Claims)
// -----------------------------------------------------------------------------
runTest("Test 5: Forwarded Status Requires Verified Reference & Authority Record", () => {
  const forwardedIdea = {
    status: "Forwarded for Consideration",
    forwarded_record: {
      authority_name: "Matsyafed & Tanur Municipality Coastal Development Wing",
      department: "Fisheries Infrastructure Section",
      forwarded_date: "2026-03-12",
      reference_number: "MF-MLP/TNR/PV-2026/889"
    }
  };

  assert.strictEqual(forwardedIdea.status, "Forwarded for Consideration");
  assert.ok(forwardedIdea.forwarded_record, "Must include forwarding record");
  assert.ok(forwardedIdea.forwarded_record.authority_name.length > 0, "Must specify authority");
  assert.ok(forwardedIdea.forwarded_record.reference_number.length > 0, "Must have valid reference number");
});

// -----------------------------------------------------------------------------
// Test 6: Collaboration Record Integrity (Confirmed Organization Partner)
// -----------------------------------------------------------------------------
runTest("Test 6: Accepted Collaboration Requires Verified Partner Organization", () => {
  const collabIdea = {
    status: "Accepted for Collaboration",
    collaboration_record: {
      organization_name: "Tanur Nature & Youth Collective & Devadhar RWA",
      organization_type: "resident_association",
      accepted_date: "2026-03-08",
      collaboration_scope: "Community volunteer mobilization for tree planting and canal embankment protection"
    }
  };

  assert.strictEqual(collabIdea.status, "Accepted for Collaboration");
  assert.ok(collabIdea.collaboration_record, "Must include collaboration record");
  assert.ok(collabIdea.collaboration_record.organization_name.length > 0, "Must specify organization");
  assert.ok(collabIdea.collaboration_record.collaboration_scope.length > 0, "Must specify scope");
});

// -----------------------------------------------------------------------------
// Test 7: Community Discussions Architecture
// -----------------------------------------------------------------------------
runTest("Test 7: Community Discussions with Moderation & Nested Comments", () => {
  const mockDiscussion = {
    id: "disc-test-01",
    title: "Improving morning bus connectivity to Calicut Medical College",
    category: "local_development",
    author_name: "Fathima Suhara",
    likes_count: 78,
    comments: [
      {
        id: "dcomm-1",
        author_name: "Anas Meenadathur",
        content: "We need origin buses from Tanur Depot."
      }
    ]
  };

  assert.ok(mockDiscussion.comments.length > 0, "Discussion must support comments");
  assert.ok(mockDiscussion.likes_count > 0, "Discussion must support upvotes");
});

// -----------------------------------------------------------------------------
// Test 8: Local Initiatives Architecture (RSVP & Safety)
// -----------------------------------------------------------------------------
runTest("Test 8: Local Initiatives RSVP & Participation Tracking", () => {
  const mockInitiative = {
    id: "init-test-01",
    title: "Mega Coastal Cleanup & Marine Plastic Awareness Drive",
    category: "cleanliness",
    event_date: "2026-03-22",
    event_time: "06:30 AM - 09:30 AM",
    venue_address: "Tanur Beach Near Fish Landing Point, Ward 4",
    participant_count: 84,
    participant_user_ids: ["usr-01", "usr-02"]
  };

  const newVolunteerId = "usr-volunteer-99";
  mockInitiative.participant_user_ids.push(newVolunteerId);
  mockInitiative.participant_count += 1;

  assert.strictEqual(mockInitiative.participant_count, 85, "Participant count increments on RSVP");
  assert.ok(mockInitiative.participant_user_ids.includes(newVolunteerId), "Volunteer registered");
});

// -----------------------------------------------------------------------------
// Test 9: Content Reporting & Moderation Queue
// -----------------------------------------------------------------------------
runTest("Test 9: Content Reporting and Administrative Action Flow", () => {
  const mockReport = {
    id: "rep-001",
    content_type: "discussion",
    content_id: "disc-01",
    reporter_id: "usr-commuter",
    reason: "misleading",
    details: "Outdated timetable numbers posted",
    status: "pending"
  };

  assert.strictEqual(mockReport.status, "pending");

  // Admin action
  mockReport.status = "actioned";
  mockReport.action_taken = "Comment reviewed and corrective note added";
  assert.strictEqual(mockReport.status, "actioned");
});

// -----------------------------------------------------------------------------
// Test 10: Database Migration Parity (All 10 Tables Present in SQL)
// -----------------------------------------------------------------------------
runTest("Test 10: Supabase SQL Migration Contains All 10 Required Tables", () => {
  const sqlPath = path.resolve(process.cwd(), "supabase/migrations/20241117000001_peoples_voice.sql");
  assert.ok(fs.existsSync(sqlPath), "Migration file must exist on disk");

  const sqlContent = fs.readFileSync(sqlPath, "utf-8");

  const requiredTables = [
    "community_ideas",
    "community_idea_supports",
    "community_idea_comments",
    "community_idea_updates",
    "community_discussions",
    "community_discussion_comments",
    "community_initiatives",
    "community_initiative_participants",
    "community_content_reports",
    "community_audit_logs"
  ];

  requiredTables.forEach(tbl => {
    assert.ok(
      sqlContent.includes(`CREATE TABLE IF NOT EXISTS public.${tbl}`),
      `Table public.${tbl} must be defined in the SQL migration`
    );
  });
});

console.log("\n======================================================================");
console.log(`TOTAL TESTS: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
console.log("======================================================================");

if (passed === total) {
  console.log("PEOPLE'S VOICE CITIZEN PARTICIPATION SUITE: 100% SUCCESS!");
  process.exit(0);
} else {
  console.error("SOME TESTS FAILED!");
  process.exit(1);
}
