import fs from "fs";

const html = fs.readFileSync("tanur_members.html", "utf8");

// Split by member-card class
const cards = html.split(/member-card/g);
console.log(`Found ${cards.length - 1} card segments.`);

const members = [];

for (let i = 1; i < cards.length; i++) {
  const chunk = cards[i];

  // Committee data attribute
  const commMatch = chunk.match(/data-committee="([^"]*)"/);
  const committeeAttr = commMatch ? commMatch[1] : "";

  // Image src and alt
  const imgMatch = chunk.match(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"/i) ||
                   chunk.match(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"/i);
  let photoUrl = "";
  let imgAlt = "";
  if (imgMatch) {
    if (imgMatch[1].startsWith("http") || imgMatch[1].startsWith("/")) {
      photoUrl = imgMatch[1];
      imgAlt = imgMatch[2];
    } else {
      photoUrl = imgMatch[2];
      imgAlt = imgMatch[1];
    }
  }

  // Name from card-title
  const titleMatch = chunk.match(/<h5 class="card-title[^"]*">([\s\S]*?)<\/h5>/i);
  const name = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : "";

  // Paragraphs for designation & ward info
  const pMatches = chunk.match(/<p class="card-text[^"]*">([\s\S]*?)<\/p>/gi) || [];
  const pTexts = pMatches.map((p) =>
    p
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );

  const designation = pTexts[0] || "";
  const wardLine = pTexts[1] || "";

  // Ward number and name from wardLine e.g. "35, Civil Station" or "1, Ottumpuram"
  let wardNumber = null;
  let wardName = "";
  if (wardLine) {
    const parts = wardLine.split(",");
    if (parts.length >= 2) {
      wardNumber = parseInt(parts[0].trim(), 10);
      wardName = parts.slice(1).join(",").trim();
    } else {
      const numMatch = wardLine.match(/^(\d+)\s*(.*)$/);
      if (numMatch) {
        wardNumber = parseInt(numMatch[1], 10);
        wardName = numMatch[2].trim();
      }
    }
  }

  // Member profile url / ID
  const linkMatch = chunk.match(/href="([^"]*\/member\/[^"]*)"/i);
  const profilePath = linkMatch ? linkMatch[1] : "";

  if (name && wardNumber !== null && !isNaN(wardNumber)) {
    members.push({
      wardNumber,
      wardName,
      name,
      designation,
      committeeAttr,
      photoUrl,
      imgAlt,
      profilePath: profilePath.startsWith("http") ? profilePath : `https://tanurmunicipality.lsgkerala.gov.in${profilePath}`
    });
  } else {
    console.log(`Skipping chunk ${i} - Name: "${name}", Ward: "${wardLine}"`);
  }
}

console.log(`\nSuccessfully parsed ${members.length} member records.`);

// Sort by wardNumber
members.sort((a, b) => a.wardNumber - b.wardNumber);

// Check ward numbers
const wardNums = members.map(m => m.wardNumber);
console.log(`Ward numbers present: min=${Math.min(...wardNums)}, max=${Math.max(...wardNums)}, total=${members.length}`);

// Check for missing numbers between 1 and 45
const missing = [];
for (let w = 1; w <= 45; w++) {
  if (!wardNums.includes(w)) missing.push(w);
}
console.log("Missing ward numbers between 1 and 45:", missing);

// Check duplicate wards
const dupes = wardNums.filter((item, index) => wardNums.indexOf(item) !== index);
console.log("Duplicate ward numbers:", dupes);

// Photos check
const withPhoto = members.filter(m => m.photoUrl && m.photoUrl.startsWith("http"));
console.log(`Members with valid photo URL: ${withPhoto.length} / ${members.length}`);

// Save parsed data to JSON
fs.writeFileSync("tanur_official_members.json", JSON.stringify(members, null, 2));
console.log("Saved extracted data to tanur_official_members.json");
