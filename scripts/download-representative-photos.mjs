import fs from "fs";
import path from "path";
import https from "https";

const members = JSON.parse(fs.readFileSync("tanur_official_members.json", "utf8"));
const outputDir = path.join(process.cwd(), "public/representatives/tanur-municipality");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    https.get(url, { rejectUnauthorized: false, headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode !== 200) {
        console.warn(`Failed to download ${url}: HTTP ${res.statusCode}`);
        return resolve({ success: false, error: `HTTP ${res.statusCode}` });
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const buf = Buffer.concat(chunks);
        if (buf.length > 500) { // Valid image payload
          fs.writeFileSync(destPath, buf);
          resolve({ success: true, bytes: buf.length });
        } else {
          resolve({ success: false, error: "Image too small/corrupted" });
        }
      });
    }).on("error", (err) => {
      resolve({ success: false, error: err.message });
    });
  });
}

async function run() {
  console.log(`Starting download of ${members.length} representative photos...`);
  let successCount = 0;
  let failCount = 0;

  for (const m of members) {
    const filename = `ward-${String(m.wardNumber).padStart(2, "0")}.jpeg`;
    const destPath = path.join(outputDir, filename);
    const localRelPath = `/representatives/tanur-municipality/${filename}`;

    if (m.photoUrl) {
      const res = await downloadImage(m.photoUrl, destPath);
      if (res.success) {
        m.localPhotoUrl = localRelPath;
        m.photoStatus = "verified_photo";
        m.photoType = "official";
        successCount++;
        console.log(`✓ Ward ${m.wardNumber} (${m.name}): Saved ${res.bytes} bytes -> ${filename}`);
      } else {
        m.localPhotoUrl = "/placeholder-representative.svg";
        m.photoStatus = "awaiting_photo";
        m.photoType = "placeholder";
        failCount++;
        console.warn(`✗ Ward ${m.wardNumber} (${m.name}): ${res.error}`);
      }
    } else {
      m.localPhotoUrl = "/placeholder-representative.svg";
      m.photoStatus = "awaiting_photo";
      m.photoType = "placeholder";
      failCount++;
      console.warn(`✗ Ward ${m.wardNumber} (${m.name}): No photo URL`);
    }
  }

  console.log(`\nDownload summary: ${successCount} succeeded, ${failCount} failed.`);
  fs.writeFileSync("tanur_official_members.json", JSON.stringify(members, null, 2));
}

run();
