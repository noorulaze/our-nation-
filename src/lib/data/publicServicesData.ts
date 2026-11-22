import { 
  PublicServiceDetail, 
  ServiceCategoryKey, 
  PublicServiceApplication,
  ServiceApplicationStatus 
} from "@/types/digitalMunicipality";
import { store } from "@/lib/data/store";

export type { PublicServiceApplication, ServiceApplicationStatus };

export const ALL_SERVICE_APPLICATION_STATUSES: ServiceApplicationStatus[] = [
  "submitted",
  "under_review",
  "documents_verified",
  "forwarded_guidance",
  "completed",
  "rejected"
];

export interface ServiceCategoryMeta {
  key: ServiceCategoryKey;
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const SERVICE_CATEGORIES: ServiceCategoryMeta[] = [
  {
    key: "cat-certificates",
    id: "cat-certificates",
    name: "Certificates and Civil Records",
    description: "Birth, death, and marriage registration, legal heir and vital records verification via K-Smart.",
    icon: "FileText",
    color: "#194B35",
  },
  {
    key: "cat-property-tax",
    id: "cat-property-tax",
    name: "Property and Tax Services",
    description: "Annual building property tax assessment, cashless tax payment, ownership records, and mutation.",
    icon: "Receipt",
    color: "#1E3A8A",
  },
  {
    key: "cat-building",
    id: "cat-building",
    name: "Building and Construction",
    description: "Statutory building permits, regularization, architectural plan sanctions, and occupancy certificates under KMBR 2019.",
    icon: "Building2",
    color: "#C39A5B",
  },
  {
    key: "cat-water-sanitation",
    id: "cat-water-sanitation",
    name: "Water and Sanitation",
    description: "Doorstep Haritha Karma Sena waste collection, drinking water pipeline connections, and sanitation clearances.",
    icon: "Droplets",
    color: "#059669",
  },
  {
    key: "cat-public-health",
    id: "cat-public-health",
    name: "Public Health",
    description: "Sanitary inspection certificates, food establishment hygiene clearances, and vector disease control.",
    icon: "ShieldCheck",
    color: "#DC2626",
  },
  {
    key: "cat-business",
    id: "cat-business",
    name: "Trade and Business Licences",
    description: "Dangerous & Offensive (D&O) trade licenses, commercial establishment permits, and signboard sanctions via K-Smart.",
    icon: "Briefcase",
    color: "#D97706",
  },
  {
    key: "cat-social-welfare",
    id: "cat-social-welfare",
    name: "Social Welfare",
    description: "Sevana social security pensions (Old Age, Widow, Disability, Agricultural Worker) and direct benefit transfer (DBT).",
    icon: "Users",
    color: "#7C3AED",
  },
  {
    key: "cat-other",
    id: "cat-other",
    name: "Other Municipal Services",
    description: "Tanur Municipal Town Hall booking, community amenity access, and public streetlight repair requests.",
    icon: "Sparkles",
    color: "#4B5563",
  },
];

export const TANUR_MUNICIPAL_SERVICES: PublicServiceDetail[] = [
  // 1. Birth Registration
  {
    id: "srv-birth-reg",
    slug: "birth-registration-certificate",
    title: "Birth Registration & Digital Certificate Issuance",
    category: "cat-certificates",
    category_name: "Certificates and Civil Records",
    department: "Health & Sanitation Wing, Tanur Municipality",
    summary: "Registration of births occurring within Tanur municipal limits and direct download of official birth certificates with QR code verification via K-Smart.",
    eligibility: [
      "Child born within Tanur Municipality geographical boundaries (hospital or home birth)",
      "Parents or legal guardians holding valid identity documentation (Aadhaar / Voter ID)",
      "Institutional births reported directly by accredited Tanur maternity hospitals",
    ],
    required_documents: [
      "Form 1 (Birth Reporting Form verified and signed by hospital authority or parent)",
      "Hospital Discharge Summary or Institutional Delivery Intimation slip",
      "Copy of Aadhaar Card of both Father and Mother",
      "Parents Marriage Certificate copy (optional, for record linkage)",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Hospital Electronic Intimation",
        description: "Accredited hospitals in Tanur electronically transmit birth event records directly to the Tanur Municipality registrar database via K-Smart.",
      },
      {
        step_number: 2,
        title: "Parent Name Verification & Submission",
        description: "Parents verify child details, enter the official legal name, and submit online within 21 days without any fee.",
      },
      {
        step_number: 3,
        title: "Digital Certificate Download",
        description: "The Municipal Registrar approves the record; the digitally signed certificate is immediately available for download with QR code verification.",
      },
    ],
    official_portal_url: "https://ksmart.lsgkerala.gov.in/",
    official_portal_name: "K-Smart Kerala Civil Registration Portal",
    processing_time_days: 3,
    processing_time_text: "1 to 3 working days (Free within 21 days of birth)",
    fee_structure: "Free within 21 days. Late registration (22–30 days: ₹100, 31 days to 1 year: ₹200 with Secretary sanction).",
    office_location: "Tanur Municipality Office, Ground Floor Health Section, Main Road, Tanur - 676302",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM (2nd Saturday & Sunday Holiday)",
    is_online_available: true,
    online_system_name: "K-Smart Kerala",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Registration of Births and Deaths Rules 1999 & LSGD K-Smart Guidelines",
    faqs: [
      {
        question: "Can I add the child's name after the initial registration?",
        answer: "Yes, parents can add or update the child's legal name online through the K-Smart portal within 12 months without penalty.",
      },
      {
        question: "Can I get an English certificate for passport applications?",
        answer: "Yes, all K-Smart certificates are bilingual (English and Malayalam) and universally recognized by the Ministry of External Affairs for passport applications.",
      },
    ],
    views_count: 1420,
    supports_internal_application: true,
    published: true,
    audit_history: [
      { date: "2026-11-15", actor: "Municipal Registrar", action: "Annual fee and portal verification confirmed" }
    ]
  },

  // 2. Death Registration
  {
    id: "srv-death-reg",
    slug: "death-registration-certificate",
    title: "Death Registration & Official Certificate",
    category: "cat-certificates",
    category_name: "Certificates and Civil Records",
    department: "Health & Sanitation Wing, Tanur Municipality",
    summary: "Registration of deaths occurring within Tanur municipal jurisdiction and issuance of certified digital death certificates.",
    eligibility: [
      "Death occurred within Tanur Municipality limits (institutional or residence)",
      "Immediate blood relative, legal heir, or institution representative",
      "Medical certification of cause of death from an authorized medical practitioner",
    ],
    required_documents: [
      "Form 2 (Death Reporting Form) signed by relative or hospital authority",
      "Medical Certificate of Cause of Death (Form 4 or 4A) from doctor/hospital",
      "Aadhaar Card copy of the deceased",
      "Aadhaar Card copy of the applicant/informant",
      "Burial/Cremation receipt from cemetery or crematorium",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Intimation & Medical Certification",
        description: "Submit death intimation and medical cause certificate through K-Smart within 21 days of occurrence.",
      },
      {
        step_number: 2,
        title: "Registrar Scrutiny",
        description: "Municipal health inspector verifies hospital or crematorium records and validates claimant details.",
      },
      {
        step_number: 3,
        title: "Certificate Issuance",
        description: "Registrar sanctions the entry and issues the digitally signed QR-coded certificate for download.",
      },
    ],
    official_portal_url: "https://ksmart.lsgkerala.gov.in/",
    official_portal_name: "K-Smart Kerala Civil Registration Portal",
    processing_time_days: 2,
    processing_time_text: "1 to 2 working days (Within 21 days is free)",
    fee_structure: "Free within 21 days. Late fees apply beyond 21 days as per Kerala statutory rules.",
    office_location: "Tanur Municipality Office, Ground Floor Health Section, Main Road, Tanur",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "K-Smart Kerala",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Registration of Births and Deaths Rules 1999",
    faqs: [
      {
        question: "How long after death can registration be completed online?",
        answer: "Deaths within 21 days can be registered directly online. Beyond 21 days and up to 1 year requires Municipal Secretary sanction.",
      },
    ],
    views_count: 890,
    supports_internal_application: true,
    published: true,
  },

  // 3. Marriage Registration
  {
    id: "srv-marriage-reg",
    slug: "marriage-registration-certificate",
    title: "Marriage Registration & Certificate (Common Rules)",
    category: "cat-certificates",
    category_name: "Certificates and Civil Records",
    department: "Civil Registration Section, Tanur Municipality",
    summary: "Statutory marriage registration under Kerala Municipality Common Marriage Rules 2008 with online pre-application and fast-track in-person appearance.",
    eligibility: [
      "Solemnization of marriage within Tanur Municipality geographical jurisdiction, or bride/groom resident in Tanur",
      "Groom aged 21 or older, bride aged 18 or older on marriage date",
      "Two witnesses with valid photo identity proofs",
    ],
    required_documents: [
      "Form 1 (Memorandum for Registration of Marriage)",
      "Age proof of bride and groom (SSLC certificate / Passport / Birth certificate)",
      "Religious institution solemnization certificate (Temple, Church, Mosque, or Registrar solemnization slip)",
      "Passport-size joint photograph and single photographs",
      "Aadhaar card copies of bride, groom, and two witnesses",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Online Application & Slot Booking",
        description: "Complete marriage memorandum on K-Smart, upload certificates and photos, and choose preferred appointment date.",
      },
      {
        step_number: 2,
        title: "Physical Verification at Municipal Office",
        description: "Bride, groom, and two witnesses appear before the Local Registrar at Tanur Municipality for verification and signatures.",
      },
      {
        step_number: 3,
        title: "Certificate Generation",
        description: "Digital certificate with legal verification QR code is generated instantly upon verification.",
      },
    ],
    official_portal_url: "https://ksmart.lsgkerala.gov.in/",
    official_portal_name: "K-Smart Kerala Marriage Registration Portal",
    processing_time_days: 1,
    processing_time_text: "Same-day issuance upon scheduled physical verification",
    fee_structure: "₹100 government fee within 45 days. Late fee applies beyond 45 days.",
    office_location: "Tanur Municipality Office, Civil Registration Desk, Ground Floor",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "K-Smart Kerala",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Municipality (Registration of Marriages - Common) Rules 2008",
    faqs: [
      {
        question: "Can Non-Resident Indians (NRIs) register marriages via this portal?",
        answer: "Yes, video-conferencing KYC verification is available under K-Smart NRI guidelines for eligible couples.",
      },
    ],
    views_count: 1120,
    supports_internal_application: true,
    published: true,
  },

  // 4. Property Tax Payment
  {
    id: "srv-property-tax",
    slug: "property-tax-assessment",
    title: "Property Tax Assessment & Online Payment",
    category: "cat-property-tax",
    category_name: "Property and Tax Services",
    department: "Revenue Wing, Tanur Municipality",
    summary: "Annual building property tax self-assessment and cashless payment with instant digital receipt generation via Sanchitha / K-Smart portal.",
    eligibility: [
      "Owners of residential, commercial, industrial, or vacant building properties within Tanur Municipality Wards 1 to 45",
      "Authorized tenants or representatives with valid property assessment number",
    ],
    required_documents: [
      "Building Door Number (e.g. Ward Number / House Number: 12/452A)",
      "Previous Year Tax Receipt or Assessment Notice (Tandapper / Assessment No)",
      "Owner's Registered Mobile Number for OTP Verification",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Search by Ward & Door Number",
        description: "Open the online payment link, select Malappuram district, Tanur Municipality, and enter ward and door number.",
      },
      {
        step_number: 2,
        title: "Verify Demand & Net Payable",
        description: "Review annual tax demand, service cess, library cess, and early payment rebate (if applicable).",
      },
      {
        step_number: 3,
        title: "Secure Payment & Instant Receipt",
        description: "Pay via UPI, Net Banking, or Debit Card and download the digitally signed receipt immediately.",
      },
    ],
    official_portal_url: "https://tax.lsgkerala.gov.in/",
    official_portal_name: "Kerala LSGD Sanchitha Property Tax Portal",
    processing_time_days: 0,
    processing_time_text: "Instant online receipt generation 24/7",
    fee_structure: "As per statutory assessment rate fixed by Tanur Municipal Council based on plinth area and building type.",
    office_location: "Tanur Municipality Office, Revenue Section Counters, Ground Floor",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Online: 24/7 | Office Cash Counter: 10:00 AM – 3:30 PM",
    is_online_available: true,
    online_system_name: "Sanchitha / K-Smart",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Municipality Act 1994 (Property Tax Rules) & LSGD Notification",
    faqs: [
      {
        question: "How do I find my building door number?",
        answer: "Check the metallic door number plate affixed on your entrance or refer to your previous year's physical tax receipt.",
      },
    ],
    views_count: 2450,
    supports_internal_application: true,
    published: true,
  },

  // 5. Ownership Certificate & Mutation
  {
    id: "srv-ownership-cert",
    slug: "ownership-certificate-mutation",
    title: "Ownership Certificate & Property Mutation (Pokkuvaravu)",
    category: "cat-property-tax",
    category_name: "Property and Tax Services",
    department: "Revenue Wing, Tanur Municipality",
    summary: "Transfer of property ownership records in municipal tax registers and issuance of official ownership certificates for loans and utility connections.",
    eligibility: [
      "Registered property owners who have purchased or inherited property in Tanur Municipality",
      "Holders of valid registered title deed and mutation receipt from Village Office",
    ],
    required_documents: [
      "Copy of Registered Sale Deed, Settlement Deed, or Partition Deed",
      "Latest Land Tax Paid Receipt (Pokkuvaravu) from Tanur Village Office",
      "Building Door Number and latest Municipal Property Tax Receipt",
      "Legal Heirship Certificate (in case of inheritance / succession)",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Online Application & Document Upload",
        description: "Submit transfer of ownership application through K-Smart with deeds and village revenue records.",
      },
      {
        step_number: 2,
        title: "Revenue Inspector Field Verification",
        description: "Revenue Inspector inspects municipal tax registers, checks for tax arrears, and verifies physical occupancy.",
      },
      {
        step_number: 3,
        title: "Council Committee Sanction & Certificate Issuance",
        description: "Municipal Secretary approves name transfer; updated ownership certificate is generated.",
      },
    ],
    official_portal_url: "https://ksmart.lsgkerala.gov.in/",
    official_portal_name: "K-Smart Kerala Revenue Module",
    processing_time_days: 7,
    processing_time_text: "5 to 7 working days",
    fee_structure: "₹50 application fee plus statutory certificate fee as per municipal schedule.",
    office_location: "Tanur Municipality Office, Revenue Section, Ground Floor",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "K-Smart Kerala",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Municipality Act 1994 & Tax Assessment Rules",
    faqs: [
      {
        question: "Is Village Office Pokkuvaravu required before Municipal Mutation?",
        answer: "Yes, land tax mutation at the Village Office must be completed before applying for building ownership name transfer at the Municipality.",
      },
    ],
    views_count: 1320,
    supports_internal_application: true,
    published: true,
  },

  // 6. Building Permit
  {
    id: "srv-building-permit",
    slug: "building-construction-permit",
    title: "Building Permit & Regularization (KMBR / K-Smart)",
    category: "cat-building",
    category_name: "Building and Construction",
    department: "Engineering Wing, Tanur Municipality",
    summary: "Application and statutory sanction for residential and commercial building construction under Kerala Municipality Building Rules (KMBR) 2019.",
    eligibility: [
      "Landowners holding registered freehold land within Tanur Municipality limits",
      "Proposals prepared by architects or engineers registered with Kerala LSGD",
    ],
    required_documents: [
      "Registered Land Title Deed (Aadheeram / Sale Deed)",
      "Latest Land Tax Paid Receipt (Pokkuvaravu / Tandapper)",
      "Possession Certificate from Tanur Village Office",
      "Site Plan, Service Plan and Architectural Drawing drawn by licensed engineer",
      "CRZ Clearance Certificate (strictly required for Coastal Regulation Zone wards 3, 4, 11, 12, 13)",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Architectural Drawing & Online Upload",
        description: "Registered licensee drafts drawing conforming to KMBR and submits via K-Smart portal.",
      },
      {
        step_number: 2,
        title: "Site Inspection by Municipal Engineer",
        description: "Assistant Engineer / Overseer inspects the plot boundaries, setback distances, and road access.",
      },
      {
        step_number: 3,
        title: "Fee Remittance & Permit Issuance",
        description: "Fee calculated as per built-up area; upon digital payment, digitally signed building permit is issued.",
      },
    ],
    official_portal_url: "https://ksmart.lsgkerala.gov.in/",
    official_portal_name: "K-Smart Kerala Building Permission System",
    processing_time_days: 15,
    processing_time_text: "Low risk (up to 300 sq.m): Self-certified instant permit. Others: 15 working days.",
    fee_structure: "Calculated based on square meters plinth area as per statutory KMBR 2019 schedule.",
    office_location: "Tanur Municipality Office, 1st Floor Engineering Section",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "K-Smart KMBR Module",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Municipality Building Rules (KMBR) 2019 & LSGD Orders",
    faqs: [
      {
        question: "Is instant building permit available for small houses in Tanur?",
        answer: "Yes, residential buildings up to 300 square meters with low-risk category qualify for self-certified instant permits on K-Smart.",
      },
    ],
    views_count: 1890,
    supports_internal_application: true,
    published: true,
  },

  // 7. Occupancy Certificate
  {
    id: "srv-occupancy-cert",
    slug: "occupancy-certificate",
    title: "Building Completion & Occupancy Certificate",
    category: "cat-building",
    category_name: "Building and Construction",
    department: "Engineering Wing, Tanur Municipality",
    summary: "Formal inspection, completion certification, door number allocation, and occupancy clearance for constructed buildings.",
    eligibility: [
      "Holders of valid Tanur Municipal Building Permit whose construction is fully completed as per approved plan",
      "No unauthorized deviations beyond permissible KMBR tolerances",
    ],
    required_documents: [
      "Copy of approved Building Permit and approved drawings",
      "Completion Certificate signed by the supervising registered engineer / licensee",
      "Photographs of completed building showing setbacks and rainwater harvesting tank",
      "Fire NOC and Pollution NOC (for commercial / public buildings)",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Completion Notice Submission",
        description: "Licensee submits completion plan and photos through K-Smart within 1 month of physical completion.",
      },
      {
        step_number: 2,
        title: "Physical Site Verification",
        description: "Municipal Assistant Engineer inspects building, measures setbacks, and validates rainwater harvesting setup.",
      },
      {
        step_number: 3,
        title: "Door Number Allotment & Certificate",
        description: "Municipality assigns permanent door number plate and issues digitally signed Occupancy Certificate.",
      },
    ],
    official_portal_url: "https://ksmart.lsgkerala.gov.in/",
    official_portal_name: "K-Smart Kerala Building Permission System",
    processing_time_days: 10,
    processing_time_text: "7 to 10 working days",
    fee_structure: "Statutory inspection fee as per KMBR schedule.",
    office_location: "Tanur Municipality Office, 1st Floor Engineering Section",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "K-Smart KMBR Module",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Municipality Building Rules (KMBR) 2019",
    faqs: [
      {
        question: "Can I get electricity and water connections without an Occupancy Certificate?",
        answer: "No, KSEB and KWA mandate an official Municipal Occupancy Certificate / Door Number receipt for permanent utility connections.",
      },
    ],
    views_count: 940,
    supports_internal_application: true,
    published: true,
  },

  // 8. Waste Management
  {
    id: "srv-waste-management",
    slug: "haritha-karma-sena-waste-management",
    title: "Haritha Karma Sena Non-Biodegradable Waste Collection",
    category: "cat-water-sanitation",
    category_name: "Water and Sanitation",
    department: "Clean Kerala & Health Wing, Tanur Municipality",
    summary: "Doorstep segregated non-biodegradable waste (plastics, glass, electronic waste) collection service covering all 45 wards of Tanur Municipality.",
    eligibility: [
      "All households, residential complexes, and commercial establishments in Tanur Municipality Wards 1 to 45",
      "Compliance with source-level segregation of non-biodegradable materials",
    ],
    required_documents: [
      "Municipality Door Number Tag or QR Code",
      "Segregated clean dry plastics and non-biodegradable materials",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Clean & Segregate at Source",
        description: "Wash and dry household dry waste; segregate soft plastic covers, rigid bottles, glass, and electronic scrap.",
      },
      {
        step_number: 2,
        title: "Monthly Doorstep Collection",
        description: "Trained Haritha Karma Sena members visit each house in the assigned ward as per the monthly ward calendar.",
      },
      {
        step_number: 3,
        title: "User Fee Receipt & RRF Transfer",
        description: "Pay authorized ₹50 user fee and receive digital receipt; collected waste is transferred to Tanur Material Collection Facility (MCF).",
      },
    ],
    official_portal_url: "https://cleankeralacompany.com/",
    official_portal_name: "Clean Kerala Company & Suchitwa Mission Kerala",
    processing_time_days: 30,
    processing_time_text: "Monthly recurring ward collection cycle",
    fee_structure: "₹50 per month for households; ₹100–₹500 for commercial shops as per council schedule.",
    office_location: "Tanur Municipality Health Wing / Ward Level Haritha Karma Sena Clusters",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Collection hours: 8:30 AM – 2:00 PM on designated ward days",
    is_online_available: false,
    online_system_name: "K-Smart Sanitation Tracking",
    last_verified_date: "2026-11-15",
    source_reference: "Solid Waste Management Rules 2016 & Kerala Government Order on User Fee",
    faqs: [
      {
        question: "Is payment of Haritha Karma Sena user fee mandatory in Tanur?",
        answer: "Yes, as per Kerala Government Orders and High Court directives, paying the monthly user fee is mandatory for all citizens.",
      },
    ],
    views_count: 1780,
    supports_internal_application: true,
    published: true,
  },

  // 9. Drinking Water Connection
  {
    id: "srv-water-connection",
    slug: "drinking-water-pipeline-connection",
    title: "Kerala Water Authority (KWA) Drinking Water Connection",
    category: "cat-water-sanitation",
    category_name: "Water and Sanitation",
    department: "Kerala Water Authority & Tanur Municipal Public Health Section",
    summary: "Application for fresh domestic or commercial potable piped water supply connection under Jal Jeevan Mission and KWA Urban Water schemes.",
    eligibility: [
      "Residents and property owners in Tanur Municipality with property within accessible distance of existing KWA distribution pipeline",
      "Clear title deed and municipal building tax receipt",
    ],
    required_documents: [
      "Latest Tanur Municipal Property Tax Paid Receipt or Building Door Number Certificate",
      "Copy of Registered Land Title Deed and Land Tax Receipt",
      "Aadhaar Card copy of the property owner",
      "Plumbing layout estimate by licensed KWA plumber",
      "Road Cutting Permission from Tanur Municipality Public Works Wing (if pipeline crosses public road)",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Online e-Tap Application",
        description: "Submit connection request through KWA e-Tap portal with door number and plumbing estimate.",
      },
      {
        step_number: 2,
        title: "Assistant Engineer Feasibility Inspection",
        description: "KWA Overseer inspects distribution main pressure, pipeline distance, and road cutting requirement.",
      },
      {
        step_number: 3,
        title: "Fee Remittance & Meter Installation",
        description: "Pay connection charges online; licensed plumber installs meter and activates potable water supply.",
      },
    ],
    official_portal_url: "https://kwa.kerala.gov.in/",
    official_portal_name: "Kerala Water Authority e-Tap Portal",
    processing_time_days: 14,
    processing_time_text: "10 to 14 working days (subject to road cutting sanctions)",
    fee_structure: "Statutory connection deposit and meter charges as per KWA tariff plus municipal road restoration fee.",
    office_location: "KWA Sub-Division Office, Tirur Road, Tanur / Tanur Municipal Engineering Counter",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "KWA e-Tap Portal",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Water Authority Water Supply Regulations",
    faqs: [
      {
        question: "Do I need Municipality approval before applying for water connection?",
        answer: "Yes, an authorized building door number certificate from Tanur Municipality is required.",
      },
    ],
    views_count: 1210,
    supports_internal_application: true,
    published: true,
  },

  // 10. Sanitary Inspection & NOC
  {
    id: "srv-sanitary-noc",
    slug: "sanitary-inspection-noc",
    title: "Sanitary Inspection & Public Health NOC",
    category: "cat-public-health",
    category_name: "Public Health",
    department: "Health & Sanitation Wing, Tanur Municipality",
    summary: "Health inspection and No Objection Certificate (NOC) for educational institutions, hostels, auditoriums, and community amenities.",
    eligibility: [
      "Managers or trustees of schools, colleges, daycare centers, hostels, and banquet halls located in Tanur Municipality",
      "Premises having adequate potable water, waste disposal, and ventilation systems",
    ],
    required_documents: [
      "Water Quality Testing Certificate from an accredited public health laboratory",
      "Building Door Number and latest Property Tax Receipt",
      "Layout plan showing toilet facilities and septic tank soak-pit distance",
      "Valid Fire Safety NOC (for institutions)",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Application Submission",
        description: "Submit request through K-Smart or Health Section counter with laboratory water test results.",
      },
      {
        step_number: 2,
        title: "Health Inspector On-Site Inspection",
        description: "Municipal Health Inspector visits the premises, inspects sanitation, drinking water storage, and kitchen hygiene.",
      },
      {
        step_number: 3,
        title: "NOC Issuance",
        description: "Upon satisfying statutory norms, Health Supervisor issues digitally signed Sanitary Certificate.",
      },
    ],
    official_portal_url: "https://ksmart.lsgkerala.gov.in/",
    official_portal_name: "K-Smart Kerala Health Module",
    processing_time_days: 7,
    processing_time_text: "5 to 7 working days",
    fee_structure: "₹250 to ₹1,000 based on institution category as per council schedule.",
    office_location: "Tanur Municipality Office, Health Section, Ground Floor",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "K-Smart Kerala",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Public Health Act 2023",
    faqs: [
      {
        question: "How long is the Sanitary NOC valid?",
        answer: "The sanitary inspection certificate is valid for one financial year and must be renewed annually.",
      },
    ],
    views_count: 670,
    supports_internal_application: true,
    published: true,
  },

  // 11. Food Business Hygiene Compliance
  {
    id: "srv-food-safety-hygiene",
    slug: "food-business-hygiene-compliance",
    title: "Food Business Hygiene & Vector Control Verification",
    category: "cat-public-health",
    category_name: "Public Health",
    department: "Health Wing, Tanur Municipality & Food Safety Kerala",
    summary: "Periodic hygienic verification, vector control inspection, and municipal health clearance for restaurants, catering units, and fish stalls.",
    eligibility: [
      "Commercial food handlers, bakery operators, restaurants, fish vendors, and cold storage units in Tanur",
      "Holders of valid FSSAI registration or license",
    ],
    required_documents: [
      "FSSAI Food License / Registration Certificate",
      "Medical Fitness Certificates of all food handlers / staff",
      "Waste water management and grease trap compliance declaration",
      "Pest control certificate from accredited vendor",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Application & Schedule",
        description: "Apply online via K-Smart health portal with staff medical clearances.",
      },
      {
        step_number: 2,
        title: "Joint Health Squad Inspection",
        description: "Municipal food safety squad checks kitchen cleanliness, food storage temperature, and grease disposal.",
      },
      {
        step_number: 3,
        title: "Compliance Clearance",
        description: "Clean certificate issued and linked to commercial trade license renewal.",
      },
    ],
    official_portal_url: "https://foscos.fssai.gov.in/",
    official_portal_name: "FSSAI FoSCoS & K-Smart Kerala",
    processing_time_days: 7,
    processing_time_text: "4 to 7 working days",
    fee_structure: "Statutory health inspection fee as per municipal schedule.",
    office_location: "Tanur Municipality Office, Health Section, Ground Floor",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "FSSAI & K-Smart",
    last_verified_date: "2026-11-15",
    source_reference: "Food Safety and Standards Act 2006 & Kerala Public Health Act 2023",
    faqs: [
      {
        question: "Do small tea stalls need this clearance?",
        answer: "Yes, all commercial food preparation units must maintain basic health clearance and food handler fitness certificates.",
      },
    ],
    views_count: 530,
    supports_internal_application: true,
    published: true,
  },

  // 12. Trade License Issuance
  {
    id: "srv-trade-license",
    slug: "trade-license-issuance",
    title: "Dangerous & Offensive (D&O) Trade Licence",
    category: "cat-business",
    category_name: "Trade and Business Licences",
    department: "Health Wing, Tanur Municipality",
    summary: "Grant and annual renewal of Dangerous and Offensive (D&O) trade licenses for commercial shops, workshops, industries, and retail enterprises.",
    eligibility: [
      "Business owners, entrepreneurs, or commercial tenants operating within Tanur Municipality Wards 1 to 45",
      "Premises located in conforming building with valid door number and rent agreement",
    ],
    required_documents: [
      "Building Door Number and latest Municipal Property Tax Receipt",
      "Rent Agreement with property owner (if running in rented premises) or ownership proof",
      "Consent letter from landowner",
      "Pollution Control Board (PCB) consent (for designated industrial/manufacturing categories)",
      "Fire NOC (for high-occupancy or inflammable trade categories)",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Online K-Smart Filing",
        description: "Submit trade details, horsepower requirement, and worker strength on K-Smart trade license portal.",
      },
      {
        step_number: 2,
        title: "Inspection & Classification",
        description: "Health Inspector verifies commercial nature and assigns statutory D&O schedule tier.",
      },
      {
        step_number: 3,
        title: "Payment & Instant License Download",
        description: "Pay license fee online; QR-coded digital trade license is generated immediately.",
      },
    ],
    official_portal_url: "https://ksmart.lsgkerala.gov.in/",
    official_portal_name: "K-Smart Kerala Trade Licence Portal",
    processing_time_days: 7,
    processing_time_text: "Instant self-certification for non-hazardous shops; 7 days for D&O trades",
    fee_structure: "Statutory schedule based on trade category and motive power (₹250 to ₹5,000).",
    office_location: "Tanur Municipality Office, Health Section, Ground Floor",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "K-Smart Kerala",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Municipality (Execution of Public Works & Trade Licensing) Rules",
    faqs: [
      {
        question: "When is the annual trade license renewal deadline?",
        answer: "Trade licenses must be renewed between January 1 and February 28 each year for the upcoming financial year.",
      },
    ],
    views_count: 1650,
    supports_internal_application: true,
    published: true,
  },

  // 13. Commercial Shop & Signboard Registration
  {
    id: "srv-commercial-signboard",
    slug: "commercial-shop-registration",
    title: "Commercial Establishment & Signboard Permission",
    category: "cat-business",
    category_name: "Trade and Business Licences",
    department: "Revenue & Engineering Wing, Tanur Municipality",
    summary: "Statutory permission for external business nameboards, LED signages, and advertisement hoardings in commercial corridors of Tanur.",
    eligibility: [
      "Commercial establishments and retail shops operating in Tanur Municipality",
      "Signage complying with visual safety and pedestrian clearance regulations",
    ],
    required_documents: [
      "Copy of valid Tanur Trade Licence",
      "Photograph and dimensional layout drawing of the proposed signboard",
      "Structural stability certificate (for large cantilever or rooftop hoardings)",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Online Submission",
        description: "Submit board dimensions (sq.ft) and installation photos via K-Smart advertisement portal.",
      },
      {
        step_number: 2,
        title: "Engineering Review",
        description: "Municipal overseer reviews road setback, non-obstruction to traffic, and electrical safety.",
      },
      {
        step_number: 3,
        title: "Advertisement Tax Remittance",
        description: "Pay statutory advertisement tax per sq.ft and receive digital permit.",
      },
    ],
    official_portal_url: "https://ksmart.lsgkerala.gov.in/",
    official_portal_name: "K-Smart Kerala Advertisement Portal",
    processing_time_days: 5,
    processing_time_text: "3 to 5 working days",
    fee_structure: "Calculated based on display square footage as per municipal advertisement bylaw.",
    office_location: "Tanur Municipality Office, Revenue Section, Ground Floor",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "K-Smart Kerala",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Municipality (Control of Advertisements) Rules",
    faqs: [
      {
        question: "Do simple shop nameboards need advertisement tax?",
        answer: "Standard non-illuminated nameboards up to authorized statutory size are exempted; illuminated and oversized boards require tax.",
      },
    ],
    views_count: 480,
    supports_internal_application: true,
    published: true,
  },

  // 14. Social Welfare Pension
  {
    id: "srv-welfare-pension",
    slug: "social-security-welfare-pension",
    title: "Social Security Welfare Pensions (Sevana DBT)",
    category: "cat-social-welfare",
    category_name: "Social Welfare",
    department: "Welfare & Social Justice Wing, Tanur Municipality",
    summary: "Application and direct benefit transfer (DBT) for Old Age Pension, Widow Pension, Disability Pension, Agricultural Worker Pension, and 50+ Unmarried Women Pension.",
    eligibility: [
      "Permanent resident of Tanur Municipality Wards 1 to 45",
      "Family annual income below ₹1,00,000 (from Village Office Income Certificate) or valid BPL Ration Card",
      "Age criteria: 60+ for Old Age, 50+ for Unmarried Women, or certified disability/widow status",
      "Not in receipt of other statutory service pensions or EPF pensions exceeding statutory limits",
    ],
    required_documents: [
      "Aadhaar Card copy of the applicant",
      "Ration Card copy (BPL category or family annual income certificate below ₹1,00,000 from Village Office)",
      "Bank Account Passbook copy linked to Aadhaar (or Post Office DBT account)",
      "Age Proof Certificate (Aadhaar / School Certificate / Medical Board Certificate for 60+)",
      "Disability Medical Board Certificate (minimum 40% disability for Disability Pension)",
      "Death Certificate of husband (for Widow Pension)",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Application Submission",
        description: "Submit online through Sevana Pension portal or at the Tanur Municipality Welfare Counter / Akshaya Centre.",
      },
      {
        step_number: 2,
        title: "Ward Enquiry & Field Verification",
        description: "Municipal enquiry officer conducts field verification at the applicant's residence in the respective ward.",
      },
      {
        step_number: 3,
        title: "Council Approval & DBT Disbursement",
        description: "Municipal Council approves eligible beneficiaries; monthly pension of ₹1,600 disbursed directly to bank account.",
      },
    ],
    official_portal_url: "https://welfarepension.lsgkerala.gov.in/",
    official_portal_name: "Sevana Social Security Pension Portal (Government of Kerala)",
    processing_time_days: 30,
    processing_time_text: "20 to 30 working days (subject to monthly council meeting approval)",
    fee_structure: "Completely Free. Zero government fee.",
    office_location: "Tanur Municipality Office, Welfare Section, First Floor",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "Sevana Pension Portal",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Social Security Pension Rules & LSGD Circulars",
    faqs: [
      {
        question: "What is the monthly pension amount?",
        answer: "The statutory social security welfare pension is ₹1,600 per month, directly credited to the beneficiary's Aadhaar-linked bank account.",
      },
      {
        question: "Is annual mustering (biometric KYC) required?",
        answer: "Yes, beneficiaries must complete annual biometric mustering at any Akshaya Centre to continue uninterrupted disbursement.",
      },
    ],
    views_count: 2190,
    supports_internal_application: true,
    published: true,
  },

  // 15. Differently-Abled Financial & Assistive Aid
  {
    id: "srv-disability-aid",
    slug: "differently-abled-welfare-support",
    title: "Differently-Abled Financial & Assistive Aid",
    category: "cat-social-welfare",
    category_name: "Social Welfare",
    department: "Welfare & Social Justice Wing, Tanur Municipality",
    summary: "Municipal developmental plan schemes providing motorized wheelchairs, hearing aids, educational scholarships, and self-employment subsidies.",
    eligibility: [
      "Permanent residents of Tanur Municipality with certified benchmark disability of 40% or above",
      "Annual household income within statutory limits specified in Tanur Municipal annual plan project guidelines",
    ],
    required_documents: [
      "Unique Disability ID (UDID) Card or District Medical Board Certificate",
      "Aadhaar Card and Ration Card copy",
      "Bank Account Passbook copy linked to Aadhaar",
      "Doctor's prescription for specific assistive device (wheelchair/hearing aid)",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Application during Plan Call",
        description: "Submit application during Tanur Municipality's annual plan project notification cycle.",
      },
      {
        step_number: 2,
        title: "Medical & Welfare Committee Scrutiny",
        description: "Standing Committee for Welfare scrutinizes applications with medical team recommendations.",
      },
      {
        step_number: 3,
        title: "Distribution Camp & Benefit Handover",
        description: "Approved aids, appliances, or financial grants are handed over at municipal distribution camps.",
      },
    ],
    official_portal_url: "https://services.lsgkerala.gov.in/",
    official_portal_name: "Kerala LSGD ILGMS Portal",
    processing_time_days: 45,
    processing_time_text: "Allocated according to Annual Municipal Plan Scheme schedule",
    fee_structure: "Completely Free municipal welfare service.",
    office_location: "Tanur Municipality Office, Welfare Section, First Floor",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "ILGMS Kerala",
    last_verified_date: "2026-11-15",
    source_reference: "Kerala Rights of Persons with Disabilities Rules & Municipal Plan Scheme",
    faqs: [
      {
        question: "Can children under 18 apply for scholarship assistance?",
        answer: "Yes, students with disabilities enrolled in recognized schools in Tanur qualify for annual municipal educational scholarships.",
      },
    ],
    views_count: 760,
    supports_internal_application: true,
    published: true,
  },

  // 16. Town Hall Booking
  {
    id: "srv-hall-booking",
    slug: "community-town-hall-booking",
    title: "Tanur Municipal Town Hall & Community Center Booking",
    category: "cat-other",
    category_name: "Other Municipal Services",
    department: "General Administration Wing, Tanur Municipality",
    summary: "Reservation and booking of Tanur Municipal Town Hall, mini-auditorium, and community centers for weddings, seminars, and cultural events.",
    eligibility: [
      "Citizens, educational institutions, registered trusts, and socio-cultural organizations in Tanur and surrounding areas",
      "Events strictly adhering to public decorum and municipal hall guidelines",
    ],
    required_documents: [
      "Photo Identity Proof of applicant (Aadhaar / Voter ID / PAN)",
      "Program Notice or Wedding Invitation Card (if applicable)",
      "Organization Registration Certificate (for non-profits and institutions)",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Check Date Availability",
        description: "Check the calendar at Tanur Municipality office or online portal for open booking slots.",
      },
      {
        step_number: 2,
        title: "Application & Security Deposit",
        description: "Submit reservation form with event details and pay required statutory caution deposit.",
      },
      {
        step_number: 3,
        title: "Allotment Confirmation",
        description: "Municipal Secretary confirms allotment slip with sound license and waste management conditions.",
      },
    ],
    official_portal_url: "https://ksmart.lsgkerala.gov.in/",
    official_portal_name: "K-Smart Kerala Facilities Booking",
    processing_time_days: 2,
    processing_time_text: "1 to 2 working days",
    fee_structure: "₹5,000 to ₹25,000 per slot depending on AC/Non-AC hall and event nature, plus refundable caution deposit.",
    office_location: "Tanur Municipality Office, General Administration Section, Ground Floor",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    is_online_available: true,
    online_system_name: "K-Smart Kerala",
    last_verified_date: "2026-11-15",
    source_reference: "Tanur Municipal Council Hall Rental Bylaw",
    faqs: [
      {
        question: "Is the security deposit refundable?",
        answer: "Yes, the caution deposit is fully refunded within 7 days post-event upon clearance of zero property damage.",
      },
    ],
    views_count: 1050,
    supports_internal_application: true,
    published: true,
  },

  // 17. Streetlight Repair Request
  {
    id: "srv-streetlight-repair",
    slug: "streetlight-maintenance-request",
    title: "Streetlight Maintenance & Public Works Repair",
    category: "cat-other",
    category_name: "Other Municipal Services",
    department: "Electrical & Public Works Wing, Tanur Municipality & KSEB",
    summary: "Reporting non-functioning LED streetlights, broken electric poles, or dark spots across all 45 wards of Tanur Municipality.",
    eligibility: [
      "Any resident, pedestrian, or shopkeeper in Tanur Municipality",
      "Public streetlight installed under municipal scheme",
    ],
    required_documents: [
      "Electric Pole Number (marked in yellow on pole, e.g. TNR-18-042)",
      "Ward Number (1 to 45) and Locality Landmark",
      "Complainant Contact Mobile Number",
    ],
    procedure_steps: [
      {
        step_number: 1,
        title: "Report via Civic Connect / Toll-free",
        description: "Submit request through OUR NATION Civic Issue Reporting or call Tanur Municipality Electrical Helpdesk.",
      },
      {
        step_number: 2,
        title: "Work Order to Maintenance Contractor",
        description: "Municipal electrical overseer batches complaints and assigns maintenance team with spare LED fittings.",
      },
      {
        step_number: 3,
        title: "On-site Rectification & Verification",
        description: "Maintenance vehicle visits pole, replaces driver/fittings, and marks issue resolved.",
      },
    ],
    official_portal_url: "/civic/report",
    official_portal_name: "OUR NATION Civic Issue Reporting & KSEB Helpdesk",
    processing_time_days: 3,
    processing_time_text: "2 to 4 working days",
    fee_structure: "Completely Free public maintenance service.",
    office_location: "Tanur Municipality Office, Public Works Section, Ground Floor",
    contact_phone: "0494 2440228",
    contact_email: "tanurmunicipality@gmail.com",
    working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM (Emergency KSEB: 1912)",
    is_online_available: true,
    online_system_name: "OUR NATION Civic Connect / K-Smart",
    last_verified_date: "2026-11-15",
    source_reference: "Tanur Municipal Council Resolution on Streetlight Maintenance",
    faqs: [
      {
        question: "Can new streetlights be requested for dark lanes?",
        answer: "Yes, proposals for new streetlights are vetted during ward committee meetings and implemented through municipal development funds.",
      },
    ],
    views_count: 1540,
    supports_internal_application: true,
    published: true,
  },
];

// Helper to look up category by key or ID
export function getServiceCategoryByKey(key: string): ServiceCategoryMeta | undefined {
  return SERVICE_CATEGORIES.find(c => c.key === key || c.id === key);
}

// ---------------------------------------------------------------------------
// IN-MEMORY / PERSISTED PUBLIC SERVICE APPLICATION STORE
// ---------------------------------------------------------------------------

class PublicServiceStore {
  private services: PublicServiceDetail[] = [...TANUR_MUNICIPAL_SERVICES];
  private applications: PublicServiceApplication[] = [
    // Seed initial application for Fathima Tanur (usr-fathima / u0000000-0000-0000-0000-000000000003)
    {
      id: "app-tnr-2026-001",
      reference_no: "PS-TNR-2026-1001",
      service_id: "srv-birth-reg",
      service_title: "Birth Registration & Digital Certificate Issuance",
      service_category: "cat-certificates",
      applicant_id: "u0000000-0000-0000-0000-000000000003",
      applicant_name: "Fathima Tanur",
      applicant_email: "fathima@tanur.gov.in",
      applicant_phone: "0494 2440228",
      ward_number: 12,
      documents: [
        { name: "Hospital Discharge Summary", status: "verified", note: "Verified against Tanur Taluk Hospital records" },
        { name: "Father & Mother Aadhaar Cards", status: "verified", note: "UIDAI biometric match confirmed" },
        { name: "Form 1 Reporting Form", status: "verified", note: "Signed by parent" },
      ],
      notes: "Requesting assistance for digital birth certificate verification before statutory K-Smart submission.",
      status: "documents_verified",
      status_notes: "Hospital discharge slip and parent Aadhaar cards verified against Tanur Registrar records. Ready for portal download.",
      created_at: "2026-11-20T10:30:00.000Z",
      updated_at: "2026-11-21T14:15:00.000Z",
      timeline: [
        {
          date: "2026-11-20T10:30:00.000Z",
          status: "submitted",
          actor: "Fathima Tanur (Applicant)",
          note: "Guidance application submitted through OUR NATION platform.",
        },
        {
          date: "2026-11-20T15:00:00.000Z",
          status: "under_review",
          actor: "Tanur Helpdesk Officer",
          note: "Application taken up for document scrutiny.",
        },
        {
          date: "2026-11-21T14:15:00.000Z",
          status: "documents_verified",
          actor: "Municipal Registrar Section",
          note: "Document verification complete. Guidance notes issued for online K-Smart download.",
        },
      ],
    },
    // Seed sample property tax assistance
    {
      id: "app-tnr-2026-002",
      reference_no: "PS-TNR-2026-1002",
      service_id: "srv-property-tax",
      service_title: "Property Tax Assessment & Online Payment",
      service_category: "cat-property-tax",
      applicant_id: "u0000000-0000-0000-0000-000000000003",
      applicant_name: "Fathima Tanur",
      applicant_email: "fathima@tanur.gov.in",
      applicant_phone: "0494 2440228",
      ward_number: 12,
      documents: [
        { name: "Previous Year Tax Receipt", status: "verified", note: "Ward 12 / Door 452A" },
        { name: "Ownership Deed Copy", status: "verified", note: "Registered title deed verified" },
      ],
      notes: "Need calculation confirmation for plinth area rebate before online Sanchitha payment.",
      status: "completed",
      status_notes: "Demand verified as ₹840 with early bird rebate. Sanchitha direct link provided.",
      created_at: "2026-11-18T09:00:00.000Z",
      updated_at: "2026-11-19T11:30:00.000Z",
      timeline: [
        {
          date: "2026-11-18T09:00:00.000Z",
          status: "submitted",
          actor: "Fathima Tanur (Applicant)",
          note: "Guidance application submitted.",
        },
        {
          date: "2026-11-18T14:00:00.000Z",
          status: "under_review",
          actor: "Revenue Helpdesk Officer",
          note: "Checking tax demand in Sanchitha municipal register.",
        },
        {
          date: "2026-11-19T11:30:00.000Z",
          status: "completed",
          actor: "Revenue Inspector",
          note: "Tax demand breakdown calculated and sent to citizen. Guidance completed.",
        },
      ],
    },
  ];

  // SERVICES CRUD
  public getServices(category?: string, query?: string, sort: 'popular' | 'recent' | 'name' = 'popular'): PublicServiceDetail[] {
    let list = this.services.filter(s => s.published !== false);

    if (category && category !== 'all') {
      list = list.filter(s => s.category === category || s.category_name.toLowerCase() === category.toLowerCase());
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.category_name.toLowerCase().includes(q)
      );
    }

    if (sort === 'popular') {
      list.sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
    } else if (sort === 'recent') {
      list.sort((a, b) => new Date(b.last_verified_date).getTime() - new Date(a.last_verified_date).getTime());
    } else if (sort === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }

  public getServiceBySlug(slug: string): PublicServiceDetail | undefined {
    return this.services.find(s => s.slug === slug || s.id === slug);
  }

  public getServiceById(id: string): PublicServiceDetail | undefined {
    return this.services.find(s => s.id === id);
  }

  public createService(data: Omit<PublicServiceDetail, "id" | "views_count">): PublicServiceDetail {
    const id = `srv-${Date.now()}`;
    const newService: PublicServiceDetail = {
      ...data,
      id,
      views_count: 0,
      published: true,
      last_verified_date: new Date().toISOString().split("T")[0],
      audit_history: [
        {
          date: new Date().toISOString().split("T")[0],
          actor: "Admin",
          action: "Service created",
        }
      ]
    };
    this.services.push(newService);
    return newService;
  }

  public updateService(id: string, updates: Partial<PublicServiceDetail>, actor: string = "Admin"): PublicServiceDetail | undefined {
    const idx = this.services.findIndex(s => s.id === id);
    if (idx === -1) return undefined;

    const existing = this.services[idx];
    const audit_history = existing.audit_history ? [...existing.audit_history] : [];
    audit_history.push({
      date: new Date().toISOString().split("T")[0],
      actor,
      action: "Service updated",
      note: updates.title ? `Title updated to ${updates.title}` : undefined
    });

    const updated: PublicServiceDetail = {
      ...existing,
      ...updates,
      audit_history,
      last_verified_date: new Date().toISOString().split("T")[0],
    };

    this.services[idx] = updated;
    return updated;
  }

  public archiveService(id: string, actor: string = "Admin"): boolean {
    const service = this.services.find(s => s.id === id);
    if (!service) return false;
    service.published = false;
    if (!service.audit_history) service.audit_history = [];
    service.audit_history.push({
      date: new Date().toISOString().split("T")[0],
      actor,
      action: "Service archived / unpublished",
    });
    return true;
  }

  // APPLICATIONS CRUD
  public getApplications(applicantId?: string, status?: string): PublicServiceApplication[] {
    let list = [...this.applications];
    if (applicantId) {
      list = list.filter(a => a.applicant_id === applicantId);
    }
    if (status && status !== 'all') {
      list = list.filter(a => a.status === status);
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public getApplicationById(id: string): PublicServiceApplication | undefined {
    return this.applications.find(a => a.id === id);
  }

  public getApplicationByReference(ref: string): PublicServiceApplication | undefined {
    return this.applications.find(a => a.reference_no.toUpperCase() === ref.trim().toUpperCase());
  }

  public submitApplication(input: {
    service_id: string;
    applicant_id: string;
    applicant_name: string;
    applicant_email: string;
    applicant_phone: string;
    ward_number: number;
    documents?: Array<{ name: string; url?: string }>;
    notes?: string;
  }): PublicServiceApplication {
    const service = this.getServiceById(input.service_id) || this.getServiceBySlug(input.service_id);
    const serviceTitle = service ? service.title : "Municipal Guidance Service";
    const serviceCategory = service ? service.category : "cat-other";

    // Generate reference number strictly: PS-TNR-2026-XXXX
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const reference_no = `PS-TNR-2026-${randomDigits}`;
    const id = `app-${Date.now()}`;
    const now = new Date().toISOString();

    const formattedDocs = (input.documents || []).map(d => ({
      name: d.name,
      url: d.url,
      status: "uploaded" as const,
    }));

    const newApp: PublicServiceApplication = {
      id,
      reference_no,
      service_id: input.service_id,
      service_title: serviceTitle,
      service_category: serviceCategory,
      applicant_id: input.applicant_id,
      applicant_name: input.applicant_name,
      applicant_email: input.applicant_email,
      applicant_phone: input.applicant_phone,
      ward_number: input.ward_number,
      documents: formattedDocs,
      notes: input.notes || "",
      status: "submitted",
      created_at: now,
      updated_at: now,
      timeline: [
        {
          date: now,
          status: "submitted",
          actor: `${input.applicant_name} (Applicant)`,
          note: "Municipal guidance and document verification request submitted.",
        }
      ]
    };

    this.applications.unshift(newApp);

    // Dispatch notification to user
    try {
      store.addNotification({
        user_id: input.applicant_id,
        title: "Service Guidance Request Submitted",
        title_ml: "Service Guidance Request Submitted",
        message: `Your guidance application for "${serviceTitle}" has been received. Reference: ${reference_no}.`,
        message_ml: `Your guidance application for "${serviceTitle}" has been received. Reference: ${reference_no}.`,
        type: "public_service_status",
        category: "system",
        link: `/dashboard?tab=applications&ref=${reference_no}`,
      });
    } catch {
      // Ignore notification error if store not initialized
    }

    return newApp;
  }

  public updateApplicationStatus(
    id: string, 
    status: ServiceApplicationStatus, 
    note?: string, 
    actor: string = "Municipal Helpdesk Officer"
  ): PublicServiceApplication | undefined {
    const app = this.applications.find(a => a.id === id || a.reference_no === id);
    if (!app) return undefined;

    const now = new Date().toISOString();
    app.status = status;
    app.updated_at = now;
    if (note) {
      app.status_notes = note;
    }

    app.timeline.unshift({
      date: now,
      status,
      actor,
      note: note || `Application status changed to ${status.replace('_', ' ')}.`,
    });

    // Notify citizen
    try {
      const readableStatus = status.replace('_', ' ').toUpperCase();
      store.addNotification({
        user_id: app.applicant_id,
        title: `Service Application: ${readableStatus}`,
        title_ml: `Service Application: ${readableStatus}`,
        message: `Your guidance request (${app.reference_no}) is now ${readableStatus}. ${note || ''}`.trim(),
        message_ml: `Your guidance request (${app.reference_no}) is now ${readableStatus}. ${note || ''}`.trim(),
        type: "public_service_status",
        category: "system",
        link: `/dashboard?tab=applications&ref=${app.reference_no}`,
      });
    } catch {
      // Ignore notification error
    }

    return app;
  }
}

export const publicServiceStore = new PublicServiceStore();
