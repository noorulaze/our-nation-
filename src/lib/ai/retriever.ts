/**
 * retriever.ts
 * Intelligent, grounded retrieval system for Naadu AI.
 * Handles lexical/semantic matching across verified municipal records,
 * resolves reference IDs (CC-TNR-2026-XXXX, PS-TNR-2026-XXXX),
 * and enforces strict citizen privacy and data isolation.
 */

import { getUnifiedKnowledgeBase, KnowledgeItem } from "./knowledgeBase";
import { civicStore, CivicIssue } from "@/lib/data/civicConnectData";
import { publicServiceStore, PublicServiceApplication } from "@/lib/data/publicServicesData";

export interface RetrievalResult {
  items: KnowledgeItem[];
  suggestedActions: Array<{
    label: string;
    link: string;
    description: string;
  }>;
  exactReferenceMatch?: {
    type: "civic_issue" | "service_application";
    referenceNumber: string;
    status: string;
    title: string;
    details: string;
    link: string;
  };
  citizenPersonalRecords?: Array<{
    type: "civic_issue" | "service_application";
    referenceNumber: string;
    title: string;
    status: string;
    category: string;
    date: string;
    link: string;
  }>;
}

export interface RetrievalOptions {
  userId?: string;
  userName?: string;
  isAuthenticated?: boolean;
}

/**
 * Retrieves the most relevant grounded knowledge items for a citizen's query.
 */
export function retrieveGroundedContext(query: string, options?: RetrievalOptions): RetrievalResult {
  const cleanQuery = query.trim();
  const lowerQuery = cleanQuery.toLowerCase();
  const tokens = lowerQuery
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter(t => t.length > 1);

  const knowledgeBase = getUnifiedKnowledgeBase();
  const scoredItems: Array<{ item: KnowledgeItem; score: number }> = [];

  // ==========================================
  // 1. EXACT REFERENCE NUMBER DETECTION
  // ==========================================
  const civicRefRegex = /\bCC-TNR-2026-\d{4,}\b/i;
  const serviceRefRegex = /\bPS-TNR-2026-\d{4,}\b/i;

  const civicRefMatch = cleanQuery.match(civicRefRegex);
  const serviceRefMatch = cleanQuery.match(serviceRefRegex);

  let exactMatchResult: RetrievalResult["exactReferenceMatch"] = undefined;

  if (civicRefMatch) {
    const refId = civicRefMatch[0].toUpperCase();
    const issue = civicStore.getIssues().find(
      i => i.tracking_id.toUpperCase() === refId || i.id.toUpperCase() === refId
    );
    if (issue) {
      exactMatchResult = {
        type: "civic_issue",
        referenceNumber: issue.tracking_id,
        status: issue.status,
        title: issue.title,
        details: `Issue Category: ${issue.category_id}. Ward: Ward ${issue.ward_number || 'N/A'}${issue.ward_name ? ` (${issue.ward_name})` : ''}. Locality: ${issue.locality || 'Tanur'}. Current Processing Status: ${issue.status}. Priority: ${issue.priority}. Registered Date: ${issue.created_at.split('T')[0]}. (Reporter contact details masked for privacy).`,
        link: `/civic/issues/${issue.id}`,
      };
    }
  } else if (serviceRefMatch) {
    const refId = serviceRefMatch[0].toUpperCase();
    const app = publicServiceStore.getApplicationByReference(refId);
    if (app) {
      exactMatchResult = {
        type: "service_application",
        referenceNumber: app.reference_no,
        status: app.status,
        title: app.service_title,
        details: `Service Application: ${app.service_title} (${app.service_category}). Ward: Ward ${app.ward_number}. Current Processing Status: ${app.status}. Submission Date: ${app.created_at.split('T')[0]}. Status Remark: ${app.status_notes || 'Under review by municipal desk officer'}.`,
        link: `/dashboard#service-applications`,
      };
    }
  }

  // ==========================================
  // 2. AUTHENTICATED CITIZEN PERSONAL RECORDS (Data Isolation)
  // ==========================================
  let citizenPersonalRecords: RetrievalResult["citizenPersonalRecords"] = undefined;
  const isPersonalQuery = lowerQuery.includes("my report") || 
                          lowerQuery.includes("my complaint") || 
                          lowerQuery.includes("my application") || 
                          lowerQuery.includes("my issue") ||
                          lowerQuery.includes("status of my") ||
                          lowerQuery.includes("track my");

  if (isPersonalQuery) {
    if (options?.isAuthenticated && options?.userId) {
      const citizenIssues = civicStore.getIssues().filter((i: CivicIssue) => i.reporter_id === options.userId);
      const citizenApps = publicServiceStore.getApplications(options.userId);

      citizenPersonalRecords = [
        ...citizenIssues.map((i: CivicIssue) => ({
          type: "civic_issue" as const,
          referenceNumber: i.tracking_id,
          title: i.title,
          status: i.status,
          category: i.category_id,
          date: i.created_at.split("T")[0],
          link: `/civic/issues/${i.id}`,
        })),
        ...citizenApps.map((a: PublicServiceApplication) => ({
          type: "service_application" as const,
          referenceNumber: a.reference_no,
          title: a.service_title,
          status: a.status,
          category: a.service_category,
          date: a.created_at.split("T")[0],
          link: `/dashboard#service-applications`,
        }))
      ];
    }
  }

  // ==========================================
  // 3. STATUTORY WARD NUMBER DETECTION (Wards 1–45)
  // ==========================================
  const wardRegex = /\bward\s*([1-9]|[1-3][0-9]|4[0-5])\b/i;
  const wardMatch = cleanQuery.match(wardRegex);
  const targetWardNumber = wardMatch ? parseInt(wardMatch[1], 10) : null;

  // ==========================================
  // 4. KNOWLEDGE BASE SCORING & RELEVANCE
  // ==========================================
  knowledgeBase.forEach((item) => {
    let score = 0;
    const itemTitleLower = item.title.toLowerCase();
    const itemSummaryLower = item.summary.toLowerCase();
    const itemDetailsLower = item.details.toLowerCase();

    // Ward-specific bonus
    if (targetWardNumber !== null) {
      if (item.metadata?.ward_number === targetWardNumber) {
        score += 50;
      }
    }

    // Exact phrase match in title
    if (itemTitleLower.includes(lowerQuery)) {
      score += 40;
    }

    // Token matching
    tokens.forEach((token) => {
      // Keyword matching
      if (item.keywords.some(k => k.toLowerCase().includes(token))) {
        score += 15;
      }
      if (itemTitleLower.includes(token)) {
        score += 10;
      }
      if (itemSummaryLower.includes(token)) {
        score += 5;
      }
      if (itemDetailsLower.includes(token)) {
        score += 2;
      }
    });

    // Domain boosting based on query intent
    if (
      (lowerQuery.includes("pothole") || lowerQuery.includes("streetlight") || lowerQuery.includes("garbage") || lowerQuery.includes("drainage") || lowerQuery.includes("report")) &&
      item.domain === "civic_reporting"
    ) {
      score += 20;
    }

    if (
      (lowerQuery.includes("certificate") || lowerQuery.includes("tax") || lowerQuery.includes("building") || lowerQuery.includes("license") || lowerQuery.includes("fee") || lowerQuery.includes("document")) &&
      item.domain === "public_service"
    ) {
      score += 20;
    }

    if (
      (lowerQuery.includes("project") || lowerQuery.includes("construction") || lowerQuery.includes("budget") || lowerQuery.includes("expenditure") || lowerQuery.includes("harbour") || lowerQuery.includes("road")) &&
      item.domain === "development_project"
    ) {
      score += 20;
    }

    if (
      (lowerQuery.includes("phone") || lowerQuery.includes("contact") || lowerQuery.includes("office") || lowerQuery.includes("secretary") || lowerQuery.includes("switchboard")) &&
      item.domain === "municipality"
    ) {
      score += 25;
    }

    if (score > 5) {
      scoredItems.push({ item, score });
    }
  });

  // Sort by highest relevance score
  scoredItems.sort((a, b) => b.score - a.score);

  // Take top 5 distinct items
  const topItems = scoredItems.slice(0, 5).map(s => s.item);

  // ==========================================
  // 5. CONTEXTUAL ACTION PILLS
  // ==========================================
  const suggestedActions: RetrievalResult["suggestedActions"] = [];

  if (lowerQuery.includes("report") || lowerQuery.includes("complaint") || lowerQuery.includes("pothole") || lowerQuery.includes("streetlight") || lowerQuery.includes("waste")) {
    suggestedActions.push({
      label: "Report Civic Issue",
      link: "/civic/report",
      description: "Submit a verified civic problem with photos and location"
    });
  }

  if (lowerQuery.includes("service") || lowerQuery.includes("certificate") || lowerQuery.includes("license") || lowerQuery.includes("tax") || lowerQuery.includes("apply")) {
    suggestedActions.push({
      label: "Browse Public Services",
      link: "/public-services",
      description: "View statutory document checklists, fees, and procedures"
    });
  }

  if (lowerQuery.includes("project") || lowerQuery.includes("development") || lowerQuery.includes("budget") || lowerQuery.includes("progress") || targetWardNumber !== null) {
    suggestedActions.push({
      label: "Open Development Tracker",
      link: targetWardNumber ? `/development/projects?ward=${targetWardNumber}` : "/development",
      description: "Inspect three-way municipal budgets and GIS site maps"
    });
  }

  if (lowerQuery.includes("dashboard") || isPersonalQuery) {
    suggestedActions.push({
      label: "Citizen Dashboard",
      link: "/dashboard",
      description: "Manage your registered civic reports and applications"
    });
  }

  if (suggestedActions.length === 0) {
    suggestedActions.push({
      label: "Public Services Directory",
      link: "/public-services",
      description: "Explore 8 statutory municipal categories"
    });
    suggestedActions.push({
      label: "Development Tracker",
      link: "/development",
      description: "Track all 45 municipal ward projects"
    });
  }

  return {
    items: topItems,
    suggestedActions,
    exactReferenceMatch: exactMatchResult,
    citizenPersonalRecords,
  };
}
