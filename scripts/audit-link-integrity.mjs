import fs from 'fs';
import path from 'path';

const SRC_APP_DIR = path.resolve('src/app');
const SRC_DIR = path.resolve('src');

// 1. Discover all routes in src/app
function getAppRoutes(dir, baseRoute = '') {
  const routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Ignore route groups (e.g., (auth)) in the route path URL, or handle dynamic segments
      const segment = entry.name;
      let nextBase = baseRoute;
      if (segment.startsWith('(') && segment.endsWith(')')) {
        // route group - does not affect URL pathname
      } else {
        nextBase = `${baseRoute}/${segment}`;
      }
      routes.push(...getAppRoutes(path.join(dir, segment), nextBase));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.jsx' || entry.name === 'page.js') {
      routes.push(baseRoute === '' ? '/' : baseRoute);
    } else if (entry.name === 'route.ts' || entry.name === 'route.js') {
      routes.push(baseRoute === '' ? '/' : baseRoute);
    }
  }
  return routes;
}

const discoveredRoutes = Array.from(new Set(getAppRoutes(SRC_APP_DIR)));
console.log(`Discovered ${discoveredRoutes.length} route endpoints in src/app.`);

// Helper to check if a route pattern matches a target URL
function routeMatches(targetPath, knownRoutes) {
  // Strip hash and query parameters
  const cleanPath = targetPath.split('?')[0].split('#')[0];
  if (!cleanPath || cleanPath === '') return true;

  // Exact match
  if (knownRoutes.includes(cleanPath)) return true;

  // Dynamic route matching
  const targetSegments = cleanPath.split('/').filter(Boolean);

  for (const route of knownRoutes) {
    const routeSegments = route.split('/').filter(Boolean);
    if (routeSegments.length !== targetSegments.length) continue;

    let match = true;
    for (let i = 0; i < routeSegments.length; i++) {
      const rSeg = routeSegments[i];
      if (rSeg.startsWith('[') && rSeg.endsWith(']')) {
        // dynamic segment matches anything
        continue;
      }
      if (rSeg !== targetSegments[i]) {
        match = false;
        break;
      }
    }
    if (match) return true;
  }

  return false;
}

// 2. Scan files in src/ for href="..."
function scanFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      files.push(...scanFiles(fullPath));
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = scanFiles(SRC_DIR);
console.log(`Scanning ${allFiles.length} files in src/ for internal link references...`);

const linkRegex = /href=["'](\/[^"']*)["']/g;
const pushRegex = /router\.push\(["'](\/[^"']*)["']\)/g;

const deadLinks = [];
const checkedLinks = new Set();

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[1];
    checkLink(link, file);
  }

  while ((match = pushRegex.exec(content)) !== null) {
    const link = match[1];
    checkLink(link, file);
  }
}

function checkLink(link, file) {
  // Ignore static assets, mailto, tel, api routes if not matched
  if (link.startsWith('/_next') || link.startsWith('/images') || link.startsWith('/favicon') || link.endsWith('.png') || link.endsWith('.svg') || link.endsWith('.jpg') || link.endsWith('.webp')) {
    return;
  }

  const key = `${link} -> ${file}`;
  if (checkedLinks.has(key)) return;
  checkedLinks.add(key);

  const isMatched = routeMatches(link, discoveredRoutes);
  if (!isMatched) {
    deadLinks.push({ link, file: path.relative(process.cwd(), file) });
  }
}

console.log(`\n--- LINK INTEGRITY AUDIT RESULTS ---`);
console.log(`Total unique internal link references checked: ${checkedLinks.size}`);
if (deadLinks.length === 0) {
  console.log(`PASSED: All internal routes are valid and correspond to defined Next.js routes!`);
} else {
  console.log(`FOUND ${deadLinks.length} POTENTIAL DEAD / UNMATCHED INTERNAL LINKS:`);
  deadLinks.forEach(d => console.log(`  - [${d.link}] in ${d.file}`));
}
