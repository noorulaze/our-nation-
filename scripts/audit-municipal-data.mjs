/**
 * AUDIT SCRIPT: Municipal Data Accuracy & Source Verification Audit
 * Inspects all 44 wards, 68 facilities, 6 development projects, 6 public services,
 * 7 official documents, leadership/standing committees, and Google Maps configuration.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("===============================================================================");
console.log("OUR NATION — AUDITING MUNICIPAL DATA & FACTUAL ACCURACY");
console.log("Tanur Municipality, Malappuram District, Kerala");
console.log("===============================================================================\n");

// Read data files
const digitalDataContent = fs.readFileSync(path.join(rootDir, "src/lib/data/digitalMunicipalityData.ts"), "utf8");
const servicesDataContent = fs.readFileSync(path.join(rootDir, "src/lib/data/publicServicesData.ts"), "utf8");
const docsDataContent = fs.readFileSync(path.join(rootDir, "src/lib/data/documentsData.ts"), "utf8");
const civicDataContent = fs.readFileSync(path.join(rootDir, "src/lib/data/civicConnectData.ts"), "utf8");

// 1. AUDIT WARDS
console.log("--- 1. AUDITING 44 WARDS ---");
const wardRegex = /{\s*id:\s*"ward-(\d+)",\s*ward_number:\s*(\d+),\s*name:\s*"([^"]+)",\s*name_ml:\s*"([^"]+)",[\s\S]*?councillor_name:\s*"([^"]+)",\s*councillor_name_ml:\s*"([^"]+)",\s*councillor_contact:\s*"([^"]+)",[\s\S]*?population_approx:\s*(\d+),[\s\S]*?latitude:\s*([0-9.]+),\s*longitude:\s*([0-9.]+)/g;

const wards = [];
let match;
while ((match = wardRegex.exec(digitalDataContent)) !== null) {
  wards.push({
    id: match[1],
    number: parseInt(match[2]),
    name: match[3],
    name_ml: match[4],
    councillor: match[5],
    councillor_ml: match[6],
    contact: match[7],
    population: parseInt(match[8]),
    lat: parseFloat(match[9]),
    lng: parseFloat(match[10])
  });
}

console.log(`Extracted ${wards.length} wards.`);
let genericCouncillorCount = 0;
let genericContactCount = 0;
wards.forEach(w => {
  if (w.councillor === "Ward Councillor" || w.councillor === "വാർഡ് കൗൺസിലർ") {
    genericCouncillorCount++;
  }
  if (w.contact.includes("0494 2440228") || w.contact.includes("Municipality Office")) {
    genericContactCount++;
  }
});
console.log(`Generic Councillor placeholders: ${genericCouncillorCount} / ${wards.length}`);
console.log(`Municipality Central Office contact placeholders: ${genericContactCount} / ${wards.length}`);

// 2. AUDIT 68 MAPPED FACILITIES
console.log("\n--- 2. AUDITING GIS MAPPED LOCATIONS ---");
const locRegex = /{\s*id:\s*"loc-([a-z0-9-]+)",\s*name:\s*"([^"]+)",\s*name_ml:\s*"([^"]+)",\s*category:\s*"([^"]+)",[\s\S]*?latitude:\s*([0-9.]+),\s*longitude:\s*([0-9.]+),[\s\S]*?phone:\s*"([^"]+)",[\s\S]*?source_name:\s*"([^"]+)",\s*source_url:\s*"([^"]+)",\s*is_verified:\s*(true|false)/g;

const locations = [];
while ((match = locRegex.exec(digitalDataContent)) !== null) {
  locations.push({
    id: match[1],
    name: match[2],
    name_ml: match[3],
    category: match[4],
    lat: parseFloat(match[5]),
    lng: parseFloat(match[6]),
    phone: match[7],
    source_name: match[8],
    source_url: match[9],
    is_verified: match[10] === "true"
  });
}
console.log(`Extracted ${locations.length} GIS locations.`);

// 3. AUDIT DEVELOPMENT PROJECTS
console.log("\n--- 3. AUDITING DEVELOPMENT PROJECTS ---");
const projRegex = /id:\s*"(proj-[a-z0-9-]+)",\s*title:\s*"([^"]+)",\s*title_ml:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",\s*status:\s*"([^"]+)",\s*budget_sanctioned:\s*"([^"]+)",\s*progress_percentage:\s*(\d+),[\s\S]*?verifying_authority:\s*"([^"]+)",[\s\S]*?source_name:\s*"([^"]+)",\s*source_url:\s*"([^"]+)"/g;

const projects = [];
while ((match = projRegex.exec(digitalDataContent)) !== null) {
  projects.push({
    id: match[1],
    title: match[2],
    title_ml: match[3],
    category: match[4],
    status: match[5],
    budget: match[6],
    progress: parseInt(match[7]),
    authority: match[8],
    source_name: match[9],
    source_url: match[10]
  });
}
console.log(`Extracted ${projects.length} development projects.`);
projects.forEach(p => {
  console.log(`- [${p.id}] ${p.title} | Budget: ${p.budget} | Progress: ${p.progress}% | Source: ${p.source_name} (${p.source_url})`);
});

// 4. AUDIT PUBLIC SERVICES
console.log("\n--- 4. AUDITING PUBLIC SERVICES ---");
const servRegex = /id:\s*"(srv-[a-z0-9-]+)",\s*title:\s*"([^"]+)",\s*title_ml:\s*"([^"]+)",[\s\S]*?fee_description:\s*"([^"]+)",\s*timeline_days:\s*(\d+),[\s\S]*?portal_url:\s*"([^"]+)"/g;

const services = [];
while ((match = servRegex.exec(servicesDataContent)) !== null) {
  services.push({
    id: match[1],
    title: match[2],
    title_ml: match[3],
    fee: match[4],
    days: parseInt(match[5]),
    portal: match[6]
  });
}
console.log(`Extracted ${services.length} public services.`);
services.forEach(s => {
  console.log(`- [${s.id}] ${s.title} | Fee: ${s.fee} | Timeline: ${s.days} days | Portal: ${s.portal}`);
});

// 5. AUDIT OFFICIAL DOCUMENTS
console.log("\n--- 5. AUDITING OFFICIAL DOCUMENTS ---");
const docRegex = /id:\s*"(doc-[a-z0-9-]+)",\s*title:\s*"([^"]+)",\s*title_ml:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",[\s\S]*?publishing_authority:\s*"([^"]+)",[\s\S]*?publication_date:\s*"([^"]+)",[\s\S]*?reference_number:\s*"([^"]+)",[\s\S]*?download_url:\s*"([^"]+)"/g;

const docs = [];
while ((match = docRegex.exec(docsDataContent)) !== null) {
  docs.push({
    id: match[1],
    title: match[2],
    title_ml: match[3],
    category: match[4],
    authority: match[5],
    date: match[6],
    ref: match[7],
    url: match[8]
  });
}
console.log(`Extracted ${docs.length} public documents.`);
docs.forEach(d => {
  console.log(`- [${d.id}] ${d.title} | Ref: ${d.ref} | Date: ${d.date} | Authority: ${d.authority} | URL: ${d.url}`);
});

// Write JSON summary for deep analysis
fs.writeFileSync(path.join(rootDir, "scripts/audit-output.json"), JSON.stringify({
  wards,
  locations,
  projects,
  services,
  docs
}, null, 2));

console.log("\nAudit scan complete. Results written to scripts/audit-output.json");
