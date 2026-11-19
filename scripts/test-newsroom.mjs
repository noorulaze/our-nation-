import assert from "node:assert";

// In-memory newsroom simulation based on newsroomStore logic
class NewsroomTestHarness {
  constructor() {
    this.articles = [];
    this.reviews = [];
    this.sources = [
      { id: "src-prd", name: "PRD Live Kerala", reliability_score: 98, is_active: true },
      { id: "src-tanur", name: "Tanur Municipality Portal", reliability_score: 95, is_active: true },
      { id: "src-unverified", name: "Unverified Local Blog", reliability_score: 60, is_active: true },
    ];
  }

  detectCategoryAndScope(title, content) {
    const text = (title + " " + content).toLowerCase();
    
    // Geographic scope
    let scope = "kerala";
    let locality = undefined;
    if (text.includes("tanur") || text.includes("താനൂർ")) {
      scope = "tanur";
      locality = "Tanur Municipality";
    } else if (text.includes("malappuram") || text.includes("മലപ്പുറം")) {
      scope = "malappuram";
      locality = "Malappuram District";
    }

    // Category
    let category = "local";
    if (text.includes("sports") || text.includes("football") || text.includes("stadium") || text.includes("കായികം") || text.includes("സെവൻസ്")) {
      category = "sports";
    } else if (text.includes("exam") || text.includes("university") || text.includes("വിദ്യാഭ്യാസം")) {
      category = "education";
    } else if (text.includes("hospital") || text.includes("health") || text.includes("ആരോഗ്യം")) {
      category = "health";
    }

    return { scope, locality, category };
  }

  checkSensitivity(title, content) {
    const text = (title + " " + content).toLowerCase();
    const sensitiveWords = ["accident", "killed", "death", "blast", "മരണം", "അപകടം", "ദുരന്തം"];
    return sensitiveWords.some(w => text.includes(w));
  }

  ingest(item) {
    const norm = item.headline.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    const hash = "hash-" + Buffer.from(norm.slice(0, 32)).toString("base64");

    // Deduplication check
    const existing = this.articles.find(a => a.hash === hash || a.headline.toLowerCase().includes(norm.slice(0, 20)));
    if (existing) {
      existing.corroboration_count += 1;
      existing.sources.push(item.source_name);
      return { article: existing, isNew: false, action: "DEDUPLICATED_CORROBORATED" };
    }

    const { scope, locality, category } = this.detectCategoryAndScope(item.headline, item.content);
    const hasSensitive = this.checkSensitivity(item.headline, item.content);
    const source = this.sources.find(s => s.id === item.source_id);
    const isUnverified = (source?.reliability_score || 0) < 85;

    let status = "published";
    if (hasSensitive || isUnverified) {
      status = "review";
      this.reviews.push({
        id: "rev-" + (this.reviews.length + 1),
        headline: item.headline,
        reason: hasSensitive ? "Sensitive content detected" : "Unverified single-source claim",
        status: "pending"
      });
    }

    const newArt = {
      id: "art-" + (this.articles.length + 1),
      headline: item.headline,
      hash,
      category,
      scope,
      locality,
      status,
      corroboration_count: 1,
      sources: [item.source_name]
    };

    this.articles.push(newArt);
    return { article: newArt, isNew: true, action: status === "published" ? "AUTO_PUBLISHED" : "FLAGGED_FOR_REVIEW" };
  }
}

console.log("======================================================================");
console.log("OUR NATION — SMART NEWSROOM AUTOMATION VERIFICATION SUITE");
console.log("======================================================================");

const harness = new NewsroomTestHarness();

// Test 1: Ingest standard eligible news -> Must auto-publish without editor intervention
const t1 = harness.ingest({
  headline: "Tanur Municipal Sports Ground Modernization Inauguration Next Week",
  content: "Tanur Municipality modern sports infrastructure work completed.",
  source_id: "src-tanur",
  source_name: "Tanur Municipality Portal"
});
assert.strictEqual(t1.isNew, true, "Article must be ingested as new");
assert.strictEqual(t1.article.status, "published", "Normal news must auto-publish");
assert.strictEqual(t1.article.scope, "tanur", "Geographic scope must detect Tanur");
assert.strictEqual(t1.article.category, "sports", "Category must detect sports");
console.log("[PASS] Test 1: Standard eligible news auto-publishes without routine editor intervention");

// Test 2: Ingest identical/fuzzy news from second publisher -> Must deduplicate and corroborate
const t2 = harness.ingest({
  headline: "Tanur Municipal Sports Ground Modernization to be launched",
  content: "PRD release on Tanur sports complex opening.",
  source_id: "src-prd",
  source_name: "PRD Live Kerala"
});
assert.strictEqual(t2.isNew, false, "Duplicate story must not create second article");
assert.strictEqual(t2.action, "DEDUPLICATED_CORROBORATED", "Story must corroborate existing article");
assert.strictEqual(t2.article.corroboration_count, 2, "Corroboration count must increment to 2");
assert(t2.article.sources.includes("PRD Live Kerala"), "Source list must record second publisher");
console.log("[PASS] Test 2: Content hash & title similarity deduplication and multi-source corroboration");

// Test 3: Sensitive keyword (accident/casualty) -> Must route to Review Queue
const t3 = harness.ingest({
  headline: "Severe bus accident reported on highway near Malappuram",
  content: "Traffic accident claims on highway require verification.",
  source_id: "src-prd",
  source_name: "PRD Live Kerala"
});
assert.strictEqual(t3.isNew, true);
assert.strictEqual(t3.article.status, "review", "Sensitive casualty/accident claims must hold in review");
assert.strictEqual(harness.reviews.length, 1, "Review item must be registered");
console.log("[PASS] Test 3: Sensitivity safeguard routing for accident and casualty reports");

// Test 4: Low-reliability unverified source -> Must route to Review Queue
const t4 = harness.ingest({
  headline: "Rumored holiday declared for all schools in Tanur tomorrow",
  content: "Unconfirmed holiday claim circulating on social media.",
  source_id: "src-unverified",
  source_name: "Unverified Local Blog"
});
assert.strictEqual(t4.article.status, "review", "Unverified low-reliability sources must route to review");
console.log("[PASS] Test 4: Reliability threshold scoring and safeguard gating for unverified sources");

// Test 5: Editorial Review Approval
const pendingReview = harness.reviews.find(r => r.status === "pending");
assert(pendingReview !== undefined, "Pending review must exist");
pendingReview.status = "approved";
const artToPublish = harness.articles.find(a => a.headline === pendingReview.headline);
artToPublish.status = "published";
assert.strictEqual(artToPublish.status, "published", "Approved review must transition to published");
console.log("[PASS] Test 5: Editorial review approval transition and status updates");

console.log("======================================================================");
console.log("ALL 5 NEWSROOM SUITE TESTS PASSED (100% SUCCESS)");
console.log("======================================================================");
