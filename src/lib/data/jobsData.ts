export interface JobOpportunity {
  id: string;
  title: string;
  title_ml: string;
  company: string;
  company_ml: string;
  category: "coastal_fisheries" | "retail_commerce" | "skilled_services" | "healthcare" | "education" | "logistics_driving" | "tech_office" | "hospitality";
  category_ml: string;
  locality: string;
  locality_ml: string;
  ward_number?: number;
  job_type: "full_time" | "part_time" | "apprenticeship" | "daily_wage";
  job_type_ml: string;
  salary_range: string;
  description: string;
  description_ml: string;
  requirements: string[];
  requirements_ml: string[];
  contact_person: string;
  contact_phone: string;
  contact_email?: string;
  is_verified_employer: boolean;
  posted_date: string;
  closing_date?: string;
  applications_count: number;
}

export const TANUR_JOB_CATEGORIES = [
  { key: "all", name: "All Categories", name_ml: "എല്ലാ വിഭാഗങ്ങളും" },
  { key: "coastal_fisheries", name: "Coastal & Fisheries", name_ml: "തീരദേശവും മത്സ്യമേഖലയും" },
  { key: "retail_commerce", name: "Retail & Commerce", name_ml: "വ്യാപാര സ്ഥാപനങ്ങൾ" },
  { key: "skilled_services", name: "Skilled Trades & Services", name_ml: "വിദഗ്ദ്ധ സേവനങ്ങളും നിർമ്മാണവും" },
  { key: "healthcare", name: "Healthcare & Clinic", name_ml: "ആരോഗ്യ സംരക്ഷണം" },
  { key: "education", name: "Education & Coaching", name_ml: "വിദ്യാഭ്യാസവും ട്യൂട്ടോറിയൽസും" },
  { key: "logistics_driving", name: "Logistics & Transport", name_ml: "ഡ്രൈവിംഗ് & ചരക്കുനീക്കം" },
  { key: "tech_office", name: "Tech & Office Admin", name_ml: "ഓഫീസ് & ഐ.ടി" },
  { key: "hospitality", name: "Hospitality & Food", name_ml: "ഭക്ഷ്യമേഖല & കാറ്ററിംഗ്" },
];

export const INITIAL_JOBS: JobOpportunity[] = [
  {
    id: "job-001",
    title: "Cold Storage & Quality Supervisor",
    title_ml: "കോൾഡ് സ്റ്റോറേജ് & ക്വാളിറ്റി സൂപ്പർവൈസർ",
    company: "Tanur Marine Exports Ltd.",
    company_ml: "താനൂർ മറൈൻ എക്‌സ്‌പോർട്‌സ്",
    category: "coastal_fisheries",
    category_ml: "തീരദേശവും മത്സ്യമേഖലയും",
    locality: "Tanur Harbour",
    locality_ml: "താനൂർ ഹാർബർ",
    ward_number: 14,
    job_type: "full_time",
    job_type_ml: "പൂർണ്ണസമയം",
    salary_range: "₹22,000 - ₹28,000 / മാസം",
    description: "Supervise seafood temperature maintenance, batch tracking, and sanitary compliance at Tanur Harbour modern processing unit.",
    description_ml: "താനൂർ ഹാർബറിലെ മത്സ്യ സംസ്കരണ കേന്ദ്രത്തിൽ ഗുണനിലവാര പരിശോധന, താപനില നിയന്ത്രണം, ബാച്ച് രജിസ്ട്രേഷൻ എന്നിവ നിർവ്വഹിക്കുക.",
    requirements: ["Diploma in Food Technology or 2 years cold chain experience", "Basic computer logging skills"],
    requirements_ml: ["ഫുഡ് ടെക്നോളജി ഡിപ്ലോമ അല്ലെങ്കിൽ 2 വർഷത്തെ മുൻപരിചയം", "കമ്പ്യൂട്ടർ ലോഗിംഗ് പരിജ്ഞാനം"],
    contact_person: "K. Bava",
    contact_phone: "0494 2440312",
    contact_email: "careers@tanurmarine.co.in",
    is_verified_employer: true,
    posted_date: "2026-11-15",
    closing_date: "2026-12-05",
    applications_count: 8,
  },
  {
    id: "job-002",
    title: "Store Assistant & Cash Counter",
    title_ml: "സ്റ്റോർ അസിസ്റ്റന്റ് & ക്യാഷ് കൗണ്ടർ",
    company: "Malabar Super Bazaar",
    company_ml: "മലബാർ സൂപ്പർ ബസാർ",
    category: "retail_commerce",
    category_ml: "വ്യാപാര സ്ഥാപനങ്ങൾ",
    locality: "Tanur Town Center",
    locality_ml: "താനൂർ ടൗൺ സെന്റർ",
    ward_number: 22,
    job_type: "full_time",
    job_type_ml: "പൂർണ്ണസമയം",
    salary_range: "₹14,000 - ₹17,000 / മാസം",
    description: "Billing, shelf inventory restocking, customer assistance in central Tanur town supermarket.",
    description_ml: "താനൂർ ടൗണിലെ സൂപ്പർമാർക്കറ്റിൽ ബില്ലിംഗ്, ഇൻവെന്ററി മാനേജ്മെന്റ്, ഉപഭോക്തൃ സേവനം.",
    requirements: ["Plus Two passed", "Friendly customer manner", "Billing software familiarity preferred"],
    requirements_ml: ["പ്ലസ് ടു പാസ്സായിരിക്കണം", "സൗഹാർദ്ദപരമായ പെരുമാറ്റം", "ബില്ലിംഗ് സോഫ്റ്റ്‌വെയർ പരിജ്ഞാനം മുൻഗണന"],
    contact_person: "Mansoor A.",
    contact_phone: "0494 2441890",
    is_verified_employer: true,
    posted_date: "2026-11-14",
    closing_date: "2026-11-30",
    applications_count: 14,
  },
  {
    id: "job-003",
    title: "Senior Electrical Technician (Solar & Domestic)",
    title_ml: "സീനിയർ ഇലക്ട്രിക്കൽ ടെക്നീഷ്യൻ",
    company: "Vettathunadu Solar Solutions",
    company_ml: "വെട്ടത്തുനാട് സോളാർ സൊല്യൂഷൻസ്",
    category: "skilled_services",
    category_ml: "വിദഗ്ദ്ധ സേവനങ്ങളും നിർമ്മാണവും",
    locality: "Rayirimangalam",
    locality_ml: "രായിരിമംഗലം",
    ward_number: 18,
    job_type: "full_time",
    job_type_ml: "പൂർണ്ണസമയം",
    salary_range: "₹20,000 - ₹26,000 + ഇൻസെന്റീവ്",
    description: "Installation and servicing of rooftop solar panels and residential electrical inverters across Tanur Municipality.",
    description_ml: "താനൂർ നഗരസഭാ പരിധിയിലെ വീടുകളിലും സ്ഥാപനങ്ങളിലും റൂഫ്‌ടോപ്പ് സോളാർ പാനലുകൾ സ്ഥാപിക്കലും മെയിന്റനൻസും.",
    requirements: ["ITI Electrician / Wireman License", "Minimum 1 year field experience", "Two-wheeler driving license"],
    requirements_ml: ["ITI ഇലക്ട്രീഷ്യൻ / വയർമാൻ ലൈസൻസ്", "1 വർഷത്തെ ഫീൽഡ് പരിചയം", "ടൂവീലർ ലൈസൻസ്"],
    contact_person: "Suresh Babu",
    contact_phone: "0494 2442211",
    is_verified_employer: true,
    posted_date: "2026-11-16",
    applications_count: 5,
  },
  {
    id: "job-004",
    title: "Staff Nurse / Clinic Assistant",
    title_ml: "സ്റ്റാഫ് നഴ്സ് / ക്ലിനിക്ക് അസിസ്റ്റന്റ്",
    company: "Tanur Poly-Clinic & Diagnostic Centre",
    company_ml: "താനൂർ പോളിക്ലിനിക്ക് & ഡയഗ്നോസ്റ്റിക്",
    category: "healthcare",
    category_ml: "ആരോഗ്യ സംരക്ഷണം",
    locality: "Tanur Railway Station Road",
    locality_ml: "റെയിൽവേ സ്റ്റേഷൻ റോഡ്",
    ward_number: 21,
    job_type: "full_time",
    job_type_ml: "പൂർണ്ണസമയം",
    salary_range: "₹18,000 - ₹24,000 / മാസം",
    description: "Patient triage, vital signs monitoring, medication assistance, and doctor appointment scheduling.",
    description_ml: "രോഗികളുടെ പ്രാരംഭ പരിശോധന, പ്രഷർ/ഷുഗർ അളക്കൽ, ഡോക്ടർ കൺസൾട്ടേഷൻ സഹായം.",
    requirements: ["GNM or BSc Nursing", "Kerala Nursing Council Registration", "Good Malayalam and basic English"],
    requirements_ml: ["GNM അല്ലെങ്കിൽ BSc നഴ്സിംഗ്", "കേരള നഴ്സിംഗ് കൗൺസിൽ രജിസ്ട്രേഷൻ"],
    contact_person: "Dr. K. S. Ramanathan",
    contact_phone: "0494 2440850",
    is_verified_employer: true,
    posted_date: "2026-11-12",
    closing_date: "2026-11-28",
    applications_count: 9,
  },
  {
    id: "job-005",
    title: "High School Mathematics & Science Tutor",
    title_ml: "ഹൈസ്കൂൾ മാത്തമാറ്റിക്സ് & സയൻസ് അധ്യാപകൻ/അധ്യാപിക",
    company: "Insight Academy Tanur",
    company_ml: "ഇൻസൈറ്റ് അക്കാദമി താനൂർ",
    category: "education",
    category_ml: "വിദ്യാഭ്യാസവും ട്യൂട്ടോറിയൽസും",
    locality: "Meenadathur",
    locality_ml: "മീനടത്തൂർ",
    ward_number: 9,
    job_type: "part_time",
    job_type_ml: "പാർട്ട് ടൈം (വൈകുന്നേരം)",
    salary_range: "₹8,000 - ₹12,000 / മാസം",
    description: "Evening batch coaching for 8th, 9th, and 10th standard SSLC students in Mathematics and Physical Sciences.",
    description_ml: "എട്ട്, ഒമ്പത്, പത്ത് ക്ലാസുകളിലെ വിദ്യാർത്ഥികൾക്ക് വൈകുന്നേരങ്ങളിൽ കണക്ക്, ഫിസിക്സ് വിഷയങ്ങളിൽ ട്യൂഷൻ.",
    requirements: ["BSc Mathematics or Physics / BEd preferred", "Patience and interactive teaching skills"],
    requirements_ml: ["BSc മാത്തമാറ്റിക്സ് / ഫിസിക്സ് അല്ലെങ്കിൽ BEd മുൻഗണന"],
    contact_person: "Prof. N. K. Moideen",
    contact_phone: "0494 2443499",
    is_verified_employer: true,
    posted_date: "2026-11-17",
    applications_count: 6,
  },
  {
    id: "job-006",
    title: "Heavy Vehicle Goods Driver (Fish Transport)",
    title_ml: "ഹെവി ഡ്രൈവർ (മത്സ്യ ചരക്കുനീക്കം)",
    company: "Coastal Express Logistics",
    company_ml: "കോസ്റ്റൽ എക്സ്പ്രസ്സ് ലോജിസ്റ്റിക്സ്",
    category: "logistics_driving",
    category_ml: "ഡ്രൈവിംഗ് & ചരക്കുനീക്കം",
    locality: "Tanur Beach",
    locality_ml: "താനൂർ ബീച്ച്",
    ward_number: 16,
    job_type: "full_time",
    job_type_ml: "പൂർണ്ണസമയം",
    salary_range: "₹24,000 - ₹32,000 + ബത്ത",
    description: "Night transport of seafood containers from Tanur harbour to Ernakulam and Kozhikode fish distribution hubs.",
    description_ml: "താനൂർ ഹാർബറിൽ നിന്നും കൊച്ചി, കോഴിക്കോട് മാർക്കറ്റുകളിലേക്ക് ഇൻസുലേറ്റഡ് വാഹനത്തിൽ മത്സ്യ നീക്കം.",
    requirements: ["Heavy Duty Driving License + Badge", "Minimum 3 years accident-free driving record"],
    requirements_ml: ["ഹെവി ഡ്യൂട്ടി ഡ്രൈവിംഗ് ലൈസൻസ് + ബാഡ്ജ്", "3 വർഷത്തെ ഡ്രൈവിംഗ് പരിചയം"],
    contact_person: "U. K. Hamsa",
    contact_phone: "0494 2441180",
    is_verified_employer: true,
    posted_date: "2026-11-13",
    applications_count: 11,
  },
  {
    id: "job-007",
    title: "DTP Operator & Malayalam Typist",
    title_ml: "ഡി.ടി.പി ഓപ്പറേറ്റർ & മലയാളം ടൈപ്പിസ്റ്റ്",
    company: "Tanur Akshaya Kendra & Legal Services",
    company_ml: "താനൂർ അക്ഷയ കേന്ദ്രം",
    category: "tech_office",
    category_ml: "ഓഫീസ് & ഐ.ടി",
    locality: "Tanur Court Road",
    locality_ml: "താനൂർ കോടതി റോഡ്",
    ward_number: 23,
    job_type: "full_time",
    job_type_ml: "പൂർണ്ണസമയം",
    salary_range: "₹13,000 - ₹16,500 / മാസം",
    description: "Malayalam document drafting, government portal applications, Aadhaar/revenue documentation processing.",
    description_ml: "മലയാളം ടൈപ്പിംഗ്, ഓൺലൈൻ അപേക്ഷകൾ സമർപ്പിക്കൽ, അക്ഷയ സേവനങ്ങൾ കൈകാര്യം ചെയ്യൽ.",
    requirements: ["Malayalam & English fast typing speed", "Photoshop/PageMaker/MS Word knowledge"],
    requirements_ml: ["മലയാളം, ഇംഗ്ലീഷ് ടൈപ്പിംഗ് പ്രാവീണ്യം", "എം.എസ് ഓഫീസ് പരിജ്ഞാനം"],
    contact_person: "Rasheed P.",
    contact_phone: "0494 2440911",
    is_verified_employer: true,
    posted_date: "2026-11-11",
    applications_count: 18,
  },
  {
    id: "job-008",
    title: "Apprentice Motor Mechanic (Marine & Auto)",
    title_ml: "അപ്രന്റീസ് മോട്ടോർ മെക്കാനിക്",
    company: "Al-Falah Marine Workshop",
    company_ml: "അൽ-ഫലാഹ് മറൈൻ വർക്ക്‌ഷോപ്പ്",
    category: "skilled_services",
    category_ml: "വിദഗ്ദ്ധ സേവനങ്ങളും നിർമ്മാണവും",
    locality: "Pandit Karuppan Road",
    locality_ml: "പണ്ഡിറ്റ് കറുപ്പൻ റോഡ്",
    ward_number: 15,
    job_type: "apprenticeship",
    job_type_ml: "അപ്രന്റീസ്ഷിപ്പ് / ട്രെയിനിംഗ്",
    salary_range: "₹9,000 - ₹12,000 (സ്റ്റൈപൻഡ്)",
    description: "Paid hands-on training for young youth in repairing marine diesel engines and fishing boat mechanical equipment.",
    description_ml: "മറൈൻ ഡീസൽ എഞ്ചിനുകൾ, ബോട്ട് മെഷിനറികൾ എന്നിവയുടെ അറ്റകുറ്റപ്പണിയിൽ വേതനത്തോടെയുള്ള പ്രായോഗിക പരിശീലനം.",
    requirements: ["Age 18-25", "Keen interest in mechanical engineering", "Physical fitness"],
    requirements_ml: ["പ്രായം 18-25", "മെക്കാനിക്കൽ താൽപ്പര്യം", "ആരോഗ്യം"],
    contact_person: "Ashraf K.",
    contact_phone: "0494 2441560",
    is_verified_employer: true,
    posted_date: "2026-11-16",
    applications_count: 7,
  }
];

class JobStore {
  private jobs: JobOpportunity[] = [...INITIAL_JOBS];

  getJobs(category?: string, query?: string): JobOpportunity[] {
    let list = this.jobs;
    if (category && category !== "all") {
      list = list.filter(j => j.category === category);
    }
    if (query && query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(j => 
        j.title.toLowerCase().includes(q) ||
        j.title_ml.includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.company_ml.includes(q) ||
        j.locality.toLowerCase().includes(q) ||
        j.locality_ml.includes(q)
      );
    }
    return list;
  }

  getJobById(id: string): JobOpportunity | undefined {
    return this.jobs.find(j => j.id === id);
  }

  addJob(job: Omit<JobOpportunity, "id" | "posted_date" | "applications_count">): JobOpportunity {
    const newJob: JobOpportunity = {
      ...job,
      id: "job-" + Date.now(),
      posted_date: new Date().toISOString().split("T")[0],
      applications_count: 0,
    };
    this.jobs.unshift(newJob);
    return newJob;
  }

  incrementApplications(id: string): boolean {
    const job = this.jobs.find(j => j.id === id);
    if (job) {
      job.applications_count += 1;
      return true;
    }
    return false;
  }
}

export const jobStore = new JobStore();
