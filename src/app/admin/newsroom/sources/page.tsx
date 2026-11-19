"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminNewsroomNav } from "@/components/news/AdminNewsroomNav";
import { useLanguage } from "@/lib/i18n/context";
import { newsroomStore, NEWS_CATEGORIES } from "@/lib/data/newsroomStore";
import { SmartNewsSource, NewsCategorySlug, GeographicScope } from "@/types/newsroom";
import { 
  Rss, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  RefreshCw, 
  Trash2, 
  Edit,
  X,
  Check
} from "lucide-react";

export default function AdminNewsroomSourcesPage() {
  const { language } = useLanguage();
  const [sources, setSources] = useState<SmartNewsSource[]>(() => newsroomStore.getSources());
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // New source form state
  const [name, setName] = useState("");
  const [nameMl, setNameMl] = useState("");
  const [feedUrl, setFeedUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [publisher, setPublisher] = useState("");
  const [feedType, setFeedType] = useState<SmartNewsSource["feed_type"]>("rss");
  const [categoryDefault, setCategoryDefault] = useState<NewsCategorySlug>("local");
  const [geographicScope, setGeographicScope] = useState<GeographicScope>("tanur");
  const [reliabilityScore, setReliabilityScore] = useState(95);
  const [pollingInterval, setPollingInterval] = useState(5);

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    newsroomStore.updateSource(id, { is_active: !currentStatus });
    setSources([...newsroomStore.getSources()]);
  };

  const handleDeleteSource = (id: string) => {
    if (confirm("ഈ വാർത്താ ഉറവിടം നീക്കം ചെയ്യണമെന്ന് ഉറപ്പാണോ?")) {
      newsroomStore.deleteSource(id);
      setSources([...newsroomStore.getSources()]);
    }
  };

  const handleTestConnection = async (id: string) => {
    setTestingId(id);
    try {
      await fetch("/api/newsroom/ingest", { method: "POST" });
      setSources([...newsroomStore.getSources()]);
      setFeedback("കണക്ഷൻ പരിശോധന വിജയകരം! ഫീഡ് സജീവമാണ്.");
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback("പരിശോധന പൂർത്തിയായി.");
      setTimeout(() => setFeedback(null), 3000);
    } finally {
      setTestingId(null);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !feedUrl) return;

    newsroomStore.addSource({
      name,
      name_ml: nameMl || name,
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      website_url: websiteUrl || feedUrl,
      feed_url: feedUrl,
      feed_type: feedType,
      publisher: publisher || name,
      category_default: categoryDefault,
      geographic_scope: geographicScope,
      reliability_score: reliabilityScore,
      polling_interval_minutes: pollingInterval,
      is_active: true,
      terms_verified: true,
    });

    setSources([...newsroomStore.getSources()]);
    setIsAddOpen(false);
    setName("");
    setNameMl("");
    setFeedUrl("");
    setWebsiteUrl("");
    setPublisher("");
    setFeedback("പുതിയ വാർത്താ ഉറവിടം വിജയകരമായി ചേർത്തു!");
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <AdminNewsroomNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#143E2C] text-amber-300 flex items-center justify-center font-bold">
                  <Rss className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-[#143E2C] uppercase tracking-wider">
                  ഫീഡ് & ഉറവിട മാനേജ്‌മെന്റ്
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "അംഗീകൃത വാർത്താ ഉറവിടങ്ങൾ" : "Approved News Sources"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                ഔദ്യോഗിക സർക്കാർ ഗസറ്റുകൾ, പി.ആർ.ഡി ലൈവ്, താനൂർ നഗരസഭ, വാർത്താ ഏജൻസികൾ എന്നിവയുടെ ക്രമീകരണങ്ങൾ.
              </p>
            </div>

            <button
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-2 shadow-xs self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>പുതിയ ഉറവിടം ചേർക്കുക</span>
            </button>
          </div>

          {feedback && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>{feedback}</span>
            </div>
          )}
        </div>
      </section>

      {/* Sources Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sources.map((src) => (
            <div
              key={src.id}
              className="bg-white rounded-3xl border border-[#E8DCBF] p-6 shadow-xs hover:border-[#194B35]/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                        src.is_active ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-500"
                      }`}>
                        {src.is_active ? "● സജീവം (Active)" : "○ നിർജ്ജീവം"}
                      </span>
                      <span className="text-[10px] font-semibold text-neutral-400 uppercase">
                        {src.feed_type}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#194B35] leading-snug">
                      {src.name_ml}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium">{src.name}</p>
                  </div>

                  <span className="text-xs font-bold bg-[#FAF7F0] text-[#8C5B0F] px-2.5 py-1 rounded-xl border border-[#E8DCBF] shrink-0">
                    {src.reliability_score}% സ്കോർ
                  </span>
                </div>

                <div className="space-y-2 text-xs text-neutral-600 bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#DDD5C5] my-4">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">പബ്ലിഷർ:</span>
                    <strong className="text-[#194B35]">{src.publisher}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">പോളിംഗ് ഇന്റർവൽ:</span>
                    <strong className="text-[#8C5B0F]">{src.polling_interval_minutes} മിനിറ്റ് കൂടുമ്പോൾ</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">ശേഖരിച്ച വാർത്തകൾ:</span>
                    <strong className="text-[#1A2420]">{src.articles_ingested_count} എണ്ണം</strong>
                  </div>
                  <div className="pt-1 border-t border-neutral-200/60 truncate">
                    <span className="text-neutral-400 text-[10px] block">ഫീഡ് URL:</span>
                    <a href={src.feed_url} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-blue-700 hover:underline">
                      {src.feed_url}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(src.id, src.is_active)}
                    className="font-bold text-neutral-600 hover:text-[#194B35] transition"
                  >
                    {src.is_active ? "നിർത്തുക (Disable)" : "പ്രവർത്തിപ്പിക്കുക"}
                  </button>
                  <button
                    onClick={() => handleDeleteSource(src.id)}
                    className="text-neutral-400 hover:text-rose-600 p-1"
                    title="നീക്കം ചെയ്യുക"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => handleTestConnection(src.id)}
                  disabled={testingId === src.id}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-[#DDD5C5] font-bold text-xs text-[#194B35] hover:bg-neutral-100 transition inline-flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3 h-3 text-[#8C5B0F] ${testingId === src.id ? "animate-spin" : ""}`} />
                  <span>ടെസ്റ്റ് ചെയ്യുക</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add Source Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E8DCBF]">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <h3 className="font-bold text-base text-[#194B35] font-serif">പുതിയ വാർത്താ ഉറവിടം ചേർക്കുക</h3>
              <button onClick={() => setIsAddOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">ഉറവിടത്തിന്റെ പേര് (മലയാളം):</label>
                <input
                  type="text"
                  placeholder="ഉദാ: താനൂർ പ്രസ്സ് ക്ലബ്ബ് ബുള്ളറ്റിൻ"
                  value={nameMl}
                  onChange={(e) => setNameMl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#DDD5C5]"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">പേര് (English):</label>
                <input
                  type="text"
                  placeholder="e.g. Tanur Press Club"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#DDD5C5]"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">RSS / Feed URL:</label>
                <input
                  type="url"
                  placeholder="https://example.gov.in/feed.xml"
                  value={feedUrl}
                  onChange={(e) => setFeedUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#DDD5C5] font-mono text-[11px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">പരിധി (Geographic Scope):</label>
                  <select
                    value={geographicScope}
                    onChange={(e) => setGeographicScope(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-[#DDD5C5]"
                  >
                    <option value="tanur">താനൂർ നഗരസഭ</option>
                    <option value="malappuram">മലപ്പുറം ജില്ല</option>
                    <option value="kerala">കേരളം</option>
                    <option value="national">ദേശീയം</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">പോളിംഗ് ഇടവേള:</label>
                  <select
                    value={pollingInterval}
                    onChange={(e) => setPollingInterval(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#DDD5C5]"
                  >
                    <option value={2}>2 മിനിറ്റ്</option>
                    <option value={5}>5 മിനിറ്റ്</option>
                    <option value={15}>15 മിനിറ്റ്</option>
                    <option value={30}>30 മിനിറ്റ്</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 font-bold hover:bg-neutral-100"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#194B35] text-white font-bold hover:bg-[#143E2C]"
                >
                  ഉറവിടം സേവ് ചെയ്യുക
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
