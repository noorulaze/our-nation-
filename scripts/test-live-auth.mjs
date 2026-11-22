const VERCEL_BASE = "https://our-nation.vercel.app";

async function testAuthPages() {
  console.log("Checking Auth Pages on Vercel...\n");

  const pages = [
    { name: "/login", expected: ["Welcome Back", "Email", "Password", "Sign In", "Demo"] },
    { name: "/register", expected: ["Create Citizen Account", "Full Name", "Email", "Password", "Confirm Password", "Terms"] },
    { name: "/reset-password", expected: ["Account Recovery", "Email", "Reset", "Instructions"] },
    { name: "/profile", expected: ["Citizen Profile", "Account Information", "Privacy Controls"] },
    { name: "/dashboard", expected: ["Citizen Dashboard", "My Civic Reports"] }
  ];

  for (const page of pages) {
    try {
      const res = await fetch(`${VERCEL_BASE}${page.name}`);
      const text = await res.text();
      console.log(`Page: ${page.name} [Status: ${res.status}, Length: ${text.length}]`);
      
      const found = [];
      const missing = [];
      for (const str of page.expected) {
        if (text.toLowerCase().includes(str.toLowerCase())) {
          found.push(str);
        } else {
          missing.push(str);
        }
      }
      console.log(`  Found signatures: ${found.join(", ")}`);
      if (missing.length > 0) {
        console.log(`  Missing signatures: ${missing.join(", ")}`);
      }
      console.log("");
    } catch (err) {
      console.error(`Error fetching ${page.name}:`, err.message);
    }
  }
}

testAuthPages();
