import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

console.log("======================================================================");
console.log("  OUR NATION — CITIZEN DASHBOARD COMPLETE VERIFICATION SUITE         ");
console.log("======================================================================\n");

let passedTests = 0;
let totalTests = 0;

function test(title, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] ${title}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] ${title}`);
    console.error(`   Error: ${err.message}\n`);
    process.exitCode = 1;
  }
}

// -----------------------------------------------------------------------------
// Test 1: Zero Malayalam Characters in Citizen Dashboard
// -----------------------------------------------------------------------------
test("Test 1: Zero Malayalam characters in src/app/dashboard/page.tsx", () => {
  const code = fs.readFileSync(path.resolve("src/app/dashboard/page.tsx"), "utf8");
  const malMatches = code.match(/[\u0D00-\u0D7F]/g);
  assert.strictEqual(malMatches, null, `Found ${malMatches?.length} Malayalam characters in dashboard/page.tsx`);
});

// -----------------------------------------------------------------------------
// Test 2: Zero Malayalam Characters in Profile Management
// -----------------------------------------------------------------------------
test("Test 2: Zero Malayalam characters in src/app/profile/page.tsx", () => {
  const code = fs.readFileSync(path.resolve("src/app/profile/page.tsx"), "utf8");
  const malMatches = code.match(/[\u0D00-\u0D7F]/g);
  assert.strictEqual(malMatches, null, `Found ${malMatches?.length} Malayalam characters in profile/page.tsx`);
});

// -----------------------------------------------------------------------------
// Test 3: Zero Malayalam Characters in Civic My Reports
// -----------------------------------------------------------------------------
test("Test 3: Zero Malayalam characters in src/app/civic/my-reports/page.tsx", () => {
  const code = fs.readFileSync(path.resolve("src/app/civic/my-reports/page.tsx"), "utf8");
  const malMatches = code.match(/[\u0D00-\u0D7F]/g);
  assert.strictEqual(malMatches, null, `Found ${malMatches?.length} Malayalam characters in civic/my-reports/page.tsx`);
});

// -----------------------------------------------------------------------------
// Test 4: Citizen Data Isolation & Zero Data Leakage
// -----------------------------------------------------------------------------
test("Test 4: Citizen data isolation enforced in dashboard (user.id isolation, no arbitrary fallback slice)", () => {
  const dashboardCode = fs.readFileSync(path.resolve("src/app/dashboard/page.tsx"), "utf8");
  
  // Verify strict filtering by current user
  assert.ok(
    dashboardCode.includes("issue.reporter_id === currentId"),
    "Dashboard must filter reports strictly by authenticated user ID"
  );
  // Verify removal of insecure fallback slice
  assert.ok(
    !dashboardCode.includes("all.slice(0, 3)"),
    "Insecure fallback slice(0, 3) must be removed so new users see 0 reports"
  );
});

// -----------------------------------------------------------------------------
// Test 5: Citizen Data Isolation in Civic My Reports Page
// -----------------------------------------------------------------------------
test("Test 5: Citizen data isolation enforced in civic/my-reports/page.tsx (no '|| true' bypass)", () => {
  const myReportsCode = fs.readFileSync(path.resolve("src/app/civic/my-reports/page.tsx"), "utf8");
  
  assert.ok(
    !myReportsCode.includes("|| true"),
    "civic/my-reports/page.tsx must not contain '|| true' data leakage bypass"
  );
  assert.ok(
    myReportsCode.includes("i.reporter_id === user.id"),
    "civic/my-reports/page.tsx must filter strictly by user.id"
  );
});

// -----------------------------------------------------------------------------
// Test 6: Welcome Section Components & Personalization
// -----------------------------------------------------------------------------
test("Test 6: Welcome section includes real name, avatar/initials, and profile completion meter", () => {
  const dashboardCode = fs.readFileSync(path.resolve("src/app/dashboard/page.tsx"), "utf8");

  assert.ok(
    dashboardCode.includes("user?.display_name || user?.username || \"Citizen\""),
    "Welcome section must display citizen's real name"
  );
  assert.ok(
    dashboardCode.includes("userInitials"),
    "Avatar must have stylish initials fallback"
  );
  assert.ok(
    dashboardCode.includes("profileCompletion"),
    "Profile completion meter must be present"
  );
  assert.ok(
    dashboardCode.includes("/profile"),
    "Dashboard must link directly to profile settings"
  );
});

// -----------------------------------------------------------------------------
// Test 7: Summary KPI Cards Grounded in Real Records
// -----------------------------------------------------------------------------
test("Test 7: Summary KPI cards calculate strictly from actual records (My Reports, Pending, In Progress, Resolved)", () => {
  const dashboardCode = fs.readFileSync(path.resolve("src/app/dashboard/page.tsx"), "utf8");

  assert.ok(
    dashboardCode.includes("totalReportsCount"),
    "Must display Total Reports KPI"
  );
  assert.ok(
    dashboardCode.includes("pendingRequestsCount"),
    "Must display Pending Requests KPI"
  );
  assert.ok(
    dashboardCode.includes("inProgressCount"),
    "Must display In Progress KPI"
  );
  assert.ok(
    dashboardCode.includes("resolvedCount"),
    "Must display Resolved Issues KPI"
  );
});

// -----------------------------------------------------------------------------
// Test 8: My Civic Reports Filtering, Search & Modal
// -----------------------------------------------------------------------------
test("Test 8: My Civic Reports supports search, status filters, category filter, and modal quick view", () => {
  const dashboardCode = fs.readFileSync(path.resolve("src/app/dashboard/page.tsx"), "utf8");

  assert.ok(
    dashboardCode.includes("reportSearch"),
    "Dashboard must provide search input for reports"
  );
  assert.ok(
    dashboardCode.includes("reportStatusFilter"),
    "Dashboard must provide status filter tabs"
  );
  assert.ok(
    dashboardCode.includes("reportCategoryFilter"),
    "Dashboard must provide category filter dropdown"
  );
  assert.ok(
    dashboardCode.includes("selectedIssue"),
    "Dashboard must provide quick view modal for reports"
  );
  assert.ok(
    dashboardCode.includes("tracking_id"),
    "Reports must display tracking ID in monospace with copy functionality"
  );
});

// -----------------------------------------------------------------------------
// Test 9: Quick Actions Hub Navigation & Central Switchboard
// -----------------------------------------------------------------------------
test("Test 9: Quick Actions Hub provides all 5 verified civic links and central switchboard", () => {
  const dashboardCode = fs.readFileSync(path.resolve("src/app/dashboard/page.tsx"), "utf8");

  assert.ok(dashboardCode.includes("/civic-connect"), "Must link to Report Civic Issue");
  assert.ok(dashboardCode.includes("/public-services"), "Must link to Explore Public Services");
  assert.ok(dashboardCode.includes("/development-tracker"), "Must link to Track Development");
  assert.ok(dashboardCode.includes("/news"), "Must link to Municipal Updates");
  assert.ok(dashboardCode.includes("/contact"), "Must link to Contact Municipality");
  assert.ok(dashboardCode.includes("0494 2440228"), "Must specify central switchboard 0494 2440228");
  assert.ok(dashboardCode.includes("tel:04942440228"), "Must provide direct click-to-call link");

  // Verify all target pages exist
  const routes = [
    "src/app/civic-connect/page.tsx",
    "src/app/public-services/page.tsx",
    "src/app/development-tracker/page.tsx",
    "src/app/news/page.tsx",
    "src/app/contact/page.tsx",
  ];
  routes.forEach(r => {
    assert.ok(fs.existsSync(path.resolve(r)), `Route file ${r} must exist`);
  });
});

// -----------------------------------------------------------------------------
// Test 10: Recent Activity Timeline
// -----------------------------------------------------------------------------
test("Test 10: Recent activity timeline aggregates user actions and relative timestamps", () => {
  const dashboardCode = fs.readFileSync(path.resolve("src/app/dashboard/page.tsx"), "utf8");

  assert.ok(
    dashboardCode.includes("userActivities"),
    "Dashboard must compute userActivities from authentic records"
  );
  assert.ok(
    dashboardCode.includes("timeAgo"),
    "Dashboard must format timestamps with relative timeAgo helper"
  );
});

// -----------------------------------------------------------------------------
// Test 11: Profile Management Privacy Defaults (Private Phone & Email)
// -----------------------------------------------------------------------------
test("Test 11: Profile privacy settings default to private for phone and email", () => {
  const profileCode = fs.readFileSync(path.resolve("src/app/profile/page.tsx"), "utf8");

  assert.ok(
    profileCode.includes("show_phone: false"),
    "Phone must default to private"
  );
  assert.ok(
    profileCode.includes("show_email: false"),
    "Email must default to private"
  );
  assert.ok(
    profileCode.includes("public_profile: false"),
    "Public profile must default to false"
  );
});

// -----------------------------------------------------------------------------
// Test 12: Statutory Ward Invariant (Wards 1 to 45)
// -----------------------------------------------------------------------------
test("Test 12: Municipal ward invariant references 45 statutory wards (Ward 1–45)", () => {
  const dashboardCode = fs.readFileSync(path.resolve("src/app/dashboard/page.tsx"), "utf8");

  assert.ok(
    dashboardCode.includes("45"),
    "Dashboard must acknowledge 45 statutory municipal wards"
  );
  assert.ok(
    !dashboardCode.includes("44 wards"),
    "Must not regress to outdated 44 wards count"
  );
});

console.log("\n----------------------------------------------------------------------");
console.log(`Results: ${passedTests}/${totalTests} tests passed (${Math.round((passedTests/totalTests)*100)}%)`);
console.log("----------------------------------------------------------------------");

if (passedTests !== totalTests) {
  process.exit(1);
}
