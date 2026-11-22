import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const ARTIFACT_DIR = "C:\\Users\\student\\.gemini\\antigravity\\brain\\0d01a20c-33c1-4249-bf7f-588f8078a376";
const VERCEL_BASE = "https://our-nation.vercel.app";

const screenshots = [
  { name: "audit_homepage_desktop.png", url: `${VERCEL_BASE}/`, width: 1440, height: 900 },
  { name: "audit_homepage_tablet.png", url: `${VERCEL_BASE}/`, width: 768, height: 1024 },
  { name: "audit_homepage_mobile.png", url: `${VERCEL_BASE}/`, width: 375, height: 812 },
  { name: "audit_civic_connect.png", url: `${VERCEL_BASE}/civic-connect`, width: 1440, height: 900 },
  { name: "audit_public_services.png", url: `${VERCEL_BASE}/public-services`, width: 1440, height: 900 },
  { name: "audit_local_governments.png", url: `${VERCEL_BASE}/local-governments`, width: 1440, height: 900 },
  { name: "audit_login.png", url: `${VERCEL_BASE}/login`, width: 1440, height: 900 },
  { name: "audit_dashboard.png", url: `${VERCEL_BASE}/dashboard`, width: 1440, height: 900 }
];

function capture(item) {
  return new Promise((resolve, reject) => {
    const targetFile = path.join(ARTIFACT_DIR, item.name);
    console.log(`Capturing: ${item.name} (${item.width}x${item.height}) from ${item.url}...`);
    
    const p = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless',
      '--disable-gpu',
      `--screenshot=${targetFile}`,
      `--window-size=${item.width},${item.height}`,
      item.url
    ]);

    let errOutput = '';
    p.stderr.on('data', d => { errOutput += d.toString(); });
    p.on('close', code => {
      if (fs.existsSync(targetFile)) {
        const stats = fs.statSync(targetFile);
        console.log(`  ✓ Saved ${item.name} (${stats.size} bytes)`);
        resolve(targetFile);
      } else {
        console.error(`  ✗ Failed to save ${item.name}: ${errOutput}`);
        resolve(null);
      }
    });
  });
}

async function run() {
  for (const item of screenshots) {
    await capture(item);
  }
  console.log("\nAll audit screenshots captured successfully!");
}

run().catch(console.error);
