import fs from "fs";

function scan(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const hits = [];
  lines.forEach((line, idx) => {
    if (/[\u0D00-\u0D7F]/.test(line)) {
      hits.push({ line: idx + 1, text: line.trim() });
    }
  });
  console.log(`Found ${hits.length} lines with Malayalam in ${filePath}:`);
  hits.forEach(h => console.log(`L${h.line}: ${h.text}`));
}

scan(process.argv[2] || "src/app/profile/page.tsx");
