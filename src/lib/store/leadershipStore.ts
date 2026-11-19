"use client";

import { 
  LeadershipProfile, 
  LeadershipProfileInput, 
  LeadershipVerificationStatus,
  LeadershipCategory 
} from "@/types/leadershipProfile";
import { INITIAL_LEADERSHIP_PROFILES } from "../data/leadershipData";

const STORAGE_KEY = "our_nation_leadership_profiles_v1";

class LeadershipStore {
  private profiles: LeadershipProfile[] = [...INITIAL_LEADERSHIP_PROFILES];
  private isHydrated = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.hydrate();
    }
  }

  private hydrate() {
    if (this.isHydrated || typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.profiles = parsed;
        }
      }
      this.isHydrated = true;
    } catch (e) {
      console.warn("Failed to hydrate LeadershipStore from localStorage:", e);
    }
  }

  private persist() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profiles));
    } catch (e) {
      console.warn("Failed to persist LeadershipStore to localStorage:", e);
    }
  }

  public getProfiles(filter?: {
    category?: LeadershipCategory;
    status?: LeadershipVerificationStatus;
    search?: string;
    includePending?: boolean;
  }): LeadershipProfile[] {
    this.hydrate();
    let res = [...this.profiles];

    if (!filter?.includePending && !filter?.status) {
      // By default for public directory, show verified profiles or pending approval if specially permitted
      // For this system, we allow pending_admin_approval with prominent banner
      res = res.filter((p) => p.verificationStatus !== "archived");
    }

    if (filter?.status) {
      res = res.filter((p) => p.verificationStatus === filter.status);
    }

    if (filter?.category) {
      res = res.filter((p) => p.leadershipCategory === filter.category);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      res = res.filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.displayName.toLowerCase().includes(q) ||
          p.designation.toLowerCase().includes(q) ||
          p.organization.toLowerCase().includes(q) ||
          p.areasOfLeadership.some((a) => a.toLowerCase().includes(q))
      );
    }

    return res;
  }

  public getProfileBySlug(slug: string): LeadershipProfile | undefined {
    this.hydrate();
    return this.profiles.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  }

  public getProfileById(id: string): LeadershipProfile | undefined {
    this.hydrate();
    return this.profiles.find((p) => p.id === id);
  }

  public createProfile(input: LeadershipProfileInput, adminUser: string = "Admin"): LeadershipProfile {
    this.hydrate();
    const id = input.id || `profile-${Date.now()}`;
    const slug = input.slug || input.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    
    const newProfile: LeadershipProfile = {
      ...input,
      id,
      slug,
      profileCreatedDate: new Date().toISOString().split("T")[0],
      lastUpdatedDate: new Date().toISOString().split("T")[0],
      adminNotes: input.adminNotes || `Created by ${adminUser} on ${new Date().toLocaleDateString()}`,
    };

    this.profiles.unshift(newProfile);
    this.persist();
    return newProfile;
  }

  public updateProfile(id: string, updates: Partial<LeadershipProfile>, adminUser: string = "Admin"): LeadershipProfile {
    this.hydrate();
    const idx = this.profiles.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Leadership profile with ID ${id} not found`);

    const prev = this.profiles[idx];
    const updated: LeadershipProfile = {
      ...prev,
      ...updates,
      lastUpdatedDate: new Date().toISOString().split("T")[0],
      adminNotes: updates.adminNotes || prev.adminNotes || `Updated by ${adminUser}`,
    };

    this.profiles[idx] = updated;
    this.persist();
    return updated;
  }

  public setVerificationStatus(
    id: string, 
    status: LeadershipVerificationStatus, 
    adminUser: string = "Admin",
    note?: string
  ): LeadershipProfile {
    this.hydrate();
    return this.updateProfile(id, {
      verificationStatus: status,
      lastVerifiedDate: status === "verified" ? new Date().toISOString().split("T")[0] : undefined,
      adminNotes: note || `Status changed to ${status} by ${adminUser}`,
    }, adminUser);
  }

  public archiveProfile(id: string, adminUser: string = "Admin"): LeadershipProfile {
    return this.setVerificationStatus(id, "archived", adminUser, `Archived by ${adminUser}`);
  }

  public resetToDefault() {
    this.profiles = [...INITIAL_LEADERSHIP_PROFILES];
    this.persist();
  }
}

export const leadershipStore = new LeadershipStore();
