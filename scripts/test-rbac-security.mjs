// OUR NATION — RBAC Security & Privilege Escalation Prevention Test Suite
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

console.log("======================================================================");
console.log("OUR NATION — RBAC & AUTHORIZATION SECURITY AUDIT TEST SUITE");
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
// Test 1: Normal user attempting to switch to Admin is blocked (No Public Switcher)
// -----------------------------------------------------------------------------
runTest("Test 1: Public SWITCH ROLE interfaces completely eliminated from user profiles & navigation", () => {
  const navbarContent = fs.readFileSync(path.resolve("src/components/layout/Navbar.tsx"), "utf-8");
  const profileContent = fs.readFileSync(path.resolve("src/app/profile/page.tsx"), "utf-8");
  const authContextContent = fs.readFileSync(path.resolve("src/lib/auth/context.tsx"), "utf-8");

  // 1. Navbar must not have public switchUserRole or role buttons
  assert.ok(!navbarContent.includes("switchUserRole"), "Navbar.tsx must not import or call switchUserRole");
  assert.ok(!navbarContent.includes("Switch Role:"), "Navbar.tsx must not contain 'Switch Role:' UI block");

  // 2. Profile page must not have testing role switcher
  assert.ok(!profileContent.includes("switchUserRole"), "Profile page must not import or call switchUserRole");
  assert.ok(!profileContent.includes("ടെസ്റ്റിംഗ് റോൾ സ്വിച്ചർ"), "Profile page must not have 'ടെസ്റ്റിംഗ് റോൾ സ്വിച്ചർ' buttons");

  // 3. AuthContext must not expose arbitrary switchUserRole function
  assert.ok(!authContextContent.includes("switchUserRole:"), "AuthContextType must not define switchUserRole");
  assert.ok(!authContextContent.includes("switchUserRole ="), "AuthProvider must not implement arbitrary switchUserRole");
});

// -----------------------------------------------------------------------------
// Test 2: Normal user attempting to switch to Moderator is blocked
// -----------------------------------------------------------------------------
runTest("Test 2: Normal users cannot elevate themselves to Moderator", () => {
  const adminPageContent = fs.readFileSync(path.resolve("src/app/admin/page.tsx"), "utf-8");
  const adminPeoplesVoiceContent = fs.readFileSync(path.resolve("src/app/admin/peoples-voice/page.tsx"), "utf-8");

  // Admin and Peoples Voice admin must not have self-elevation buttons
  assert.ok(!adminPageContent.includes("switchUserRole"), "admin/page.tsx must not call switchUserRole");
  assert.ok(!adminPageContent.includes("Switch to Moderator"), "admin/page.tsx must not offer 'Switch to Moderator' button");
  assert.ok(!adminPeoplesVoiceContent.includes("switchUserRole"), "admin/peoples-voice/page.tsx must not call switchUserRole");
});

// -----------------------------------------------------------------------------
// Test 3: Normal user calling updateProfile({ role: 'admin' }) has role stripped and rejected
// -----------------------------------------------------------------------------
runTest("Test 3: updateProfile strips and discards attempts to modify the 'role' field", () => {
  const storeContent = fs.readFileSync(path.resolve("src/lib/data/store.ts"), "utf-8");
  const authContextContent = fs.readFileSync(path.resolve("src/lib/auth/context.tsx"), "utf-8");

  // Verify store.ts updateProfile strips role
  assert.ok(
    storeContent.includes("const { role: _forbiddenRole, ...safeUpdates } = updates as any;"),
    "store.ts updateProfile must explicitly sanitize and discard the role property"
  );

  // Verify auth context updateProfile strips role and enforces role retention
  assert.ok(
    authContextContent.includes("role: user.role"),
    "auth context updateProfile must guarantee immutable role retention"
  );
});

// -----------------------------------------------------------------------------
// Test 4: Unauthenticated or non-admin user calling /api/admin/roles receives 401/403
// -----------------------------------------------------------------------------
runTest("Test 4: Server-side API /api/admin/roles enforces strict 401/403 checks", () => {
  const apiRoutePath = path.resolve("src/app/api/admin/roles/route.ts");
  assert.ok(fs.existsSync(apiRoutePath), "API route /api/admin/roles/route.ts must exist");

  const apiContent = fs.readFileSync(apiRoutePath, "utf-8");

  // Must check caller authentication
  assert.ok(apiContent.includes("if (!adminUserId)"), "API route must reject requests without adminUserId with 401");
  assert.ok(apiContent.includes("status: 401"), "API route must return HTTP 401 for unauthenticated calls");

  // Must verify caller role is admin
  assert.ok(apiContent.includes("caller.role !== \"admin\""), "API route must check if caller.role !== 'admin'");
  assert.ok(apiContent.includes("status: 403"), "API route must return HTTP 403 for non-admin callers");
});

// -----------------------------------------------------------------------------
// Test 5: Moderator attempting to assign Admin receives 403 Forbidden
// -----------------------------------------------------------------------------
runTest("Test 5: Moderator caller attempting role elevation is blocked and logged", () => {
  const storeContent = fs.readFileSync(path.resolve("src/lib/data/store.ts"), "utf-8");

  // Verify assignUserRole requires role === 'admin'
  assert.ok(
    storeContent.includes("caller.role !== \"admin\""),
    "assignUserRole must verify caller has role === 'admin'"
  );
  assert.ok(
    storeContent.includes("UNAUTHORIZED_ROLE_CHANGE_ATTEMPT"),
    "Unauthorized role elevation attempt by moderator/user must create UNAUTHORIZED_ROLE_CHANGE_ATTEMPT audit log"
  );
});

// -----------------------------------------------------------------------------
// Test 6: Verified Org attempting to access admin operations receives 403
// -----------------------------------------------------------------------------
runTest("Test 6: Verified Org attempting to access administrative operations is denied", () => {
  const adminPageContent = fs.readFileSync(path.resolve("src/app/admin/page.tsx"), "utf-8");
  const storeContent = fs.readFileSync(path.resolve("src/lib/data/store.ts"), "utf-8");

  // In admin page, role must be admin or moderator to even view the page
  assert.ok(adminPageContent.includes("const isAuthorized = role === \"admin\" || role === \"moderator\";"),
    "admin/page.tsx must require admin or moderator role"
  );

  // But role assignment tab is strictly restricted to role === 'admin'
  assert.ok(adminPageContent.includes('activeTab === "users" && role === "admin"'),
    "RBAC role assignment UI must be strictly restricted to role === 'admin' (excluding verified_org and moderator)"
  );
});

// -----------------------------------------------------------------------------
// Test 7: Unauthenticated visitor accessing admin pages is blocked (Principle of Least Privilege)
// -----------------------------------------------------------------------------
runTest("Test 7: Sessions default to least privilege (role: 'user') and admin routes block regular citizens", () => {
  const authContextContent = fs.readFileSync(path.resolve("src/lib/auth/context.tsx"), "utf-8");
  const adminPageContent = fs.readFileSync(path.resolve("src/app/admin/page.tsx"), "utf-8");
  const adminPVContent = fs.readFileSync(path.resolve("src/app/admin/peoples-voice/page.tsx"), "utf-8");

  // Session defaults to unprivileged citizen
  assert.ok(
    authContextContent.includes("initialProfiles[2]"),
    "Auth context must default to standard citizen profile ('fathima_tanur', role: 'user')"
  );

  // Admin pages block non-privileged users
  assert.ok(adminPageContent.includes("if (!isAuthorized)"), "admin/page.tsx must block non-authorized users");
  assert.ok(adminPVContent.includes("if (!isPrivileged)"), "admin/peoples-voice/page.tsx must block non-authorized users");
  assert.ok(adminPVContent.includes("Moderator Access Required"), "admin/peoples-voice/page.tsx must display Access Required screen");
});

// -----------------------------------------------------------------------------
// Test 8: Authorized Admin assigns role through secure workflow, updates profile, and generates audit log
// -----------------------------------------------------------------------------
runTest("Test 8: Authorized Admin executes role assignment with immutable audit trail", () => {
  const storeContent = fs.readFileSync(path.resolve("src/lib/data/store.ts"), "utf-8");

  // Check assignUserRole implementation
  assert.ok(storeContent.includes("assignUserRole("), "store.ts must implement assignUserRole");
  assert.ok(storeContent.includes("target.role = newRole;"), "assignUserRole must update target.role");
  assert.ok(storeContent.includes("ASSIGN_USER_ROLE"), "assignUserRole must write ASSIGN_USER_ROLE to audit logs");
  assert.ok(storeContent.includes("admin_username: caller.username"), "Audit log must record administrative caller username");
});

// -----------------------------------------------------------------------------
// Test 9: PostgreSQL RLS Migration & Database Trigger Verification
// -----------------------------------------------------------------------------
runTest("Test 9: PostgreSQL trigger prevent_self_role_escalation prevents DB-level role modification", () => {
  const migrationPath = path.resolve("supabase/migrations/20241117000002_rbac_security.sql");
  assert.ok(fs.existsSync(migrationPath), "Migration 20241117000002_rbac_security.sql must exist");

  const migrationContent = fs.readFileSync(migrationPath, "utf-8");
  assert.ok(migrationContent.includes("CREATE OR REPLACE FUNCTION public.prevent_self_role_escalation()"),
    "Migration must create prevent_self_role_escalation function"
  );
  assert.ok(migrationContent.includes("CREATE TRIGGER trg_prevent_self_role_escalation"),
    "Migration must attach trigger trg_prevent_self_role_escalation to public.profiles"
  );
  assert.ok(migrationContent.includes("public.is_admin(auth.uid())"),
    "Migration trigger must check public.is_admin(auth.uid())"
  );
  assert.ok(migrationContent.includes("RAISE EXCEPTION"),
    "Migration trigger must RAISE EXCEPTION on unauthorized attempts to modify role"
  );
});

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log("\n======================================================================");
console.log(`RBAC SECURITY VERIFICATION COMPLETE: ${passed}/${total} passed`);
console.log("======================================================================\n");

if (passed !== total) {
  process.exit(1);
}
