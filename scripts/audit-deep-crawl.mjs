import fs from 'node:fs';
import path from 'node:path';

const VERCEL_BASE = "https://our-nation.vercel.app";

async function deepCrawl() {
  console.log("===============================================================================");
  console.log("OUR NATION — COMPREHENSIVE LINK & ASSET INTEGRITY CRAWLER");
  console.log(`Base URL: ${VERCEL_BASE}`);
  console.log("===============================================================================\n");

  const visitedUrls = new Set();
  const brokenLinks = [];
  const validLinks = [];
  const brokenImages = [];
  const validImages = [];

  // Core municipal pages to crawl for internal links and assets
  const seedPages = [
    "/",
    "/public-services",
    "/tanur",
    "/civic-connect",
    "/news",
    "/contact",
    "/local-governments",
    "/digital-municipality",
    "/development-tracker",
    "/documents",
    "/peoples-voice",
    "/leadership",
    "/ai",
    "/about",
    "/login",
    "/register",
    "/reset-password",
    "/profile",
    "/dashboard"
  ];

  const extractedLinks = new Set();
  const extractedImages = new Set();

  for (const pagePath of seedPages) {
    try {
      const pageUrl = `${VERCEL_BASE}${pagePath}`;
      console.log(`Crawling: ${pagePath}...`);
      const res = await fetch(pageUrl, {
        headers: { "User-Agent": "OurNationAuditBot/1.0" }
      });

      if (res.status >= 400) {
        brokenLinks.push({ url: pageUrl, source: "seed", status: res.status });
        continue;
      }

      validLinks.push({ url: pageUrl, status: res.status });
      const html = await res.text();

      // Extract href links
      const hrefRegex = /href=["'](\/[^"'#?]*)/g;
      let match;
      while ((match = hrefRegex.exec(html)) !== null) {
        const link = match[1];
        if (link && !link.startsWith("//") && !link.startsWith("/_next")) {
          extractedLinks.add(link);
        }
      }

      // Extract image sources
      const imgRegex = /src=["'](\/[^"']*\.(?:png|jpg|jpeg|svg|webp))/gi;
      while ((match = imgRegex.exec(html)) !== null) {
        const img = match[1];
        if (img && !img.startsWith("//")) {
          extractedImages.add(img);
        }
      }
    } catch (err) {
      brokenLinks.push({ url: `${VERCEL_BASE}${pagePath}`, source: "seed", error: err.message });
    }
  }

  console.log(`\nDiscovered ${extractedLinks.size} unique internal links and ${extractedImages.size} unique image assets.`);
  console.log("\n--- Testing Extracted Internal Links ---");

  for (const link of extractedLinks) {
    try {
      const targetUrl = `${VERCEL_BASE}${link}`;
      const res = await fetch(targetUrl, {
        method: "HEAD",
        headers: { "User-Agent": "OurNationAuditBot/1.0" },
        redirect: "manual"
      });

      // 2xx and 3xx are valid (3xx redirects for protected admin routes or trailing slashes)
      if (res.status < 400) {
        validLinks.push({ url: link, status: res.status });
        console.log(`  ✓ Link OK [${res.status}]: ${link}`);
      } else {
        // Retry with GET in case HEAD is not allowed
        const getRes = await fetch(targetUrl, {
          method: "GET",
          headers: { "User-Agent": "OurNationAuditBot/1.0" },
          redirect: "manual"
        });
        if (getRes.status < 400) {
          validLinks.push({ url: link, status: getRes.status });
          console.log(`  ✓ Link OK (GET) [${getRes.status}]: ${link}`);
        } else {
          brokenLinks.push({ url: link, status: getRes.status });
          console.error(`  ✗ BROKEN LINK [${getRes.status}]: ${link}`);
        }
      }
    } catch (err) {
      brokenLinks.push({ url: link, error: err.message });
      console.error(`  ✗ LINK ERROR: ${link} - ${err.message}`);
    }
  }

  console.log("\n--- Testing Extracted Image Assets ---");
  for (const img of extractedImages) {
    try {
      const imgUrl = `${VERCEL_BASE}${img}`;
      const res = await fetch(imgUrl, {
        method: "HEAD",
        headers: { "User-Agent": "OurNationAuditBot/1.0" }
      });

      if (res.status === 200) {
        validImages.push({ url: img, status: res.status });
        console.log(`  ✓ Image Asset OK [200]: ${img}`);
      } else {
        const getRes = await fetch(imgUrl, {
          method: "GET",
          headers: { "User-Agent": "OurNationAuditBot/1.0" }
        });
        if (getRes.status === 200) {
          validImages.push({ url: img, status: getRes.status });
          console.log(`  ✓ Image Asset OK (GET) [200]: ${img}`);
        } else {
          brokenImages.push({ url: img, status: getRes.status });
          console.error(`  ✗ BROKEN IMAGE [${getRes.status}]: ${img}`);
        }
      }
    } catch (err) {
      brokenImages.push({ url: img, error: err.message });
      console.error(`  ✗ IMAGE ERROR: ${img} - ${err.message}`);
    }
  }

  const report = {
    totalLinksTested: extractedLinks.size,
    validLinksCount: validLinks.length,
    brokenLinksCount: brokenLinks.length,
    brokenLinks,
    totalImagesTested: extractedImages.size,
    validImagesCount: validImages.length,
    brokenImagesCount: brokenImages.length,
    brokenImages
  };

  fs.writeFileSync(path.resolve("scripts/crawl-report.json"), JSON.stringify(report, null, 2));
  console.log("\nCrawl complete. Summary:");
  console.log(`- Valid Links: ${validLinks.length}`);
  console.log(`- Broken Links: ${brokenLinks.length}`);
  console.log(`- Valid Images: ${validImages.length}`);
  console.log(`- Broken Images: ${brokenImages.length}`);
}

deepCrawl().catch(console.error);
