import fs from "fs";

const html = fs.readFileSync("tanur_home.html", "utf8");

function extractLeader(name) {
  const idx = html.indexOf(name);
  if (idx === -1) return null;
  const snippet = html.substring(Math.max(0, idx - 500), Math.min(html.length, idx + 500));
  const imgMatch = snippet.match(/src="([^"]*(?:jpg|jpeg|png)[^"]*)"/i);
  return {
    name,
    photoUrl: imgMatch ? imgMatch[1] : null,
    snippet: snippet.replace(/\s+/g, " ")
  };
}

console.log("Nasla Basheer:", extractLeader("Nasla Basheer"));
console.log("Ashraf M P:", extractLeader("Ashraf M P"));
console.log("Hazeena K P:", extractLeader("Hazeena K P"));
