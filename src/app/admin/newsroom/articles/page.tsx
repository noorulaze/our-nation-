"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminNewsroomNav } from "@/components/news/AdminNewsroomNav";
import { useLanguage } from "@/lib/i18n/context";
import { newsroomStore, NEWS_CATEGORIES } from "@/lib/data/newsroomStore";
import { SmartNewsArticle, ArticleStatus } from "@/types/newsroom";
import { 
  FileSpreadsheet, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Clock, 
  ExternalLink, 
  X, 
  Check, 
  Edit,
  Eye,
  Trash2,
  AlertCircle
} from "lucide-react";

export default function AdminNewsroomArticlesPage() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<SmartNewsArticle[]>(() => newsroomStore.getArticles({ status: "all" }));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Correction modal state
  const [correctionTarget, setCorrectionTarget] = useState<SmartNewsArticle | null>(null);
  const [correctionType, setCorrectionType] = useState<"clarification" | "correction" | "retraction">("clarification");
  const [correctionStatement, setCorrectionStatement] = useState("");
  const [correctionFeedback, setCorrectionFeedback] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      if (selectedStatus !== "all" && a.status !== selectedStatus) return false;
      if (selectedCategory !== "all" && a.category !== selectedCategory) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.title_ml.toLowerCase().includes(q) ||
          a.source_name.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [articles, selectedStatus, selectedCategory, searchTerm]);

  const handleToggleStatus = (articleId: string, newStatus: ArticleStatus) => {
    newsroomStore.updateArticleStatus(articleId, newStatus);
    setArticles([...newsroomStore.getArticles({ status: "all" })]);
  };

  const handlePublishCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionTarget || !correctionStatement.trim()) return;

    newsroomStore.addCorrection(correctionTarget.id, {
      article_id: correctionTarget.id,
      type: correctionType,
      statement: correctionStatement,
      statement_ml: correctionStatement,
      editor_name: "Chief Editor (Newsroom Admin)",
    });

    setArticles([...newsroomStore.getArticles({ status: "all" })]);
    setCorrectionTarget(null);
    setCorrectionStatement("");
    setCorrectionFeedback("തിരുത്തൽ വിജയകരമായി പ്രസിദ്ധീകരിച്ചു.");
    setTimeout(() => setCorrectionFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <AdminNewsroomNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#143E2C] text-amber-300 flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-[#143E2C] uppercase tracking-wider">
                  വാർത്താ മാനേജ്‌മെന്റ് ടേബിൾ
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "എല്ലാ വാർത്തകളും & എഡിറ്റോറിയൽ ആക്ഷൻ" : "News Articles Management"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                ഓട്ടോമാറ്റിക്കായി പ്രസിദ്ധീകരിച്ച വാർത്തകൾ നിരീക്ഷിക്കുക, തിരുത്തലുകൾ നൽകുക, അൺപബ്ലിഷ് ചെയ്യുക.
              </p>
            </div>

            <div className="text-xs text-neutral-500 font-medium">
              ആകെ {filteredArticles.length} വാർത്തകൾ കണ്ടെത്തി
            </div>
          </div>

          {correctionFeedback && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>{correctionFeedback}</span>
            </div>
          )}

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8DCBF] shadow-xs flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="തലക്കെട്ടിലോ പബ്ലിഷറിലോ തിരയുക..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs focus:outline-hidden focus:border-[#194B35]"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-medium focus:outline-hidden"
            >
              <option value="all">എല്ലാ സ്റ്റാറ്റസും</option>
              <option value="published">പ്രസിദ്ധീകരിച്ചവ (Published)</option>
              <option value="breaking">ബ്രേക്കിംഗ് ന്യൂസ് (Breaking)</option>
              <option value="review">റിവ്യൂ ക്യൂവിലുള്ളവ (Review)</option>
              <option value="rejected">തള്ളിയവ (Rejected)</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-medium focus:outline-hidden"
            >
              <option value="all">എല്ലാ വിഭാഗങ്ങളും</option>
              {NEWS_CATEGORIES.map(c => (
                <option key={c.id} value={c.slug}>{c.name_ml}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Articles Management Table */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border border-[#E8DCBF] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1A2420]">
              <thead className="bg-[#FAF4E6] border-b border-[#E8DCBF] text-[#194B35] font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">വാർത്താ തലക്കെട്ട്</th>
                  <th className="py-3 px-4">ഉറവിടം</th>
                  <th className="py-3 px-4">വിഭാഗം / പരിധി</th>
                  <th className="py-3 px-4">തീയതി</th>
                  <th className="py-3 px-4">സ്റ്റാറ്റസ്</th>
                  <th className="py-3 px-4 text-right">നടപടികൾ (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-medium">
                {filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-[#FAF7F0]/60 transition">
                    <td className="py-3.5 px-4 max-w-sm">
                      <Link href={`/news/${art.id}`} target="_blank" className="font-bold text-[#1A2420] hover:text-[#194B35] line-clamp-1">
                        {art.title_ml || art.title}
                      </Link>
                      <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">{art.summary}</p>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-semibold text-[#8C5B0F]">{art.source_name}</span>
                      <a href={art.source_url} target="_blank" rel="noopener noreferrer" className="ml-1 text-neutral-400 hover:text-neutral-700 inline-block">
                        <ExternalLink className="w-2.5 h-2.5 inline" />
                      </a>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-[#194B35] bg-[#E0F1E7] px-2 py-0.2 rounded text-[10px]">
                        {art.category_name_ml}
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">
                        {art.geographic_scope.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-500 text-[11px] whitespace-nowrap">
                      {new Date(art.original_published_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        art.status === "published"
                          ? "bg-emerald-100 text-emerald-800"
                          : art.status === "breaking"
                          ? "bg-rose-100 text-rose-800"
                          : art.status === "review"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-neutral-100 text-neutral-600"
                      }`}>
                        {art.status.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Correction trigger */}
                        <button
                          onClick={() => setCorrectionTarget(art)}
                          className="px-2 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-[10px] transition"
                          title="തിരുത്ത് / വിശദീകരണം നൽകുക"
                        >
                          തിരുത്ത്
                        </button>

                        {/* Unpublish toggle */}
                        {art.status === "published" || art.status === "breaking" ? (
                          <button
                            onClick={() => handleToggleStatus(art.id, "rejected")}
                            className="px-2 py-1 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[10px] transition"
                            title="വാർത്ത പിൻവലിക്കുക"
                          >
                            പിൻവലിക്കുക
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(art.id, "published")}
                            className="px-2 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px] transition"
                            title="പ്രസിദ്ധീകരിക്കുക"
                          >
                            പ്രസിദ്ധീകരിക്കുക
                          </button>
                        )}

                        <Link
                          href={`/news/${art.id}`}
                          target="_blank"
                          className="p-1.5 text-neutral-400 hover:text-[#194B35]"
                          title="കാണുക"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Issue Correction Modal */}
      {correctionTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E8DCBF]">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <h3 className="font-bold text-sm text-[#194B35] font-serif">
                തിരുത്ത് പ്രസിദ്ധീകരിക്കുക (Correction / Retraction)
              </h3>
              <button onClick={() => setCorrectionTarget(null)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishCorrection} className="space-y-3.5 text-xs">
              <p className="font-bold text-[#1A2420] line-clamp-1">
                {correctionTarget.title_ml || correctionTarget.title}
              </p>

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">തിരുത്തൽ തരം:</label>
                <select
                  value={correctionType}
                  onChange={(e) => setCorrectionType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#DDD5C5]"
                >
                  <option value="clarification">വിശദീകരണം (Clarification)</option>
                  <option value="correction">വസ്തുതാ തിരുത്ത് (Correction)</option>
                  <option value="retraction">വാർത്ത പൂർണ്ണമായി പിൻവലിക്കൽ (Retraction)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">ഔദ്യോഗിക തിരുത്തൽ പ്രസ്താവന:</label>
                <textarea
                  rows={3}
                  value={correctionStatement}
                  onChange={(e) => setCorrectionStatement(e.target.value)}
                  placeholder="വാർത്തയിൽ വന്ന തെറ്റ് അല്ലെങ്കിൽ ഔദ്യോഗിക വിശദീകരണം ഇവിടെ ചേർക്കുക..."
                  className="w-full p-2.5 rounded-xl border border-[#DDD5C5]"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCorrectionTarget(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 font-bold hover:bg-neutral-100"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#194B35] text-white font-bold hover:bg-[#143E2C]"
                >
                  തിരുത്ത് നൽകുക
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
