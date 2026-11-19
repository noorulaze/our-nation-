"use client";

import { 
  LocalGovernmentBody, 
  LocalGovernmentWard, 
  LocalRepresentative, 
  RepresentativeAudit 
} from "@/types/localGovernment";
import { 
  LOCAL_GOVERNMENT_BODIES, 
  LOCAL_GOVERNMENT_WARDS, 
  LOCAL_REPRESENTATIVES 
} from "../data/localGovernmentData";

const STORAGE_KEYS = {
  BODIES: "our_nation_lg_bodies_v1",
  WARDS: "our_nation_lg_wards_v1",
  REPRESENTATIVES: "our_nation_lg_reps_v1",
  AUDITS: "our_nation_lg_audits_v1",
};

class LocalGovernmentStore {
  private bodies: LocalGovernmentBody[] = [...LOCAL_GOVERNMENT_BODIES];
  private wards: LocalGovernmentWard[] = [...LOCAL_GOVERNMENT_WARDS];
  private representatives: LocalRepresentative[] = [...LOCAL_REPRESENTATIVES];
  private audits: RepresentativeAudit[] = [];
  private isHydrated = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.hydrate();
    }
  }

  private hydrate() {
    if (this.isHydrated || typeof window === "undefined") return;
    try {
      const storedBodies = localStorage.getItem(STORAGE_KEYS.BODIES);
      if (storedBodies) this.bodies = JSON.parse(storedBodies);

      const storedWards = localStorage.getItem(STORAGE_KEYS.WARDS);
      if (storedWards) this.wards = JSON.parse(storedWards);

      const storedReps = localStorage.getItem(STORAGE_KEYS.REPRESENTATIVES);
      if (storedReps) this.representatives = JSON.parse(storedReps);

      const storedAudits = localStorage.getItem(STORAGE_KEYS.AUDITS);
      if (storedAudits) this.audits = JSON.parse(storedAudits);

      this.isHydrated = true;
    } catch (e) {
      console.warn("Failed to hydrate LocalGovernmentStore from localStorage:", e);
    }
  }

  private persist(key: keyof typeof STORAGE_KEYS) {
    if (typeof window === "undefined") return;
    try {
      if (key === "BODIES") localStorage.setItem(STORAGE_KEYS.BODIES, JSON.stringify(this.bodies));
      if (key === "WARDS") localStorage.setItem(STORAGE_KEYS.WARDS, JSON.stringify(this.wards));
      if (key === "REPRESENTATIVES") localStorage.setItem(STORAGE_KEYS.REPRESENTATIVES, JSON.stringify(this.representatives));
      if (key === "AUDITS") localStorage.setItem(STORAGE_KEYS.AUDITS, JSON.stringify(this.audits));
    } catch (e) {
      console.warn("Failed to persist LocalGovernmentStore to localStorage:", e);
    }
  }

  public getLocalBodies(category?: "urban" | "rural"): LocalGovernmentBody[] {
    this.hydrate();
    if (!category) return this.bodies;
    return this.bodies.filter((b) => b.category === category);
  }

  public getLocalBodyBySlug(slug: string): LocalGovernmentBody | undefined {
    this.hydrate();
    return this.bodies.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
  }

  public getLocalBodyById(id: string): LocalGovernmentBody | undefined {
    this.hydrate();
    return this.bodies.find((b) => b.id === id);
  }

  public getWardsByLocalBodyId(localBodyId: string): LocalGovernmentWard[] {
    this.hydrate();
    return this.wards
      .filter((w) => w.local_body_id === localBodyId)
      .sort((a, b) => a.ward_number - b.ward_number);
  }

  public getRepresentatives(filter?: {
    localBodyId?: string;
    localBodySlug?: string;
    wardNumber?: number;
    role?: string;
    search?: string;
    status?: string;
  }): LocalRepresentative[] {
    this.hydrate();
    let res = [...this.representatives];

    if (filter?.localBodyId) {
      res = res.filter((r) => r.local_body_id === filter.localBodyId);
    }
    if (filter?.localBodySlug) {
      res = res.filter((r) => r.local_body_slug.toLowerCase() === filter.localBodySlug!.toLowerCase());
    }
    if (filter?.wardNumber !== undefined) {
      res = res.filter((r) => r.ward_number === filter.wardNumber);
    }
    if (filter?.role) {
      res = res.filter((r) => r.role === filter.role);
    }
    if (filter?.status) {
      res = res.filter((r) => r.verification_status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      res = res.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.ward_name.toLowerCase().includes(q) ||
          r.local_body_name.toLowerCase().includes(q) ||
          (r.party && r.party.toLowerCase().includes(q))
      );
    }

    return res;
  }

  public getRepresentativeById(id: string): LocalRepresentative | undefined {
    this.hydrate();
    return this.representatives.find((r) => r.id === id);
  }

  public getLeadershipRepresentatives(): LocalRepresentative[] {
    this.hydrate();
    return this.representatives.filter((r) => r.is_head || r.is_deputy);
  }

  public updateRepresentative(
    id: string,
    updates: Partial<LocalRepresentative>,
    adminUser: string,
    note: string = "Admin update"
  ): LocalRepresentative {
    this.hydrate();
    const idx = this.representatives.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Representative with ID ${id} not found`);

    const prev = this.representatives[idx];
    const updated: LocalRepresentative = {
      ...prev,
      ...updates,
      last_verified: new Date().toISOString().split("T")[0],
    };

    this.representatives[idx] = updated;

    const audit: RepresentativeAudit = {
      id: `audit-${Date.now()}`,
      representative_id: id,
      timestamp: new Date().toISOString(),
      action: "UPDATE_REPRESENTATIVE",
      modified_by: adminUser,
      note,
    };
    this.audits.unshift(audit);

    // Also sync the matching ward if name or phone or photo changed
    const wardIdx = this.wards.findIndex((w) => w.id === updated.ward_id);
    if (wardIdx !== -1) {
      this.wards[wardIdx] = {
        ...this.wards[wardIdx],
        representative_name: updated.name,
        party: updated.party,
        phone: updated.phone,
        photo_url: updated.photo_url,
        verification_status: updated.verification_status,
      };
      this.persist("WARDS");
    }

    this.persist("REPRESENTATIVES");
    this.persist("AUDITS");
    return updated;
  }

  public updateLocalBody(
    id: string,
    updates: Partial<LocalGovernmentBody>,
    adminUser: string,
    note: string = "Admin update"
  ): LocalGovernmentBody {
    this.hydrate();
    const idx = this.bodies.findIndex((b) => b.id === id);
    if (idx === -1) throw new Error(`Local Government Body with ID ${id} not found`);

    const prev = this.bodies[idx];
    const updated: LocalGovernmentBody = {
      ...prev,
      ...updates,
      last_verified: new Date().toISOString().split("T")[0],
    };

    this.bodies[idx] = updated;

    const audit: RepresentativeAudit = {
      id: `audit-${Date.now()}`,
      representative_id: id,
      timestamp: new Date().toISOString(),
      action: "UPDATE_LOCAL_BODY",
      modified_by: adminUser,
      note,
    };
    this.audits.unshift(audit);

    this.persist("BODIES");
    this.persist("AUDITS");
    return updated;
  }

  public getAudits(): RepresentativeAudit[] {
    this.hydrate();
    return this.audits;
  }
}

export const localGovernmentStore = new LocalGovernmentStore();
