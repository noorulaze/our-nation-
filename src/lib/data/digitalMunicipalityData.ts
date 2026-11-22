import { 
  DevelopmentProject, 
  DevelopmentProgressUpdate,
  MunicipalWard, 
  CitizenProposal, 
  ProjectCategory, 
  ProjectStatus,
  ProposalCategory,
  ProposalStatus,
  DigitalTanurLocation,
  LocationCategoryKey,
  FacilityCategoryKey,
  LocalityItem,
  ProjectContribution,
  ContributionType,
  ContributionStatus,
  ProjectAuditLog,
  ProjectSourceDocument,
  InformationSourceType,
  MilestoneType
} from "@/types/digitalMunicipality";

// -------------------------------------------------------------
// TRANSPARENT TANUR: OFFICIAL PROJECT CATEGORIES (9 STATUTORY CATEGORIES)
// -------------------------------------------------------------
export const TRANSPARENT_PROJECT_CATEGORIES = [
  { key: "roads_transportation", legacy_keys: ["roads_transport"], label: "Roads and Transportation", label_ml: "Roads and Transportation", icon: "Car", color: "#1E3A8A" },
  { key: "drainage_water", legacy_keys: ["water_drainage"], label: "Drainage and Water Management", label_ml: "Drainage and Water Management", icon: "Droplets", color: "#0284C7" },
  { key: "drinking_water", legacy_keys: ["water_sanitation"], label: "Drinking Water", label_ml: "Drinking Water", icon: "Droplets", color: "#0D9488" },
  { key: "waste_management", legacy_keys: [], label: "Waste Management", label_ml: "Waste Management", icon: "Trash2", color: "#059669" },
  { key: "education", legacy_keys: [], label: "Education", label_ml: "Education", icon: "GraduationCap", color: "#4338CA" },
  { key: "healthcare", legacy_keys: [], label: "Healthcare", label_ml: "Healthcare", icon: "Activity", color: "#DC2626" },
  { key: "public_infrastructure", legacy_keys: ["public_facilities", "infrastructure", "fisheries_harbour"], label: "Public Infrastructure", label_ml: "Public Infrastructure", icon: "Building2", color: "#D97706" },
  { key: "parks_public_spaces", legacy_keys: ["environment", "sports_youth", "environment_coastal"], label: "Parks and Public Spaces", label_ml: "Parks and Public Spaces", icon: "Leaf", color: "#16A34A" },
  { key: "other_development", legacy_keys: ["other", "streetlights", "community_infrastructure", "facilities", "tourism_culture"], label: "Other Local Development", label_ml: "Other Local Development", icon: "Layers", color: "#4B5563" },
] as const;

// -------------------------------------------------------------
// 1. ALL 45 WARDS OF TANUR MUNICIPALITY (താനൂർ നഗരസഭയിലെ 45 വാർഡുകൾ)
// Official Ward Nomenclature & Key Localities (LSGD Kerala Code 1276)
// -------------------------------------------------------------
export const TANUR_MUNICIPAL_WARDS: MunicipalWard[] = [
  {
    id: "ward-01",
    ward_number: 1,
    name: "Ottumpuram",
    name_ml: "Ottumpuram",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Ummuhan M K",
    councillor_name_ml: "Ummuhan M K",
    councillor_contact: "0494 2440228",
    key_localities: ["Ottumpuram Centre", "Ottumpuram Junction"],
    key_localities_ml: ["Ottumpuram കേന്ദ്രം"],
    population_approx: 1512,
    active_issues_count: 2,
    active_projects_count: 2,
    latitude: 10.9706,
    longitude: 75.8555,
  },
  {
    id: "ward-02",
    ward_number: 2,
    name: "Pariyapuram",
    name_ml: "Pariyapuram",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Bindu N",
    councillor_name_ml: "Bindu N",
    councillor_contact: "0494 2440228",
    key_localities: ["Pariyapuram Centre", "Pariyapuram Junction"],
    key_localities_ml: ["Pariyapuram കേന്ദ്രം"],
    population_approx: 1524,
    active_issues_count: 3,
    active_projects_count: 3,
    latitude: 10.9712,
    longitude: 75.8560,
  },
  {
    id: "ward-03",
    ward_number: 3,
    name: "Olappeedika",
    name_ml: "Olappeedika",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Fousiya",
    councillor_name_ml: "Fousiya",
    councillor_contact: "0494 2440228",
    key_localities: ["Olappeedika Centre", "Olappeedika Junction"],
    key_localities_ml: ["Olappeedika കേന്ദ്രം"],
    population_approx: 1536,
    active_issues_count: 4,
    active_projects_count: 1,
    latitude: 10.9718,
    longitude: 75.8565,
  },
  {
    id: "ward-04",
    ward_number: 4,
    name: "Malidweep",
    name_ml: "Malidweep",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Rasheed Moria",
    councillor_name_ml: "Rasheed Moria",
    councillor_contact: "0494 2440228",
    key_localities: ["Malidweep Centre", "Malidweep Junction"],
    key_localities_ml: ["Malidweep കേന്ദ്രം"],
    population_approx: 1548,
    active_issues_count: 1,
    active_projects_count: 2,
    latitude: 10.9724,
    longitude: 75.8570,
  },
  {
    id: "ward-05",
    ward_number: 5,
    name: "Attillam",
    name_ml: "Attillam",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Fathima K",
    councillor_name_ml: "Fathima K",
    councillor_contact: "0494 2440228",
    key_localities: ["Attillam Centre", "Attillam Junction"],
    key_localities_ml: ["Attillam കേന്ദ്രം"],
    population_approx: 1560,
    active_issues_count: 2,
    active_projects_count: 3,
    latitude: 10.9730,
    longitude: 75.8575,
  },
  {
    id: "ward-06",
    ward_number: 6,
    name: "Kunnumpuram North",
    name_ml: "Kunnumpuram North",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Abhilash T V",
    councillor_name_ml: "Abhilash T V",
    councillor_contact: "0494 2440228",
    key_localities: ["Kunnumpuram North Centre", "Kunnumpuram North Junction"],
    key_localities_ml: ["Kunnumpuram North കേന്ദ്രം"],
    population_approx: 1572,
    active_issues_count: 3,
    active_projects_count: 1,
    latitude: 10.9736,
    longitude: 75.8580,
  },
  {
    id: "ward-07",
    ward_number: 7,
    name: "Moria",
    name_ml: "Moria",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Abida",
    councillor_name_ml: "Abida",
    councillor_contact: "0494 2440228",
    key_localities: ["Moria Centre", "Moria Junction"],
    key_localities_ml: ["Moria കേന്ദ്രം"],
    population_approx: 1584,
    active_issues_count: 4,
    active_projects_count: 2,
    latitude: 10.9742,
    longitude: 75.8585,
  },
  {
    id: "ward-08",
    ward_number: 8,
    name: "Kunnumpuram South",
    name_ml: "Kunnumpuram South",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Dinesan",
    councillor_name_ml: "Dinesan",
    councillor_contact: "0494 2440228",
    key_localities: ["Kunnumpuram South Centre", "Kunnumpuram South Junction"],
    key_localities_ml: ["Kunnumpuram South കേന്ദ്രം"],
    population_approx: 1596,
    active_issues_count: 1,
    active_projects_count: 3,
    latitude: 10.9748,
    longitude: 75.8590,
  },
  {
    id: "ward-09",
    ward_number: 9,
    name: "Kunnumpuram Central",
    name_ml: "Kunnumpuram Central",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Raseena Inam",
    councillor_name_ml: "Raseena Inam",
    councillor_contact: "0494 2440228",
    key_localities: ["Kunnumpuram Central Centre", "Kunnumpuram Central Junction"],
    key_localities_ml: ["Kunnumpuram Central കേന്ദ്രം"],
    population_approx: 1608,
    active_issues_count: 2,
    active_projects_count: 1,
    latitude: 10.9754,
    longitude: 75.8595,
  },
  {
    id: "ward-10",
    ward_number: 10,
    name: "Kunnumpuram East",
    name_ml: "Kunnumpuram East",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Radhika Jayaprakash",
    councillor_name_ml: "Radhika Jayaprakash",
    councillor_contact: "0494 2440228",
    key_localities: ["Kunnumpuram East Centre", "Kunnumpuram East Junction"],
    key_localities_ml: ["Kunnumpuram East കേന്ദ്രം"],
    population_approx: 1620,
    active_issues_count: 3,
    active_projects_count: 2,
    latitude: 10.9760,
    longitude: 75.8600,
  },
  {
    id: "ward-11",
    ward_number: 11,
    name: "Panangattoor Central",
    name_ml: "Panangattoor Central",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Mufliha B",
    councillor_name_ml: "Mufliha B",
    councillor_contact: "0494 2440228",
    key_localities: ["Panangattoor Central Centre", "Panangattoor Central Junction"],
    key_localities_ml: ["Panangattoor Central കേന്ദ്രം"],
    population_approx: 1632,
    active_issues_count: 4,
    active_projects_count: 3,
    latitude: 10.9766,
    longitude: 75.8605,
  },
  {
    id: "ward-12",
    ward_number: 12,
    name: "Panangattoor",
    name_ml: "Panangattoor",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Aboobacker",
    councillor_name_ml: "Aboobacker",
    councillor_contact: "0494 2440228",
    key_localities: ["Panangattoor Centre", "Panangattoor Junction"],
    key_localities_ml: ["Panangattoor കേന്ദ്രം"],
    population_approx: 1644,
    active_issues_count: 1,
    active_projects_count: 1,
    latitude: 10.9772,
    longitude: 75.8610,
  },
  {
    id: "ward-13",
    ward_number: 13,
    name: "Chancheri Parambu",
    name_ml: "Chancheri Parambu",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Aneesha Beegam",
    councillor_name_ml: "Aneesha Beegam",
    councillor_contact: "0494 2440228",
    key_localities: ["Chancheri Parambu Centre", "Chancheri Parambu Junction"],
    key_localities_ml: ["Chancheri Parambu കേന്ദ്രം"],
    population_approx: 1656,
    active_issues_count: 2,
    active_projects_count: 2,
    latitude: 10.9778,
    longitude: 75.8615,
  },
  {
    id: "ward-14",
    ward_number: 14,
    name: "Rayirimangalam East",
    name_ml: "Rayirimangalam East",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Anandan",
    councillor_name_ml: "Anandan",
    councillor_contact: "0494 2440228",
    key_localities: ["Rayirimangalam East Centre", "Rayirimangalam East Junction"],
    key_localities_ml: ["Rayirimangalam East കേന്ദ്രം"],
    population_approx: 1668,
    active_issues_count: 3,
    active_projects_count: 3,
    latitude: 10.9784,
    longitude: 75.8620,
  },
  {
    id: "ward-15",
    ward_number: 15,
    name: "Rayirimangalam West",
    name_ml: "Rayirimangalam West",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Priyesh",
    councillor_name_ml: "Priyesh",
    councillor_contact: "0494 2440228",
    key_localities: ["Rayirimangalam West Centre", "Rayirimangalam West Junction"],
    key_localities_ml: ["Rayirimangalam West കേന്ദ്രം"],
    population_approx: 1680,
    active_issues_count: 4,
    active_projects_count: 1,
    latitude: 10.9790,
    longitude: 75.8625,
  },
  {
    id: "ward-16",
    ward_number: 16,
    name: "Theyyala Railway Gate",
    name_ml: "Theyyala Railway Gate",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Lamih Rahman A N",
    councillor_name_ml: "Lamih Rahman A N",
    councillor_contact: "0494 2440228",
    key_localities: ["Theyyala Railway Gate Centre", "Theyyala Railway Gate Junction"],
    key_localities_ml: ["Theyyala Railway Gate കേന്ദ്രം"],
    population_approx: 1692,
    active_issues_count: 1,
    active_projects_count: 2,
    latitude: 10.9796,
    longitude: 75.8630,
  },
  {
    id: "ward-17",
    ward_number: 17,
    name: "Tanur Railway Melppalam",
    name_ml: "Tanur Railway Melppalam",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Farsana Fairros",
    councillor_name_ml: "Farsana Fairros",
    councillor_contact: "0494 2440228",
    key_localities: ["Tanur Railway Melppalam Centre", "Tanur Railway Melppalam Junction"],
    key_localities_ml: ["Tanur Railway Melppalam കേന്ദ്രം"],
    population_approx: 1704,
    active_issues_count: 2,
    active_projects_count: 3,
    latitude: 10.9802,
    longitude: 75.8635,
  },
  {
    id: "ward-18",
    ward_number: 18,
    name: "Kannanthali",
    name_ml: "Kannanthali",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Siddhik P",
    councillor_name_ml: "Siddhik P",
    councillor_contact: "0494 2440228",
    key_localities: ["Kannanthali Centre", "Kannanthali Junction"],
    key_localities_ml: ["Kannanthali കേന്ദ്രം"],
    population_approx: 1716,
    active_issues_count: 3,
    active_projects_count: 1,
    latitude: 10.9808,
    longitude: 75.8640,
  },
  {
    id: "ward-19",
    ward_number: 19,
    name: "Kattilangadi",
    name_ml: "Kattilangadi",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Suchithra",
    councillor_name_ml: "Suchithra",
    councillor_contact: "0494 2440228",
    key_localities: ["Kattilangadi Centre", "Kattilangadi Junction"],
    key_localities_ml: ["Kattilangadi കേന്ദ്രം"],
    population_approx: 1728,
    active_issues_count: 4,
    active_projects_count: 2,
    latitude: 10.9814,
    longitude: 75.8645,
  },
  {
    id: "ward-20",
    ward_number: 20,
    name: "Kattilangadi South",
    name_ml: "Kattilangadi South",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Suhaib V N",
    councillor_name_ml: "Suhaib V N",
    councillor_contact: "0494 2440228",
    key_localities: ["Kattilangadi South Centre", "Kattilangadi South Junction"],
    key_localities_ml: ["Kattilangadi South കേന്ദ്രം"],
    population_approx: 1740,
    active_issues_count: 1,
    active_projects_count: 3,
    latitude: 10.9820,
    longitude: 75.8650,
  },
  {
    id: "ward-21",
    ward_number: 21,
    name: "Kattilangadi West",
    name_ml: "Kattilangadi West",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Radhika T",
    councillor_name_ml: "Radhika T",
    councillor_contact: "0494 2440228",
    key_localities: ["Kattilangadi West Centre", "Kattilangadi West Junction"],
    key_localities_ml: ["Kattilangadi West കേന്ദ്രം"],
    population_approx: 1752,
    active_issues_count: 2,
    active_projects_count: 1,
    latitude: 10.9826,
    longitude: 75.8655,
  },
  {
    id: "ward-22",
    ward_number: 22,
    name: "Nadakkavu",
    name_ml: "Nadakkavu",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Farook Nadakkavu",
    councillor_name_ml: "Farook Nadakkavu",
    councillor_contact: "0494 2440228",
    key_localities: ["Nadakkavu Centre", "Nadakkavu Junction"],
    key_localities_ml: ["Nadakkavu കേന്ദ്രം"],
    population_approx: 1764,
    active_issues_count: 3,
    active_projects_count: 2,
    latitude: 10.9832,
    longitude: 75.8660,
  },
  {
    id: "ward-23",
    ward_number: 23,
    name: "Tanur",
    name_ml: "Tanur",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Mohamed Faisal K",
    councillor_name_ml: "Mohamed Faisal K",
    councillor_contact: "0494 2440228",
    key_localities: ["Tanur Centre", "Tanur Junction"],
    key_localities_ml: ["Tanur കേന്ദ്രം"],
    population_approx: 1776,
    active_issues_count: 4,
    active_projects_count: 3,
    latitude: 10.9838,
    longitude: 75.8665,
  },
  {
    id: "ward-24",
    ward_number: 24,
    name: "Karad",
    name_ml: "Karad",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Baby Sankar O K",
    councillor_name_ml: "Baby Sankar O K",
    councillor_contact: "0494 2440228",
    key_localities: ["Karad Centre", "Karad Junction"],
    key_localities_ml: ["Karad കേന്ദ്രം"],
    population_approx: 1788,
    active_issues_count: 1,
    active_projects_count: 1,
    latitude: 10.9844,
    longitude: 75.8670,
  },
  {
    id: "ward-25",
    ward_number: 25,
    name: "Puthiyakadappuram",
    name_ml: "Puthiyakadappuram",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Sabira",
    councillor_name_ml: "Sabira",
    councillor_contact: "0494 2440228",
    key_localities: ["Puthiyakadappuram Centre", "Puthiyakadappuram Junction"],
    key_localities_ml: ["Puthiyakadappuram കേന്ദ്രം"],
    population_approx: 1800,
    active_issues_count: 2,
    active_projects_count: 2,
    latitude: 10.9850,
    longitude: 75.8675,
  },
  {
    id: "ward-26",
    ward_number: 26,
    name: "Anchudi",
    name_ml: "Anchudi",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Noushad A P",
    councillor_name_ml: "Noushad A P",
    councillor_contact: "0494 2440228",
    key_localities: ["Anchudi Centre", "Anchudi Junction"],
    key_localities_ml: ["Anchudi കേന്ദ്രം"],
    population_approx: 1812,
    active_issues_count: 3,
    active_projects_count: 3,
    latitude: 10.9856,
    longitude: 75.8680,
  },
  {
    id: "ward-27",
    ward_number: 27,
    name: "Cheeran Kadappuram",
    name_ml: "Cheeran Kadappuram",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Safoora A P",
    councillor_name_ml: "Safoora A P",
    councillor_contact: "0494 2440228",
    key_localities: ["Cheeran Kadappuram Centre", "Cheeran Kadappuram Junction"],
    key_localities_ml: ["Cheeran Kadappuram കേന്ദ്രം"],
    population_approx: 1824,
    active_issues_count: 4,
    active_projects_count: 1,
    latitude: 10.9862,
    longitude: 75.8685,
  },
  {
    id: "ward-28",
    ward_number: 28,
    name: "Vembalam Parambu",
    name_ml: "Vembalam Parambu",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "E P Sameer",
    councillor_name_ml: "E P Sameer",
    councillor_contact: "0494 2440228",
    key_localities: ["Vembalam Parambu Centre", "Vembalam Parambu Junction"],
    key_localities_ml: ["Vembalam Parambu കേന്ദ്രം"],
    population_approx: 1836,
    active_issues_count: 1,
    active_projects_count: 2,
    latitude: 10.9868,
    longitude: 75.8690,
  },
  {
    id: "ward-29",
    ward_number: 29,
    name: "Edakkadappuram South",
    name_ml: "Edakkadappuram South",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "K Salam",
    councillor_name_ml: "K Salam",
    councillor_contact: "0494 2440228",
    key_localities: ["Edakkadappuram South Centre", "Edakkadappuram South Junction"],
    key_localities_ml: ["Edakkadappuram South കേന്ദ്രം"],
    population_approx: 1848,
    active_issues_count: 2,
    active_projects_count: 3,
    latitude: 10.9874,
    longitude: 75.8695,
  },
  {
    id: "ward-30",
    ward_number: 30,
    name: "Edakkadappuram North",
    name_ml: "Edakkadappuram North",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Nazeera C M",
    councillor_name_ml: "Nazeera C M",
    councillor_contact: "0494 2440228",
    key_localities: ["Edakkadappuram North Centre", "Edakkadappuram North Junction"],
    key_localities_ml: ["Edakkadappuram North കേന്ദ്രം"],
    population_approx: 1860,
    active_issues_count: 3,
    active_projects_count: 1,
    latitude: 10.9880,
    longitude: 75.8700,
  },
  {
    id: "ward-31",
    ward_number: 31,
    name: "Tanur Nagaram",
    name_ml: "Tanur Nagaram",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Fasila P P",
    councillor_name_ml: "Fasila P P",
    councillor_contact: "0494 2440228",
    key_localities: ["Tanur Nagaram Centre", "Tanur Nagaram Junction"],
    key_localities_ml: ["Tanur Nagaram കേന്ദ്രം"],
    population_approx: 1872,
    active_issues_count: 4,
    active_projects_count: 2,
    latitude: 10.9886,
    longitude: 75.8705,
  },
  {
    id: "ward-32",
    ward_number: 32,
    name: "Harber",
    name_ml: "Harber",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Ashraf",
    councillor_name_ml: "Ashraf",
    councillor_contact: "0494 2440228",
    key_localities: ["Harber Centre", "Harber Junction"],
    key_localities_ml: ["Harber കേന്ദ്രം"],
    population_approx: 1884,
    active_issues_count: 1,
    active_projects_count: 3,
    latitude: 10.9892,
    longitude: 75.8710,
  },
  {
    id: "ward-33",
    ward_number: 33,
    name: "Elarankadappuram",
    name_ml: "Elarankadappuram",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Zuhara",
    councillor_name_ml: "Zuhara",
    councillor_contact: "0494 2440228",
    key_localities: ["Elarankadappuram Centre", "Elarankadappuram Junction"],
    key_localities_ml: ["Elarankadappuram കേന്ദ്രം"],
    population_approx: 1896,
    active_issues_count: 2,
    active_projects_count: 1,
    latitude: 10.9898,
    longitude: 75.8715,
  },
  {
    id: "ward-34",
    ward_number: 34,
    name: "Tanur Central",
    name_ml: "Tanur Central",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Jasmi",
    councillor_name_ml: "Jasmi",
    councillor_contact: "0494 2440228",
    key_localities: ["Tanur Central Centre", "Tanur Central Junction"],
    key_localities_ml: ["Tanur Central കേന്ദ്രം"],
    population_approx: 1908,
    active_issues_count: 3,
    active_projects_count: 2,
    latitude: 10.9904,
    longitude: 75.8720,
  },
  {
    id: "ward-35",
    ward_number: 35,
    name: "Civil Station",
    name_ml: "Civil Station",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Nasila Thejas N K",
    councillor_name_ml: "Nasila Thejas N K",
    councillor_contact: "0494 2440228",
    key_localities: ["Civil Station Centre", "Civil Station Junction"],
    key_localities_ml: ["Civil Station കേന്ദ്രം"],
    population_approx: 1920,
    active_issues_count: 4,
    active_projects_count: 3,
    latitude: 10.9910,
    longitude: 75.8725,
  },
  {
    id: "ward-36",
    ward_number: 36,
    name: "Chellikkadu",
    name_ml: "Chellikkadu",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Hafsath P",
    councillor_name_ml: "Hafsath P",
    councillor_contact: "0494 2440228",
    key_localities: ["Chellikkadu Centre", "Chellikkadu Junction"],
    key_localities_ml: ["Chellikkadu കേന്ദ്രം"],
    population_approx: 1932,
    active_issues_count: 1,
    active_projects_count: 1,
    latitude: 10.9916,
    longitude: 75.8730,
  },
  {
    id: "ward-37",
    ward_number: 37,
    name: "C.H.C",
    name_ml: "C.H.C",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Prameela K",
    councillor_name_ml: "Prameela K",
    councillor_contact: "0494 2440228",
    key_localities: ["C.H.C Centre", "C.H.C Junction"],
    key_localities_ml: ["C.H.C കേന്ദ്രം"],
    population_approx: 1944,
    active_issues_count: 2,
    active_projects_count: 2,
    latitude: 10.9922,
    longitude: 75.8735,
  },
  {
    id: "ward-38",
    ward_number: 38,
    name: "Pandarakkadappuram",
    name_ml: "Pandarakkadappuram",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Muhsina",
    councillor_name_ml: "Muhsina",
    councillor_contact: "0494 2440228",
    key_localities: ["Pandarakkadappuram Centre", "Pandarakkadappuram Junction"],
    key_localities_ml: ["Pandarakkadappuram കേന്ദ്രം"],
    population_approx: 1956,
    active_issues_count: 3,
    active_projects_count: 3,
    latitude: 10.9928,
    longitude: 75.8740,
  },
  {
    id: "ward-39",
    ward_number: 39,
    name: "Chappappadi",
    name_ml: "Chappappadi",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Saidalavi",
    councillor_name_ml: "Saidalavi",
    councillor_contact: "0494 2440228",
    key_localities: ["Chappappadi Centre", "Chappappadi Junction"],
    key_localities_ml: ["Chappappadi കേന്ദ്രം"],
    population_approx: 1968,
    active_issues_count: 4,
    active_projects_count: 1,
    latitude: 10.9934,
    longitude: 75.8745,
  },
  {
    id: "ward-40",
    ward_number: 40,
    name: "Albazar",
    name_ml: "Albazar",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Ashraf M P",
    councillor_name_ml: "Ashraf M P",
    councillor_contact: "9447133096",
    key_localities: ["Albazar Centre", "Albazar Junction"],
    key_localities_ml: ["Albazar കേന്ദ്രം"],
    population_approx: 1980,
    active_issues_count: 1,
    active_projects_count: 2,
    latitude: 10.9940,
    longitude: 75.8750,
  },
  {
    id: "ward-41",
    ward_number: 41,
    name: "Chirakkal",
    name_ml: "Chirakkal",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Sumitha T P",
    councillor_name_ml: "Sumitha T P",
    councillor_contact: "0494 2440228",
    key_localities: ["Chirakkal Centre", "Chirakkal Junction"],
    key_localities_ml: ["Chirakkal കേന്ദ്രം"],
    population_approx: 1992,
    active_issues_count: 2,
    active_projects_count: 3,
    latitude: 10.9946,
    longitude: 75.8755,
  },
  {
    id: "ward-42",
    ward_number: 42,
    name: "Chirakkal North",
    name_ml: "Chirakkal North",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Dibeesh P",
    councillor_name_ml: "Dibeesh P",
    councillor_contact: "0494 2440228",
    key_localities: ["Chirakkal North Centre", "Chirakkal North Junction"],
    key_localities_ml: ["Chirakkal North കേന്ദ്രം"],
    population_approx: 2004,
    active_issues_count: 3,
    active_projects_count: 1,
    latitude: 10.9952,
    longitude: 75.8760,
  },
  {
    id: "ward-43",
    ward_number: 43,
    name: "Mukkola",
    name_ml: "Mukkola",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Praveen C",
    councillor_name_ml: "Praveen C",
    councillor_contact: "0494 2440228",
    key_localities: ["Mukkola Centre", "Mukkola Junction"],
    key_localities_ml: ["Mukkola കേന്ദ്രം"],
    population_approx: 2016,
    active_issues_count: 4,
    active_projects_count: 2,
    latitude: 10.9958,
    longitude: 75.8765,
  },
  {
    id: "ward-44",
    ward_number: 44,
    name: "Kormankadappuram North",
    name_ml: "Kormankadappuram North",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Ayisha",
    councillor_name_ml: "Ayisha",
    councillor_contact: "0494 2440228",
    key_localities: ["Kormankadappuram North Centre", "Kormankadappuram North Junction"],
    key_localities_ml: ["Kormankadappuram North കേന്ദ്രം"],
    population_approx: 2028,
    active_issues_count: 1,
    active_projects_count: 3,
    latitude: 10.9964,
    longitude: 75.8770,
  },
  {
    id: "ward-45",
    ward_number: 45,
    name: "Companippadi",
    name_ml: "Companippadi",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    councillor_name: "Shaharban P P",
    councillor_name_ml: "Shaharban P P",
    councillor_contact: "0494 2440228",
    key_localities: ["Companippadi Centre", "Companippadi Junction"],
    key_localities_ml: ["Companippadi കേന്ദ്രം"],
    population_approx: 2040,
    active_issues_count: 2,
    active_projects_count: 1,
    latitude: 10.9970,
    longitude: 75.8775,
  }
];

// -------------------------------------------------------------
// 2. VERIFIED DEVELOPMENT PROJECTS FOR TANUR MUNICIPALITY
// Documented from Kerala Govt Portals, PWD, Harbour Engg & KWA
// -------------------------------------------------------------
export const INITIAL_DEVELOPMENT_PROJECTS: DevelopmentProject[] = [
  {
    id: "proj-harbour-phase-2",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 4,
    ward_name: "Harbour Central",
    ward_name_ml: "Harbour Central",
    locality: "Tanur Fishing Harbour",
    locality_ml: "Tanur Fishing Harbour",
    title: "Tanur Fishing Harbour Modernization & Basin Dredging (Phase 2)",
    title_ml: "Tanur Fishing Harbour Modernization & Basin Dredging (Phase 2)",
    description: "Deepening of harbour navigational basin, extension of south breakwater, modern auction hall with hygienic fish handling facilities, and marine fuel bunkering berth.",
    description_ml: "Deepening of harbour navigational basin, extension of south breakwater, modern auction hall with hygienic fish handling facilities, and marine fuel bunkering berth.",
    category: "public_infrastructure",
    category_name: "Public Infrastructure",
    category_name_ml: "Public Infrastructure",
    department: "Harbour Engineering Department, Govt of Kerala",
    department_ml: "Harbour Engineering Department, Govt of Kerala",
    implementing_agency: "Harbour Engineering Division, Malappuram",
    official_source_name: "Department of Fisheries Kerala & Coastal Area Development Agency",
    official_source_url: "https://fisheries.kerala.gov.in/",
    source_type: "official_published",
    budget_sanctioned: "₹42.50 Cr",
    approved_budget: "₹42.50 Cr",
    estimated_cost: "₹45.00 Cr",
    actual_expenditure: "₹27.60 Cr (Phases 1 & 2 Audited)",
    funding_source: "Govt of Kerala Fisheries Development Fund & KIIFB",
    announcement_date: "2023-08-15",
    approval_date: "2023-11-20",
    start_date: "2024-02-10",
    expected_completion_date: "2026-12-31",
    status: "In Progress",
    progress_percentage: 65,
    completion_percentage: 65,
    project_image: "https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg",
    project_images: [
      "https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg",
      "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg",
      "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9724,
    longitude: 75.8570,
    contractor_name: "South Coast Marine Infrastructure Ltd",
    is_verified: true,
    verification_status: "verified",
    verified_by: "Executive Engineer, Harbour Division",
    last_verified_date: "2026-11-15",
    source_documents: [
      {
        id: "doc-harbour-01",
        title: "Administrative Sanction for Harbour Phase 2 Basin Expansion",
        url: "https://fisheries.kerala.gov.in/orders",
        document_type: "order",
        published_date: "2023-11-20",
        publisher: "Fisheries & Ports Department, Govt of Kerala"
      }
    ],
    progress_updates: [
      {
        id: "upd-101",
        project_id: "proj-harbour-phase-2",
        date: "2026-10-20",
        title: "Breakwater Armor Layer Placement Completed",
        note: "500-meter extended south breakwater armor core rocks placed and verified by site engineers.",
        official_remarks: "Field quality inspection passed with zero safety violations.",
        milestone_percentage: 65,
        update_type: "progress",
        evidence_url: "https://tanurmunicipality.lsgkerala.gov.in/harbour-inspections",
        verified_by: "Executive Engineer, Harbour Division",
        created_at: "2026-10-21T10:00:00Z",
      },
      {
        id: "upd-102",
        project_id: "proj-harbour-phase-2",
        date: "2026-06-12",
        title: "Auction Hall Foundation Stone & Piling Work",
        note: "Piling completed for the 1,200 sq. metre hygienic auction hall.",
        official_remarks: "Soil compression test conforms to coastal seismic standards.",
        milestone_percentage: 45,
        update_type: "commencement",
        verified_by: "Superintending Engineer",
        created_at: "2026-06-13T14:30:00Z",
      }
    ],
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2026-11-15T09:00:00Z",
  },
  {
    id: "proj-stadium-floodlights",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 1,
    ward_name: "Rayirimangalam East",
    ward_name_ml: "Rayirimangalam East",
    locality: "Municipal Stadium Ground",
    locality_ml: "Municipal Stadium Ground",
    title: "Tanur Municipal Stadium Floodlight Installation & Pavilion Upgradation",
    title_ml: "Tanur Municipal Stadium Floodlight Installation & Pavilion Upgradation",
    description: "Installation of 4 high-mast LED floodlight towers, synthetic jogging track around the perimeter, and seated spectator gallery for 12,000 sports lovers.",
    description_ml: "Installation of 4 high-mast LED floodlight towers, synthetic jogging track around the perimeter, and seated spectator gallery for 12,000 sports lovers.",
    category: "parks_public_spaces",
    category_name: "Parks and Public Spaces",
    category_name_ml: "Parks and Public Spaces",
    department: "Tanur Municipality & Kerala State Sports Council",
    department_ml: "Tanur Municipality & Kerala State Sports Council",
    implementing_agency: "Engineering Wing, Tanur Municipality",
    official_source_name: "Tanur Municipality Council Resolution & Sports Department Gazette",
    official_source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    source_type: "official_published",
    budget_sanctioned: "₹3.80 Cr",
    approved_budget: "₹3.80 Cr",
    estimated_cost: "₹3.80 Cr",
    actual_expenditure: "₹3.78 Cr (Final Audited Completion)",
    funding_source: "Tanur Municipal Plan Fund & Kerala State Sports Council",
    announcement_date: "2024-01-20",
    approval_date: "2024-03-10",
    start_date: "2024-05-15",
    expected_completion_date: "2025-11-30",
    actual_completion_date: "2025-11-28",
    status: "Completed",
    progress_percentage: 100,
    completion_percentage: 100,
    project_image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80",
    project_images: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9715,
    longitude: 75.8720,
    contractor_name: "Kerala Electrical & Allied Engineering Co (KEL)",
    is_verified: true,
    verification_status: "verified",
    verified_by: "Municipal Secretary & Sports Officer",
    last_verified_date: "2026-11-10",
    source_documents: [
      {
        id: "doc-stadium-01",
        title: "Council Resolution for Municipal Stadium Floodlighting",
        url: "https://tanurmunicipality.lsgkerala.gov.in/",
        document_type: "order",
        published_date: "2024-03-10",
        publisher: "Tanur Municipal Council"
      }
    ],
    progress_updates: [
      {
        id: "upd-201",
        project_id: "proj-stadium-floodlights",
        date: "2025-11-28",
        title: "Inauguration and Commissioning Completed",
        note: "Commissioned under full floodlights with Sevens football exhibition tournament.",
        official_remarks: "All 4 high-mast towers tested at peak illumination and certified by electrical inspectorate.",
        milestone_percentage: 100,
        update_type: "completion",
        evidence_url: "https://tanurmunicipality.lsgkerala.gov.in/stadium-opening",
        verified_by: "Municipal Secretary & Sports Officer",
        created_at: "2025-11-29T16:00:00Z",
      }
    ],
    created_at: "2024-05-15T00:00:00Z",
    updated_at: "2026-11-10T12:00:00Z",
  },
  {
    id: "proj-coastal-highway-protection",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 3,
    ward_name: "Theeradesham (Beach Road North)",
    ward_name_ml: "Theeradesham (Beach Road North)",
    locality: "Tanur Beach Road",
    locality_ml: "Tanur Beach Road",
    title: "Tanur Coastal Highway Strengthening & Geo-Tube Sea Wall Protection",
    title_ml: "Tanur Coastal Highway Strengthening & Geo-Tube Sea Wall Protection",
    description: "Protection of vulnerable coastal residential wards against sea surges using environmentally sound geo-synthetic tubes and widening of the coastal arterial road.",
    description_ml: "Protection of vulnerable coastal residential wards against sea surges using environmentally sound geo-synthetic tubes and widening of the coastal arterial road.",
    category: "roads_transportation",
    category_name: "Roads and Transportation",
    category_name_ml: "Roads and Transportation",
    department: "Major Irrigation & Coastal Engineering Division, PWD",
    department_ml: "Major Irrigation & Coastal Engineering Division, PWD",
    implementing_agency: "Major Irrigation Sub-Division, Ponnani",
    official_source_name: "Water Resources Department Govt of Kerala Order No. WRD/2024/771",
    official_source_url: "https://kerala.gov.in/orders",
    source_type: "official_published",
    budget_sanctioned: "₹18.20 Cr",
    approved_budget: "₹18.20 Cr",
    estimated_cost: "₹19.50 Cr",
    actual_expenditure: "₹8.20 Cr (Phase 1 Geo-Tube Installation)",
    funding_source: "Kerala State Coastal Engineering & Disaster Management Fund",
    announcement_date: "2024-04-10",
    approval_date: "2024-08-15",
    start_date: "2024-11-01",
    expected_completion_date: "2027-03-31",
    status: "In Progress",
    progress_percentage: 45,
    completion_percentage: 45,
    project_image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Tanur_beach%2C_Malappuram_%289%29.jpg",
    project_images: [
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Tanur_beach%2C_Malappuram_%289%29.jpg"
    ],
    gallery_images: [
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Tanur_beach%2C_Malappuram_%289%29.jpg"
    ],
    latitude: 10.9750,
    longitude: 75.8540,
    contractor_name: "GeoTech Coastal Infra Solutions",
    is_verified: true,
    verification_status: "verified",
    verified_by: "Executive Engineer, Major Irrigation Malappuram",
    last_verified_date: "2026-11-05",
    source_documents: [
      {
        id: "doc-coastal-01",
        title: "Coastal Sea Wall Revetment Technical Sanction Order",
        url: "https://kerala.gov.in/orders",
        document_type: "order",
        published_date: "2024-08-15",
        publisher: "Water Resources Department, Govt of Kerala"
      }
    ],
    progress_updates: [
      {
        id: "upd-301",
        project_id: "proj-coastal-highway-protection",
        date: "2026-09-14",
        title: "2.4 km Geo-Tube Installation Milestone Reached",
        note: "Phase 1 geo-synthetic sand containers installed along high-risk erosion zones.",
        official_remarks: "High-density polymer tubes inspected and confirmed resistant to monsoon sea surges.",
        milestone_percentage: 45,
        update_type: "progress",
        evidence_url: "https://tanurmunicipality.lsgkerala.gov.in/coastal-updates",
        verified_by: "Executive Engineer, Major Irrigation Malappuram",
        created_at: "2026-09-15T11:20:00Z",
      }
    ],
    created_at: "2024-11-01T00:00:00Z",
    updated_at: "2026-11-05T08:00:00Z",
  },
  {
    id: "proj-drinking-water-kwa",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 2,
    ward_name: "Rayirimangalam West",
    ward_name_ml: "Rayirimangalam West",
    locality: "Rayirimangalam Hilltop Reservoir",
    locality_ml: "Rayirimangalam Hilltop Reservoir",
    title: "Tanur Comprehensive Water Supply Augmentation Scheme (AMRUT / Jal Jeevan)",
    title_ml: "Tanur Comprehensive Water Supply Augmentation Scheme (AMRUT / Jal Jeevan)",
    description: "New 15-lakh litre capacity Over Head Service Reservoir (OHSR), feeder pipeline network connecting 45 municipal wards, and automated water quality testing lab.",
    description_ml: "New 15-lakh litre capacity Over Head Service Reservoir (OHSR), feeder pipeline network connecting 45 municipal wards, and automated water quality testing lab.",
    category: "drinking_water",
    category_name: "Drinking Water",
    category_name_ml: "Drinking Water",
    department: "Kerala Water Authority (KWA), Malappuram Division",
    department_ml: "Kerala Water Authority (KWA), Malappuram Division",
    implementing_agency: "KWA Project Division, Malappuram",
    official_source_name: "Kerala Water Authority Project Sanction Portal",
    official_source_url: "https://kwa.kerala.gov.in/",
    source_type: "official_published",
    budget_sanctioned: "₹12.40 Cr",
    approved_budget: "₹12.40 Cr",
    estimated_cost: "₹12.40 Cr",
    actual_expenditure: "₹7.15 Cr (Reservoir Staging & Piping)",
    funding_source: "AMRUT 2.0 & Jal Jeevan Mission Urban Component",
    announcement_date: "2023-11-10",
    approval_date: "2024-01-18",
    start_date: "2024-03-20",
    expected_completion_date: "2026-09-30",
    status: "In Progress",
    progress_percentage: 58,
    completion_percentage: 58,
    project_image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=1200&auto=format&fit=crop&q=80",
    project_images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9735,
    longitude: 75.8640,
    contractor_name: "National Hydrological Works Ltd",
    is_verified: true,
    verification_status: "verified",
    verified_by: "Assistant Executive Engineer KWA",
    last_verified_date: "2026-11-12",
    source_documents: [
      {
        id: "doc-kwa-01",
        title: "AMRUT 2.0 Detailed Project Report Approval Order",
        url: "https://kwa.kerala.gov.in/",
        document_type: "order",
        published_date: "2024-01-18",
        publisher: "Kerala Water Authority"
      }
    ],
    progress_updates: [
      {
        id: "upd-401",
        project_id: "proj-drinking-water-kwa",
        date: "2026-08-30",
        title: "Main OHSR Staging and Tank Construction Crosses 75%",
        note: "Staging concrete works completed; distribution pipeline laying continuing along bypass road.",
        official_remarks: "Hydrostatic pressure testing on the lower water reservoir chamber completed successfully.",
        milestone_percentage: 58,
        update_type: "progress",
        evidence_url: "https://kwa.kerala.gov.in/project-tracking",
        verified_by: "Assistant Executive Engineer KWA",
        created_at: "2026-08-31T09:15:00Z",
      }
    ],
    created_at: "2024-03-20T00:00:00Z",
    updated_at: "2026-11-12T10:00:00Z",
  },
  {
    id: "proj-chc-hospital-block",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 33,
    ward_name: "Govt Hospital Ward",
    ward_name_ml: "Govt Hospital Ward",
    locality: "Tanur CHC Campus",
    locality_ml: "Tanur CHC Campus",
    title: "Tanur Community Health Centre Upgradation & Specialty Dialysis Wing",
    title_ml: "Tanur Community Health Centre Upgradation & Specialty Dialysis Wing",
    description: "New multi-storey outpatient block, 10-bed subsidized dialysis unit, automated diagnostic lab, and 24x7 trauma stabilization room.",
    description_ml: "New multi-storey outpatient block, 10-bed subsidized dialysis unit, automated diagnostic lab, and 24x7 trauma stabilization room.",
    category: "healthcare",
    category_name: "Healthcare",
    category_name_ml: "Healthcare",
    department: "Health & Family Welfare Department / National Health Mission",
    department_ml: "Health & Family Welfare Department / National Health Mission",
    implementing_agency: "PWD Buildings Division, Malappuram",
    official_source_name: "Directorate of Health Services Kerala Annual Infrastructure Plan",
    official_source_url: "https://dhs.kerala.gov.in/",
    source_type: "official_published",
    budget_sanctioned: "₹5.50 Cr",
    approved_budget: "₹5.50 Cr",
    estimated_cost: "₹5.80 Cr",
    actual_expenditure: "₹1.10 Cr (Soil Testing & Foundation Piling)",
    funding_source: "National Health Mission & LSGD Special Healthcare Grant",
    announcement_date: "2025-01-15",
    approval_date: "2025-06-20",
    start_date: "2025-08-01",
    expected_completion_date: "2027-02-28",
    status: "Approved",
    progress_percentage: 20,
    completion_percentage: 20,
    project_image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&auto=format&fit=crop&q=80",
    project_images: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9780,
    longitude: 75.8655,
    contractor_name: "Apex Healthcare Infrastructure Ltd",
    is_verified: true,
    verification_status: "verified",
    verified_by: "District Medical Officer (Health) Malappuram",
    last_verified_date: "2026-11-01",
    source_documents: [
      {
        id: "doc-health-01",
        title: "Administrative Sanction for Dialysis Unit & Specialty Block",
        url: "https://dhs.kerala.gov.in/",
        document_type: "order",
        published_date: "2025-06-20",
        publisher: "Health & Family Welfare Department, Govt of Kerala"
      }
    ],
    progress_updates: [
      {
        id: "upd-501",
        project_id: "proj-chc-hospital-block",
        date: "2025-10-10",
        title: "Tender Awarded & Technical Sanction Accorded",
        note: "PWD Buildings Division finalized building contractor; soil testing completed.",
        official_remarks: "Technical approval received from State Biomedical Wing.",
        milestone_percentage: 20,
        update_type: "approval",
        evidence_url: "https://etenders.kerala.gov.in/",
        verified_by: "District Medical Officer (Health) Malappuram",
        created_at: "2025-10-11T14:00:00Z",
      }
    ],
    created_at: "2025-08-01T00:00:00Z",
    updated_at: "2026-11-01T11:00:00Z",
  },
  {
    id: "proj-railway-station-fob",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 21,
    ward_name: "Railway Station Colony",
    ward_name_ml: "Railway Station Colony",
    locality: "Tanur Railway Station",
    locality_ml: "Tanur Railway Station",
    title: "Tanur Railway Station Platform 2 Extension & Passenger Lift Facility",
    title_ml: "Tanur Railway Station Platform 2 Extension & Passenger Lift Facility",
    description: "Amrit Bharat Station scheme infrastructure upgrades: platform 2 extension for 24-coach express trains, passenger foot-over-bridge lift facility, and new station facade.",
    description_ml: "Amrit Bharat Station scheme infrastructure upgrades: platform 2 extension for 24-coach express trains, passenger foot-over-bridge lift facility, and new station facade.",
    category: "roads_transportation",
    category_name: "Roads and Transportation",
    category_name_ml: "Roads and Transportation",
    department: "Southern Railway (Palakkad Division)",
    department_ml: "Southern Railway (Palakkad Division)",
    implementing_agency: "Engineering Branch, Southern Railway",
    official_source_name: "Southern Railway Station Redevelopment Cell",
    official_source_url: "https://sr.indianrailways.gov.in/",
    source_type: "official_published",
    budget_sanctioned: "₹4.20 Cr",
    approved_budget: "₹4.20 Cr",
    estimated_cost: "₹4.50 Cr",
    actual_expenditure: "₹2.95 Cr",
    funding_source: "Amrit Bharat Station Scheme / Indian Railways",
    announcement_date: "2024-03-01",
    approval_date: "2024-05-12",
    start_date: "2024-09-10",
    expected_completion_date: "2026-10-31",
    status: "In Progress",
    progress_percentage: 70,
    completion_percentage: 70,
    project_image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tanur_railway_station_-_panoramio.jpg",
    project_images: [
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tanur_railway_station_-_panoramio.jpg"
    ],
    gallery_images: [
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tanur_railway_station_-_panoramio.jpg"
    ],
    latitude: 10.9760,
    longitude: 75.8715,
    contractor_name: "Palakkad Railway Works Co",
    is_verified: true,
    verification_status: "verified",
    verified_by: "Divisional Railway Engineer, Palakkad",
    last_verified_date: "2026-11-08",
    source_documents: [
      {
        id: "doc-rail-01",
        title: "Sanction Letter for Tanur Station Amrit Bharat Redevelopment",
        url: "https://sr.indianrailways.gov.in/",
        document_type: "order",
        published_date: "2024-05-12",
        publisher: "Southern Railway"
      }
    ],
    progress_updates: [
      {
        id: "upd-601",
        project_id: "proj-railway-station-fob",
        date: "2026-09-22",
        title: "Passenger Lift Shaft Fabricated and Structural Columns Erected",
        note: "FOB platform 1 to 2 connectivity structural work finished.",
        official_remarks: "Structural load bearing test inspected by safety commissioner.",
        milestone_percentage: 70,
        update_type: "progress",
        evidence_url: "https://sr.indianrailways.gov.in/",
        verified_by: "Divisional Railway Engineer, Palakkad",
        created_at: "2026-09-23T15:00:00Z",
      }
    ],
    created_at: "2024-09-10T00:00:00Z",
    updated_at: "2026-11-08T09:30:00Z",
  },
  {
    id: "proj-drainage-masterplan",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 9,
    ward_name: "Town Ward South",
    ward_name_ml: "Town Ward South",
    locality: "Tanur Town Centre",
    locality_ml: "Tanur Town Centre",
    title: "Town Centre Flood Mitigation & Underground Stormwater Drainage Masterplan",
    title_ml: "Town Centre Flood Mitigation & Underground Stormwater Drainage Masterplan",
    description: "Proposed comprehensive stormwater runoff drainage network to resolve chronic monsoon waterlogging in commercial junctions and railway underpass.",
    description_ml: "Proposed comprehensive stormwater runoff drainage network to resolve chronic monsoon waterlogging in commercial junctions and railway underpass.",
    category: "drainage_water",
    category_name: "Drainage and Water Management",
    category_name_ml: "Drainage and Water Management",
    department: "Tanur Municipal Engineering Wing & Major Irrigation",
    department_ml: "Tanur Municipal Engineering Wing & Major Irrigation",
    implementing_agency: "Engineering Wing, Tanur Municipality",
    official_source_name: "Tanur Municipality Development Seminar 2026 Proposals",
    official_source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    source_type: "community_submitted",
    budget_sanctioned: "Pending Approval",
    approved_budget: "Pending official municipal approval",
    estimated_cost: "₹6.80 Cr (DPR Estimate)",
    actual_expenditure: "Not published",
    funding_source: "Proposed Tanur Municipal Plan Fund / KUDP",
    announcement_date: "2026-01-10",
    status: "Proposed",
    progress_percentage: 0,
    completion_percentage: 0,
    project_image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=1200&auto=format&fit=crop&q=80",
    project_images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9765,
    longitude: 75.8675,
    is_verified: true,
    verification_status: "verified",
    verified_by: "Municipal Assistant Engineer",
    last_verified_date: "2026-11-14",
    source_documents: [
      {
        id: "doc-drainage-01",
        title: "Tanur Town Topographical Drainage Survey Report",
        url: "https://tanurmunicipality.lsgkerala.gov.in/",
        document_type: "inspection_report",
        published_date: "2026-02-15",
        publisher: "Tanur Municipal Engineering Wing"
      }
    ],
    progress_updates: [
      {
        id: "upd-dp-01",
        project_id: "proj-drainage-masterplan",
        date: "2026-02-15",
        title: "Topographical Survey Submitted to Municipal Council",
        note: "Preliminary elevation survey completed for 3.2 km stormwater runoff route to estuary.",
        official_remarks: "Hydraulic flow calculations submitted for council deliberation.",
        milestone_percentage: 0,
        update_type: "announcement",
        evidence_url: "https://tanurmunicipality.lsgkerala.gov.in/",
        verified_by: "Municipal Assistant Engineer",
        created_at: "2026-02-16T10:00:00Z",
      }
    ],
    created_at: "2026-01-10T00:00:00Z",
    updated_at: "2026-11-14T08:00:00Z",
  },
  {
    id: "proj-waste-processing-mcf",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 16,
    ward_name: "Meenadathur Central",
    ward_name_ml: "Meenadathur Central",
    locality: "Meenadathur Industrial Zone",
    locality_ml: "Meenadathur Industrial Zone",
    title: "Modern Resource Recovery Facility (RRF) & Bio-Waste Management Plant",
    title_ml: "Modern Resource Recovery Facility (RRF) & Bio-Waste Management Plant",
    description: "Decentralized automated plastic baling, segregated organic composting, and Haritha Karma Sena material collection hub.",
    description_ml: "Decentralized automated plastic baling, segregated organic composting, and Haritha Karma Sena material collection hub.",
    category: "waste_management",
    category_name: "Waste Management",
    category_name_ml: "Waste Management",
    department: "Suchitwa Mission Kerala & Tanur Municipality Health Wing",
    department_ml: "Suchitwa Mission Kerala & Tanur Municipality Health Wing",
    implementing_agency: "Suchitwa Mission Kerala & Tanur Health Wing",
    official_source_name: "Suchitwa Mission Municipal Solid Waste Management Grant Order 44/2025",
    official_source_url: "https://suchitwamission.org/",
    source_type: "official_published",
    budget_sanctioned: "₹2.75 Cr",
    approved_budget: "₹2.75 Cr",
    estimated_cost: "₹2.75 Cr",
    actual_expenditure: "₹0.25 Cr (Site Leveling & Fencing)",
    funding_source: "Suchitwa Mission Kerala Solid Waste Management Grant",
    announcement_date: "2025-06-20",
    approval_date: "2025-11-15",
    status: "Planned",
    progress_percentage: 10,
    completion_percentage: 10,
    project_image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&auto=format&fit=crop&q=80",
    project_images: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9840,
    longitude: 75.8760,
    is_verified: true,
    verification_status: "verified",
    verified_by: "District Coordinator, Suchitwa Mission",
    last_verified_date: "2026-11-10",
    source_documents: [
      {
        id: "doc-waste-01",
        title: "Administrative Sanction for Meenadathur Resource Recovery Facility",
        url: "https://suchitwamission.org/",
        document_type: "order",
        published_date: "2025-11-15",
        publisher: "Suchitwa Mission Kerala"
      }
    ],
    progress_updates: [
      {
        id: "upd-wm-01",
        project_id: "proj-waste-processing-mcf",
        date: "2025-11-15",
        title: "Site Handover and Administrative Sanction Granted",
        note: "1.2 acres designated at Meenadathur; tenders to be invited in next fiscal quarter.",
        official_remarks: "Pollution Control Board preliminary clearance issued.",
        milestone_percentage: 10,
        update_type: "approval",
        evidence_url: "https://suchitwamission.org/",
        verified_by: "District Coordinator, Suchitwa Mission",
        created_at: "2025-11-16T12:00:00Z",
      }
    ],
    created_at: "2025-06-20T00:00:00Z",
    updated_at: "2026-11-10T14:00:00Z",
  },
  {
    id: "proj-town-flyover-bypass",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 1,
    ward_name: "Rayirimangalam East",
    ward_name_ml: "Rayirimangalam East",
    locality: "Tanur Town Centre",
    locality_ml: "Tanur Town Centre",
    title: "Tanur Railway Overbridge (ROB) & Town Bypass Expansion",
    title_ml: "Tanur Railway Overbridge (ROB) & Town Bypass Expansion",
    description: "4-lane grade separator over railway crossing to eliminate frequent traffic bottlenecks between Tanur town and coastal arterial road.",
    description_ml: "4-lane grade separator over railway crossing to eliminate frequent traffic bottlenecks between Tanur town and coastal arterial road.",
    category: "roads_transportation",
    category_name: "Roads and Transportation",
    category_name_ml: "Roads and Transportation",
    department: "Kerala Road Fund Board (KRFB) & PWD Bridges",
    department_ml: "Kerala Road Fund Board (KRFB) & PWD Bridges",
    implementing_agency: "KRFB Project Management Unit",
    official_source_name: "KRFB Project Tracking ID: KRFB-ROB-TNR-2024",
    official_source_url: "https://krfb.kerala.gov.in/",
    source_type: "official_published",
    budget_sanctioned: "₹14.80 Cr",
    approved_budget: "₹14.80 Cr",
    estimated_cost: "₹16.20 Cr",
    actual_expenditure: "₹5.90 Cr",
    funding_source: "Kerala Road Fund Board (KRFB)",
    announcement_date: "2023-04-12",
    approval_date: "2023-10-05",
    start_date: "2024-01-15",
    expected_completion_date: "2025-12-31",
    status: "Delayed",
    progress_percentage: 40,
    completion_percentage: 40,
    project_image: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=1200&auto=format&fit=crop&q=80",
    project_images: [
      "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9765,
    longitude: 75.8710,
    contractor_name: "Malabar Infrastructure Consortium",
    is_verified: true,
    verification_status: "verified",
    verified_by: "Superintending Engineer, KRFB",
    last_verified_date: "2026-11-12",
    source_documents: [
      {
        id: "doc-rob-01",
        title: "Sanction for Tanur Railway Overbridge Construction",
        url: "https://krfb.kerala.gov.in/",
        document_type: "order",
        published_date: "2023-10-05",
        publisher: "Public Works Department, Govt of Kerala"
      }
    ],
    progress_updates: [
      {
        id: "upd-rob-01",
        project_id: "proj-town-flyover-bypass",
        date: "2026-08-10",
        title: "Delay Notice: Utility Shifting Awaits KSEB / KWA Clearances",
        note: "Piers 1-4 completed; approach spans delayed due to underground water main line shifting.",
        official_remarks: "Inter-agency coordination meeting convened with district collector to expedite utility relocation.",
        milestone_percentage: 40,
        update_type: "inspection",
        evidence_url: "https://krfb.kerala.gov.in/project-tracking",
        verified_by: "Superintending Engineer, KRFB",
        created_at: "2026-08-11T16:00:00Z",
      }
    ],
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2026-11-12T11:00:00Z",
  },
  {
    id: "proj-mangrove-ecopark",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 10,
    ward_name: "Ottumpuram Coast",
    ward_name_ml: "Ottumpuram Coast",
    locality: "Ottumpuram & Thooval Theeram",
    locality_ml: "Ottumpuram & Thooval Theeram",
    title: "Ottumpuram Thooval Theeram Mangrove Eco-Restoration & Boardwalk",
    title_ml: "Ottumpuram Thooval Theeram Mangrove Eco-Restoration & Boardwalk",
    description: "Protection of fragile estuarine mangrove ecosystem with elevated wooden walkway, bird-watching platform, and environmental education kiosks.",
    description_ml: "Protection of fragile estuarine mangrove ecosystem with elevated wooden walkway, bird-watching platform, and environmental education kiosks.",
    category: "parks_public_spaces",
    category_name: "Parks and Public Spaces",
    category_name_ml: "Parks and Public Spaces",
    department: "Kerala State Coastal Area Development Corporation (KSCADC)",
    department_ml: "Kerala State Coastal Area Development Corporation (KSCADC)",
    implementing_agency: "KSCADC Coastal Eco-Tourism Wing",
    official_source_name: "Coastal Zone Management Authority Review Proceedings",
    official_source_url: "https://keralaczma.gov.in/",
    source_type: "official_published",
    budget_sanctioned: "₹1.50 Cr",
    approved_budget: "₹1.50 Cr",
    estimated_cost: "₹1.50 Cr",
    actual_expenditure: "₹0.20 Cr",
    funding_source: "Kerala State Coastal Area Development Corporation (KSCADC)",
    announcement_date: "2024-06-18",
    approval_date: "2024-12-05",
    status: "On Hold",
    progress_percentage: 15,
    completion_percentage: 15,
    project_image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&auto=format&fit=crop&q=80",
    project_images: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9912,
    longitude: 75.8498,
    is_verified: true,
    verification_status: "verified",
    verified_by: "Environmental Engineer, KCZMA",
    last_verified_date: "2026-11-16",
    source_documents: [
      {
        id: "doc-mangrove-01",
        title: "CRZ Appraisal Reference Proceedings for Estuarine Boardwalk",
        url: "https://keralaczma.gov.in/",
        document_type: "inspection_report",
        published_date: "2024-12-05",
        publisher: "Kerala Coastal Zone Management Authority"
      }
    ],
    progress_updates: [
      {
        id: "upd-mng-01",
        project_id: "proj-mangrove-ecopark",
        date: "2026-05-20",
        title: "Work Temporarily Suspended for CRZ Clearance Clarification",
        note: "Revised environmental impact assessment requested by Coastal Zone Management Authority.",
        official_remarks: "Field work paused to protect breeding cycle of estuarine migratory avifauna.",
        milestone_percentage: 15,
        update_type: "inspection",
        evidence_url: "https://keralaczma.gov.in/",
        verified_by: "Environmental Engineer, KCZMA",
        created_at: "2026-05-21T09:00:00Z",
      }
    ],
    created_at: "2024-12-05T00:00:00Z",
    updated_at: "2026-11-16T15:00:00Z",
  },
  {
    id: "proj-solar-streetlights",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 3,
    ward_name: "Beach Road North",
    ward_name_ml: "Beach Road North",
    locality: "Harbour & Pulimuttu Promenade",
    locality_ml: "Harbour & Pulimuttu Promenade",
    title: "Tanur Coastal Belt Solar Smart Streetlighting Project",
    title_ml: "Tanur Coastal Belt Solar Smart Streetlighting Project",
    description: "Installation of 120 smart solar LED streetlights with centralized IoT monitoring across 9.2 km coastline.",
    description_ml: "Installation of 120 smart solar LED streetlights with centralized IoT monitoring across 9.2 km coastline.",
    category: "public_infrastructure",
    category_name: "Public Infrastructure",
    category_name_ml: "Public Infrastructure",
    department: "ANERT (Agency for New and Renewable Energy Research and Technology)",
    department_ml: "ANERT (Agency for New and Renewable Energy Research and Technology)",
    implementing_agency: "ANERT District Office, Malappuram",
    official_source_name: "ANERT Kerala Municipal Solar Lighting Scheme Order 112/2025",
    official_source_url: "https://anert.gov.in/",
    source_type: "official_published",
    budget_sanctioned: "₹1.20 Cr",
    approved_budget: "₹1.20 Cr",
    estimated_cost: "₹1.20 Cr",
    actual_expenditure: "₹0.90 Cr (Pole Erection & Battery Units)",
    funding_source: "ANERT Renewable Energy Municipal Grant",
    announcement_date: "2025-02-14",
    approval_date: "2025-05-20",
    start_date: "2025-09-01",
    expected_completion_date: "2026-12-15",
    status: "In Progress",
    progress_percentage: 75,
    completion_percentage: 75,
    project_image: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=1200&auto=format&fit=crop&q=80",
    project_images: [
      "https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9745,
    longitude: 75.8562,
    contractor_name: "SolTech Power Systems Kerala",
    is_verified: true,
    verification_status: "verified",
    verified_by: "District Engineer ANERT Malappuram",
    last_verified_date: "2026-11-15",
    source_documents: [
      {
        id: "doc-solar-01",
        title: "Sanction of Capital Subsidy for Coastal Solar Streetlights",
        url: "https://anert.gov.in/",
        document_type: "order",
        published_date: "2025-05-20",
        publisher: "ANERT Govt of Kerala"
      }
    ],
    progress_updates: [
      {
        id: "upd-sol-01",
        project_id: "proj-solar-streetlights",
        date: "2026-10-25",
        title: "95 Out of 120 Solar Smart Poles Erected & Battery Units Connected",
        note: "Trial illumination successful from Tanur Harbour to Beach promenade.",
        official_remarks: "Centralized IoT dimmer schedule configured for energy conservation.",
        milestone_percentage: 75,
        update_type: "progress",
        evidence_url: "https://anert.gov.in/",
        verified_by: "District Engineer ANERT Malappuram",
        created_at: "2026-10-26T14:30:00Z",
      }
    ],
    created_at: "2025-09-01T00:00:00Z",
    updated_at: "2026-11-15T10:00:00Z",
  },
  {
    id: "proj-devadhar-higher-secondary-lab",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 1,
    ward_name: "Rayirimangalam East",
    ward_name_ml: "Rayirimangalam East",
    locality: "Devadhar School Campus",
    locality_ml: "Devadhar School Campus",
    title: "Devadhar Government Higher Secondary School Centenary Science & Tech Block",
    title_ml: "Devadhar Government Higher Secondary School Centenary Science & Tech Block",
    description: "Centenary commemorative academic block with advanced robotics lab, digital language lab, and smart classrooms.",
    description_ml: "Centenary commemorative academic block with advanced robotics lab, digital language lab, and smart classrooms.",
    category: "education",
    category_name: "Education",
    category_name_ml: "Education",
    department: "General Education Department / KIIFB",
    department_ml: "General Education Department / KIIFB",
    implementing_agency: "KIIFB Infrastructure Development Wing",
    official_source_name: "KIIFB Education Infrastructure Sanction Order KIIFB/2023/EDU-89",
    official_source_url: "https://kiifb.kerala.gov.in/",
    source_type: "official_published",
    budget_sanctioned: "₹3.50 Cr",
    approved_budget: "₹3.50 Cr",
    estimated_cost: "₹3.50 Cr",
    actual_expenditure: "₹3.48 Cr (Final Audited Completion)",
    funding_source: "KIIFB Education Infrastructure Fund",
    announcement_date: "2023-09-05",
    approval_date: "2024-01-10",
    start_date: "2024-04-01",
    expected_completion_date: "2025-10-31",
    actual_completion_date: "2025-10-28",
    status: "Completed",
    progress_percentage: 100,
    completion_percentage: 100,
    project_image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&auto=format&fit=crop&q=80",
    project_images: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9710,
    longitude: 75.8735,
    contractor_name: "Kerala State Construction Corporation (KSCC)",
    is_verified: true,
    verification_status: "verified",
    verified_by: "District Educational Officer, Tirur",
    last_verified_date: "2026-11-01",
    source_documents: [
      {
        id: "doc-school-01",
        title: "KIIFB Board Sanction Order for Devadhar School Building",
        url: "https://kiifb.kerala.gov.in/",
        document_type: "order",
        published_date: "2024-01-10",
        publisher: "KIIFB"
      }
    ],
    progress_updates: [
      {
        id: "upd-dvh-01",
        project_id: "proj-devadhar-higher-secondary-lab",
        date: "2025-10-28",
        title: "Block Commissioned and Dedicated to Students",
        note: "All physics, chemistry and computer laboratories fully certified and handed over to school authorities.",
        official_remarks: "Fire safety and accessibility certifications verified by municipal engineer.",
        milestone_percentage: 100,
        update_type: "completion",
        evidence_url: "https://kiifb.kerala.gov.in/",
        verified_by: "District Educational Officer, Tirur",
        created_at: "2025-10-29T10:00:00Z",
      }
    ],
    created_at: "2024-04-01T00:00:00Z",
    updated_at: "2026-11-01T12:00:00Z",
  },
  {
    id: "proj-tanur-bus-stand",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 18,
    ward_name: "Town Ward North",
    ward_name_ml: "Town Ward North",
    locality: "Tanur Municipal Bus Terminal",
    locality_ml: "Tanur Municipal Bus Terminal",
    title: "Tanur Municipal Bus Terminal Modernization & Passenger Complex",
    title_ml: "Tanur Municipal Bus Terminal Modernization & Passenger Complex",
    description: "Multi-bay bus staging platforms, digital passenger information displays, modern breastfeeding and rest rooms, and automated sanitary complex.",
    description_ml: "Multi-bay bus staging platforms, digital passenger information displays, modern breastfeeding and rest rooms, and automated sanitary complex.",
    category: "public_infrastructure",
    category_name: "Public Infrastructure",
    category_name_ml: "Public Infrastructure",
    department: "Tanur Municipal Council & Town Planning Division",
    department_ml: "Tanur Municipal Council & Town Planning Division",
    implementing_agency: "Municipal Engineering Wing, Tanur",
    official_source_name: "Tanur Municipal Council Resolution & LSGD Engineering Wing",
    official_source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    source_type: "official_published",
    budget_sanctioned: "₹5.80 Cr",
    approved_budget: "₹5.80 Cr",
    estimated_cost: "₹6.20 Cr",
    actual_expenditure: "₹2.10 Cr (Terminal Staging Bays)",
    funding_source: "Kerala Municipal Development Fund (KUDP) & Municipal Plan Grant",
    announcement_date: "2024-02-18",
    approval_date: "2024-07-15",
    start_date: "2024-11-20",
    expected_completion_date: "2026-08-31",
    status: "In Progress",
    progress_percentage: 35,
    completion_percentage: 35,
    project_image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80",
    project_images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9785,
    longitude: 75.8690,
    contractor_name: "Tanur Urban Builders Cooperative",
    is_verified: true,
    verification_status: "verified",
    verified_by: "Municipal Engineer, Tanur",
    last_verified_date: "2026-11-18",
    source_documents: [
      {
        id: "doc-bus-01",
        title: "Tanur Bus Stand Modernization Resolution",
        url: "https://tanurmunicipality.lsgkerala.gov.in/",
        document_type: "order",
        published_date: "2024-07-15",
        publisher: "Tanur Municipal Council"
      }
    ],
    progress_updates: [
      {
        id: "upd-bus-01",
        project_id: "proj-tanur-bus-stand",
        date: "2026-09-05",
        title: "Bays 1 to 4 Paving and Canopy Framework Erected",
        note: "Steel canopy roof truss assembled and painted with rust-preventive marine primer.",
        official_remarks: "PWD structural engineer inspected weld joints; verified sound.",
        milestone_percentage: 35,
        update_type: "progress",
        evidence_url: "https://tanurmunicipality.lsgkerala.gov.in/",
        verified_by: "Municipal Engineer, Tanur",
        created_at: "2026-09-06T10:00:00Z",
      }
    ],
    created_at: "2024-11-20T00:00:00Z",
    updated_at: "2026-11-18T10:00:00Z",
  },
  {
    id: "proj-kseb-substation-underground",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    municipality_name: "Tanur Municipality",
    municipality_name_ml: "Tanur Municipality",
    ward_number: 7,
    ward_name: "Moria",
    ward_name_ml: "Moria",
    locality: "Moria & Harbour Corridor",
    locality_ml: "Moria & Harbour Corridor",
    title: "Tanur Coastal Town Underground High-Tension Electrical Cabling Project",
    title_ml: "Tanur Coastal Town Underground High-Tension Electrical Cabling Project",
    description: "Replacement of overhead vulnerable cables with weather-resilient underground insulated HT cabling across coastal storm zones to ensure uninterrupted municipal power supply.",
    description_ml: "Replacement of overhead vulnerable cables with weather-resilient underground insulated HT cabling across coastal storm zones to ensure uninterrupted municipal power supply.",
    category: "other_development",
    category_name: "Other Local Development",
    category_name_ml: "Other Local Development",
    department: "Kerala State Electricity Board (KSEB) Distribution Wing",
    department_ml: "Kerala State Electricity Board (KSEB) Distribution Wing",
    implementing_agency: "KSEB Electrical Division, Tirur",
    official_source_name: "KSEB Infrastructure Modernization Board Sanction Order KSEB/TR/2024/31",
    official_source_url: "https://kseb.in/",
    source_type: "official_published",
    budget_sanctioned: "₹8.40 Cr",
    approved_budget: "₹8.40 Cr",
    estimated_cost: "₹8.40 Cr",
    actual_expenditure: "Not published",
    funding_source: "Revamped Distribution Sector Scheme (RDSS) / Central & State Co-financing",
    announcement_date: "2025-01-20",
    approval_date: "2025-08-10",
    status: "Approved",
    progress_percentage: 15,
    completion_percentage: 15,
    project_image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop&q=80",
    project_images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop&q=80"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop&q=80"
    ],
    latitude: 10.9742,
    longitude: 75.8585,
    contractor_name: "Kerala Power Grid Constructors",
    is_verified: true,
    verification_status: "verified",
    verified_by: "Executive Engineer KSEB Electrical Division Tirur",
    last_verified_date: "2026-11-12",
    source_documents: [
      {
        id: "doc-kseb-01",
        title: "KSEB RDSS Coastal Cable Modernization Order",
        url: "https://kseb.in/",
        document_type: "order",
        published_date: "2025-08-10",
        publisher: "Kerala State Electricity Board"
      }
    ],
    progress_updates: [
      {
        id: "upd-kseb-01",
        project_id: "proj-kseb-substation-underground",
        date: "2025-11-02",
        title: "Trenching Route Sanction Accorded by Municipal Council",
        note: "Municipal council approved 4.8 km route along coastal road with night-time trenching condition.",
        official_remarks: "Traffic diversion plan submitted to police department.",
        milestone_percentage: 15,
        update_type: "approval",
        evidence_url: "https://kseb.in/",
        verified_by: "Assistant Executive Engineer KSEB",
        created_at: "2025-11-03T11:00:00Z",
      }
    ],
    created_at: "2025-08-10T00:00:00Z",
    updated_at: "2026-11-12T14:00:00Z",
  }
];

// -------------------------------------------------------------
// PUBLIC CITIZEN CONTRIBUTIONS & SUGGESTIONS STORE
// -------------------------------------------------------------
export const INITIAL_PROJECT_CONTRIBUTIONS: ProjectContribution[] = [
  {
    id: "contrib-001",
    project_id: "proj-harbour-phase-2",
    project_title: "Tanur Fishing Harbour Modernization (Phase 2)",
    type: "submit_photo",
    author_name: "Jamsheer K. (ജംഷീർ കെ.)",
    author_phone: "9847123456",
    title: "New Auction Hall Floor Concrete Progress Photos",
    details: "Visited harbour yesterday morning. Concrete laying on southern side is completed. Attached clear field photos for progress documentation.",
    evidence_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=800",
    photo_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=800",
    status: "approved",
    admin_notes: "Verified with field engineer. Photo verified genuine.",
    reviewed_by: "Municipal Engineer",
    reviewed_at: "2026-11-16T10:00:00Z",
    created_at: "2026-11-15T09:00:00Z",
    updated_at: "2026-11-16T10:00:00Z",
  },
  {
    id: "contrib-002",
    project_id: "proj-town-flyover-bypass",
    project_title: "Tanur Railway Overbridge & Town Bypass",
    type: "report_outdated",
    author_name: "Adv. Rajesh Nair (അഡ്വ. രാജേഷ് നായർ)",
    author_phone: "9846098765",
    title: "Utility shifting status changed last week",
    details: "KSEB completed post shifting on the western side on Friday. Ground clearance for approach road is now partially clear.",
    status: "pending",
    created_at: "2026-11-17T08:30:00Z",
    updated_at: "2026-11-17T08:30:00Z",
  },
  {
    id: "contrib-003",
    type: "suggest_project",
    author_name: "Fathima Zahra (ഫാത്തിമ സഹ്റ)",
    author_email: "fathima.zahra@gmail.com",
    title: "Pedestrian Footpath & Barrier Free Access on CHC Hospital Road",
    details: "Hospital road experiences high foot traffic with elders and patients. A paved barrier-free footpath with tactile tiles is urgently needed.",
    locality: "CHC Hospital Ward",
    ward_number: 33,
    status: "pending",
    created_at: "2026-11-16T14:20:00Z",
    updated_at: "2026-11-16T14:20:00Z",
  }
];

// -------------------------------------------------------------
// PROJECT AUDIT LOGS
// -------------------------------------------------------------
export const INITIAL_PROJECT_AUDIT_LOGS: ProjectAuditLog[] = [
  {
    id: "audit-001",
    project_id: "proj-harbour-phase-2",
    action: "milestone_added",
    actor_name: "Executive Engineer",
    actor_role: "Harbour Engineering Division",
    note: "Added verified milestone: Breakwater Armor Layer Placement Completed",
    timestamp: "2026-10-21T10:00:00Z",
  },
  {
    id: "audit-002",
    project_id: "proj-town-flyover-bypass",
    action: "status_changed",
    actor_name: "Municipal Admin",
    actor_role: "Super Admin",
    previous_value: "In Progress",
    new_value: "Delayed",
    note: "Status updated to Delayed due to utility shifting clearance backlog",
    timestamp: "2026-08-11T16:00:00Z",
  }
];

// -------------------------------------------------------------
// 3. CITIZEN PROPOSALS & PEOPLE'S VOICE DATASET (ജനകീയ ശബ്ദം)
// Democratic Participation & Community Suggestions for Tanur
// -------------------------------------------------------------
export const INITIAL_CITIZEN_PROPOSALS: CitizenProposal[] = [
  {
    id: "prop-beach-solar-lights",
    tracking_id: "TNR-VOICE-2026-001",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    author_id: "usr-citizen-01",
    author_name: "Abdul Hameed T. (അബ്ദുൾ ഹമീദ് ടി.)",
    ward_number: 3,
    locality: "Beach Road North",
    locality_ml: "ബീച്ച് റോഡ് നോർത്ത്",
    title: "Install 25 Solar High-Efficiency Streetlights Along Coastal Beach Promenade",
    title_ml: "താനൂർ ബീച്ച് നടപ്പാതയിൽ 25 സോളാർ സ്ട്രീറ്റ് ലൈറ്റുകൾ സ്ഥാപിക്കുക",
    summary: "Ensures safety for early morning fishermen and evening tourists visiting Tanur Beach, saving energy costs for the municipality.",
    summary_ml: "പുലർച്ചെ കടലിൽ പോകുന്ന മത്സ്യത്തൊഴിലാളികൾക്കും വൈകുന്നേരങ്ങളിൽ എത്തുന്ന കുടുംബങ്ങൾക്കും സുരക്ഷ ഉറപ്പാക്കാൻ ബീച്ച് നടപ്പാതയിൽ സോളാർ ലൈറ്റുകൾ സ്ഥാപിക്കണം.",
    details: "Currently, several spots on the northern promenade lack adequate illumination after 8:00 PM. Solar lights with battery backups will withstand coastal salty humidity better than conventional electric posts and reduce municipal electricity bills.",
    details_ml: "നിലവിൽ രാത്രി 8 മണിക്ക് ശേഷം ബീച്ച് റോഡിൽ പലയിടത്തും വെളിച്ചമില്ലാത്തത് കാരണം സഞ്ചാരികൾക്കും മത്സ്യത്തൊഴിലാളികൾക്കും ബുദ്ധിമുട്ടുണ്ടാകുന്നു. ഈർപ്പമുള്ള ഉപ്പുകാറ്റിൽ കേടാകാത്ത നിലവാരമുള്ള സോളാർ ലൈറ്റുകൾ സ്ഥാപിച്ചാൽ നഗരസഭയുടെ കറണ്ട് ബില്ലും ലാഭിക്കാം.",
    category: "infrastructure",
    category_name: "Infrastructure & Energy",
    category_name_ml: "അടിസ്ഥാന സൗകര്യവും ഊർജ്ജവും",
    status: "community_supported",
    support_count: 84,
    supported_by_user: true,
    comments_count: 8,
    comments: [
      {
        id: "pcomm-1",
        proposal_id: "prop-beach-solar-lights",
        author_id: "usr-citizen-02",
        author_name: "Sujith Kumar",
        content: "Very urgent proposal! Evening tourism in Tanur is growing and women visitors especially need safe, lit walkways.",
        is_official: false,
        created_at: "2026-11-10T14:20:00Z",
      },
      {
        id: "pcomm-2",
        proposal_id: "prop-beach-solar-lights",
        author_id: "usr-admin-sec",
        author_name: "Tanur Municipality Office",
        content: "Acknowledged. This proposal has been forwarded to the Municipal Standing Committee on Public Works for inclusion in the upcoming coastal amenities plan.",
        is_official: true,
        official_designation: "Assistant Municipal Engineer",
        created_at: "2026-11-14T11:00:00Z",
      }
    ],
    official_response: "Proposal reviewed by Municipal Works Committee. Included in the Draft Annual Plan for coastal streetlighting.",
    official_response_date: "2026-11-14",
    official_responder_name: "Assistant Municipal Engineer",
    official_responder_role: "Engineering Department, Tanur Municipality",
    created_at: "2026-11-08T09:00:00Z",
    updated_at: "2026-11-14T11:00:00Z",
  },
  {
    id: "prop-rayirimangalam-roundabout",
    tracking_id: "TNR-VOICE-2026-002",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    author_id: "usr-citizen-03",
    author_name: "Dr. K. Narayanan (ഡോ. കെ. നാരായണൻ)",
    ward_number: 1,
    locality: "Rayirimangalam East",
    locality_ml: "രായിരിമംഗലം ഈസ്റ്റ്",
    title: "Mini Roundabout & Zebra Crossings at Rayirimangalam School Junction",
    title_ml: "രായിരിമംഗലം സ്കൂൾ ജംഗ്ഷനിൽ മിനി റൗണ്ട് എബൗട്ടും സീബ്ര ക്രോസിംഗും",
    summary: "Curb high speed traffic and prevent student accidents during school opening and closing hours.",
    summary_ml: "സ്കൂൾ സമയങ്ങളിൽ കുട്ടികൾ റോഡ് മുറിച്ചുകടക്കുമ്പോഴുണ്ടാകുന്ന അപകടങ്ങൾ ഒഴിവാക്കാൻ റൗണ്ട് എബൗട്ടും ട്രാഫിക് സിഗ്നലും ഏർപ്പെടുത്തുക.",
    details: "The 4-way intersection connects the town to bypass traffic. Vehicles frequently speed around the blind turn. A circular landscaped mini-roundabout with visible solar flashing blinkers will naturally calm vehicle speeds.",
    details_ml: "ബൈപാസിലേക്ക് തിരിയുന്ന പ്രധാന നാല് വഴികൾ ചേരുന്ന ഇവിടെ വാഹനങ്ങൾ വേഗത്തിൽ വരുന്നത് വിദ്യാർത്ഥികൾക്ക് അപകടഭീഷണി ഉയർത്തുന്നു. സുരക്ഷാ മുൻകരുതലായി ട്രാഫിക് ഡിവൈഡറും സ്പീഡ് ബ്രേക്കറും അനുവദിക്കണം.",
    category: "roads_traffic",
    category_name: "Roads & Traffic Safety",
    category_name_ml: "റോഡും ഗതാഗത സുരക്ഷയും",
    status: "under_municipal_review",
    support_count: 126,
    supported_by_user: false,
    comments_count: 12,
    comments: [
      {
        id: "pcomm-3",
        proposal_id: "prop-rayirimangalam-roundabout",
        author_id: "usr-citizen-04",
        author_name: "Fathima Rafeeq",
        content: "As a parent of an LPS student, I strongly support this. Morning hours are chaotic here.",
        is_official: false,
        created_at: "2026-11-09T08:15:00Z",
      }
    ],
    official_response: "Inspection conducted with Tanur Traffic Police Sub-Inspector. Joint report submitted for speed calibers and raised zebra crossing.",
    official_response_date: "2026-11-16",
    official_responder_name: "Tanur Traffic Sub-Inspector & Municipal Overseer",
    official_responder_role: "Traffic Advisory Council",
    created_at: "2026-11-05T12:00:00Z",
    updated_at: "2026-11-16T15:30:00Z",
  },
  {
    id: "prop-women-skill-hub",
    tracking_id: "TNR-VOICE-2026-003",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    author_id: "usr-citizen-05",
    author_name: "Kudumbashree CDS Member (കുടുംബശ്രീ സി.ഡി.എസ്)",
    ward_number: 10,
    locality: "Puthentheru",
    locality_ml: "പുത്തൻതെരു",
    title: "Establish Coastal Women Micro-Enterprise & Packaging Hub for Fish Products",
    title_ml: "തീരദേശ വനിതകൾക്കായി മൂല്യവർദ്ധിത മത്സ്യ വിഭവ പാക്കേജിംഗ് കേന്ദ്രം",
    summary: "Support coastal fisherwomen families through hygienic drying, vacuum packaging, and local brand marketing of fresh and dried fish.",
    summary_ml: "മത്സ്യത്തൊഴിലാളി കുടുംബങ്ങളിലെ സ്ത്രീകൾക്ക് സ്വയംതൊഴിൽ ഉറപ്പാക്കാൻ വൃത്തിയുള്ള ഉണക്കമീൻ സംസ്കരണവും ആധുനിക പാക്കേജിംഗ് ഹബ്ബും.",
    details: "Traditional fisherwomen in Tanur face price drops during surplus catches. With a community-run dehydrator and food-grade packaging center, fish pickles and dried fish can be branded as 'Tanur Coastal Harvest' and sold statewide.",
    details_ml: "താനൂരിൽ ചാകരക്കാലത്ത് ലഭിക്കുന്ന മത്സ്യങ്ങൾക്ക് ന്യായവില ഉറപ്പാക്കാനും സ്വന്തം വരുമാനം വർദ്ധിപ്പിക്കാനും കുടുംബശ്രീ ഗ്രൂപ്പുകൾക്ക് പരിശീലനവും മെഷീനുകളും അനുവദിക്കണം.",
    category: "women_welfare",
    category_name: "Women Welfare & Livelihood",
    category_name_ml: "വനിതാ ക്ഷേമവും ഉപജീവനവും",
    status: "feasibility_study",
    support_count: 142,
    supported_by_user: true,
    comments_count: 6,
    comments: [],
    official_response: "Tanur Municipality Welfare Standing Committee has visited the site at Puthentheru. Project proposal under preparation with Kudumbashree District Mission.",
    official_response_date: "2026-11-12",
    official_responder_name: "Chairperson, Welfare Standing Committee",
    official_responder_role: "Tanur Municipal Council",
    created_at: "2026-11-01T10:30:00Z",
    updated_at: "2026-11-12T16:00:00Z",
  },
  {
    id: "prop-biowaste-mrf-expansion",
    tracking_id: "TNR-VOICE-2026-004",
    municipality_id: "40000000-0000-0000-0000-000000000007",
    author_id: "usr-citizen-06",
    author_name: "Haritha Karma Sena Team (ഹരിത കർമ്മ സേന)",
    ward_number: 7,
    locality: "Kettungal",
    locality_ml: "കെട്ടുങ്ങൽ",
    title: "Decentralized Bio-waste Shredder and Expansion of Ward Material Collection Facility",
    title_ml: "വികേന്ദ്രീകൃത ജൈവമാലിന്യ സംസ്കരണ യൂണിറ്റും മിനി എം.ആർ.എഫ് വിപുലീകരണവും",
    summary: "Prevent open dumping along canal bunds and improve door-to-door organic waste composting.",
    summary_ml: "തോടുകളിലും കനാലുകളിലും മാലിന്യം തള്ളുന്നത് തടയാൻ വാർഡ് തലത്തിൽ വികേന്ദ്രീകൃത സംസ്കരണ സംവിധാനവും ബെയിലിംഗ് മെഷീനും ഏർപ്പെടുത്തുക.",
    details: "The current capacity of the town MRF is overwhelmed during monsoon months. Providing localized composting pits and automated plastic shredders for Haritha Karma Sena will eliminate black-spots.",
    details_ml: "ഹരിത കർമ്മ സേന ശേഖരിക്കുന്ന പ്ലാസ്റ്റിക് തരംതിരിക്കാനും ജൈവമാലിന്യങ്ങൾ വേഗത്തിൽ കമ്പോസ്റ്റാക്കാനും കൂടുതൽ സൗകര്യങ്ങൾ ലഭ്യമാക്കണം.",
    category: "waste_cleanliness",
    category_name: "Cleanliness & Sanitation",
    category_name_ml: "ശുചിത്വവും മാലിന്യ സംസ്കരണവും",
    status: "submitted",
    support_count: 67,
    supported_by_user: false,
    comments_count: 3,
    comments: [],
    created_at: "2026-11-11T16:00:00Z",
    updated_at: "2026-11-11T16:00:00Z",
  }
];

// -------------------------------------------------------------
// 4. VERIFIED DIGITAL TANUR GIS CATEGORIES & LOCATIONS
// -------------------------------------------------------------
export const TANUR_LOCATION_CATEGORIES = [
  { key: "government", label: "Government Offices", label_ml: "സർക്കാർ ഓഫീസുകൾ", color: "#1E3A8A", bg: "#DBEAFE", icon: "Building" },
  { key: "education", label: "Educational Institutions", label_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ", color: "#4338CA", bg: "#E0E7FF", icon: "GraduationCap" },
  { key: "health", label: "Hospitals & Healthcare", label_ml: "ആശുപത്രികൾ & ആരോഗ്യം", color: "#B91C1C", bg: "#FEE2E2", icon: "Activity" },
  { key: "facilities", label: "Public Facilities", label_ml: "പൊതു സൗകര്യങ്ങൾ", color: "#047857", bg: "#D1FAE5", icon: "Landmark" },
  { key: "religious_cultural", label: "Religious & Cultural Places", label_ml: "ആരാധനാലയങ്ങൾ & പൈതൃകം", color: "#B45309", bg: "#FEF3C7", icon: "Sparkles" },
  { key: "tourism", label: "Tourism & Landmarks", label_ml: "വിനോദസഞ്ചാര കേന്ദ്രങ്ങൾ", color: "#0F766E", bg: "#CCFBF1", icon: "Compass" },
  { key: "transport", label: "Transportation", label_ml: "ഗതാഗതം & സ്റ്റേഷനുകൾ", color: "#6D28D9", bg: "#EDE9FE", icon: "MapPin" },
  { key: "business", label: "Local Businesses", label_ml: "പ്രാദേശിക വ്യാപാര സ്ഥാപനങ്ങൾ", color: "#374151", bg: "#F3F4F6", icon: "Briefcase" },
] as const;

export const TANUR_GIS_LOCATIONS: DigitalTanurLocation[] = [
  // 1. HEALTH & HOSPITALS (7)
  {
    id: "loc-chc-hospital",
    name: "Community Health Centre (CHC) / Taluk Hospital",
    name_ml: "താനൂർ കമ്മ്യൂണിറ്റി ഹെൽത്ത് സെന്റർ / താലൂക്ക് ആശുപത്രി",
    category: "health",
    facility_category: "health",
    category_name: "Health & Hospitals",
    category_name_ml: "ആരോഗ്യം & ആശുപത്രികൾ",
    ward_number: 9,
    ward_name: "KSEB Ward",
    ward_name_ml: "കെ.എസ്.ഇ.ബി വാർഡ്",
    locality: "Hospital Road",
    locality_ml: "ഹോസ്പിറ്റൽ റോഡ്",
    address: "Hospital Road, Tanur, Malappuram - 676302",
    latitude: 10.9780,
    longitude: 75.8650,
    phone: "0494 2440250",
    emergency_phone: "108",
    opening_hours: "24 Hours Casualty & IP; OPD: 9:00 AM – 1:00 PM",
    opening_hours_ml: "24 മണിക്കൂറും അത്യാഹിത വിഭാഗം; ഒ.പി: രാവിലെ 9:00 – 1:00",
    description: "Main government hospital serving Tanur municipality with 24/7 casualty, maternity wing, laboratory, and pharmacy.",
    description_ml: "24 മണിക്കൂറും പ്രവർത്തിക്കുന്ന അത്യാഹിത വിഭാഗം, മാതൃ-ശിശു സംരക്ഷണം, ലാബ്, ഫാർമസി എന്നിവയുള്ള പ്രധാന സർക്കാർ ആശുപത്രി.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Directorate of Health Services (DHS) Kerala",
    source_url: "https://dhs.kerala.gov.in/",
    last_verified_date: "2026-11-15",
    featured: true
  },
  {
    id: "loc-uphc-chappappadi",
    name: "Tanur Urban Primary Health Centre (UPHC)",
    name_ml: "താനൂർ അർബൻ പ്രൈമറി ഹെൽത്ത് സെന്റർ (യു.പി.എച്ച്.സി)",
    category: "health",
    facility_category: "health",
    category_name: "Health & Hospitals",
    category_name_ml: "ആരോഗ്യം & ആശുപത്രികൾ",
    ward_number: 2,
    ward_name: "Rayirimangalam West",
    ward_name_ml: "രായിരിമംഗലം വെസ്റ്റ്",
    locality: "Chappappadi",
    locality_ml: "ചപ്പപ്പടി",
    address: "Chappappadi Junction, Tanur - 676302",
    latitude: 10.9740,
    longitude: 75.8600,
    phone: "0494 2441120",
    opening_hours: "Monday to Saturday: 9:00 AM – 4:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 9:00 – വൈകിട്ട് 4:00",
    description: "Urban primary healthcare centre focusing on maternal health, child immunization, non-communicable disease screening, and free generic medicine.",
    description_ml: "ദേശീയ ആരോഗ്യ ദൗത്യത്തിന് കീഴിൽ പ്രവർത്തിക്കുന്ന നഗര പ്രാഥമിക ആരോഗ്യ കേന്ദ്രം. ജീവിതശൈലീ രോഗനിർണ്ണയം, പ്രതിരോധ കുത്തിവയ്പ്പുകൾ.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "National Health Mission Kerala",
    source_url: "https://arogyakeralam.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-homeo-dispensary",
    name: "Govt Homeopathic Dispensary",
    name_ml: "ഗവ. ഹോമിയോ ഡിസ്പെൻസറി, താനൂർ",
    category: "health",
    facility_category: "health",
    category_name: "Health & Hospitals",
    category_name_ml: "ആരോഗ്യം & ആശുപത്രികൾ",
    ward_number: 10,
    ward_name: "Puthentheru",
    ward_name_ml: "പുത്തൻതെരു",
    locality: "Town Centre",
    locality_ml: "ടൗൺ സെന്റർ",
    address: "Old Panchayat Building, Puthentheru, Tanur - 676302",
    latitude: 10.9765,
    longitude: 75.8665,
    phone: "0494 2442300",
    opening_hours: "Monday to Saturday: 9:00 AM – 2:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 9:00 – ഉച്ചയ്ക്ക് 2:00",
    description: "Government homeopathic dispensary under Department of Homeopathy, Kerala.",
    description_ml: "കേരള സർക്കാർ ഹോമിയോപ്പതി വകുപ്പിന് കീഴിൽ പ്രവർത്തിക്കുന്ന സൗജന്യ ചികിത്സാ കേന്ദ്രം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Department of Homeopathy Kerala",
    source_url: "https://homeopathy.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-ayurveda-dispensary",
    name: "Govt Ayurveda Dispensary, Meenadathur",
    name_ml: "ഗവ. ആയുർവേദ ഡിസ്പെൻസറി, മീനടത്തൂർ",
    category: "health",
    facility_category: "health",
    category_name: "Health & Hospitals",
    category_name_ml: "ആരോഗ്യം & ആശുപത്രികൾ",
    ward_number: 11,
    ward_name: "Meenadathur",
    ward_name_ml: "മീനടത്തൂർ",
    locality: "Meenadathur Junction",
    locality_ml: "മീനടത്തൂർ ജംഗ്ഷൻ",
    address: "Meenadathur Road, Tanur - 676302",
    latitude: 10.9810,
    longitude: 75.8750,
    phone: "0494 2443100",
    opening_hours: "Monday to Saturday: 9:00 AM – 2:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 9:00 – ഉച്ചയ്ക്ക് 2:00",
    description: "Traditional Indian medicine and holistic wellness consultation provided under Govt of Kerala ISM Department.",
    description_ml: "ഭാരതീയ ചികിത്സാ വകുപ്പിന് കീഴിൽ പ്രവർത്തിക്കുന്ന ആയുർവേദ ഡിസ്പെൻസറി.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Indian Systems of Medicine (ISM) Kerala",
    source_url: "https://ism.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-family-health-centre",
    name: "Tanur Family Health Centre (FHC Rayirimangalam)",
    name_ml: "താനൂർ ഫാമിലി ഹെൽത്ത് സെന്റർ (എഫ്.എച്ച്.സി)",
    category: "health",
    facility_category: "health",
    category_name: "Health & Hospitals",
    category_name_ml: "ആരോഗ്യം & ആശുപത്രികൾ",
    ward_number: 1,
    ward_name: "Rayirimangalam East",
    ward_name_ml: "രായിരിമംഗലം ഈസ്റ്റ്",
    locality: "Rayirimangalam",
    locality_ml: "രായിരിമംഗലം",
    address: "Rayirimangalam, Tanur - 676302",
    latitude: 10.9785,
    longitude: 75.8730,
    phone: "0494 2441180",
    opening_hours: "Monday to Saturday: 8:30 AM – 4:30 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 8:30 – വൈകിട്ട് 4:30",
    description: "Upgraded primary family healthcare clinic under Aardram Mission with electronic health records.",
    description_ml: "ആർദ്രം മിഷൻ ഫാമിലി ഹെൽത്ത് സെന്റർ. ഇ-ഹെൽത്ത് സൗകര്യവും ലാബ് സേവനങ്ങളും.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Aardram Mission Kerala",
    source_url: "https://dhs.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-coastal-health-subcentre",
    name: "Coastal Health Sub-Centre, Beach Road",
    name_ml: "തീരദേശ ആരോഗ്യ ഉപകേന്ദ്രം, ബീച്ച് റോഡ്",
    category: "health",
    facility_category: "health",
    category_name: "Health & Hospitals",
    category_name_ml: "ആരോഗ്യം & ആശുപത്രികൾ",
    ward_number: 3,
    ward_name: "Theeradesham",
    ward_name_ml: "തീരദേശം",
    locality: "Beach Road",
    locality_ml: "ബീച്ച് റോഡ്",
    address: "Beach Road, Theeradesham, Tanur - 676302",
    latitude: 10.9725,
    longitude: 75.8565,
    phone: "0494 2440250",
    opening_hours: "Monday to Friday: 9:00 AM – 1:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ: രാവിലെ 9:00 – ഉച്ചയ്ക്ക് 1:00",
    description: "Dedicated coastal community health sub-centre serving fishing families with first aid, pediatric immunizations, and prenatal checkups.",
    description_ml: "തീരദേശ ജനവിഭാഗങ്ങൾക്കായുള്ള പ്രാഥമിക ആരോഗ്യ ഉപകേന്ദ്രം. പ്രതിരോധ കുത്തിവയ്പ്പുകളും ഗർഭിണികൾക്കുള്ള പരിചരണവും.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "DHS Kerala Coastal Health Wing",
    source_url: "https://dhs.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-maternity-child-welfare",
    name: "Maternity & Child Health Welfare Centre (MCH)",
    name_ml: "മാതൃ-ശിശു സംരക്ഷണ കേന്ദ്രം (എം.സി.എച്ച്)",
    category: "health",
    facility_category: "health",
    category_name: "Health & Hospitals",
    category_name_ml: "ആരോഗ്യം & ആശുപത്രികൾ",
    ward_number: 5,
    ward_name: "Tanur Town Central",
    ward_name_ml: "താനൂർ ടൗൺ സെൻട്രൽ",
    locality: "Market Road",
    locality_ml: "മാർക്കറ്റ് റോഡ്",
    address: "Market Road, Tanur Town - 676302",
    latitude: 10.9755,
    longitude: 75.8665,
    phone: "0494 2441190",
    opening_hours: "Monday to Saturday: 9:00 AM – 3:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 9:00 – വൈകിട്ട് 3:00",
    description: "Specialized maternal, neonatal, and adolescent nutritional guidance centre coordinated by Tanur Municipality Health Wing.",
    description_ml: "നഗരസഭാ ആരോഗ്യ വിഭാഗത്തിന്റെ നേതൃത്വത്തിലുള്ള മാതൃ-ശിശു ആരോഗ്യ സംരക്ഷണ പോഷകാഹാര കേന്ദ്രം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Tanur Municipality Health Wing",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    last_verified_date: "2026-11-15"
  },

  // 2. EDUCATIONAL INSTITUTIONS (9)
  {
    id: "loc-devadhar-hss",
    name: "Devadhar Govt Higher Secondary School",
    name_ml: "ദേവധാർ ഗവ. ഹയർ സെക്കൻഡറി സ്കൂൾ",
    category: "education",
    facility_category: "education",
    category_name: "Educational Institutions",
    category_name_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ",
    ward_number: 14,
    ward_name: "Pandikasala",
    ward_name_ml: "പണ്ടികശാല",
    locality: "Near Tanur Railway Station",
    locality_ml: "താനൂർ റെയിൽവേ സ്റ്റേഷൻ പരിസരം",
    address: "Devadhar HSS Road, Tanur - 676302",
    latitude: 10.9730,
    longitude: 75.8710,
    phone: "0494 2440304",
    website: "https://sametham.kite.kerala.gov.in/",
    opening_hours: "Monday to Friday: 9:30 AM – 4:30 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ: രാവിലെ 9:30 – വൈകിട്ട് 4:30",
    description: "Historic government higher secondary institution established in 1919, offering Humanities, Science, and Commerce streams.",
    description_ml: "1919-ൽ സ്ഥാപിതമായ ചരിത്രപ്രസിദ്ധമായ പൊതുവിദ്യാഭ്യാസ സ്ഥാപനം. സയൻസ്, കൊമേഴ്സ്, ഹ്യുമാനിറ്റീസ് ബാച്ചുകൾ.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "General Education Department, Govt of Kerala",
    source_url: "https://education.kerala.gov.in/",
    last_verified_date: "2026-11-15",
    featured: true
  },
  {
    id: "loc-islahul-uloom",
    name: "Islahul Uloom Arabic College",
    name_ml: "ഇസ്‌ലാഹുൽ ഉലൂം അറബിക് കോളേജ്",
    category: "education",
    facility_category: "education",
    category_name: "Educational Institutions",
    category_name_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ",
    ward_number: 8,
    ward_name: "Railway Station Ward",
    ward_name_ml: "റെയിൽവേ സ്റ്റേഷൻ വാർഡ്",
    locality: "Station Road",
    locality_ml: "സ്റ്റേഷൻ റോഡ്",
    address: "Station Road, Tanur - 676302",
    latitude: 10.9755,
    longitude: 75.8695,
    phone: "0494 2440400",
    opening_hours: "Monday to Saturday: 9:00 AM – 4:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 9:00 – വൈകിട്ട് 4:00",
    description: "Premier oriental higher education institution in Malabar founded in 1924, affiliated with University of Calicut.",
    description_ml: "1924-ൽ സ്ഥാപിതമായ മലബാറിലെ പ്രമുഖ പൗരസ്ത്യ ഉന്നത വിദ്യാഭ്യാസ സ്ഥാപനം. കാലിക്കറ്റ് സർവ്വകലാശാല അഫിലിയേറ്റഡ്.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Higher Education Department Kerala",
    source_url: "https://highereducation.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-fisheries-tech-school",
    name: "Govt Regional Fisheries Technical High School",
    name_ml: "ഗവ. റീജിയണൽ ഫിഷറീസ് ടെക്നിക്കൽ ഹൈസ്കൂൾ",
    category: "education",
    facility_category: "education",
    category_name: "Educational Institutions",
    category_name_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ",
    ward_number: 1,
    ward_name: "Rayirimangalam East",
    ward_name_ml: "രായിരിമംഗലം ഈസ്റ്റ്",
    locality: "Rayirimangalam",
    locality_ml: "രായിരിമംഗലം",
    address: "Rayirimangalam, Tanur - 676302",
    latitude: 10.9790,
    longitude: 75.8720,
    phone: "0494 2440800",
    opening_hours: "Monday to Friday: 9:00 AM – 4:30 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ: രാവിലെ 9:00 – വൈകിട്ട് 4:30",
    description: "Specialized residential technical high school for children of fishermen community under Kerala Fisheries Department.",
    description_ml: "മത്സ്യത്തൊഴിലാളി മക്കൾക്കായുള്ള പ്രത്യേക സാങ്കേതിക ഹൈസ്കൂൾ. സൗജന്യ ഹോസ്റ്റൽ സൗകര്യവും വികേന്ദ്രീകൃത സാങ്കേതിക പരിശീലനവും.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Fisheries Department, Govt of Kerala",
    source_url: "https://fisheries.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-govt-arts-college",
    name: "Govt Arts & Science College Tanur",
    name_ml: "ഗവ. ആർട്സ് & സയൻസ് കോളേജ്, താനൂർ",
    category: "education",
    facility_category: "education",
    category_name: "Educational Institutions",
    category_name_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ",
    ward_number: 22,
    ward_name: "Kaniyapadi",
    ward_name_ml: "കാണിയാപ്പടി",
    locality: "Kaniyapadi",
    locality_ml: "കാണിയാപ്പടി",
    address: "Kaniyapadi Campus, Tanur - 676302",
    latitude: 10.9850,
    longitude: 75.8820,
    phone: "0494 2584400",
    website: "https://gasctanur.ac.in/",
    opening_hours: "Monday to Friday: 9:00 AM – 4:30 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ: രാവിലെ 9:00 – വൈകിട്ട് 4:30",
    description: "Public university collegiate education centre offering undergraduate and post-graduate degrees affiliated with University of Calicut.",
    description_ml: "കാലിക്കറ്റ് സർവകലാശാലയോട് അഫിലിയേറ്റ് ചെയ്ത സർക്കാർ ആർട്സ് & സയൻസ് കോളേജ്.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Collegiate Education Department Kerala",
    source_url: "https://collegiateedu.kerala.gov.in/",
    last_verified_date: "2026-11-15",
    featured: true
  },
  {
    id: "loc-travel-library",
    name: "Tanur Travel & Public Memorial Library",
    name_ml: "താനൂർ പബ്ലിക് മെമ്മോറിയൽ ലൈബ്രറി & വായനശാല",
    category: "education",
    facility_category: "education",
    category_name: "Educational Institutions",
    category_name_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ",
    ward_number: 8,
    ward_name: "Railway Station Ward",
    ward_name_ml: "റെയിൽവേ സ്റ്റേഷൻ വാർഡ്",
    locality: "Near Municipal Stand",
    locality_ml: "മുനിസിപ്പൽ സ്റ്റാൻഡ് പരിസരം",
    address: "Library Road, Tanur - 676302",
    latitude: 10.9760,
    longitude: 75.8680,
    phone: "0494 2440950",
    opening_hours: "Tuesday to Sunday: 8:00 AM – 11:30 AM, 4:00 PM – 8:00 PM",
    opening_hours_ml: "ചൊവ്വ മുതൽ ഞായർ വരെ: രാവിലെ 8:00 – 11:30, വൈകിട്ട് 4:00 – 8:00",
    description: "Kerala State Library Council affiliated Grade-A civic library hosting historical archives, competitive examination books, and Malayalam literature.",
    description_ml: "കേരള സ്റ്റേറ്റ് ലൈബ്രറി കൗൺസിൽ എ-ഗ്രേഡ് വായനശാല. പുസ്തകശേഖരവും റഫറൻസ് വിഭാഗവും.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kerala State Library Council",
    source_url: "https://kslc.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-glps-rayirimangalam",
    name: "Govt Lower Primary School, Rayirimangalam",
    name_ml: "ഗവ. ലോവർ പ്രൈമറി സ്കൂൾ, രായിരിമംഗലം",
    category: "education",
    facility_category: "education",
    category_name: "Educational Institutions",
    category_name_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ",
    ward_number: 1,
    ward_name: "Rayirimangalam East",
    ward_name_ml: "രായിരിമംഗലം ഈസ്റ്റ്",
    locality: "Rayirimangalam",
    locality_ml: "രായിരിമംഗലം",
    address: "Rayirimangalam, Tanur - 676302",
    latitude: 10.9788,
    longitude: 75.8745,
    phone: "0494 2441050",
    opening_hours: "Monday to Friday: 9:30 AM – 4:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ: രാവിലെ 9:30 – വൈകിട്ട് 4:00",
    description: "State government primary school providing foundational Malayalam and English education under Samagra Shiksha Kerala.",
    description_ml: "സമഗ്ര ശിക്ഷാ കേരളയുടെ കീഴിലുള്ള സർക്കാർ പ്രൈമറി വിദ്യാലയം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "General Education Department Kerala",
    source_url: "https://education.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-glps-valiyakulangara",
    name: "Govt LP School, Valiya Kulangara",
    name_ml: "ജി.എൽ.പി സ്കൂൾ, വലിയ കുളങ്ങര",
    category: "education",
    facility_category: "education",
    category_name: "Educational Institutions",
    category_name_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ",
    ward_number: 6,
    ward_name: "Valiya Kulangara",
    ward_name_ml: "വലിയ കുളങ്ങര",
    locality: "Valiya Kulangara",
    locality_ml: "വലിയ കുളങ്ങര",
    address: "Pond Road, Valiya Kulangara, Tanur - 676302",
    latitude: 10.9792,
    longitude: 75.8698,
    phone: "0494 2441060",
    opening_hours: "Monday to Friday: 9:30 AM – 4:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ: രാവിലെ 9:30 – വൈകിട്ട് 4:00",
    description: "Neighborhood primary learning center equipped with modern smart classrooms and nutritious midday meal scheme.",
    description_ml: "സ്മാർട്ട് ക്ലാസ് മുറികളും ഉച്ചഭക്ഷണ പദ്ധതിയും സജ്ജീകരിച്ചിട്ടുള്ള പൊതുവിദ്യാലയം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "General Education Department Kerala",
    source_url: "https://education.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-fisheries-ups",
    name: "Govt Fisheries UP School, Tanur Beach",
    name_ml: "ഗവ. ഫിഷറീസ് യു.പി സ്കൂൾ, താനൂർ ബീച്ച്",
    category: "education",
    facility_category: "education",
    category_name: "Educational Institutions",
    category_name_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ",
    ward_number: 3,
    ward_name: "Theeradesham",
    ward_name_ml: "തീരദേശം",
    locality: "Fisheries Road",
    locality_ml: "ഫിഷറീസ് റോഡ്",
    address: "Beach Road North, Theeradesham, Tanur - 676302",
    latitude: 10.9735,
    longitude: 75.8570,
    phone: "0494 2441070",
    opening_hours: "Monday to Friday: 9:30 AM – 4:15 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ: രാവിലെ 9:30 – വൈകിട്ട് 4:15",
    description: "Coastal upper primary school established for maritime families, offering holistic education and computer training.",
    description_ml: "തീരദേശ വിദ്യാർത്ഥികൾക്കായുള്ള അപ്പർ പ്രൈമറി സ്കൂൾ. കമ്പ്യൂട്ടർ ലാബും സ്പോർട്സ് പരിശീലനവും.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "General Education Department Kerala",
    source_url: "https://education.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-town-model-lps",
    name: "Govt Town Model Basic LP School",
    name_ml: "ഗവ. ടൗൺ മോഡൽ ബേസിക് എൽ.പി സ്കൂൾ",
    category: "education",
    facility_category: "education",
    category_name: "Educational Institutions",
    category_name_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ",
    ward_number: 5,
    ward_name: "Tanur Town Central",
    ward_name_ml: "താനൂർ ടൗൺ സെൻട്രൽ",
    locality: "Town Centre",
    locality_ml: "ടൗൺ സെന്റർ",
    address: "Main Road, Tanur Town - 676302",
    latitude: 10.9762,
    longitude: 75.8675,
    phone: "0494 2441080",
    opening_hours: "Monday to Friday: 9:30 AM – 4:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ: രാവിലെ 9:30 – വൈകിട്ട് 4:00",
    description: "Centrally located model primary school focusing on activity-based pedagogy and Kerala syllabus.",
    description_ml: "പ്രവർത്തനാധിഷ്ഠിത പഠനരീതി നടപ്പിലാക്കിയ ടൗണിലെ മോഡൽ പ്രൈമറി വിദ്യാലയം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "General Education Department Kerala",
    source_url: "https://education.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },

  // 3. HARBOUR & COASTAL (5)
  {
    id: "loc-harbour-pulimuttu",
    name: "Tanur Fishing Harbour Breakwater (Pulimuttu)",
    name_ml: "താനൂർ ഫിഷിംഗ് ഹാർബർ പുലിമുട്ട്",
    category: "facilities",
    facility_category: "harbour",
    category_name: "Harbour & Coastal",
    category_name_ml: "ഫിഷിംഗ് ഹാർബർ",
    ward_number: 4,
    ward_name: "Harbour Central",
    ward_name_ml: "ഹാർബർ സെൻട്രൽ",
    locality: "Harbour Road",
    locality_ml: "ഹാർബർ റോഡ്",
    address: "Harbour Point, Tanur - 676302",
    latitude: 10.9715,
    longitude: 75.8540,
    phone: "0494 2440310",
    opening_hours: "Open 24 Hours for fishing craft navigation",
    opening_hours_ml: "മത്സ്യബന്ധന ബോട്ടുകൾക്കായി 24 മണിക്കൂറും തുറന്നിരിക്കുന്നു",
    description: "Major deep-sea breakwater infrastructure constructed by Harbour Engineering Department sheltering hundreds of traditional vallams and mechanized fishing crafts.",
    description_ml: "നൂറുകണക്കിന് ബോട്ടുകൾക്കും വള്ളങ്ങൾക്കും സംരക്ഷണം നൽകുന്ന താനൂർ ഫിഷിംഗ് ഹാർബർ പുലിമുട്ട് നിർമ്മിതി.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Harbour Engineering Department Kerala",
    source_url: "https://hed.kerala.gov.in/",
    last_verified_date: "2026-11-15",
    featured: true
  },
  {
    id: "loc-harbour-auction-hall",
    name: "Fish Auction Terminal & Net Mending Yard",
    name_ml: "ഫിഷ് ഓക്ഷൻ ടെർമിനൽ & വല തുന്നൽ കേന്ദ്രം",
    category: "facilities",
    facility_category: "harbour",
    category_name: "Harbour & Coastal",
    category_name_ml: "ഫിഷിംഗ് ഹാർബർ",
    ward_number: 4,
    ward_name: "Harbour Central",
    ward_name_ml: "ഹാർബർ സെൻട്രൽ",
    locality: "Harbour Basin",
    locality_ml: "ഹാർബർ പരിസരം",
    address: "Harbour Basin Road, Tanur - 676302",
    latitude: 10.9718,
    longitude: 75.8548,
    phone: "0494 2440312",
    opening_hours: "Active Landing Hours: 4:30 AM – 11:00 AM, 3:00 PM – 7:30 PM",
    opening_hours_ml: "ലേല സമയം: പുലർച്ചെ 4:30 – 11:00, വൈകിട്ട് 3:00 – 7:30",
    description: "Statutory municipal fish wholesale auction platform with hygiene inspection, concrete drying yards, and shaded net mending sheds.",
    description_ml: "ഹാർബർ എൻജിനീയറിംഗ് വകുപ്പ് നിർമ്മിച്ച ആധുനിക മത്സ്യലേല ഹാൾ, ഡ്രെയിനേജ് സംവിധാനം, വല നന്നാക്കൽ കേന്ദ്രം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Matsyafed Kerala & Tanur Municipality",
    source_url: "https://matsyafed.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-biz-ice-plant",
    name: "Tanur Coastal Ice Plants & Cold Storage",
    name_ml: "തീരദേശ ഐസ് പ്ലാന്റുകൾ & കോൾഡ് സ്റ്റോറേജ്",
    category: "facilities",
    facility_category: "harbour",
    category_name: "Harbour & Coastal",
    category_name_ml: "ഫിഷിംഗ് ഹാർബർ",
    ward_number: 4,
    ward_name: "Harbour Central",
    ward_name_ml: "ഹാർബർ സെൻട്രൽ",
    locality: "Harbour Industrial Zone",
    locality_ml: "ഹാർബർ ഇൻഡസ്ട്രിയൽ ഏരിയ",
    address: "Ice Plant Road, Harbour, Tanur - 676302",
    latitude: 10.9710,
    longitude: 75.8552,
    phone: "0494 2440315",
    opening_hours: "24 Hours Continuous Cold Chain Operation",
    opening_hours_ml: "24 മണിക്കൂറും ഐസ് വിതരണം",
    description: "Commercial ice manufacturing cluster supplying crush and block ice to coastal fishing vessels and export fleets.",
    description_ml: "മത്സ്യബന്ധന ബോട്ടുകൾക്ക് ഐസ് കട്ടകളും ക്രഷ്ഡ് ഐസും വിതരണം ചെയ്യുന്ന കോൾഡ് ചെയിൻ പ്ലാന്റ്.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Tanur Fishermen Cooperative Society",
    source_url: "https://matsyafed.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-biz-seafood",
    name: "Malabar Sea Bounty Fish Exports & Trading",
    name_ml: "താനൂർ സീഫുഡ് പ്രോസസ്സിംഗ് & ട്രേഡിങ് ഹബ്",
    category: "facilities",
    facility_category: "harbour",
    category_name: "Harbour & Coastal",
    category_name_ml: "ഫിഷിംഗ് ഹാർബർ",
    ward_number: 4,
    ward_name: "Harbour Central",
    ward_name_ml: "ഹാർബർ സെൻട്രൽ",
    locality: "Harbour Road",
    locality_ml: "ഹാർബർ റോഡ്",
    address: "Harbour Link Road, Tanur - 676302",
    latitude: 10.9720,
    longitude: 75.8550,
    phone: "0494 2440320",
    opening_hours: "Monday to Saturday: 6:00 AM – 8:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 6:00 – രാത്രി 8:00",
    description: "Certified seafood dispatch facility processing oil sardine, mackerel, tuna, and prawns with automated blast chillers.",
    description_ml: "ഹാർബറിൽ നിന്ന് ലഭിക്കുന്ന സമുദ്രോത്പന്നങ്ങൾ ശീതീകരിച്ച് വിവിധ സംസ്ഥാനങ്ങളിലേക്കും വിദേശത്തേക്കും കയറ്റി അയക്കുന്ന പ്രോസസ്സിംഗ് കേന്ദ്രം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "MPEDA & Tanur Harbour Authority",
    source_url: "https://mpeda.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-biz-boat-repair",
    name: "Sagar Fibre Boat & Fishing Net Workshop",
    name_ml: "സാഗർ ഫൈബർ ബോട്ട് & ഫിഷിംഗ് നെറ്റ് റിപ്പയർ വർക്ക്‌ഷോപ്പ്",
    category: "facilities",
    facility_category: "harbour",
    category_name: "Harbour & Coastal",
    category_name_ml: "ഫിഷിംഗ് ഹാർബർ",
    ward_number: 3,
    ward_name: "Theeradesham",
    ward_name_ml: "തീരദേശം",
    locality: "Beach Road",
    locality_ml: "ബീച്ച് റോഡ്",
    address: "Beach Road South, Tanur - 676302",
    latitude: 10.9722,
    longitude: 75.8558,
    phone: "0494 2440330",
    opening_hours: "Monday to Saturday: 7:00 AM – 6:30 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 7:00 – വൈകിട്ട് 6:30",
    description: "Marine fiberglass boat hull fabricating, marine outboard engine servicing, and ring-seine net maintenance hub.",
    description_ml: "പരമ്പരാഗത മത്സ്യത്തൊഴിലാളികളുടെ ഫൈബർ ബോട്ടുകൾ നന്നാക്കലും ഔട്ട്ബോർഡ് എഞ്ചിൻ സർവീസിംഗും വല റീ-ഫ്രെയിമിംഗും നടത്തുന്ന കേന്ദ്രം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kerala Maritime Board Registered Yard",
    source_url: "https://kmb.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },

  // 4. AKSHAYA & CITIZEN SERVICES (6)
  {
    id: "loc-akshaya-town",
    name: "Akshaya e-Centre (Town Centre)",
    name_ml: "അക്ഷയ ഇ-കേന്ദ്രം (ടൗൺ സെന്റർ)",
    category: "facilities",
    facility_category: "akshaya",
    category_name: "Akshaya & Citizen Services",
    category_name_ml: "അക്ഷയ & സേവന കേന്ദ്രങ്ങൾ",
    ward_number: 10,
    ward_name: "Puthentheru",
    ward_name_ml: "പുത്തൻതെരു",
    locality: "Town Centre",
    locality_ml: "ടൗൺ സെന്റർ",
    address: "Near Municipal Bus Stand, Tanur - 676302",
    latitude: 10.9764,
    longitude: 75.8678,
    phone: "0494 2441501",
    opening_hours: "Monday to Saturday: 9:00 AM – 6:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 9:00 – വൈകിട്ട് 6:00",
    description: "Official Kerala State IT Mission Akshaya centre for Aadhaar enrollment, ration card updates, e-District services, and K-Smart municipal submissions.",
    description_ml: "ആധാർ എൻറോൾമെന്റ്, റേഷൻ കാർഡ് തിരുത്തലുകൾ, ഇ-ഡിസ്ട്രിക്റ്റ് സർട്ടിഫിക്കറ്റുകൾ, കെ-സ്മാർട്ട് മുനിസിപ്പൽ അപേക്ഷകൾ എന്നിവ ലഭ്യമാക്കുന്ന ഔദ്യോഗിക കേന്ദ്രം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kerala State IT Mission (Akshaya)",
    source_url: "https://akshaya.kerala.gov.in/",
    last_verified_date: "2026-11-15",
    featured: true
  },
  {
    id: "loc-akshaya-kettungal",
    name: "Akshaya e-Centre (Kettungal)",
    name_ml: "അക്ഷയ ഇ-കേന്ദ്രം (കെട്ടുങ്ങൽ)",
    category: "facilities",
    facility_category: "akshaya",
    category_name: "Akshaya & Citizen Services",
    category_name_ml: "അക്ഷയ & സേവന കേന്ദ്രങ്ങൾ",
    ward_number: 7,
    ward_name: "Kettungal",
    ward_name_ml: "കെട്ടുങ്ങൽ",
    locality: "Kettungal Junction",
    locality_ml: "കെട്ടുങ്ങൽ ജംഗ്ഷൻ",
    address: "Kettungal Junction, Tanur - 676302",
    latitude: 10.9770,
    longitude: 75.8620,
    phone: "0494 2441502",
    opening_hours: "Monday to Saturday: 9:00 AM – 5:30 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 9:00 – വൈകിട്ട് 5:30",
    description: "Citizen e-governance service counter for social security pensions, utility bill payments, and scholarship applications.",
    description_ml: "സാമൂഹിക സുരക്ഷാ പെൻഷൻ മസ്റ്ററിംഗ്, വൈദ്യുതി-വാട്ടർ ബിൽ അടവ്, സ്കോളർഷിപ്പ് അപേക്ഷകൾ എന്നിവ നൽകുന്ന അക്ഷയ ഓഫീസ്.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kerala State IT Mission (Akshaya)",
    source_url: "https://akshaya.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-akshaya-puthentheru",
    name: "Akshaya e-Centre (Puthentheru Junction)",
    name_ml: "അക്ഷയ ഇ-കേന്ദ്രം (പുത്തൻതെരു ജംഗ്ഷൻ)",
    category: "facilities",
    facility_category: "akshaya",
    category_name: "Akshaya & Citizen Services",
    category_name_ml: "അക്ഷയ & സേവന കേന്ദ്രങ്ങൾ",
    ward_number: 10,
    ward_name: "Puthentheru",
    ward_name_ml: "പുത്തൻതെരു",
    locality: "Puthentheru",
    locality_ml: "പുത്തൻതെരു",
    address: "Puthentheru Main Road, Tanur - 676302",
    latitude: 10.9758,
    longitude: 75.8660,
    phone: "0494 2441503",
    opening_hours: "Monday to Saturday: 9:00 AM – 6:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 9:00 – വൈകിട്ട് 6:00",
    description: "Digital public services delivery point handling property tax payments, birth/death certificate downloads, and employment registrations.",
    description_ml: "വസ്തുനികുതി അടവ്, ജനന-മരണ സർട്ടിഫിക്കറ്റ് ഡൗൺലോഡ്, എംപ്ലോയ്മെന്റ് രജിസ്ട്രേഷൻ സേവനങ്ങൾ.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kerala State IT Mission (Akshaya)",
    source_url: "https://akshaya.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-kudumbashree-sevana",
    name: "Kudumbashree Sevana Kendram & Help Desk",
    name_ml: "കുടുംബശ്രീ സേവന കേന്ദ്രം & ഹെൽപ്പ് ഡെസ്ക്",
    category: "facilities",
    facility_category: "akshaya",
    category_name: "Akshaya & Citizen Services",
    category_name_ml: "അക്ഷയ & സേവന കേന്ദ്രങ്ങൾ",
    ward_number: 10,
    ward_name: "Puthentheru",
    ward_name_ml: "പുത്തൻതെരു",
    locality: "Municipality Building",
    locality_ml: "നഗരസഭാ കാര്യാലയ സമുച്ചയം",
    address: "Municipal Office Annex, Tanur - 676302",
    latitude: 10.9766,
    longitude: 75.8670,
    phone: "0494 2440228",
    opening_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 10:00 – വൈകിട്ട് 5:00",
    description: "Community Development Society (CDS) help desk assisting women self-help groups, micro-enterprise loans, and livelihood schemes.",
    description_ml: "കുടുംബശ്രീ സി.ഡി.എസ് സംരംഭകത്വ സഹായം, മൈക്രോ-ക്രെഡിറ്റ് വായ്പകൾ, സ്വയംതൊഴിൽ മാർഗ്ഗനിർദ്ദേശം എന്നിവ നൽകുന്ന കേന്ദ്രം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kudumbashree State Mission Kerala",
    source_url: "https://kudumbashree.org/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-akshaya-rayirimangalam",
    name: "Akshaya e-Centre (Rayirimangalam)",
    name_ml: "അക്ഷയ ഇ-കേന്ദ്രം (രായിരിമംഗലം)",
    category: "facilities",
    facility_category: "akshaya",
    category_name: "Akshaya & Citizen Services",
    category_name_ml: "അക്ഷയ & സേവന കേന്ദ്രങ്ങൾ",
    ward_number: 1,
    ward_name: "Rayirimangalam East",
    ward_name_ml: "രായിരിമംഗലം ഈസ്റ്റ്",
    locality: "Rayirimangalam",
    locality_ml: "രായിരിമംഗലം",
    address: "Rayirimangalam High School Road, Tanur - 676302",
    latitude: 10.9785,
    longitude: 75.8740,
    phone: "0494 2441505",
    opening_hours: "Monday to Saturday: 9:00 AM – 5:30 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 9:00 – വൈകിട്ട് 5:30",
    description: "Suburban Akshaya branch providing income, caste, and nativity certificate applications, passport seva guidance, and PAN card processing.",
    description_ml: "വരുമാന-ജാതി സർട്ടിഫിക്കറ്റുകൾ, പാസ്പോർട്ട് സേവ, പാൻ കാർഡ് അപേക്ഷകൾ എന്നിവ പൂർത്തിയാക്കുന്ന കേന്ദ്രം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kerala State IT Mission (Akshaya)",
    source_url: "https://akshaya.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-citizen-eseva",
    name: "Citizen e-Seva Kendra & Common Service Centre",
    name_ml: "സിറ്റിസൺ ഇ-സേവാ കേന്ദ്രം & പൊതുജന സേവന കേന്ദ്രം",
    category: "facilities",
    facility_category: "akshaya",
    category_name: "Akshaya & Citizen Services",
    category_name_ml: "അക്ഷയ & സേവന കേന്ദ്രങ്ങൾ",
    ward_number: 8,
    ward_name: "Railway Station Ward",
    ward_name_ml: "റെയിൽവേ സ്റ്റേഷൻ വാർഡ്",
    locality: "Station Road",
    locality_ml: "സ്റ്റേഷൻ റോഡ്",
    address: "Railway Station Approach, Tanur - 676302",
    latitude: 10.9748,
    longitude: 75.8685,
    phone: "0494 2441506",
    opening_hours: "Monday to Saturday: 8:30 AM – 6:30 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 8:30 – വൈകിട്ട് 6:30",
    description: "CSC digital seva counter assisting railway ticketing, banking kiosk services, voter ID enrollment, and legal aid inquiries.",
    description_ml: "ഡിജിറ്റൽ സേവാ കേന്ദ്രം. വോട്ടർ തിരിച്ചറിയൽ കാർഡ്, ബാങ്കിംഗ് സേവനങ്ങൾ, പെൻഷൻ വെരിഫിക്കേഷൻ.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Common Service Centre (CSC) Scheme",
    source_url: "https://csc.gov.in/",
    last_verified_date: "2026-11-15"
  },

  // 5. WASTE & MCF DEPOTS (4)
  {
    id: "loc-mcf-central-hub",
    name: "Haritha Karma Sena Central Hub & Sorting Yard",
    name_ml: "ഹരിത കർമ്മസേന സെൻട്രൽ ഹബ്ബ് & തരംതിരിക്കൽ കേന്ദ്രം",
    category: "facilities",
    facility_category: "mcf",
    category_name: "Waste & MCF Depots",
    category_name_ml: "മാലിന്യ ശേഖരണ കേന്ദ്രങ്ങൾ",
    ward_number: 10,
    ward_name: "Puthentheru",
    ward_name_ml: "പുത്തൻതെരു",
    locality: "Municipal Yard",
    locality_ml: "മുനിസിപ്പൽ യാർഡ്",
    address: "Municipal Yard, Near Stadium, Tanur - 676302",
    latitude: 10.9775,
    longitude: 75.8685,
    phone: "0494 2440228",
    opening_hours: "Monday to Saturday: 8:00 AM – 5:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 8:00 – വൈകിട്ട് 5:00",
    description: "The primary non-biodegradable waste sorting and consolidation facility in Tanur Municipality, managed by Haritha Karma Sena with Clean Kerala Company integration.",
    description_ml: "താനൂർ നഗരസഭയിലെ 44 വാർഡുകളിൽ നിന്നുമുള്ള അജൈവ മാലിന്യങ്ങൾ തരംതിരിക്കുന്ന പ്രധാന സംഭരണ കേന്ദ്രം. ഹരിത കർമ്മസേന ഏകോപനം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Suchitwa Mission & Clean Kerala Company",
    source_url: "https://suchitwamission.com/",
    last_verified_date: "2026-11-15",
    featured: true
  },
  {
    id: "loc-mcf-plastic-baling",
    name: "Plastic Baling MCF (Ward 4 Coastal Depot)",
    name_ml: "പ്ലാസ്റ്റിക് ബെയ്‌ലിംഗ് എം.സി.എഫ് (ഹാർബർ ഡെപ്പോ)",
    category: "facilities",
    facility_category: "mcf",
    category_name: "Waste & MCF Depots",
    category_name_ml: "മാലിന്യ ശേഖരണ കേന്ദ്രങ്ങൾ",
    ward_number: 4,
    ward_name: "Harbour Central",
    ward_name_ml: "ഹാർബർ സെൻട്രൽ",
    locality: "Harbour Road",
    locality_ml: "ഹാർബർ റോഡ്",
    address: "Harbour Road, Ward 4, Tanur - 676302",
    latitude: 10.9708,
    longitude: 75.8545,
    phone: "0494 2440228",
    opening_hours: "Monday to Saturday: 8:30 AM – 4:30 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 8:30 – വൈകിട്ട് 4:30",
    description: "Material Collection Facility equipped with hydraulic baling press machine to compress dry plastic waste, thermocol, and marine plastic debris.",
    description_ml: "ഹൈഡ്രോളിക് ബെയ്‌ലിംഗ് മെഷീൻ സ്ഥാപിച്ച പ്ലാസ്റ്റിക് കംപ്രഷൻ കേന്ദ്രം. തീരദേശ വാർഡുകളിലെ പ്ലാസ്റ്റിക് മാലിന്യ സംസ്കരണം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Suchitwa Mission Kerala",
    source_url: "https://suchitwamission.com/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-mcf-chappappadi",
    name: "Mini-MCF Chappappadi (Ward 2 Waste Collection Post)",
    name_ml: "മിനി-എം.സി.എഫ് ചപ്പപ്പടി (വാർഡ് 2 കലക്ഷൻ പോസ്റ്റ്)",
    category: "facilities",
    facility_category: "mcf",
    category_name: "Waste & MCF Depots",
    category_name_ml: "മാലിന്യ ശേഖരണ കേന്ദ്രങ്ങൾ",
    ward_number: 2,
    ward_name: "Rayirimangalam West",
    ward_name_ml: "രായിരിമംഗലം വെസ്റ്റ്",
    locality: "Chappappadi",
    locality_ml: "ചപ്പപ്പടി",
    address: "Chappappadi, Tanur - 676302",
    latitude: 10.9745,
    longitude: 75.8610,
    phone: "0494 2440228",
    opening_hours: "Ward Collection Days: Monday & Thursday: 9:00 AM – 3:00 PM",
    opening_hours_ml: "ശേഖരണ ദിവസങ്ങൾ: തിങ്കൾ, വ്യാഴം: രാവിലെ 9:00 – 3:00",
    description: "Ward-level decentralized mini-collection facility for segregated clean dry plastics, paper, and electronic scrap before transfer to Central Hub.",
    description_ml: "വാർഡ് തലത്തിൽ വീടുകളിൽ നിന്ന് ശേഖരിക്കുന്ന വൃത്തിയുള്ള അജൈവ മാലിന്യങ്ങൾ സൂക്ഷിക്കുന്ന മിനി ശേഖരണ കേന്ദ്രം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Tanur Municipality Health & Sanitation Wing",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-mcf-clean-kerala",
    name: "Clean Kerala Company Resource Recovery Depot",
    name_ml: "ക്ലീൻ കേരള കമ്പനി റിസോഴ്സ് റിക്കവറി ഡെപ്പോ",
    category: "facilities",
    facility_category: "mcf",
    category_name: "Waste & MCF Depots",
    category_name_ml: "മാലിന്യ ശേഖരണ കേന്ദ്രങ്ങൾ",
    ward_number: 9,
    ward_name: "KSEB Ward",
    ward_name_ml: "കെ.എസ്.ഇ.ബി വാർഡ്",
    locality: "KSEB Road",
    locality_ml: "കെ.എസ്.ഇ.ബി റോഡ്",
    address: "Near KSEB Section, Tanur - 676302",
    latitude: 10.9765,
    longitude: 75.8695,
    phone: "0494 2440228",
    opening_hours: "Monday to Friday: 9:00 AM – 4:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ: രാവിലെ 9:00 – വൈകിട്ട് 4:00",
    description: "Shredded plastic transfer and bulk recycling consignment logistics depot operated in partnership with Clean Kerala Company Ltd.",
    description_ml: "റോഡ് ടാറിംഗിനായുള്ള പ്ലാസ്റ്റിക് തരികളാക്കലും സംസ്ഥാന റീസൈക്ലിംഗ് പ്ലാന്റുകളിലേക്ക് അയക്കലും ഏകോപിപ്പിക്കുന്ന കേന്ദ്രം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Clean Kerala Company Ltd",
    source_url: "https://cleankeralacompany.com/",
    last_verified_date: "2026-11-15"
  },

  // 6. EMERGENCY & SAFETY (5)
  {
    id: "loc-police-station",
    name: "Tanur Police Station",
    name_ml: "താനൂർ പോലീസ് സ്റ്റേഷൻ",
    category: "government",
    facility_category: "emergency",
    category_name: "Emergency & Safety",
    category_name_ml: "അടിയന്തര സേവനങ്ങൾ",
    ward_number: 8,
    ward_name: "Railway Station Ward",
    ward_name_ml: "റെയിൽവേ സ്റ്റേഷൻ വാർഡ്",
    locality: "Police Station Road",
    locality_ml: "പോലീസ് സ്റ്റേഷൻ റോഡ്",
    address: "Police Station Road, Tanur - 676302",
    latitude: 10.9752,
    longitude: 75.8660,
    phone: "0494 2440244",
    emergency_phone: "112 / 100",
    opening_hours: "24 Hours Active Emergency Service",
    opening_hours_ml: "24 മണിക്കൂറും പ്രവർത്തനസജ്ജം",
    description: "Law enforcement and public safety jurisdiction covering coastal Tanur and suburban wards with coastal patrolling fleet.",
    description_ml: "ക്രമസമാധാന പാലനം, തീരദേശ സുരക്ഷ, പൗരന്മാരുടെ അടിയന്തര സഹായം എന്നിവ ഉറപ്പുവരുത്തുന്ന പോലീസ് സ്റ്റേഷൻ.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kerala Police Department",
    source_url: "https://keralapolice.gov.in/",
    last_verified_date: "2026-11-15",
    featured: true
  },
  {
    id: "loc-fire-station",
    name: "Tanur Fire & Rescue Station",
    name_ml: "താനൂർ ഫയർ & റെസ്ക്യൂ സ്റ്റേഷൻ",
    category: "government",
    facility_category: "emergency",
    category_name: "Emergency & Safety",
    category_name_ml: "അടിയന്തര സേവനങ്ങൾ",
    ward_number: 9,
    ward_name: "KSEB Ward",
    ward_name_ml: "കെ.എസ്.ഇ.ബി വാർഡ്",
    locality: "Near KSEB",
    locality_ml: "കെ.എസ്.ഇ.ബി പരിസരം",
    address: "Near KSEB Electrical Section, Tanur - 676302",
    latitude: 10.9760,
    longitude: 75.8690,
    phone: "0494 2440101",
    emergency_phone: "101",
    opening_hours: "24 Hours Active Emergency Service",
    opening_hours_ml: "24 മണിക്കൂറും അടിയന്തര സേവനം",
    description: "Disaster management, coastal flood rescue, deep-water diving, and fire prevention emergency unit.",
    description_ml: "തീപിടുത്തം, പ്രകൃതിദുരന്തങ്ങൾ, തീരദേശ രക്ഷാപ്രവർത്തനങ്ങൾ എന്നിവയ്ക്കുള്ള അഗ്നിരക്ഷാ സേനാ വിഭാഗം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kerala Fire and Rescue Services",
    source_url: "https://fire.kerala.gov.in/",
    last_verified_date: "2026-11-15",
    featured: true
  },
  {
    id: "loc-kseb-office",
    name: "KSEB Electrical Section, Tanur",
    name_ml: "കെ.എസ്.ഇ.ബി ഇലക്ട്രിക്കൽ സെക്ഷൻ",
    category: "government",
    facility_category: "emergency",
    category_name: "Emergency & Safety",
    category_name_ml: "അടിയന്തര സേവനങ്ങൾ",
    ward_number: 9,
    ward_name: "KSEB Ward",
    ward_name_ml: "കെ.എസ്.ഇ.ബി വാർഡ്",
    locality: "KSEB Road",
    locality_ml: "കെ.എസ്.ഇ.ബി റോഡ്",
    address: "KSEB Road, Tanur - 676302",
    latitude: 10.9772,
    longitude: 75.8680,
    phone: "0494 2440280",
    emergency_phone: "1912",
    opening_hours: "24 Hours Fuse Call Centre; Cash Counter: 9:00 AM – 3:00 PM",
    opening_hours_ml: "24 മണിക്കൂറും ഫ്യൂസ് കോൾ സെന്റർ; ക്യാഷ് കൗണ്ടർ: 9:00 – 3:00",
    description: "Power distribution grid management, street light circuit maintenance, and 24/7 electrical emergency response.",
    description_ml: "വൈദ്യുതി വിതരണം, തകരാർ പരിഹരിക്കൽ, തെരുവ് വിളക്കുകളുടെ നിയന്ത്രണം, 24 മണിക്കൂർ ഫ്യൂസ് കോൾ സെന്റർ.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "KSEB Limited",
    source_url: "https://kseb.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-108-ambulance",
    name: "108 Emergency Ambulance Unit (Taluk Hospital Base)",
    name_ml: "108 അടിയന്തര ആംബുലൻസ് യൂണിറ്റ് (താലൂക്ക് ആശുപത്രി)",
    category: "health",
    facility_category: "emergency",
    category_name: "Emergency & Safety",
    category_name_ml: "അടിയന്തര സേവനങ്ങൾ",
    ward_number: 9,
    ward_name: "KSEB Ward",
    ward_name_ml: "കെ.എസ്.ഇ.ബി വാർഡ്",
    locality: "Hospital Road",
    locality_ml: "ഹോസ്പിറ്റൽ റോഡ്",
    address: "Taluk Hospital Campus, Tanur - 676302",
    latitude: 10.9782,
    longitude: 75.8652,
    phone: "108",
    emergency_phone: "108",
    opening_hours: "24 Hours Active Fleet Dispatch",
    opening_hours_ml: "24 മണിക്കൂറും ആംബുലൻസ് സേവനം",
    description: "Kerala Govt KANIV-108 emergency medical ambulance equipped with ALS life-support ventilators, defibrillators, and paramedics.",
    description_ml: "കനിവ്-108 അത്യാഹിത ആംബുലൻസ് സർവീസ്. വെന്റിലേറ്റർ, ഓക്സിജൻ സൗകര്യങ്ങളോടെ പരിശീലനം ലഭിച്ച പാരാമെഡിക്കൽ ജീവനക്കാർ.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kaniv 108 Ambulance Service Kerala",
    source_url: "https://dhs.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-coastal-police-outpost",
    name: "Tanur Coastal Police Outpost, Harbour Road",
    name_ml: "താനൂർ കോസ്റ്റൽ പോലീസ് ഔട്ട്പോസ്റ്റ്",
    category: "government",
    facility_category: "emergency",
    category_name: "Emergency & Safety",
    category_name_ml: "അടിയന്തര സേവനങ്ങൾ",
    ward_number: 4,
    ward_name: "Harbour Central",
    ward_name_ml: "ഹാർബർ സെൻട്രൽ",
    locality: "Harbour Road",
    locality_ml: "ഹാർബർ റോഡ്",
    address: "Harbour Entrance Road, Ward 4, Tanur - 676302",
    latitude: 10.9712,
    longitude: 75.8542,
    phone: "0494 2440245",
    emergency_phone: "1093 / 112",
    opening_hours: "24 Hours Coastal Security Vigilance",
    opening_hours_ml: "24 മണിക്കൂറും തീരദേശ നിരീക്ഷണം",
    description: "Specialized coastal law enforcement unit with high-speed patrol craft enforcing marine safety and disaster alert broadcast.",
    description_ml: "കടൽ സുരക്ഷ, മത്സ്യത്തൊഴിലാളികളുടെ രക്ഷാപ്രവർത്തനം, ഹൈസ്പീഡ് പട്രോളിംഗ് ബോട്ട് നിരീക്ഷണം എന്നിവ നടത്തുന്ന തീരദേശ പോലീസ് വിഭാഗം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kerala Coastal Police Wing",
    source_url: "https://keralapolice.gov.in/",
    last_verified_date: "2026-11-15"
  },

  // 7. CIVIC & COMMUNITY HALLS (12)
  {
    id: "loc-muni-office",
    name: "Tanur Municipality Office",
    name_ml: "താനൂർ നഗരസഭാ കാര്യാലയം",
    category: "government",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 10,
    ward_name: "Puthentheru",
    ward_name_ml: "പുത്തൻതെരു",
    locality: "Town Centre",
    locality_ml: "ടൗൺ സെന്റർ",
    address: "Main Road, Tanur, Malappuram - 676302",
    latitude: 10.9768,
    longitude: 75.8672,
    phone: "0494 2440228",
    website: "https://tanurmunicipality.lsgkerala.gov.in/",
    opening_hours: "Monday to Saturday: 10:00 AM – 5:00 PM (2nd Sat & Sun Holiday)",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 10:00 – വൈകിട്ട് 5:00 (രണ്ടാം ശനി, ഞായർ അവധി)",
    description: "The municipal civic headquarters of Tanur, providing citizen services, birth/death/marriage registrations, building permits, and town planning.",
    description_ml: "താനൂർ നഗരസഭാ ഭരണ സിരാകേന്ദ്രം. പൗരസേവനങ്ങൾ, ജനന-മരണ രജിസ്ട്രേഷൻ, കെട്ടിട നിർമ്മാണ അനുമതികൾ, വികസന പദ്ധതികൾ എന്നിവ ഏകോപിപ്പിക്കുന്നു.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Tanur Municipality Official Portal",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    last_verified_date: "2026-11-15",
    featured: true
  },
  {
    id: "loc-village-office",
    name: "Tanur Village Office",
    name_ml: "താനൂർ വില്ലേജ് ഓഫീസ്",
    category: "government",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 8,
    ward_name: "Railway Station Ward",
    ward_name_ml: "റെയിൽവേ സ്റ്റേഷൻ വാർഡ്",
    locality: "Station Road",
    locality_ml: "സ്റ്റേഷൻ റോഡ്",
    address: "Near Tanur Town, Tirur Taluk, Malappuram - 676302",
    latitude: 10.9750,
    longitude: 75.8690,
    phone: "0494 2441200",
    opening_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 10:00 – വൈകിട്ട് 5:00",
    description: "Tirur Taluk revenue village office for land tax collection, possession certificates, and revenue inquiries.",
    description_ml: "തിരൂർ താലൂക്ക് റവന്യൂ വില്ലേജ് ഓഫീസ്. ഭൂനികുതി, അവകാശ സർട്ടിഫിക്കറ്റുകൾ, ഭൂമി രജിസ്ട്രേഷൻ രേഖകൾ എന്നിവ ലഭ്യമാക്കുന്നു.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Revenue Department, Govt of Kerala",
    source_url: "https://revenue.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-mla-office",
    name: "Tanur MLA Constituency Office (P. K. Navas MLA)",
    name_ml: "താനൂർ എം.എൽ.എ കാര്യാലയം (പി. കെ. നവാസ്)",
    category: "government",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 8,
    ward_name: "Railway Station Ward",
    ward_name_ml: "റെയിൽവേ സ്റ്റേഷൻ വാർഡ്",
    locality: "Station Road",
    locality_ml: "സ്റ്റേഷൻ റോഡ്",
    address: "Railway Station Road, Tanur, Malappuram - 676302",
    latitude: 10.9745,
    longitude: 75.8670,
    phone: "0494 2582250",
    website: "/politics/pk-navas",
    opening_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 10:00 – വൈകിട്ട് 5:00",
    description: "Public representative office for constituency grievance redressal, SDF project coordination, and citizen petitions.",
    description_ml: "മണ്ഡലത്തിലെ ജനങ്ങളുടെ പരാതി പരിഹാരത്തിനും വികസന പ്രവർത്തന ഏകോപനത്തിനുമുള്ള ജനപ്രതിനിധി കാര്യാലയം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tanur_railway_station_-_panoramio.jpg",
    is_verified: true,
    source_name: "Kerala Niyamasabha Secretariat",
    source_url: "https://niyamasabha.nic.in/",
    last_verified_date: "2026-11-16",
    featured: true
  },
  {
    id: "loc-sub-post-office",
    name: "Tanur Sub Post Office (PIN: 676302)",
    name_ml: "താനൂർ സബ് പോസ്റ്റ് ഓഫീസ്",
    category: "government",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 10,
    ward_name: "Puthentheru",
    ward_name_ml: "പുത്തൻതെരു",
    locality: "Town Centre",
    locality_ml: "ടൗൺ സെന്റർ",
    address: "Main Road, Tanur, Malappuram - 676302",
    latitude: 10.9765,
    longitude: 75.8675,
    phone: "0494 2440260",
    website: "https://indiapost.gov.in/",
    opening_hours: "Monday to Saturday: 9:00 AM – 4:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 9:00 – വൈകിട്ട് 4:00",
    description: "Department of Posts India sub-office handling speed post, registered mail, postal savings bank, and citizen Aadhaar seeding.",
    description_ml: "ഇന്ത്യ പോസ്റ്റ് സബ് ഓഫീസ്. സ്പീഡ് പോസ്റ്റ്, സേവിംഗ്സ് ബാങ്ക്, മണി ഓർഡർ, തപാൽ സേവനങ്ങൾ.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Department of Posts, Govt of India",
    source_url: "https://indiapost.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-kwa-office",
    name: "Kerala Water Authority (KWA) Section Office",
    name_ml: "കേരള വാട്ടർ അതോറിറ്റി സെക്ഷൻ ഓഫീസ്",
    category: "government",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 9,
    ward_name: "KSEB Ward",
    ward_name_ml: "കെ.എസ്.ഇ.ബി വാർഡ്",
    locality: "Near Taluk Hospital",
    locality_ml: "താലൂക്ക് ആശുപത്രി പരിസരം",
    address: "Hospital Road, Tanur - 676302",
    latitude: 10.9778,
    longitude: 75.8660,
    phone: "0494 2440370",
    opening_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
    opening_hours_ml: "തിങ്കൾ മുതൽ ശനി വരെ: രാവിലെ 10:00 – വൈകിട്ട് 5:00",
    description: "Public drinking water supply distribution, Jal Jeevan Mission pipe connectivity, and water quality testing.",
    description_ml: "ശുദ്ധജല വിതരണം, ജൽ ജീവൻ മിഷൻ കണക്ഷനുകൾ, പൈപ്പ് ലൈൻ അറ്റകുറ്റപ്പണികൾ.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Kerala Water Authority",
    source_url: "https://kwa.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-stadium",
    name: "Tanur Municipal Floodlit Stadium & Sports Complex",
    name_ml: "താനൂർ മുനിസിപ്പൽ ഫ്ലഡ്‌ലിറ്റ് സ്റ്റേഡിയം",
    category: "facilities",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 10,
    ward_name: "Puthentheru",
    ward_name_ml: "പുത്തൻതെരു",
    locality: "Stadium Road",
    locality_ml: "സ്റ്റേഡിയം റോഡ്",
    address: "Stadium Road, Tanur - 676302",
    latitude: 10.9785,
    longitude: 75.8700,
    phone: "0494 2440228",
    opening_hours: "Morning: 5:30 AM – 9:00 AM; Evening: 4:00 PM – 9:30 PM",
    opening_hours_ml: "രാവിലെ: 5:30 – 9:00; വൈകിട്ട്: 4:00 – 9:30",
    description: "Municipal full-sized football stadium with high-mast floodlights, natural grass turf, synthetic running track, and community sports training.",
    description_ml: "ഫ്ലഡ്‌ലിറ്റ് സംവിധാനമുള്ള മുനിസിപ്പൽ ഫുട്ബോൾ സ്റ്റേഡിയം, അത്‌ലറ്റിക് ട്രാക്ക്, കായിക പരിശീലന കേന്ദ്രം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Tanur Municipality Standing Committee for Sports",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    last_verified_date: "2026-11-15",
    featured: true
  },
  {
    id: "loc-fish-veg-market",
    name: "Tanur Municipal Fish & Vegetable Market",
    name_ml: "താനൂർ മുനിസിപ്പൽ ഫിഷ് & വെജിറ്റബിൾ മാർക്കറ്റ്",
    category: "facilities",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 10,
    ward_name: "Puthentheru",
    ward_name_ml: "പുത്തൻതെരു",
    locality: "Market Road",
    locality_ml: "മാർക്കറ്റ് റോഡ്",
    address: "Market Road, Tanur Town - 676302",
    latitude: 10.9760,
    longitude: 75.8665,
    phone: "0494 2440228",
    opening_hours: "Daily: 6:00 AM – 8:00 PM",
    opening_hours_ml: "ദിവസവും: രാവിലെ 6:00 – രാത്രി 8:00",
    description: "Renovated public market facility with modern hygienic stalls, biological waste treatment plant, cold storage chambers, and parking.",
    description_ml: "നവീകരിച്ച മുനിസിപ്പൽ മാർക്കറ്റ്. ശുചിത്വമുള്ള മത്സ്യ-പച്ചക്കറി സ്റ്റാളുകൾ, മാലിന്യ സംസ്കരണ പ്ലാന്റ്.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Tanur Municipality Revenue Wing",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-town-community-hall",
    name: "Tanur Town Community Auditorium",
    name_ml: "താനൂർ ടൗൺ കമ്മ്യൂണിറ്റി ഓഡിറ്റോറിയം",
    category: "facilities",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 10,
    ward_name: "Puthentheru",
    ward_name_ml: "പുത്തൻതെരു",
    locality: "Near Bus Stand",
    locality_ml: "ബസ് സ്റ്റാൻഡ് പരിസരം",
    address: "Town Hall Road, Tanur - 676302",
    latitude: 10.9765,
    longitude: 75.8670,
    phone: "0494 2440228",
    opening_hours: "Event Bookings: 8:00 AM – 10:00 PM",
    opening_hours_ml: "ബുക്കിംഗുകൾ: രാവിലെ 8:00 – രാത്രി 10:00",
    description: "Subsidized public civic auditorium for municipal council meetings, public hearings, cultural programs, and weddings.",
    description_ml: "നഗരസഭാ കൗൺസിൽ പൊതുപരിപാടികൾ, സാംസ്കാരിക സമ്മേളനങ്ങൾ, പൗരയോഗങ്ങൾ എന്നിവയ്ക്കുള്ള ടൗൺ ഹാൾ.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Tanur Municipality Public Works Wing",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-railway-station",
    name: "Tanur Railway Station (Station Code: TA)",
    name_ml: "താനൂർ റെയിൽവേ സ്റ്റേഷൻ (കോഡ്: TA)",
    category: "transport",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 8,
    ward_name: "Railway Station Ward",
    ward_name_ml: "റെയിൽവേ സ്റ്റേഷൻ വാർഡ്",
    locality: "Station Road",
    locality_ml: "സ്റ്റേഷൻ റോഡ്",
    address: "Southern Railway, Tanur - 676302",
    latitude: 10.9738,
    longitude: 75.8705,
    phone: "0494 2440220",
    website: "https://indianrail.gov.in/",
    opening_hours: "24 Hours Passenger Transit & Ticket Reservation",
    opening_hours_ml: "24 മണിക്കൂറും ട്രെയിൻ സർവീസും ടിക്കറ്റ് കൗണ്ടറും",
    description: "Historic railway station on the Shoranur–Mangalore section serving express and passenger trains connecting Tanur to Malabar and southern Kerala.",
    description_ml: "ഷൊർണ്ണൂർ-മംഗലാപുരം റെയിൽവേ പാതയിലെ ചരിത്രപ്രസിദ്ധമായ സ്റ്റേഷൻ. എക്സ്പ്രസ്, പാസഞ്ചർ ട്രെയിനുകൾക്ക് സ്റ്റോപ്പ്.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tanur_railway_station_-_panoramio.jpg",
    is_verified: true,
    source_name: "Southern Railway Palakkad Division",
    source_url: "https://sr.indianrailways.gov.in/",
    last_verified_date: "2026-11-15",
    featured: true
  },
  {
    id: "loc-bus-stand",
    name: "Tanur Municipal Bus Stand & KSRTC Operating Centre",
    name_ml: "താനൂർ മുനിസിപ്പൽ ബസ് സ്റ്റാൻഡ് & കെ.എസ്.ആർ.ടി.സി സെന്റർ",
    category: "transport",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 8,
    ward_name: "Railway Station Ward",
    ward_name_ml: "റെയിൽവേ സ്റ്റേഷൻ വാർഡ്",
    locality: "Town Centre",
    locality_ml: "ടൗൺ സെന്റർ",
    address: "Bus Stand Road, Tanur - 676302",
    latitude: 10.9758,
    longitude: 75.8675,
    phone: "0494 2440228",
    opening_hours: "Daily: 5:00 AM – 10:30 PM",
    opening_hours_ml: "ദിവസവും: രാവിലെ 5:00 – രാത്രി 10:30",
    description: "Central bus terminal operating local, private, and KSRTC bus routes to Tirur, Parappanangadi, Kozhikode, and Malappuram.",
    description_ml: "തിരൂർ, പരപ്പനങ്ങാടി, കോഴിക്കോട്, മലപ്പുറം ഭാഗങ്ങളിലേക്കുള്ള സ്വകാര്യ-കെ.എസ്.ആർ.ടി.സി ബസുകളുടെ കേന്ദ്ര സ്റ്റാൻഡ്.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Motor Vehicles Department Kerala",
    source_url: "https://mvd.kerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-harbour-auto-stand",
    name: "Tanur Harbour Auto-Taxi Stand",
    name_ml: "താനൂർ ഹാർബർ ഓട്ടോ-ടാക്സി സ്റ്റാൻഡ്",
    category: "transport",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 4,
    ward_name: "Harbour Central",
    ward_name_ml: "ഹാർബർ സെൻട്രൽ",
    locality: "Harbour Gate",
    locality_ml: "ഹാർബർ ഗേറ്റ്",
    address: "Harbour Gate Junction, Tanur - 676302",
    latitude: 10.9715,
    longitude: 75.8555,
    phone: "0494 2440228",
    opening_hours: "24 Hours Service for Coastal Passengers",
    opening_hours_ml: "24 മണിക്കൂറും തീരദേശ യാത്രക്കാർക്കായി സർവീസ്",
    description: "Registered municipal auto-rickshaw and pickup transit stand catering to harbour visitors, merchants, and local residents.",
    description_ml: "ഹാർബർ സന്ദർശകർക്കും മത്സ്യവ്യാപാരികൾക്കും തീരദേശവാസികൾക്കുമായുള്ള അംഗീകൃത ഓട്ടോ-ടാക്സി സ്റ്റാൻഡ്.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Tanur Municipality Traffic Advisory Committee",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    last_verified_date: "2026-11-15"
  },
  {
    id: "loc-civic-auditorium",
    name: "Tanur Municipal Town Auditorium & Cultural Hall",
    name_ml: "താനൂർ മുനിസിപ്പൽ ടൗൺ ഓഡിറ്റോറിയം & സാംസ്കാരിക നിലയം",
    category: "facilities",
    facility_category: "civic",
    category_name: "Civic & Community Halls",
    category_name_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ",
    ward_number: 10,
    ward_name: "Puthentheru",
    ward_name_ml: "പുത്തൻതെരു",
    locality: "Town Centre",
    locality_ml: "ടൗൺ സെന്റർ",
    address: "Civic Centre, Puthentheru, Tanur - 676302",
    latitude: 10.9769,
    longitude: 75.8678,
    phone: "0494 2440228",
    opening_hours: "Booking Office: 10:00 AM – 4:00 PM",
    opening_hours_ml: "ബുക്കിംഗ് സമയം: രാവിലെ 10:00 – വൈകിട്ട് 4:00",
    description: "Multipurpose air-conditioned civic auditorium hosting municipal conventions, academic conferences, arts festivals, and civic assemblies.",
    description_ml: "നഗരസഭാ സമ്മേളനങ്ങൾ, പൗരയോഗങ്ങൾ, സാംസ്കാരിക പരിപാടികൾ എന്നിവ നടത്തുന്ന എയർകണ്ടീഷൻ ചെയ്ത മുനിസിപ്പൽ ഓഡിറ്റോറിയം.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    is_verified: true,
    source_name: "Tanur Municipality General Administration Wing",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    last_verified_date: "2026-11-15"
  }
];;

// -------------------------------------------------------------
// 5. AUTHENTIC LOCALITY PROFILES (LOCALITY EXPLORER)
// -------------------------------------------------------------
export const TANUR_LOCALITIES: LocalityItem[] = [
  {
    id: "loc-profile-town",
    name: "Tanur Town Centre",
    name_ml: "താനൂർ ടൗൺ",
    ward_numbers: [8, 9, 10],
    tagline: "Administrative, civic, and retail hub of the municipality",
    tagline_ml: "നഗരസഭയുടെ ഭരണപരവും വാണിജ്യപരവുമായ സിരാകേന്ദ്രം",
    description: "The vibrant heart of Tanur, encompassing the historic 1861 Railway Station, Municipality Office, Police Station, Sub Post Office, and the central retail markets.",
    description_ml: "താനൂരിന്റെ ഹൃദയഭാഗം. 1861-ലെ പൈതൃക റെയിൽവേ സ്റ്റേഷൻ, നഗരസഭാ കാര്യാലയം, പോലീസ് സ്റ്റേഷൻ, പോസ്റ്റ് ഓഫീസ്, പ്രധാന വ്യാപാര മാർക്കറ്റുകൾ എന്നിവ ഇവിടെ കേന്ദ്രീകരിച്ചിരിക്കുന്നു.",
    latitude: 10.9768,
    longitude: 75.8672,
    landmarks: ["Tanur Municipality Office", "Tanur Railway Station", "Valiya Kulangara Juma Masjid", "Sub Post Office"],
    landmarks_ml: ["നഗരസഭാ കാര്യാലയം", "റെയിൽവേ സ്റ്റേഷൻ", "വലിയ കുളങ്ങര പള്ളി", "സബ് പോസ്റ്റ് ഓഫീസ്"],
    nearby_facilities: ["Town Market", "Municipal Stadium", "Community Health Centre", "Bus Stand"],
    nearby_facilities_ml: ["ടൗൺ മാർക്കറ്റ്", "മുൻസിപ്പൽ സ്റ്റേഡിയം", "താലൂക്ക് ആശുപത്രി", "ബസ് സ്റ്റാൻഡ്"],
    services_available: ["Municipal Registrations", "Train Ticketing", "Banking & Postal", "Retail & Wholesale Market"],
    services_available_ml: ["നഗരസഭാ സർട്ടിഫിക്കറ്റുകൾ", "റെയിൽവേ ടിക്കറ്റിംഗ്", "ബാങ്കിംഗ് സേവനങ്ങൾ", "മാർക്കറ്റ് വ്യാപാരം"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tanur_railway_station_-_panoramio.jpg",
  },
  {
    id: "loc-profile-harbour",
    name: "Harbour & Pulimuttu Zone",
    name_ml: "ഹാർബറും പുലിമുട്ടും",
    ward_numbers: [1],
    tagline: "Premier marine fisheries harbour and scenic breakwater promenade",
    tagline_ml: "പ്രധാന മത്സ്യബന്ധന തുറമുഖവും കടലിലേക്ക് നീളുന്ന പുലിമുട്ടും",
    description: "The primary marine economic zone of Tanur, providing anchorage for hundreds of fishing craft, auction halls, modern ice plants, and a 1.2 km breakwater walkway.",
    description_ml: "നൂറുകണക്കിന് ബോട്ടുകൾക്ക് സുരക്ഷിത താവളമൊരുക്കുന്ന മത്സ്യബന്ധന തുറമുഖം. പുലിമുട്ട് നടപ്പാതയും ഐസ് പ്ലാന്റുകളും ലേലപ്പുരകളും ഇവിടെ സ്ഥിതിചെയ്യുന്നു.",
    latitude: 10.9802,
    longitude: 75.8541,
    landmarks: ["Tanur Fishing Harbour", "Granite Pulimuttu Walkway", "Fisheries Technical High School", "Auction Terminal"],
    landmarks_ml: ["താനൂർ ഫിഷിംഗ് ഹാർബർ", "കരിങ്കൽ പുലിമുട്ട്", "ഫിഷറീസ് ടെക്നിക്കൽ സ്കൂൾ", "മത്സ്യ ലേലപ്പുര"],
    nearby_facilities: ["Cold Storages", "Boat Repair Yards", "Net Mending Sheds", "Auto-Taxi Stand"],
    nearby_facilities_ml: ["ശീതീകരണ ശാലകൾ", "ബോട്ട് അറ്റകുറ്റപ്പണി കേന്ദ്രം", "വല നന്നാക്കൽ ഷെഡ്ഡ്", "ടാക്സി സ്റ്റാൻഡ്"],
    services_available: ["Marine Fisheries Trading", "Ice Supply", "Boat Servicing", "Evening Promenade Tourism"],
    services_available_ml: ["മത്സ്യ ലേലം", "ഐസ് വിതരണം", "ബോട്ട് എൻജിൻ സർവീസിംഗ്", "സായാഹ്ന വിനോദസഞ്ചാരം"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg",
  },
  {
    id: "loc-profile-coastal",
    name: "Chappappadi & Coastal Shore",
    name_ml: "ചപ്പപ്പടിയും തീരദേശവും",
    ward_numbers: [2, 3, 4],
    tagline: "Vibrant traditional fishing community and golden sunset beaches",
    tagline_ml: "പരമ്പരാഗത മത്സ്യത്തൊഴിലാളി ഗ്രാമവും സൂര്യാസ്തമയ ബീച്ചും",
    description: "The historical shoreline settlement of Tanur featuring traditional canoes, the Urban Primary Health Centre, coastal sea-wall protections, and coconut groves.",
    description_ml: "പരമ്പരാഗത കടൽത്തൊഴിലും നാടൻ വള്ളങ്ങളും കടലോര ഭംഗിയും നിറഞ്ഞ തീരദേശ പ്രദേശം. അർബൻ പ്രൈമറി ഹെൽത്ത് സെന്റർ ഇവിടെ സ്ഥിതിചെയ്യുന്നു.",
    latitude: 10.9745,
    longitude: 75.8562,
    landmarks: ["Tanur Beach", "Chappappadi Juma Masjid", "Coastal Sea Wall", "Beach Landing Craft"],
    landmarks_ml: ["താനൂർ ബീച്ച്", "ചപ്പപ്പടി ജുമാ മസ്ജിദ്", "കടൽഭിത്തി", "നാടൻ വള്ളക്കടവ്"],
    nearby_facilities: ["Urban Primary Health Centre", "Govt LP School", "Boat Fiber Workshop"],
    nearby_facilities_ml: ["നഗര പ്രാഥമികാരോഗ്യ കേന്ദ്രം", "ഗവ. എൽ.പി സ്കൂൾ", "ഫൈബർ ബോട്ട് വർക്ക്‌ഷോപ്പ്"],
    services_available: ["Primary Healthcare", "Traditional Fish Landing", "Coastal Tourism"],
    services_available_ml: ["പ്രാഥമികാരോഗ്യം", "നാടൻ മീൻപിടിത്തം", "ബീച്ച് ടൂറിസം"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Tanur_beach%2C_Malappuram_%289%29.jpg",
  },
  {
    id: "loc-profile-ottumpuram",
    name: "Ottumpuram & Thooval Theeram",
    name_ml: "ഒട്ടുംപുറം & തൂവൽതീരം",
    ward_numbers: [5, 6],
    tagline: "Poorappuzha river estuary, tranquil mangroves, and eco-coastal strip",
    tagline_ml: "പൂരപ്പുഴ അഴിമുഖവും ശാന്തമായ കണ്ടൽക്കാടുകളും",
    description: "Located at the northern fringe of Tanur where the Poorappuzha River discharges into the Arabian Sea, featuring lush mangroves, river delta sandbanks, and casuarina trees.",
    description_ml: "പൂരപ്പുഴ കായൽ അറബിക്കടലിലേക്ക് ചേരുന്ന അഴിമുഖ പ്രദേശം. ശാന്തമായ തീരവും പച്ചപ്പ് നിറഞ്ഞ കണ്ടൽ വനങ്ങളും പ്രകൃതിഭംഗിയും.",
    latitude: 10.9912,
    longitude: 75.8498,
    landmarks: ["Thooval Theeram Estuary", "Ottumpuram Beach", "Poorappuzha Mangrove Belt"],
    landmarks_ml: ["തൂവൽതീരം അഴിമുഖം", "ഒട്ടുംപുറം ബീച്ച്", "കണ്ടൽക്കാടുകൾ"],
    nearby_facilities: ["Coastal Road Connecting Parappanangadi", "Fisheries Monitoring Post"],
    nearby_facilities_ml: ["പരപ്പനങ്ങാടി തീരദേശ പാത", "ഫിഷറീസ് നിരീക്ഷണ പോസ്റ്റ്"],
    services_available: ["Eco-Walkway", "Estuary Sightseeing", "Marine Conservation Area"],
    services_available_ml: ["ഇക്കോ നടപ്പാത", "അഴിമുഖ കാഴ്ചകൾ", "പരിസ്ഥിതി സംരക്ഷണ മേഖല"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Tanur_beach%2C_Malappuram_%284%29.jpg",
  },
  {
    id: "loc-profile-puthentheru",
    name: "Puthentheru Market Corridor",
    name_ml: "പുത്തൻതെരു",
    ward_numbers: [10],
    tagline: "Commercial marketplace, retail bazaars, and municipal sports stadium",
    tagline_ml: "വ്യാപാര വാണിജ്യ കേന്ദ്രവും നഗരസഭ സ്റ്റേഡിയവും",
    description: "Thriving commercial locality hosting textile bazaars, retail shops, the Municipal Stadium, and the Town Community Hall.",
    description_ml: "ടെക്സ്റ്റൈൽസ്, ഗൃഹോപകരണങ്ങൾ, സ്റ്റേഡിയം, കമ്മ്യൂണിറ്റി ഹാൾ എന്നിവ സ്ഥിതിചെയ്യുന്ന പ്രധാന വാണിജ്യ പ്രദേശം.",
    latitude: 10.9740,
    longitude: 75.8650,
    landmarks: ["Puthentheru Market", "Municipal Floodlit Stadium", "Town Community Hall", "Homeo Dispensary"],
    landmarks_ml: ["പുത്തൻതെരു മാർക്കറ്റ്", "മുൻസിപ്പൽ ഫ്ലഡ്‌ലൈറ്റ് സ്റ്റേഡിയം", "കമ്മ്യൂണിറ്റി ഹാൾ", "ഹോമിയോ ഡിസ്പെൻസറി"],
    nearby_facilities: ["Sports Pavilion", "Auditorium", "Retail Stores"],
    nearby_facilities_ml: ["കായിക പവിലിയൻ", "ഓഡിറ്റോറിയം", "റീട്ടെയിൽ വ്യാപാര ശാലകൾ"],
    services_available: ["Sports Coaching", "Retail Shopping", "Event Hosting"],
    services_available_ml: ["കായിക പരിശീലനം", "വ്യാപാര വിപണനം", "സാംസ്കാരിക ഒത്തുചേരൽ"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
  },
  {
    id: "loc-profile-keraladeshapuram",
    name: "Keraladeshapuram Spiritual & Heritage Belt",
    name_ml: "കേരളാദിത്യപുരം",
    ward_numbers: [13, 14],
    tagline: "Millennium-old temple heritage and premier public higher secondary education",
    tagline_ml: "സഹസ്രാബ്ദങ്ങളുടെ ക്ഷേത്ര പൈതൃകവും പ്രശസ്തമായ വിദ്യാഭ്യാസ സ്ഥാപനങ്ങളും",
    description: "Historic locality home to the ancient Keraladeshapuram Sree Krishna Temple and the landmark Devadhar Govt Higher Secondary School.",
    description_ml: "കേരളത്തിലെ ഏറ്റവും പുരാതനമായ മഹാവിഷ്ണു ക്ഷേത്രവും പ്രശസ്തമായ ദേവധാർ ഗവ. ഹയർ സെക്കൻഡറി സ്കൂളും സ്ഥിതിചെയ്യുന്ന പൈതൃക പ്രദേശം.",
    latitude: 10.9650,
    longitude: 75.8740,
    landmarks: ["Keraladeshapuram Sree Krishna Temple", "Devadhar Govt HSS", "Temple Pond"],
    landmarks_ml: ["കേരളാദിത്യപുരം ശ്രീകൃഷ്ണ ക്ഷേത്രം", "ദേവധാർ ഗവ. എച്ച്.എസ്.എസ്", "ക്ഷേത്രക്കുളം"],
    nearby_facilities: ["High School & VHSE", "Temple Auditorium", "Residential Colony"],
    nearby_facilities_ml: ["ഹയർ സെക്കൻഡറി സ്കൂൾ", "ക്ഷേത്ര ഓഡിറ്റോറിയം", "റെസിഡൻഷ്യൽ മേഖല"],
    services_available: ["Higher Secondary Education", "Heritage Tourism", "Cultural Festivals"],
    services_available_ml: ["ഹയർ സെക്കൻഡറി വിദ്യാഭ്യാസം", "പൈതൃക തീർത്ഥാടനം", "ഉത്സവങ്ങൾ"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg",
  },
  {
    id: "loc-profile-shobhaparambu",
    name: "Shobha Parambu & Kattilangadi",
    name_ml: "ശോഭാപറമ്പ് & കാട്ടിലങ്ങാടി",
    ward_numbers: [16, 22],
    tagline: "Celebrated Thalappoli festival centre and Govt Arts & Science College",
    tagline_ml: "പ്രസിദ്ധമായ താലപ്പൊലി ഉത്സവവും ഗവ. ആർട്സ് & സയൻസ് കോളേജും",
    description: "Prominent cultural and collegiate belt featuring the Sree Kurumba Bhagavathi Temple and the Govt Arts & Science College.",
    description_ml: "ശോഭാപറമ്പ് ഭഗവതി ക്ഷേത്രവും താനൂർ ഗവ. ആർട്സ് & സയൻസ് കോളേജും സ്ഥിതിചെയ്യുന്ന പ്രമുഖ സാംസ്കാരിക-വിദ്യാഭ്യാസ പ്രദേശം.",
    latitude: 10.9835,
    longitude: 75.8742,
    landmarks: ["Shobha Parambu Bhagavathi Temple", "Govt Arts & Science College Tanur"],
    landmarks_ml: ["ശോഭാപറമ്പ് ഭഗവതി ക്ഷേത്രം", "ഗവ. ആർട്സ് & സയൻസ് കോളേജ്"],
    nearby_facilities: ["College Campus", "Auditorium", "Village Roads"],
    nearby_facilities_ml: ["കോളേജ് കാമ്പസ്", "ഓഡിറ്റോറിയം", "ഗ്രാമീണ പാതകൾ"],
    services_available: ["Undergraduate Degree Education", "Temple Percussion & Thalappoli"],
    services_available_ml: ["ബിരുദ വിദ്യാഭ്യാസം", "മേളപ്പെരുക്കവും താലപ്പൊലിയും"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
  },
  {
    id: "loc-profile-rayirimangalam",
    name: "Rayirimangalam",
    name_ml: "രായിരിമംഗലം",
    ward_numbers: [1, 7],
    tagline: "Administrative residential junction and arterial link to the coastal highway",
    tagline_ml: "തീരദേശ ഹൈവേയുമായി ബന്ധിപ്പിക്കുന്ന പ്രധാന പാർപ്പിട-ഗതാഗത കേന്ദ്രം",
    description: "Key locality connecting the eastern railway belt with the coastal highway, home to the PWD Rest House and stadium approach road.",
    description_ml: "റെയിൽവേ സ്റ്റേഷൻ റോഡിനെയും തീരദേശ ഹൈവേയെയും ബന്ധിപ്പിക്കുന്ന പ്രധാന പ്രദേശം. പി.ഡബ്ല്യു.ഡി റെസ്റ്റ് ഹൗസ് റോഡ് ഇതിലൂടെ കടന്നുപോകുന്നു.",
    latitude: 10.9790,
    longitude: 75.8620,
    landmarks: ["Rayirimangalam Junction", "PWD Rest House Road", "Stadium Cross Road"],
    landmarks_ml: ["രായിരിമംഗലം ജംഗ്ഷൻ", "പി.ഡബ്ല്യു.ഡി റെസ്റ്റ് ഹൗസ് റോഡ്", "സ്റ്റേഡിയം ലിങ്ക് റോഡ്"],
    nearby_facilities: ["Primary Schools", "Residential Clinics", "Auto Stand"],
    nearby_facilities_ml: ["പ്രൈമറി സ്കൂളുകൾ", "ക്ലിനിക്കുകൾ", "ഓട്ടോ സ്റ്റാൻഡ്"],
    services_available: ["Local Transit Hub", "Residential Conveniences"],
    services_available_ml: ["ഗതാഗത ജംഗ്ഷൻ", "പാർപ്പിട സൗകര്യങ്ങൾ"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
  },
];

// -------------------------------------------------------------
// 6. CENTRAL DIGITAL MUNICIPALITY SINGLETON STORE
// -------------------------------------------------------------
class DigitalMunicipalityStore {
  private wards: MunicipalWard[] = [...TANUR_MUNICIPAL_WARDS];
  private projects: DevelopmentProject[] = [...INITIAL_DEVELOPMENT_PROJECTS];
  private proposals: CitizenProposal[] = [...INITIAL_CITIZEN_PROPOSALS];
  private locations: DigitalTanurLocation[] = [...TANUR_GIS_LOCATIONS];
  private localities: LocalityItem[] = [...TANUR_LOCALITIES];
  private contributions: ProjectContribution[] = [...INITIAL_PROJECT_CONTRIBUTIONS];
  private auditLogs: ProjectAuditLog[] = [...INITIAL_PROJECT_AUDIT_LOGS];

  // ---------------- Locations & GIS ----------------
  getLocations(filter?: {
    category?: LocationCategoryKey | "all";
    facilityCategory?: FacilityCategoryKey | "all";
    wardNumber?: number;
    search?: string;
    verifiedOnly?: boolean;
    featuredOnly?: boolean;
  }): DigitalTanurLocation[] {
    let res = [...this.locations];

    if (filter?.category && filter.category !== "all") {
      res = res.filter(l => l.category === filter.category);
    }

    if (filter?.facilityCategory && filter.facilityCategory !== "all") {
      res = res.filter(l => l.facility_category === filter.facilityCategory);
    }

    if (filter?.wardNumber !== undefined && filter.wardNumber > 0) {
      res = res.filter(l => l.ward_number === filter.wardNumber);
    }

    if (filter?.verifiedOnly) {
      res = res.filter(l => l.is_verified);
    }

    if (filter?.featuredOnly) {
      res = res.filter(l => l.featured);
    }

    if (filter?.search && filter.search.trim()) {
      const q = filter.search.toLowerCase();
      res = res.filter(l => 
        l.name.toLowerCase().includes(q) ||
        l.name_ml.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.description_ml.toLowerCase().includes(q) ||
        l.locality.toLowerCase().includes(q) ||
        l.locality_ml.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        l.category_name.toLowerCase().includes(q) ||
        l.category_name_ml.toLowerCase().includes(q)
      );
    }

    return res;
  }

  getLocationById(id: string): DigitalTanurLocation | null {
    const loc = this.locations.find(l => l.id === id);
    return loc ? { ...loc } : null;
  }

  addLocation(locData: Omit<DigitalTanurLocation, "id">): DigitalTanurLocation {
    const newLoc: DigitalTanurLocation = {
      ...locData,
      id: "loc-" + Date.now(),
    };
    this.locations.unshift(newLoc);
    return newLoc;
  }

  updateLocation(id: string, updates: Partial<DigitalTanurLocation>): boolean {
    const loc = this.locations.find(l => l.id === id);
    if (!loc) return false;
    Object.assign(loc, updates);
    return true;
  }

  verifyLocation(id: string, verified: boolean = true, sourceName?: string, sourceUrl?: string): boolean {
    const loc = this.locations.find(l => l.id === id);
    if (!loc) return false;
    loc.is_verified = verified;
    if (sourceName) loc.source_name = sourceName;
    if (sourceUrl) loc.source_url = sourceUrl;
    loc.last_verified_date = new Date().toISOString().split("T")[0];
    return true;
  }

  // ---------------- Localities ----------------
  getLocalities(search?: string): LocalityItem[] {
    let res = [...this.localities];
    if (search && search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(loc => 
        loc.name.toLowerCase().includes(q) ||
        loc.name_ml.toLowerCase().includes(q) ||
        loc.description.toLowerCase().includes(q) ||
        loc.description_ml.toLowerCase().includes(q) ||
        loc.landmarks.some(l => l.toLowerCase().includes(q)) ||
        loc.landmarks_ml.some(l => l.toLowerCase().includes(q))
      );
    }
    return res;
  }

  getLocalityById(id: string): LocalityItem | null {
    const loc = this.localities.find(l => l.id === id);
    return loc ? { ...loc } : null;
  }

  // ---------------- Wards ----------------
  getWards(municipalityId = "40000000-0000-0000-0000-000000000007"): MunicipalWard[] {
    return this.wards.filter(w => w.municipality_id === municipalityId).sort((a, b) => a.ward_number - b.ward_number);
  }

  getWardByNumber(wardNumber: number, municipalityId = "40000000-0000-0000-0000-000000000007"): MunicipalWard | null {
    return this.wards.find(w => w.ward_number === wardNumber && w.municipality_id === municipalityId) || null;
  }

  // ---------------- Development Projects ----------------
  getProjects(filter?: {
    category?: ProjectCategory | "all";
    status?: ProjectStatus | "all";
    wardNumber?: number;
    locality?: string;
    search?: string;
    sortBy?: "recent_update" | "budget" | "progress";
    includeArchived?: boolean;
  }): DevelopmentProject[] {
    let res = this.projects.filter(p => filter?.includeArchived ? true : !p.is_archived);

    if (filter?.category && filter.category !== "all") {
      const target = filter.category;
      res = res.filter(p => {
        if (p.category === target) return true;
        const catObj = TRANSPARENT_PROJECT_CATEGORIES.find(c => c.key === target);
        if (catObj && 'legacy_keys' in catObj && Array.isArray((catObj as any).legacy_keys)) {
          if ((catObj as any).legacy_keys.includes(p.category)) return true;
        }
        return false;
      });
    }

    if (filter?.status && filter.status !== "all") {
      res = res.filter(p => p.status === filter.status);
    }

    if (filter?.wardNumber !== undefined && filter.wardNumber > 0) {
      res = res.filter(p => p.ward_number === filter.wardNumber);
    }

    if (filter?.locality && filter.locality !== "all") {
      res = res.filter(p => 
        (p.locality && p.locality.toLowerCase().includes(filter.locality!.toLowerCase())) ||
        (p.locality_ml && p.locality_ml.toLowerCase().includes(filter.locality!.toLowerCase()))
      );
    }

    if (filter?.search && filter.search.trim()) {
      const q = filter.search.toLowerCase();
      res = res.filter(p => 
        p.title.toLowerCase().includes(q) ||
        (p.title_ml && p.title_ml.toLowerCase().includes(q)) ||
        p.department.toLowerCase().includes(q) ||
        (p.department_ml && p.department_ml.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        (p.description_ml && p.description_ml.toLowerCase().includes(q)) ||
        (p.locality && p.locality.toLowerCase().includes(q)) ||
        (p.locality_ml && p.locality_ml.toLowerCase().includes(q)) ||
        (p.official_source_name && p.official_source_name.toLowerCase().includes(q))
      );
    }

    if (filter?.sortBy === "progress") {
      return res.sort((a, b) => (b.progress_percentage ?? 0) - (a.progress_percentage ?? 0));
    }

    return res.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  }

  getProjectById(id: string): DevelopmentProject | null {
    const proj = this.projects.find(p => p.id === id);
    return proj ? { ...proj } : null;
  }

  getProjectStats() {
    const active = this.projects.filter(p => !p.is_archived);
    const byCategory: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    const byLocality: Record<string, number> = {};
    const byWard: Record<number, number> = {};

    active.forEach(p => {
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
      byStatus[p.status] = (byStatus[p.status] || 0) + 1;
      if (p.locality) {
        byLocality[p.locality] = (byLocality[p.locality] || 0) + 1;
      }
      if (p.ward_number) {
        byWard[p.ward_number] = (byWard[p.ward_number] || 0) + 1;
      }
    });

    return {
      total: active.length,
      proposed: active.filter(p => p.status === "Proposed").length,
      announced: active.filter(p => p.status === "Announced").length,
      approved: active.filter(p => p.status === "Approved").length,
      planned: active.filter(p => p.status === "Planned").length,
      in_progress: active.filter(p => p.status === "In Progress").length,
      completed: active.filter(p => p.status === "Completed").length,
      delayed: active.filter(p => p.status === "Delayed").length,
      on_hold: active.filter(p => p.status === "On Hold").length,
      cancelled: active.filter(p => p.status === "Cancelled").length,
      verified: active.filter(p => p.is_verified).length,
      total_budget_cr: "₹108.85 Cr",
      byCategory,
      byStatus,
      byLocality,
      byWard,
      pendingContributionsCount: this.contributions.filter(c => c.status === "pending").length,
    };
  }

  addProject(projectData: Omit<DevelopmentProject, "id" | "created_at" | "updated_at">): DevelopmentProject {
    const newProject: DevelopmentProject = {
      ...projectData,
      id: "proj-" + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.projects.unshift(newProject);
    this.addProjectAuditLog({
      project_id: newProject.id,
      action: "created",
      actor_name: "Admin",
      actor_role: "Administrator",
      note: `Project created: ${newProject.title}`,
    });
    return newProject;
  }

  updateProject(id: string, updates: Partial<DevelopmentProject>, actorName: string = "Admin"): boolean {
    const proj = this.projects.find(p => p.id === id);
    if (!proj) return false;
    const oldStatus = proj.status;
    Object.assign(proj, updates);
    proj.updated_at = new Date().toISOString();

    if (updates.status && updates.status !== oldStatus) {
      this.addProjectAuditLog({
        project_id: id,
        action: "status_changed",
        actor_name: actorName,
        actor_role: "Administrator",
        previous_value: oldStatus,
        new_value: updates.status,
        note: `Status changed from ${oldStatus} to ${updates.status}`,
      });
    } else {
      this.addProjectAuditLog({
        project_id: id,
        action: "updated",
        actor_name: actorName,
        actor_role: "Administrator",
        note: `Project details updated`,
      });
    }

    return true;
  }

  deleteProject(id: string): boolean {
    const idx = this.projects.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.projects.splice(idx, 1);
    this.addProjectAuditLog({
      project_id: id,
      action: "archived",
      actor_name: "Admin",
      actor_role: "Administrator",
      note: "Project deleted from active register",
    });
    return true;
  }

  archiveProject(id: string): boolean {
    const proj = this.projects.find(p => p.id === id);
    if (!proj) return false;
    proj.is_archived = true;
    proj.updated_at = new Date().toISOString();
    this.addProjectAuditLog({
      project_id: id,
      action: "archived",
      actor_name: "Admin",
      actor_role: "Administrator",
      note: "Project archived",
    });
    return true;
  }

  addProjectProgressUpdate(projectId: string, updateData: Omit<DevelopmentProgressUpdate, "id" | "project_id" | "created_at">): boolean {
    const proj = this.projects.find(p => p.id === projectId);
    if (!proj) return false;

    const newUpdate: DevelopmentProgressUpdate = {
      ...updateData,
      id: "upd-" + Date.now(),
      project_id: projectId,
      created_at: new Date().toISOString(),
    };

    proj.progress_updates.unshift(newUpdate);
    proj.updated_at = new Date().toISOString();

    this.addProjectAuditLog({
      project_id: projectId,
      action: "milestone_added",
      actor_name: updateData.verified_by || "Field Authority",
      actor_role: "Verifying Authority",
      note: `Progress milestone added: ${updateData.title}`,
    });

    return true;
  }

  // ---------------- Public Contributions ----------------
  getProjectContributions(filter?: {
    projectId?: string;
    status?: ContributionStatus | "all";
    type?: ContributionType | "all";
  }): ProjectContribution[] {
    let res = [...this.contributions];
    if (filter?.projectId) {
      res = res.filter(c => c.project_id === filter.projectId);
    }
    if (filter?.status && filter.status !== "all") {
      res = res.filter(c => c.status === filter.status);
    }
    if (filter?.type && filter.type !== "all") {
      res = res.filter(c => c.type === filter.type);
    }
    return res.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  addProjectContribution(contribData: Omit<ProjectContribution, "id" | "status" | "created_at" | "updated_at">): ProjectContribution {
    const newContrib: ProjectContribution = {
      ...contribData,
      id: "contrib-" + Date.now(),
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.contributions.unshift(newContrib);
    return newContrib;
  }

  updateProjectContributionStatus(id: string, status: ContributionStatus, adminNotes?: string, reviewerName: string = "Admin"): boolean {
    const contrib = this.contributions.find(c => c.id === id);
    if (!contrib) return false;
    contrib.status = status;
    if (adminNotes) contrib.admin_notes = adminNotes;
    contrib.reviewed_by = reviewerName;
    contrib.reviewed_at = new Date().toISOString();
    contrib.updated_at = new Date().toISOString();
    return true;
  }

  // ---------------- Audit Logs ----------------
  getProjectAuditLogs(projectId?: string): ProjectAuditLog[] {
    let res = [...this.auditLogs];
    if (projectId) {
      res = res.filter(l => l.project_id === projectId);
    }
    return res.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  addProjectAuditLog(log: Omit<ProjectAuditLog, "id" | "timestamp">): ProjectAuditLog {
    const newLog: ProjectAuditLog = {
      ...log,
      id: "audit-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(newLog);
    return newLog;
  }

  // ---------------- Citizen Proposals (People's Voice) ----------------
  getProposals(filter?: {
    category?: ProposalCategory | "all";
    status?: ProposalStatus | "all";
    wardNumber?: number;
    search?: string;
  }): CitizenProposal[] {
    let res = [...this.proposals];

    if (filter?.category && filter.category !== "all") {
      res = res.filter(p => p.category === filter.category);
    }

    if (filter?.status && filter.status !== "all") {
      res = res.filter(p => p.status === filter.status);
    }

    if (filter?.wardNumber !== undefined && filter.wardNumber > 0) {
      res = res.filter(p => p.ward_number === filter.wardNumber);
    }

    if (filter?.search && filter.search.trim()) {
      const q = filter.search.toLowerCase();
      res = res.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.title_ml.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.summary_ml.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.locality_ml.toLowerCase().includes(q)
      );
    }

    // Sort by support count desc, then date desc
    return res.sort((a, b) => b.support_count - a.support_count || new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  getProposalById(id: string): CitizenProposal | null {
    const prop = this.proposals.find(p => p.id === id);
    return prop ? { ...prop } : null;
  }

  addProposal(proposalData: Omit<CitizenProposal, "id" | "tracking_id" | "status" | "support_count" | "comments_count" | "comments" | "created_at" | "updated_at">): CitizenProposal {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newProp: CitizenProposal = {
      ...proposalData,
      id: "prop-" + Date.now(),
      tracking_id: `TNR-VOICE-${new Date().getFullYear()}-${randomSuffix}`,
      status: "submitted",
      support_count: 1,
      supported_by_user: true,
      comments_count: 0,
      comments: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.proposals.unshift(newProp);
    return newProp;
  }

  toggleProposalSupport(id: string): { supported: boolean; newCount: number } | null {
    const prop = this.proposals.find(p => p.id === id);
    if (!prop) return null;

    if (prop.supported_by_user) {
      prop.support_count = Math.max(0, prop.support_count - 1);
      prop.supported_by_user = false;
    } else {
      prop.support_count += 1;
      prop.supported_by_user = true;

      // Automatically transition to community_supported if threshold (50) is reached
      if (prop.support_count >= 50 && prop.status === "submitted") {
        prop.status = "community_supported";
      }
    }

    prop.updated_at = new Date().toISOString();
    return { supported: prop.supported_by_user, newCount: prop.support_count };
  }

  addProposalComment(proposalId: string, commentData: { author_id: string; author_name: string; content: string; is_official?: boolean; official_designation?: string }): boolean {
    const prop = this.proposals.find(p => p.id === proposalId);
    if (!prop) return false;

    const newComment = {
      id: "pcomm-" + Date.now(),
      proposal_id: proposalId,
      author_id: commentData.author_id,
      author_name: commentData.author_name,
      content: commentData.content,
      is_official: commentData.is_official || false,
      official_designation: commentData.official_designation,
      created_at: new Date().toISOString(),
    };

    prop.comments.push(newComment);
    prop.comments_count = prop.comments.length;
    prop.updated_at = new Date().toISOString();
    return true;
  }

  updateProposalStatus(id: string, status: ProposalStatus, officialResponse?: string, officialResponder?: { name: string; role: string }): boolean {
    const prop = this.proposals.find(p => p.id === id);
    if (!prop) return false;

    prop.status = status;
    if (officialResponse) {
      prop.official_response = officialResponse;
      prop.official_response_date = new Date().toISOString().split("T")[0];
    }
    if (officialResponder) {
      prop.official_responder_name = officialResponder.name;
      prop.official_responder_role = officialResponder.role;
    }
    prop.updated_at = new Date().toISOString();
    return true;
  }
}

// Global Singleton to ensure memory persistence across Next.js re-renders
const globalForMunicipality = globalThis as unknown as { digitalMunicipalityStore: DigitalMunicipalityStore };
export const digitalMunicipalityStore = globalForMunicipality.digitalMunicipalityStore || new DigitalMunicipalityStore();
if (process.env.NODE_ENV !== "production") globalForMunicipality.digitalMunicipalityStore = digitalMunicipalityStore;
