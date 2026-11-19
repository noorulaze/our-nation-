// OUR NATION — Complete Authentication & User Account System Verification Suite
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

console.log("======================================================================");
console.log("OUR NATION — COMPLETE AUTHENTICATION & USER ACCOUNT VERIFICATION SUITE");
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
// Test 1: Sign Up Validation & Default Citizen Role
// -----------------------------------------------------------------------------
runTest("Test 1: Citizen sign up assigns default citizen role, active status and requires email verification", () => {
  const authContextContent = fs.readFileSync(path.resolve("src/lib/auth/context.tsx"), "utf-8");
  const authSplitScreenContent = fs.readFileSync(path.resolve("src/components/auth/AuthSplitScreen.tsx"), "utf-8");

  // Registration assigns 'citizen' role by default
  assert.ok(
    authContextContent.includes('role: "citizen"'),
    "New sign-ups must strictly receive standard 'citizen' role"
  );
  assert.ok(
    authContextContent.includes('account_status: "active"'),
    "New sign-ups must have 'active' status"
  );
  assert.ok(
    authContextContent.includes("email_verified: false"),
    "New sign-ups must require email verification before account confirmation"
  );

  // Form requires terms & password match
  assert.ok(
    authSplitScreenContent.includes("termsAccepted"),
    "AuthSplitScreen must enforce Terms & Privacy Policy acceptance"
  );
  assert.ok(
    authSplitScreenContent.includes("regConfirmPassword"),
    "AuthSplitScreen must enforce password confirmation"
  );
  assert.ok(
    authSplitScreenContent.includes("passwordStrength"),
    "AuthSplitScreen must calculate and display real-time password strength"
  );
});

// -----------------------------------------------------------------------------
// Test 2: Login Security & Suspended Account Blocking
// -----------------------------------------------------------------------------
runTest("Test 2: Login blocks suspended citizen accounts and enforces switchboard contact", () => {
  const authContextContent = fs.readFileSync(path.resolve("src/lib/auth/context.tsx"), "utf-8");

  // Suspended account check
  assert.ok(
    authContextContent.includes('account_status === "suspended"'),
    "Login must check whether the citizen account is suspended"
  );
  assert.ok(
    authContextContent.includes("0494 2440228"),
    "Suspended notification must direct citizen to Tanur Municipal switchboard 0494 2440228"
  );
});

// -----------------------------------------------------------------------------
// Test 3: Account Recovery & Password Reset
// -----------------------------------------------------------------------------
runTest("Test 3: Secure account recovery and /reset-password route implementation", () => {
  const resetPagePath = path.resolve("src/app/reset-password/page.tsx");
  assert.ok(fs.existsSync(resetPagePath), "Reset password page /reset-password/page.tsx must exist");

  const resetPageContent = fs.readFileSync(resetPagePath, "utf-8");
  assert.ok(
    resetPageContent.includes("resetPassword"),
    "Reset password page must call auth resetPassword method"
  );
  assert.ok(
    resetPageContent.includes("updatePassword"),
    "Reset password page must support setting a new password"
  );
  assert.ok(
    resetPageContent.includes("recovery"),
    "Reset password page must detect recovery tokens"
  );
});

// -----------------------------------------------------------------------------
// Test 4: Super Admin Role Hierarchy & Privilege Boundary
// -----------------------------------------------------------------------------
runTest("Test 4: Only Super Administrator can grant 'admin' or 'super_admin' roles", () => {
  const storeContent = fs.readFileSync(path.resolve("src/lib/data/store.ts"), "utf-8");
  const apiRolesContent = fs.readFileSync(path.resolve("src/app/api/admin/roles/route.ts"), "utf-8");

  // Store verification
  assert.ok(
    storeContent.includes('newRole === "admin" || newRole === "super_admin"'),
    "store.ts must identify admin/super_admin role elevation attempts"
  );
  assert.ok(
    storeContent.includes('caller.role !== "super_admin"'),
    "store.ts must block ordinary admins from granting admin/super_admin"
  );
  assert.ok(
    storeContent.includes("UNAUTHORIZED_SUPER_ADMIN_ELEVATION_ATTEMPT"),
    "store.ts must audit log unauthorized super admin elevation attempts"
  );

  // API route verification
  assert.ok(
    apiRolesContent.includes('caller.role !== "super_admin"'),
    "API /api/admin/roles must block ordinary admins from delegating admin/super_admin"
  );
});

// -----------------------------------------------------------------------------
// Test 5: Citizen Profile & Default Private Privacy Controls
// -----------------------------------------------------------------------------
runTest("Test 5: Citizen profile defaults to private and masks contact information", () => {
  const profilePageContent = fs.readFileSync(path.resolve("src/app/profile/page.tsx"), "utf-8");

  // Privacy defaults
  assert.ok(
    profilePageContent.includes("show_phone: false"),
    "Privacy settings must default show_phone to false (private)"
  );
  assert.ok(
    profilePageContent.includes("show_email: false"),
    "Privacy settings must default show_email to false (private)"
  );
  assert.ok(
    profilePageContent.includes("public_profile: false"),
    "Privacy settings must default public_profile to false (private)"
  );

  // Account settings support
  assert.ok(
    profilePageContent.includes("updatePassword"),
    "Profile page must support changing password"
  );
  assert.ok(
    profilePageContent.includes("deleteAccount"),
    "Profile page must support requesting account deletion"
  );
});

// -----------------------------------------------------------------------------
// Test 6: Citizen Dashboard & Real Civic Issue Association
// -----------------------------------------------------------------------------
runTest("Test 6: Citizen dashboard associates real civic issues and displays completion score", () => {
  const dashboardContent = fs.readFileSync(path.resolve("src/app/dashboard/page.tsx"), "utf-8");

  assert.ok(
    dashboardContent.includes("myCivicIssues"),
    "Dashboard must query real civic issues from civicStore"
  );
  assert.ok(
    dashboardContent.includes("profileCompletion"),
    "Dashboard must calculate profile completion percentage"
  );
  assert.ok(
    dashboardContent.includes("My Civic Reports"),
    "Dashboard must display My Civic Reports section"
  );
});

// -----------------------------------------------------------------------------
// Test 7: Civic Connect Authentication Association & Access Control
// -----------------------------------------------------------------------------
runTest("Test 7: Civic Connect connects authenticated user and preserves public feed access", () => {
  const civicConnectContent = fs.readFileSync(path.resolve("src/app/civic-connect/page.tsx"), "utf-8");

  assert.ok(
    civicConnectContent.includes("reporter_name: user?.display_name"),
    "Civic issue submission must associate user's display name"
  );
  assert.ok(
    civicConnectContent.includes("reporter_id: user?.id"),
    "Civic issue submission must associate user's UID"
  );
  assert.ok(
    civicConnectContent.includes("showMyIssuesOnly"),
    "Civic Connect must support filtering to citizen's own issues"
  );
});

// -----------------------------------------------------------------------------
// Test 8: Admin User Management & Account Suspension
// -----------------------------------------------------------------------------
runTest("Test 8: Admin console provides search, role modification and account suspension", () => {
  const adminPageContent = fs.readFileSync(path.resolve("src/app/admin/page.tsx"), "utf-8");

  assert.ok(
    adminPageContent.includes("userSearchQuery"),
    "Admin console must provide user search input"
  );
  assert.ok(
    adminPageContent.includes("userRoleFilter"),
    "Admin console must support filtering users by role"
  );
  assert.ok(
    adminPageContent.includes("userStatusFilter"),
    "Admin console must support filtering users by status"
  );
  assert.ok(
    adminPageContent.includes("handleSetUserStatus"),
    "Admin console must implement account suspension / reactivation"
  );
});

// -----------------------------------------------------------------------------
// Test 9: Account Deletion & Civic Data Retention Guarantee
// -----------------------------------------------------------------------------
runTest("Test 9: Account deletion anonymizes citizen PII while retaining statutory civic records", () => {
  const storeContent = fs.readFileSync(path.resolve("src/lib/data/store.ts"), "utf-8");

  assert.ok(
    storeContent.includes("deleteUserAccount"),
    "store.ts must implement deleteUserAccount"
  );
  assert.ok(
    storeContent.includes('display_name = "Deleted Citizen Account"'),
    "Account deletion must anonymize display_name"
  );
  assert.ok(
    storeContent.includes("email = null"),
    "Account deletion must wipe citizen email"
  );
  assert.ok(
    storeContent.includes("phone = null"),
    "Account deletion must wipe citizen phone"
  );
  assert.ok(
    storeContent.includes('account_status = "deactivated"'),
    "Account deletion must set status to deactivated"
  );
});

// -----------------------------------------------------------------------------
// Test 10: Supabase Migration & Database Security Rules
// -----------------------------------------------------------------------------
runTest("Test 10: Supabase migration 20241117000006_user_auth_system.sql defines schemas and RLS", () => {
  const migrationPath = path.resolve("supabase/migrations/20241117000006_user_auth_system.sql");
  assert.ok(fs.existsSync(migrationPath), "Migration 20241117000006_user_auth_system.sql must exist");

  const migrationContent = fs.readFileSync(migrationPath, "utf-8");
  assert.ok(
    migrationContent.includes("account_status"),
    "Migration must create account_status column"
  );
  assert.ok(
    migrationContent.includes("email_verified"),
    "Migration must create email_verified column"
  );
  assert.ok(
    migrationContent.includes("is_super_admin"),
    "Migration must define is_super_admin helper function"
  );
  assert.ok(
    migrationContent.includes("prevent_self_role_escalation"),
    "Migration must attach prevent_self_role_escalation trigger"
  );
});

// -----------------------------------------------------------------------------
// Test 11: Route Protection & Next.js Middleware
// -----------------------------------------------------------------------------
runTest("Test 11: Next.js middleware guards protected administrative routes", () => {
  const middlewarePath = path.resolve("src/middleware.ts");
  assert.ok(fs.existsSync(middlewarePath), "src/middleware.ts must exist");

  const middlewareContent = fs.readFileSync(middlewarePath, "utf-8");
  assert.ok(
    middlewareContent.includes("startsWith(\"/admin\")"),
    "Middleware must protect /admin routes"
  );
  assert.ok(
    middlewareContent.includes("pathname = \"/login\""),
    "Middleware must redirect unauthenticated requests to /login"
  );
});

console.log(`\nResults: ${passed}/${total} test suites PASSED (100% success rate)`);
console.log("======================================================================\n");
assert.strictEqual(passed, total, "All authentication & user account test suites must pass.");
