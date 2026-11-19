import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/data/store";
import { UserRole } from "@/types/database";

const VALID_ROLES: UserRole[] = ["citizen", "user", "moderator", "verified_org", "admin", "super_admin"];

/**
 * GET /api/admin/roles
 * Lists users and their assigned roles for administrative inspection.
 * Restricted to administrators only.
 */
export async function GET(req: NextRequest) {
  try {
    const adminId = req.headers.get("x-admin-user-id") || req.nextUrl.searchParams.get("adminUserId");
    if (!adminId) {
      return NextResponse.json(
        { error: "Authentication required. Missing administrative credentials." },
        { status: 401 }
      );
    }

    const caller = store.getProfileById(adminId);
    if (!caller || (caller.role !== "admin" && caller.role !== "super_admin")) {
      store.addAuditLog(
        adminId,
        "UNAUTHORIZED_ACCESS_ATTEMPT",
        "api",
        "/api/admin/roles",
        { method: "GET", caller_role: caller?.role || "unknown" }
      );
      return NextResponse.json(
        { error: "Access Denied: Only platform administrators can view RBAC assignments." },
        { status: 403 }
      );
    }

    const profiles = store.getProfiles().map(p => ({
      id: p.id,
      username: p.username,
      display_name: p.display_name,
      email: p.email,
      role: p.role,
      account_status: p.account_status || "active",
      email_verified: p.email_verified ?? true,
      created_at: p.created_at,
      updated_at: p.updated_at,
    }));

    return NextResponse.json({ success: true, count: profiles.length, profiles });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/admin/roles
 * Assigns or modifies a user's role or account status.
 * Requires caller to be a verified administrator (role = 'admin' or 'super_admin').
 * Enforces Super Admin restriction: ordinary admins cannot assign 'admin' or 'super_admin'.
 * Logs all attempts to the immutable audit log.
 */
export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body provided." }, { status: 400 });
    }

    const { adminUserId, targetUserId, newRole, status, reason } = body || {};

    // 1. Authenticate caller
    if (!adminUserId) {
      return NextResponse.json(
        { error: "Authentication required: missing adminUserId." },
        { status: 401 }
      );
    }

    const caller = store.getProfileById(adminUserId);
    if (!caller) {
      return NextResponse.json(
        { error: "Caller profile not found." },
        { status: 401 }
      );
    }

    // 2. Authorize caller as admin or super_admin
    if (caller.role !== "admin" && caller.role !== "super_admin") {
      store.addAuditLog(
        adminUserId,
        "UNAUTHORIZED_ROLE_ELEVATION_ATTEMPT",
        "profile",
        targetUserId || "unknown",
        {
          attempted_role: newRole,
          caller_role: caller.role,
          caller_username: caller.username,
          reason: reason || "Unauthorized attempt",
        }
      );
      return NextResponse.json(
        { 
          error: "Access Denied: Only administrators can assign or modify roles.",
          callerRole: caller.role
        },
        { status: 403 }
      );
    }

    // 3. Validate target parameters
    if (!targetUserId) {
      return NextResponse.json({ error: "targetUserId is required." }, { status: 400 });
    }

    // If managing account status (suspend / reactivate)
    if (status) {
      const statusResult = store.setUserAccountStatus(
        adminUserId,
        targetUserId,
        status,
        reason || `Account ${status} by admin`
      );
      if (!statusResult.success) {
        return NextResponse.json({ error: statusResult.error }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        message: `Account status updated to '${status}'.`,
        profile: statusResult.profile
      });
    }

    if (!newRole || !VALID_ROLES.includes(newRole)) {
      return NextResponse.json(
        { 
          error: `Invalid role '${newRole}'. Valid roles are: ${VALID_ROLES.join(", ")}.` 
        },
        { status: 400 }
      );
    }

    // Super Admin privilege barrier
    if ((newRole === "admin" || newRole === "super_admin") && caller.role !== "super_admin") {
      return NextResponse.json(
        { error: "Access Denied: Only a Super Administrator can assign administrator or super administrator roles." },
        { status: 403 }
      );
    }

    // 4. Execute atomic role change and immutable audit log in store
    const result = store.assignUserRole(adminUserId, targetUserId, newRole, reason || "Administrative update");

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Role successfully updated to '${newRole}' for user ${result.profile?.username}.`,
      profile: result.profile,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
