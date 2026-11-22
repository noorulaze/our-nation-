async function test() {
  const res = await fetch("https://our-nation.vercel.app/people/fathima_tanur");
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Body length:", text.length);
  if (text.includes("Internal Server Error") || res.status === 500) {
    console.log("Server error detected on /people/fathima_tanur!");
  }
}
test();
