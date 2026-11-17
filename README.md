# Nammude Naadu (നമ്മുടെ നാട്)
### AI-Powered Local Community Platform for Kerala

> **"Everything happening around your community, in one place."**

Nammude Naadu connects people across Kerala with their neighborhoods through verified local information, gatherings, businesses, public announcements, civic problem tracking, and AI assistance powered by Google Gemini.

---

## 🌟 Key Features

### 1. Community Discovery & Parent-Child Hierarchy
- Structured hierarchical locality architecture:
  $$\text{Country (India)} \longrightarrow \text{State (Kerala)} \longrightarrow \text{Districts} \longrightarrow \text{Localities / Panchayaths / Municipalities}$$
- Instant locality switching between Kakkanad, Fort Kochi, Kazhakkoottam, Palayam, Mananchira, Kuttanad, and other Kerala regions.
- Multi-community memberships with join/leave capabilities.

### 2. Discover Module
- **Events:** Cultural festivals, sports tournaments, workshops, and charity drives with venue details, organizers, dates, and interactive map markers.
- **Places & Heritage:** Exploration of historical landmarks, public parks, and cultural heritage sites.
- **Local Services & Homegrown Businesses:** Verified neighborhood electricians, plumbers, clinics, artisan shops, and bakeries with direct phone, address, and operating hours.

### 3. Community Forum & Verified Announcements
- Real-time community feed with post creation, media attachments, comments, and deletion controls.
- Content moderation flags and report queues.
- Verified official notices from public utilities (e.g. KSEB maintenance notices, Municipal Corporation traffic orders) clearly distinguished from ordinary posts.

### 4. Community Improvement (Civic Issues Tracking)
- Transparent civic issue reporting across 6 categories:
  - Roads & Footpaths
  - Waste Management
  - Water Supply & Drainage
  - Public Facilities & Streetlights
  - Environment & Trees
  - General Community Issues
- Status lifecycle: `Submitted` $\to$ `Under Review` $\to$ `Acknowledged` $\to$ `In Progress` $\to$ `Resolved` $\to$ `Rejected`.
- Official authority response notes without fake promises or fabricated progress.

### 5. Naadu AI (നാട് AI) Assistant
- Grounded conversational assistant powered by Google Gemini (`gemini-1.5-flash`).
- Strict grounding against verified database records (events, businesses, announcements, places, and civic issues).
- Anti-hallucination guardrails: explicitly clarifies when a record is not verified or unavailable.
- Bilingual Malayalam and English comprehension and generation.
- Source record linking directly in chat responses.

### 6. Administration & Moderation Panel
- Protected dashboard for Platform Administrators and Community Moderators.
- Pending approvals queue for Events, Businesses, and Announcements.
- Civic issue lifecycle status updater and official response authoring.
- Post and comment moderation with content removal.
- Real-time audit logs of administrative actions.

### 7. Dual-Language i18n
- Comprehensive Malayalam (മലയാളം) and English dictionary.
- Seamless one-click language toggle across all pages and mobile navigation.
- Preserved in localStorage and user profile.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 with App Router (TypeScript)
- **Styling:** Tailwind CSS with custom editorial color palette
- **Icons:** Lucide React
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS)
- **AI Engine:** Google Gemini API (`@google/generative-ai` & `@google/genai`)
- **Maps:** Leaflet & OpenStreetMap (SSR-safe dynamic loader)
- **Validation:** Zod schemas
- **Deployment:** Vercel ready

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- npm or yarn

### 1. Clone & Install
```bash
git clone <repo-url>
cd "our nation"
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note on Zero-Configuration Demo Mode:**
> Nammude Naadu includes a robust unified data store initialized with authentic Kerala seeds. If external credentials are not yet supplied, the platform automatically runs in deterministic local mode with full real-time CRUD mutations, audit logging, and grounded AI retrieval.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Automated Workflow Tests
```bash
npm test
```
Executes the 11-step verification suite testing all core workflows, role permissions, hierarchy, civic issue lifecycle, and AI grounding.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🗄️ Database Setup (Supabase PostgreSQL)

1. Open your Supabase project dashboard.
2. Navigate to the **SQL Editor**.
3. Run `supabase/migrations/20241117000000_init_schema.sql` to generate all tables, foreign keys, performance indexes, and Row Level Security policies.
4. Run `supabase/seed.sql` to populate initial Kerala communities (Ernakulam, Thiruvananthapuram, Kozhikode, Thrissur, Wayanad, Alappuzha, Kakkanad, Fort Kochi, Kazhakkoottam, etc.) and categories.

---

## 🔒 Security & Privacy

- **Row Level Security (RLS):** All public tables have explicit RLS policies defined in `supabase/migrations/20241117000000_init_schema.sql`.
- **Zero Client Credential Leakage:** `SUPABASE_SERVICE_ROLE_KEY` and `GEMINI_API_KEY` are strictly server-side environment variables and are never bundled into client JavaScript.
- **Input Sanitization:** All submissions (posts, comments, events, services, issues) are validated via Zod schemas.
- **Privacy & Account Control:** Users have an explicit account deletion workflow accessible from their Profile page.

---

## 📄 License
MIT License. Built for the communities and citizens of Kerala.
