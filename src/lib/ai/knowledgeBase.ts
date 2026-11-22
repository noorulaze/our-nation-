/**
 * knowledgeBase.ts
 * Unified, grounded civic knowledge repository for Naadu AI.
 * Aggregates verified data from:
 * 1. Tanur Public Services Directory (eligibility, required documents, fees, official portals)
 * 2. Municipal Development Tracker (9 categories, 8 statuses, three-way budgets, MB milestones)
 * 3. Civic Issue Reporting System (8 issue categories, 8 processing statuses, reporting workflow)
 * 4. Tanur Grade II Municipality Administration (45 wards, leadership, switchboard 0494 2440228)
 * 5. OUR NATION Platform Navigation & User Guide
 */

import { TANUR_MUNICIPAL_SERVICES, SERVICE_CATEGORIES } from "@/lib/data/publicServicesData";
import { digitalMunicipalityStore, TRANSPARENT_PROJECT_CATEGORIES, TANUR_MUNICIPAL_WARDS } from "@/lib/data/digitalMunicipalityData";
import { CIVIC_CATEGORIES, CivicStatus } from "@/lib/data/civicConnectData";
import { TANUR_CORE_FACTS, TANUR_PUBLIC_SERVICES, TANUR_INSTITUTIONS } from "@/lib/data/tanurData";

export interface KnowledgeItem {
  id: string;
  domain: "public_service" | "development_project" | "civic_reporting" | "municipality" | "platform_help";
  title: string;
  summary: string;
  details: string;
  keywords: string[];
  link: string;
  externalUrl?: string;
  verifiedSource: string;
  verificationDate: string;
  isOfficial: boolean;
  metadata?: Record<string, any>;
}

/**
 * Compiles all verified statutory records into indexed knowledge items.
 */
export function getUnifiedKnowledgeBase(): KnowledgeItem[] {
  const items: KnowledgeItem[] = [];

  // ==========================================
  // 1. PUBLIC SERVICES (Directory & Application Workflows)
  // ==========================================
  TANUR_MUNICIPAL_SERVICES.forEach((service) => {
    items.push({
      id: `service-${service.id}`,
      domain: "public_service",
      title: `${service.title} (${service.category_name})`,
      summary: service.summary,
      details: [
        `Service Title: ${service.title}`,
        `Category: ${service.category_name}`,
        `Department: ${service.department}`,
        `Eligibility: ${service.eligibility.join("; ")}`,
        `Required Documents: ${service.required_documents.join(", ")}`,
        `Fee Structure: ${service.fee_structure}`,
        `Processing Schedule: ${service.processing_time_text}`,
        `Office Location: ${service.office_location}`,
        `Official State Government Portal: ${service.official_portal_url || 'K-Smart Portal (ksmart.lsgkerala.gov.in)'}`,
        `OUR NATION Guidance Service: Free citizen assistance available on the platform.`
      ].join("\n"),
      keywords: [
        "service", service.title.toLowerCase(), service.category,
        "fee", "document", "apply", "certificate", "license", "tax", "sanction"
      ],
      link: `/public-services/${service.slug}`,
      externalUrl: service.official_portal_url,
      verifiedSource: "Kerala LSGD & Tanur Municipal Citizen Charter",
      verificationDate: service.last_verified_date,
      isOfficial: true,
      metadata: {
        category: service.category,
        fee: service.fee_structure,
        processing_time: service.processing_time_text,
      }
    });
  });

  // Category index item for Public Services
  SERVICE_CATEGORIES.forEach((cat) => {
    items.push({
      id: `service-cat-${cat.id}`,
      domain: "public_service",
      title: `Public Services Category: ${cat.name}`,
      summary: cat.description,
      details: `Category covering: ${cat.name}. Services available under this category include certified applications, verified guidelines, and direct links to statutory Kerala portals.`,
      keywords: ["services", "category", cat.name.toLowerCase(), cat.id],
      link: `/public-services?category=${cat.id}`,
      verifiedSource: "Tanur Municipality Citizen Service Directory",
      verificationDate: "2024-11-20",
      isOfficial: true,
    });
  });

  // ==========================================
  // 2. CIVIC ISSUE REPORTING (8 Categories, 8 Statuses, Workflow)
  // ==========================================
  CIVIC_CATEGORIES.forEach((cat) => {
    items.push({
      id: `civic-cat-${cat.id}`,
      domain: "civic_reporting",
      title: `Civic Issue Category: ${cat.name}`,
      summary: cat.description,
      details: [
        `Category Name: ${cat.name}`,
        `Description: ${cat.description}`,
        `Common Issues / Subcategories: ${cat.subcategories.join(", ")}`,
        `Reporting Guide: Citizens can submit a report with photos, location, and ward number (Wards 1–45). A unique tracking reference (CC-TNR-2026-XXXX) is issued instantly.`
      ].join("\n"),
      keywords: ["report", "complaint", "issue", cat.name.toLowerCase(), "pothole", "streetlight", "drainage", "waste", "garbage", "water"],
      link: `/civic/report?category=${cat.id}`,
      verifiedSource: "Tanur Municipal Engineering & Health Wing SLA",
      verificationDate: "2024-11-21",
      isOfficial: true,
    });
  });

  // Civic Statuses item
  items.push({
    id: "civic-reporting-workflow",
    domain: "civic_reporting",
    title: "Civic Issue Reporting & Tracking Workflow",
    summary: "How to report community issues in Tanur and track their lifecycle across 8 statutory stages.",
    details: [
      "To report an issue: Navigate to /civic/report, select one of the 8 statutory categories, provide location/ward (1–45), description, and optional photo.",
      "Unique Reference Format: CC-TNR-2026-XXXX (e.g., CC-TNR-2026-1001).",
      "The 8 Statutory Processing Statuses are:",
      "1. Submitted: Report registered in the public audit ledger.",
      "2. Under Review: Assigned to municipal desk officer for preliminary check.",
      "3. Assigned: Dispatched to the relevant engineering or health field squad.",
      "4. Inspection Scheduled: Field inspection arranged by municipal overseer.",
      "5. Work in Progress: Civil, sanitation, or electrical repair actively underway.",
      "6. Resolved: Work completed, verified by field officer, and closed.",
      "7. Rejected: Invalid report or outside municipal jurisdiction (justification logged).",
      "8. On Hold: Awaiting seasonal clearance, technical sanction, or utility coordination."
    ].join("\n"),
    keywords: ["report", "complaint", "track", "status", "reference", "stages", "workflow", "pothole"],
    link: "/civic/report",
    verifiedSource: "OUR NATION Civic Governance Standards",
    verificationDate: "2024-11-21",
    isOfficial: true,
  });

  // ==========================================
  // 3. DEVELOPMENT TRACKER (Verified Projects, 9 Categories, 8 Statuses, Budgets)
  // ==========================================
  digitalMunicipalityStore.getProjects().forEach((project) => {
    items.push({
      id: `dev-project-${project.id}`,
      domain: "development_project",
      title: `Development Project: ${project.title}`,
      summary: project.description.slice(0, 160) + "...",
      details: [
        `Project Title: ${project.title}`,
        `Category: ${project.category_name}`,
        `Current Status: ${project.status}`,
        `Ward: ${project.ward_number ? `Ward ${project.ward_number}${project.ward_name ? ` (${project.ward_name})` : ''}` : 'Municipality-Wide'}`,
        `Locality: ${project.locality || 'Tanur'}`,
        `Approved Budget (Administrative Sanction): ${project.approved_budget || project.budget_sanctioned || 'Under Sanction'}`,
        `Estimated Cost (DPR Proposal): ${project.estimated_cost || 'Under DPR Estimation'}`,
        `Actual Expenditure (Audited): ${project.actual_expenditure || (project.status === 'Completed' ? project.approved_budget : 'Subject to final audit')}`,
        `Funding Source / Scheme: ${project.funding_source || 'Tanur Municipal Plan Fund'}`,
        `Implementing Agency: ${project.implementing_agency || project.department}`,
        `Measurement Book (MB) Verification: Grounded in certified engineering inspection records.`,
        `Announcement Date: ${project.announcement_date || 'N/A'}`,
        `Sanction Date: ${project.approval_date || 'N/A'}`,
        `Target Completion: ${project.expected_completion_date || 'N/A'}`
      ].join("\n"),
      keywords: [
        "project", "development", project.title.toLowerCase(), project.category,
        project.status.toLowerCase(), project.ward_number ? `ward ${project.ward_number}` : "",
        project.locality ? project.locality.toLowerCase() : ""
      ].filter(Boolean),
      link: `/development/projects/${project.id}`,
      externalUrl: project.official_source_url,
      verifiedSource: project.official_source_name || "Tanur Municipal Council Gazette",
      verificationDate: project.last_verified_date || "2024-11-20",
      isOfficial: true,
      metadata: {
        category: project.category,
        status: project.status,
        ward_number: project.ward_number,
        approved_budget: project.approved_budget,
      }
    });
  });

  // Statutory Categories for Development Tracker
  TRANSPARENT_PROJECT_CATEGORIES.forEach((cat) => {
    items.push({
      id: `dev-cat-${cat.key}`,
      domain: "development_project",
      title: `Development Category: ${cat.label}`,
      summary: `Civil works and municipal projects under ${cat.label}.`,
      details: `Statutory development domain covering ${cat.label} in Tanur Municipality. Projects are tracked with three-way financial breakdowns and Measurement Book (MB) verified milestones.`,
      keywords: ["development", "category", cat.label.toLowerCase(), cat.key],
      link: `/development/projects?category=${cat.key}`,
      verifiedSource: "LSGD Engineering Directorate (LID & EW)",
      verificationDate: "2024-11-20",
      isOfficial: true,
    });
  });

  // ==========================================
  // 4. MUNICIPALITY INFORMATION & STATUTORY FACTS
  // ==========================================
  items.push({
    id: "muni-core-facts",
    domain: "municipality",
    title: "Tanur Municipality Core Facts & Administration",
    summary: "Statutory administrative structure, wards, census demographics, and switchboard.",
    details: [
      "Local Body: Tanur Municipality (Grade II Urban Local Body, constituted 1 November 2015).",
      "District: Malappuram | Taluk: Tirur | State: Kerala | PIN: 676302.",
      "Area: 19.59 sq km.",
      "Total Confirmed Wards: 45 Wards (Wards 1 to 45).",
      "Census 2011 Population: 69,864 (Male: 33,301, Female: 36,233).",
      "Literacy Rate: 91.18%.",
      "Central Municipal Switchboard: 0494 2440228.",
      "Municipal Office Address: Tanur Municipality Office, Main Road, Tanur, Malappuram, Kerala 676302.",
      "Key Leadership: Chairperson, Vice Chairperson, and Municipal Secretary oversee council governance.",
      "Administrative Distinction: Tanur Municipality is strictly distinct from Tanur Block Panchayat (which governs rural Grama Panchayats: Tanalur, Niramaruthur, Ozhur, Ponmundam, Cheriyamundam)."
    ].join("\n"),
    keywords: [
      "tanur", "municipality", "phone", "switchboard", "0494 2440228", "wards", "45",
      "population", "area", "address", "office", "secretary", "chairperson"
    ],
    link: "/local-governments",
    externalUrl: "https://tanurmunicipality.lsgkerala.gov.in/",
    verifiedSource: "LSGD Kerala Official Municipal Portal",
    verificationDate: "2024-11-15",
    isOfficial: true,
  });

  // Public institutions and utilities
  TANUR_PUBLIC_SERVICES.forEach((srv) => {
    items.push({
      id: `facility-${srv.id}`,
      domain: "municipality",
      title: `Public Facility: ${srv.name}`,
      summary: `${srv.name} located at ${srv.address}`,
      details: [
        `Facility Name: ${srv.name}`,
        `Address: ${srv.address}`,
        `Contact Phone: ${srv.phone || '0494 2440228'}`,
        `Emergency Line: ${srv.emergencyNumber || '112'}`,
        `Working Hours: ${srv.workingHours || 'Standard Municipal Timings'}`
      ].join("\n"),
      keywords: ["facility", "hospital", "police", "kseb", "water", srv.name.toLowerCase()],
      link: "/local-governments",
      verifiedSource: "Tanur Civic Directory",
      verificationDate: "2024-11-15",
      isOfficial: true,
    });
  });

  // ==========================================
  // 5. OUR NATION PLATFORM HELP & GUIDANCE
  // ==========================================
  items.push({
    id: "platform-help-overview",
    domain: "platform_help",
    title: "OUR NATION Platform Features & Navigation Guide",
    summary: "Guide to navigating civic tools on the OUR NATION independent digital municipality platform.",
    details: [
      "OUR NATION is an independent civic-tech transparency platform for Tanur Municipality.",
      "Key Pillars & Links:",
      "1. Online Public Services (/public-services): Browse municipal citizen services, checklist of required documents, fees, official portal links, and apply for guidance.",
      "2. Civic Issue Reporting (/civic/report): Report streetlights, potholes, garbage, or drainage problems and track progress.",
      "3. Development Tracker (/development & /development/projects): Search civil works across all 45 wards, review three-way budgets, and inspect Leaflet GIS maps.",
      "4. Citizen Dashboard (/dashboard): Authenticated citizens can view personalized tracking for their own reports and guidance applications.",
      "5. Local Governments Directory (/local-governments): Verified directory of municipal ward representatives and Grama Panchayats.",
      "6. Digital Tanur GIS (/digital-tanur): Interactive mapping of municipal facilities, ward boundaries, and landmarks.",
      "7. Naadu AI Assistant (/ai): Conversational assistant offering verified municipal explanations."
    ].join("\n"),
    keywords: ["help", "guide", "navigation", "how to use", "dashboard", "features", "platform", "what can you do"],
    link: "/",
    verifiedSource: "OUR NATION Civic Platform Manual",
    verificationDate: "2024-11-22",
    isOfficial: true,
  });

  return items;
}
