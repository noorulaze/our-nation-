export interface KeralaEvent {
  id: string;
  title: string;
  category: "സംസ്കാരം" | "വിദ്യാഭ്യാസം" | "കായികം" | "മേളകൾ";
  dateMonth: string;
  dateDay: number;
  fullDate: string;
  time: string;
  location: string;
  district: string;
  imageUrl: string;
  description: string;
  organizer: string;
}

export const KERALA_EVENTS_DATA: KeralaEvent[] = [
  {
    id: "thrissur-pooram-2026",
    title: "തൃശ്ശൂർ പൂരം 2026",
    category: "സംസ്കാരം",
    dateMonth: "Apr",
    dateDay: 28,
    fullDate: "ഏപ്രിൽ 28, 2026",
    time: "രാവിലെ 06:00 മുതൽ പിറ്റേന്ന് ഉച്ചവരെ",
    location: "തേക്കിൻകാട് മൈതാനം",
    district: "തൃശ്ശൂർ",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&auto=format&fit=crop&q=80",
    description: "പൂരങ്ങളുടെ പൂരമായ തൃശ്ശൂർ പൂരം. ഇലഞ്ഞിത്തറ മേളം, പാറമേക്കാവ്-തിരുവമ്പാടി ദേവസ്വങ്ങളുടെ വർണ്ണാഭമായ കുടമാറ്റം, ഗംഭീരമായ വെടിക്കെട്ട് എന്നിവ അരങ്ങേറും.",
    organizer: "പാറമേക്കാവ് - തിരുവമ്പാടി ദേവസ്വങ്ങൾ",
  },
  {
    id: "kerala-school-kalolsavam",
    title: "കേരള സ്കൂൾ കലോത്സവം",
    category: "വിദ്യാഭ്യാസം",
    dateMonth: "May",
    dateDay: 12,
    fullDate: "മേയ് 12, 2026",
    time: "രാവിലെ 09:00 മുതൽ രാത്രി 09:00 വരെ",
    location: "ടാഗോർ സെന്റിനറി ഹാൾ & പ്രധാന വേദികൾ",
    district: "കോഴിക്കോട്",
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=900&auto=format&fit=crop&q=80",
    description: "ഏഷ്യയിലെ ഏറ്റവും വലിയ കൗമാര കലാമേള. പതിനായിരത്തിലധികം പ്രതിഭകൾ പങ്കെടുക്കുന്ന നൃത്ത, സംഗീത, സാഹിത്യ മത്സരങ്ങൾ.",
    organizer: "പൊതുവിദ്യാഭ്യാസ വകുപ്പ്",
  },
  {
    id: "nammude-naadu-cultural",
    title: "നമ്മുടെ നാട് സാംസ്കാരിക സംഗമം",
    category: "സംസ്കാരം",
    dateMonth: "Jun",
    dateDay: 5,
    fullDate: "ജൂൺ 05, 2026",
    time: "വൈകുന്നേരം 05:00 മുതൽ",
    location: "മറൈൻ ഡ്രൈവ് ഓപ്പൺ എയർ ഓഡിറ്റോറിയം",
    district: "എറണാകുളം (കൊച്ചി)",
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&auto=format&fit=crop&q=80",
    description: "കേരളത്തിന്റെ തനതു നാടൻ പാട്ടുകൾ, കഥകളി അവതരണം, പരിസ്ഥിതി സംരക്ഷണ സെമിനാർ, കർഷക കൂട്ടായ്മ എന്നിവ ഒത്തുചേരുന്ന മഹാസംഗമം.",
    organizer: "നമ്മുടെ നാട് സാംസ്കാരിക ഫോറം",
  },
  {
    id: "nehru-trophy-vallamkali",
    title: "നെഹ്റു ട്രോഫി വള്ളംകളി",
    category: "മേളകൾ",
    dateMonth: "Aug",
    dateDay: 15,
    fullDate: "ഓഗസ്റ്റ് 15, 2026",
    time: "ഉച്ചയ്ക്ക് 02:00 മുതൽ",
    location: "പുന്നമടക്കായൽ",
    district: "ആലപ്പുഴ",
    imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=900&auto=format&fit=crop&q=80",
    description: "വേമ്പനാട്ട് കായലോളങ്ങളെ ആവേശത്തിലാഴ്ത്തുന്ന ചുണ്ടൻവള്ളങ്ങളുടെ ജലമാമാങ്കം. സംഗീതവും താളവും ചേരുന്ന വഞ്ചിപ്പാട്ടുകൾ.",
    organizer: "നെഹ്റു ട്രോഫി ബോട്ട് ക്ലബ് & ടൂറിസം വകുപ്പ്",
  },
  {
    id: "kochi-biennale",
    title: "കൊച്ചി-മുസിരിസ് ബിനാലെ",
    category: "സംസ്കാരം",
    dateMonth: "Dec",
    dateDay: 12,
    fullDate: "ഡിസംബർ 12, 2026",
    time: "രാവിലെ 10:00 മുതൽ വൈകുന്നേരം 06:00 വരെ",
    location: "ആസ്പിൻവാൾ ഹൗസ്, പെപ്പർ ഹൗസ്",
    district: "ഫോർട്ട് കൊച്ചി",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&auto=format&fit=crop&q=80",
    description: "ലോകമെമ്പാടുമുള്ള പ്രമുഖ ചിത്രകാരന്മാരുടെയും ശില്പികളുടെയും സമകാലിക അന്താരാഷ്ട്ര കലാപ്രദർശനം.",
    organizer: "കൊച്ചി ബിനാലെ ഫൗണ്ടേഷൻ",
  },
  {
    id: "malabar-sports-festival",
    title: "മലബാർ കായിക മാമാങ്കം",
    category: "കായികം",
    dateMonth: "Nov",
    dateDay: 22,
    fullDate: "നവംബർ 22, 2026",
    time: "രാവിലെ 08:00 മുതൽ",
    location: "കോർപ്പറേഷൻ സ്റ്റേഡിയം",
    district: "മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&auto=format&fit=crop&q=80",
    description: "സെവൻസ് ഫുട്ബോൾ, വോളിബോൾ, കളരിപ്പയറ്റ് എന്നിവ ഉൾപ്പെടുന്ന ഗ്രാമീണ കായിക മത്സരങ്ങൾ.",
    organizer: "ജില്ലാ സ്പോർട്സ് കൗൺസിൽ",
  },
];
