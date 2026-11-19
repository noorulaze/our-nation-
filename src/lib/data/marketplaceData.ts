export interface MarketplaceItem {
  id: string;
  title: string;
  title_ml: string;
  category: "marine_fishing" | "agro_produce" | "vehicles" | "electronics" | "household_furniture" | "tools_machinery" | "property";
  category_ml: string;
  price: string;
  price_type: "fixed" | "negotiable" | "on_request";
  price_type_ml: string;
  locality: string;
  locality_ml: string;
  ward_number?: number;
  condition: "new" | "like_new" | "used_good" | "harvest_fresh";
  condition_ml: string;
  seller_name: string;
  seller_phone: string;
  is_verified_seller: boolean;
  image_url: string;
  description: string;
  description_ml: string;
  posted_date: string;
  views_count: number;
}

export const TANUR_MARKETPLACE_CATEGORIES = [
  { key: "all", name: "All Items", name_ml: "എല്ലാ ഇനങ്ങളും" },
  { key: "marine_fishing", name: "Marine & Fishing Equipment", name_ml: "മത്സ്യബന്ധന സാമഗ്രികൾ" },
  { key: "agro_produce", name: "Local Agro & Fresh Produce", name_ml: "തദ്ദേശീയ കാർഷിക വിഭവങ്ങൾ" },
  { key: "vehicles", name: "Vehicles & Two-Wheelers", name_ml: "വാഹനങ്ങൾ & ഇരുചക്രങ്ങൾ" },
  { key: "tools_machinery", name: "Tools & Machinery", name_ml: "മെഷിനറികൾ & ടൂളുകൾ" },
  { key: "electronics", name: "Electronics & Appliances", name_ml: "ഇലക്ട്രോണിക്സ് & ഗാഡ്‌ജെറ്റുകൾ" },
  { key: "household_furniture", name: "Household & Furniture", name_ml: "ഫർണിച്ചർ & വീട്ടുപകരണങ്ങൾ" },
];

export const INITIAL_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: "mkt-001",
    title: "Yamaha 9.9 HP 2-Stroke Outboard Boat Engine",
    title_ml: "യമഹ 9.9 HP ഔട്ട്‌ബോർഡ് ബോട്ട് എഞ്ചിൻ",
    category: "marine_fishing",
    category_ml: "മത്സ്യബന്ധന സാമഗ്രികൾ",
    price: "₹68,000",
    price_type: "negotiable",
    price_type_ml: "വില സംസാരിക്കാം",
    locality: "Tanur Harbour",
    locality_ml: "താനൂർ ഹാർബർ",
    ward_number: 14,
    condition: "used_good",
    condition_ml: "നല്ല കണ്ടീഷൻ (സർവീസ് ചെയ്തത്)",
    seller_name: "Hamza K. (ഹാർബർ ബോട്ട് ഉടമ)",
    seller_phone: "0494 2440188",
    is_verified_seller: true,
    image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    description: "Well maintained Yamaha outboard motor with original fuel tank and fresh gear oil. Test trial possible at Tanur fish landing dock.",
    description_ml: "താനൂർ ഹാർബറിൽ നേരിട്ടെത്തി സ്റ്റാർട്ട് ചെയ്തു പരിശോധിക്കാവുന്ന ഒറിജിനൽ യമഹ ബോട്ട് എഞ്ചിൻ. റെഗുലർ സർവീസ് ചെയ്തത്.",
    posted_date: "2026-11-15",
    views_count: 142,
  },
  {
    id: "mkt-002",
    title: "Organic Malabar Black Pepper & Tanur Coconut Bulk",
    title_ml: "നാടൻ കുരുമുളകും ഗുണമേന്മയുള്ള താനൂർ നാളികേരവും",
    category: "agro_produce",
    category_ml: "തദ്ദേശീയ കാർഷിക വിഭവങ്ങൾ",
    price: "₹650 / kg (കുരുമുളക്)",
    price_type: "fixed",
    price_type_ml: "നിശ്ചിത വില",
    locality: "Meenadathur",
    locality_ml: "മീനടത്തൂർ",
    ward_number: 8,
    condition: "harvest_fresh",
    condition_ml: "പുതിയ വിളവെടുപ്പ് (സൂര്യപ്രകാശത്തിൽ ഉണക്കിയത്)",
    seller_name: "K. R. Sankaran Nair (കർഷകൻ)",
    seller_phone: "0494 2441920",
    is_verified_seller: true,
    image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80",
    description: "Sun-dried natural Malabar black pepper from organic farm in Meenadathur. Mature husked coconuts also available in lot.",
    description_ml: "മീനടത്തൂരിലെ തോട്ടത്തിൽ നിന്നും നേരിട്ട് വിളവെടുത്തു വെയിലത്തുണക്കിയ നാടൻ കുരുമുളകും തെങ്ങിൻതോപ്പിലെ നാളികേരവും.",
    posted_date: "2026-11-16",
    views_count: 89,
  },
  {
    id: "mkt-003",
    title: "Bajaj RE Compact Auto-Rickshaw (2021 Model)",
    title_ml: "ബജാജ് കോംപാക്ട് ഓട്ടോറിക്ഷ (2021 മോഡൽ)",
    category: "vehicles",
    category_ml: "വാഹനങ്ങൾ & ഇരുചക്രങ്ങൾ",
    price: "₹1,45,000",
    price_type: "negotiable",
    price_type_ml: "വില സംസാരിക്കാം",
    locality: "Tanur Railway Station Stand",
    locality_ml: "താനൂർ റെയിൽവേ സ്റ്റേഷൻ സ്റ്റാൻഡ്",
    ward_number: 21,
    condition: "used_good",
    condition_ml: "സിംഗിൾ ഓണർ, ഫിറ്റ്‌നസ് ക്ലിയർ",
    seller_name: "Abdul Majeed",
    seller_phone: "0494 2443022",
    is_verified_seller: true,
    image_url: "https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=800&auto=format&fit=crop&q=80",
    description: "Tanur municipal area registered passenger auto. Excellent mileage, new radial tyres, full insurance till 2027.",
    description_ml: "താനൂർ താലൂക്ക് പരിധിയിൽ ഓടിയ പാസഞ്ചർ ഓട്ടോ. പുതിയ ടയറുകൾ, ഇൻഷുറൻസ് എന്നിവ ലഭ്യമാണ്.",
    posted_date: "2026-11-14",
    views_count: 210,
  },
  {
    id: "mkt-004",
    title: "Commercial Concrete Mixture & Vibrator Machine",
    title_ml: "കോൺക്രീറ്റ് മിക്സിംഗ് മെഷീൻ & വൈബ്രേറ്റർ",
    category: "tools_machinery",
    category_ml: "മെഷിനറികൾ & ടൂളുകൾ",
    price: "₹42,000",
    price_type: "negotiable",
    price_type_ml: "വില സംസാരിക്കാം",
    locality: "Rayirimangalam",
    locality_ml: "രായിരിമംഗലം",
    ward_number: 18,
    condition: "used_good",
    condition_ml: "വർക്കിംഗ് കണ്ടീഷൻ",
    seller_name: "Sujith Construction Tools",
    seller_phone: "0494 2441775",
    is_verified_seller: true,
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    description: "Diesel powered half-bag capacity concrete mixer with needle vibrator. Ideal for home construction contractors in Tanur.",
    description_ml: "ഡീസൽ എൻജിൻ ഘടിപ്പിച്ച കോൺക്രീറ്റ് മിക്സിംഗ് മെഷീനും നീഡിൽ വൈബ്രേറ്ററും. വീട് നിർമ്മാണത്തിന് അനുയോജ്യം.",
    posted_date: "2026-11-13",
    views_count: 74,
  },
  {
    id: "mkt-005",
    title: "Solid Teakwood Traditional Malabar Dining Table & 6 Chairs",
    title_ml: "തേക്ക് തടിയിൽ നിർമ്മിച്ച ഡൈനിംഗ് ടേബിളും 6 കസേരകളും",
    category: "household_furniture",
    category_ml: "ഫർണിച്ചർ & വീട്ടുപകരണങ്ങൾ",
    price: "₹28,500",
    price_type: "negotiable",
    price_type_ml: "വില സംസാരിക്കാം",
    locality: "Kettungal Road",
    locality_ml: "കെട്ടുങ്ങൽ റോഡ്",
    ward_number: 17,
    condition: "like_new",
    condition_ml: "പുതിയത് പോലെ (പോളിഷ് ചെയ്തത്)",
    seller_name: "M. K. Zainaba",
    seller_phone: "0494 2442490",
    is_verified_seller: true,
    image_url: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&auto=format&fit=crop&q=80",
    description: "Pure Nilambur teakwood 6-seater dining set with toughened glass top. Relocating abroad, immediate genuine buyers only.",
    description_ml: "നിലമ്പൂർ തേക്ക് തടിയിൽ തീർത്ത 6 കസേരകളുള്ള ഡൈനിംഗ് ടേബിൾ. ഗ്ലാസ് ടോപ്പ് ഉൾപ്പെടെ.",
    posted_date: "2026-11-17",
    views_count: 165,
  },
  {
    id: "mkt-006",
    title: "Heavy Duty Monofilament Fishing Gillnet (കണ്ണി വല)",
    title_ml: "മോണോഫിലമെന്റ് കടൽ മത്സ്യബന്ധന ഗിൽനെറ്റ്",
    category: "marine_fishing",
    category_ml: "മത്സ്യബന്ധന സാമഗ്രികൾ",
    price: "₹18,000",
    price_type: "fixed",
    price_type_ml: "നിശ്ചിത വില",
    locality: "Tanur Beach",
    locality_ml: "താനൂർ ബീച്ച്",
    ward_number: 16,
    condition: "new",
    condition_ml: "പുതിയത് (ഉപയോഗിച്ചിട്ടില്ല)",
    seller_name: "Hassanar Fishermen Welfare Syndicate",
    seller_phone: "0494 2440781",
    is_verified_seller: true,
    image_url: "https://images.unsplash.com/photo-1534043464124-3be32fe00099?w=800&auto=format&fit=crop&q=80",
    description: "Brand new stitched nylon mesh net with lead sinkers and floating line for mackerel and sardine coastal season.",
    description_ml: "അയല, മത്തി സീസണുകൾക്ക് അനുയോജ്യമായ പുത്തൻ നൈലോൺ വല. ലീഡ് സിങ്കറുകൾ ഘടിപ്പിച്ചത്.",
    posted_date: "2026-11-15",
    views_count: 98,
  }
];

class MarketplaceStore {
  private items: MarketplaceItem[] = [...INITIAL_MARKETPLACE_ITEMS];

  getItems(category?: string, query?: string): MarketplaceItem[] {
    let list = this.items;
    if (category && category !== "all") {
      list = list.filter(i => i.category === category);
    }
    if (query && query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(i => 
        i.title.toLowerCase().includes(q) ||
        i.title_ml.includes(q) ||
        i.locality.toLowerCase().includes(q) ||
        i.locality_ml.includes(q) ||
        i.description.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getItemById(id: string): MarketplaceItem | undefined {
    return this.items.find(i => i.id === id);
  }

  addItem(item: Omit<MarketplaceItem, "id" | "posted_date" | "views_count">): MarketplaceItem {
    const newItem: MarketplaceItem = {
      ...item,
      id: "mkt-" + Date.now(),
      posted_date: new Date().toISOString().split("T")[0],
      views_count: 1,
    };
    this.items.unshift(newItem);
    return newItem;
  }

  incrementViews(id: string): void {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.views_count += 1;
    }
  }
}

export const marketplaceStore = new MarketplaceStore();
