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
    id: "tanur-keraladeshapuram-utsavam",
    title: "താനൂർ കേരളാദിത്യപുരം വാർഷിക ഉത്സവം",
    category: "സംസ്കാരം",
    dateMonth: "Nov",
    dateDay: 20,
    fullDate: "നവംബർ 20, 2026",
    time: "രാവിലെ 06:00 മുതൽ രാത്രി 10:00 വരെ",
    location: "കേരളാദിത്യപുരം ശ്രീകൃഷ്ണ ക്ഷേത്രം, താനൂർ",
    district: "താനൂർ, മലപ്പുറം",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg",
    description: "നൂറ്റാണ്ടുകളുടെ പാരമ്പര്യമുള്ള പുരാതന ക്ഷേത്രോത്സവം. പരമ്പരാഗത പഞ്ചവാദ്യം, തായമ്പക, കാഴ്ചശീവേലി, സാംസ്കാരിക കലാപരിപാടികൾ എന്നിവ അരങ്ങേറും.",
    organizer: "കേരളാദിത്യപുരം ക്ഷേത്ര ദേവസ്വം",
  },
  {
    id: "malappuram-district-sevens",
    title: "മലപ്പുറം ജില്ലാ സെവൻസ് ഫുട്ബോൾ ചാമ്പ്യൻഷിപ്പ്",
    category: "കായികം",
    dateMonth: "Nov",
    dateDay: 25,
    fullDate: "നവംബർ 25, 2026",
    time: "വൈകുന്നേരം 06:30 മുതൽ",
    location: "കോട്ടപ്പടി സ്റ്റേഡിയം, മലപ്പുറം",
    district: "മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&auto=format&fit=crop&q=80",
    description: "മലപ്പുറത്തിന്റെ കാൽപ്പന്ത് വീര്യം വിളിച്ചോതുന്ന ഓൾ ഇന്ത്യാ സെവൻസ് ഫുട്ബോൾ ടൂർണമെന്റ്. പ്രമുഖ ക്ലബ്ബുകളും അന്താരാഷ്ട്ര താരങ്ങളും അണിനിരക്കുന്നു.",
    organizer: "ജില്ലാ സ്പോർട്സ് കൗൺസിൽ, മലപ്പുറം",
  },
  {
    id: "thunchan-festival-tirur",
    title: "തുഞ്ചൻ ഉത്സവം & മലയാള സാഹിത്യ സമ്മേളനം",
    category: "വിദ്യാഭ്യാസം",
    dateMonth: "Dec",
    dateDay: 5,
    fullDate: "ഡിസംബർ 05, 2026",
    time: "രാവിലെ 09:30 മുതൽ വൈകുന്നേരം 07:00 വരെ",
    location: "തുഞ്ചൻ പറമ്പ്, തിരൂർ",
    district: "തിരൂർ, മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1548625361-195fe578cb26?w=900&auto=format&fit=crop&q=80",
    description: "ഭാഷാപിതാവ് തുഞ്ചത്തെഴുത്തച്ഛന്റെ സ്മരണയിൽ നടക്കുന്ന ദേശീയ സാഹിത്യ സംവാദം, പുസ്തകോത്സവം, കവി സമ്മേളനം എന്നിവ.",
    organizer: "തുഞ്ചൻ സ്മാരക സമിതി",
  },
  {
    id: "tanur-coastal-fest",
    title: "താനൂർ തീരദേശ പൈതൃക സംഗമം & നാടൻ കലാസന്ധ്യ",
    category: "മേളകൾ",
    dateMonth: "Dec",
    dateDay: 15,
    fullDate: "ഡിസംബർ 15, 2026",
    time: "വൈകുന്നേരം 04:30 മുതൽ",
    location: "താനൂർ ബീച്ച് ഓപ്പൺ സ്റ്റേജ്, താനൂർ",
    district: "താനൂർ, മലപ്പുറം",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Tanur_beach%2C_Malappuram_%289%29.jpg",
    description: "താനൂർ തുറമുഖ പൈതൃകവും കടലോര ജീവിതവും ആഘോഷിക്കുന്ന തീരദേശ മേള. ദഫ്മുട്ട്, കോൽക്കളി, മാപ്പിളപ്പാട്ട്, സമുദ്ര വിഭവ ഫുഡ് ഫെസ്റ്റ് എന്നിവ.",
    organizer: "താനൂർ നഗരസഭ & തീരദേശ സാംസ്കാരിക കൂട്ടായ്മ",
  },
  {
    id: "kondotty-nercha-heritage",
    title: "കൊണ്ടോട്ടി നേർച്ച സാംസ്കാരിക സമ്മേളനം",
    category: "സംസ്കാരം",
    dateMonth: "Dec",
    dateDay: 22,
    fullDate: "ഡിസംബർ 22, 2026",
    time: "വൈകുന്നേരം 05:00 മുതൽ",
    location: "കൊണ്ടോട്ടി ടൗൺ സ്ക്വയർ, മലപ്പുറം",
    district: "കൊണ്ടോട്ടി, മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=900&auto=format&fit=crop&q=80",
    description: "മലപ്പുറത്തിന്റെ മതസൗഹാർദ്ദവും മോയിൻകുട്ടി വൈദ്യർ സ്മാരക മാപ്പിള കലാപാരമ്പര്യവും ഉയർത്തിപ്പിടിക്കുന്ന വാർഷിക സാംസ്കാരിക സംഗമം.",
    organizer: "കൊണ്ടോട്ടി സാംസ്കാരിക സമിതി",
  },
  {
    id: "calicut-univ-tech-fest",
    title: "കാലിക്കറ്റ് യൂണിവേഴ്സിറ്റി ടെക്നോ-കൾച്ചറൽ ഫെസ്റ്റ്",
    category: "വിദ്യാഭ്യാസം",
    dateMonth: "Jan",
    dateDay: 10,
    fullDate: "ജനുവരി 10, 2027",
    time: "രാവിലെ 09:00 മുതൽ വൈകുന്നേരം 06:00 വരെ",
    location: "തേഞ്ഞിപ്പാലം യൂണിവേഴ്സിറ്റി ക്യാമ്പസ്",
    district: "തേഞ്ഞിപ്പലം, മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80",
    description: "കാലിക്കറ്റ് സർവകലാശാല വിദ്യാർത്ഥികളുടെ ശാസ്ത്ര-സാങ്കേതിക എക്സിബിഷനും ഗവേഷണ സമ്മേളനവും സ്റ്റാർട്ടപ്പ് മീറ്റും.",
    organizer: "കാലിക്കറ്റ് സർവകലാശാല സ്റ്റുഡന്റ്സ് യൂണിയൻ",
  },
];
