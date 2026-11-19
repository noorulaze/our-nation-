"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminCivicNav } from "@/components/civic/AdminCivicNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CIVIC_AUTHORITIES, 
  CivicIssue 
} from "@/lib/data/civicConnectData";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Building2, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Camera, 
  ExternalLink, 
  Save, 
  Check, 
  User, 
  FileText,
  Calendar
} from "lucide-react";

export default function AdminCivicIssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const issueId = params?.id as string;

  const [issue, setIssue] = useState<CivicIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Status form fields
  const [selectedStatus, setSelectedStatus] = useState<CivicIssue['status']>("under_review");
  const [moderatorNote, setModeratorNote] = useState("");

  // Authority forwarding fields
  const [selectedAuthorityId, setSelectedAuthorityId] = useState("auth-tanur-municipality");
  const [forwardingDepartment, setForwardingDepartment] = useState("Municipal Engineering Division");
  const [forwardingRefNo, setForwardingRefNo] = useState("TNR-MUN-2026-" + Math.floor(1000 + Math.random() * 9000));
  const [forwardingNotes, setForwardingNotes] = useState("");

  // Resolution evidence fields
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [resolutionImage, setResolutionImage] = useState("");
  const [isResolutionVerified, setIsResolutionVerified] = useState(true);

  useEffect(() => {
    if (issueId) {
      const found = civicStore.getIssueById(issueId);
      if (found) {
        setIssue({ ...found });
        setSelectedStatus(found.status);
        setModeratorNote(found.moderator_notes || "");
        if (found.authority_forwarding) {
          setSelectedAuthorityId(found.authority_forwarding.authority_id);
          setForwardingDepartment(found.authority_forwarding.department);
          setForwardingRefNo(found.authority_forwarding.reference_no);
          setForwardingNotes(found.authority_forwarding.notes || "");
        }
        if (found.resolution_evidence) {
          setResolutionNotes(found.resolution_evidence.resolution_notes);
          setIsResolutionVerified(found.resolution_evidence.verified_by_moderator);
          if (found.resolution_evidence.resolution_images.length > 0) {
            setResolutionImage(found.resolution_evidence.resolution_images[0]);
          }
        }
      }
      setLoading(false);
    }
  }, [issueId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-8 text-[#194B35]">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#194B35] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold font-malayalam">മോഡറേഷൻ ഡാറ്റ ലോഡ് ചെയ്യുന്നു...</p>
        </div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <AdminCivicNav />
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-bold text-[#194B35] mb-2 font-serif">പരാതി കണ്ടെത്താനായില്ല</h2>
          <Link href="/admin/civic/issues" className="text-xs font-bold text-[#194B35] underline">
            പരാതികളുടെ ലിസ്റ്റിലേക്ക് മടങ്ങുക
          </Link>
        </div>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const category = CIVIC_CATEGORIES.find(c => c.id === issue.category_id);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();

    let authForwarding = undefined;
    if (selectedStatus === "forwarded" || selectedStatus === "in_progress" || issue.authority_forwarding) {
      const auth = CIVIC_AUTHORITIES.find(a => a.id === selectedAuthorityId);
      authForwarding = {
        authority_id: selectedAuthorityId,
        authority_name: auth ? auth.name : "Tanur Municipality Office",
        department: forwardingDepartment,
        forwarded_at: issue.authority_forwarding?.forwarded_at || new Date().toISOString(),
        reference_no: forwardingRefNo,
        notes: forwardingNotes,
      };
    }

    let resEvidence = undefined;
    if (selectedStatus === "resolved") {
      resEvidence = {
        resolved_at: new Date().toISOString(),
        resolution_notes: resolutionNotes || "പ്രശ്നം നഗരസഭാ അധികൃതർ പരിശോധിച്ച് പരിഹരിച്ചു.",
        resolution_images: resolutionImage ? [resolutionImage] : (issue.resolution_evidence?.resolution_images || []),
        verified_by_moderator: isResolutionVerified,
      };
    }

    civicStore.updateIssueStatus(
      issue.id,
      selectedStatus,
      "താനൂർ സിവിക് മോഡറേറ്റർ (Admin)",
      moderatorNote || `സ്റ്റാറ്റസ് ${selectedStatus} ആയി രേഖപ്പെടുത്തി.`,
      authForwarding,
      resEvidence
    );

    const updated = civicStore.getIssueById(issue.id);
    if (updated) setIssue({ ...updated });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <AdminCivicNav />

      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-[#E8DCBF] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/admin/civic/issues"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#194B35] hover:text-[#8C5B0F] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>പരാതികളുടെ ലിസ്റ്റിലേക്ക് മടങ്ങുക</span>
          </Link>

          <Link
            href={`/civic/issues/${issue.id}`}
            target="_blank"
            className="text-xs font-bold text-[#8C5B0F] hover:underline flex items-center gap-1"
          >
            <span>പബ്ലിക് വ്യൂ കാണുക</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Issue Details & Evidence */}
          <div className="lg:col-span-2 space-y-6">

            {/* Resident Submission Overview */}
            <div className="bg-white rounded-3xl border border-[#E8DCBF] p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 mb-4">
                <span className="font-mono text-sm font-extrabold text-[#194B35] bg-[#E0F1E7] px-3 py-1 rounded-xl border border-[#BDE3CE]">
                  {issue.tracking_id}
                </span>
                <span className="text-xs text-neutral-500">
                  സമർപ്പിച്ചത്: {new Date(issue.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {category?.name_ml || issue.subcategory}
                  </span>
                  <span>•</span>
                  <span className="text-neutral-500 font-medium">{issue.subcategory}</span>
                </div>

                <h1 className="text-xl font-bold text-[#194B35] font-serif">
                  {issue.title_ml || issue.title}
                </h1>
                <p className="text-xs text-neutral-500 italic">{issue.title}</p>

                <p className="text-xs sm:text-sm text-[#252A25] whitespace-pre-line leading-relaxed pt-2">
                  {issue.description}
                </p>
              </div>

              {/* Resident details */}
              <div className="mt-5 pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-neutral-400" />
                  <span>റിപ്പോർട്ടർ: <strong>{issue.is_anonymous ? "അജ്ഞാതൻ (Anonymous)" : issue.reporter_name}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8C5B0F]" />
                  <span>സ്ഥലം: <strong>{issue.address_landmark}, {issue.locality}</strong></span>
                </div>
              </div>
            </div>

            {/* Submitted Photo Evidence */}
            {issue.images && issue.images.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E8DCBF] p-6 shadow-xs">
                <h3 className="text-sm font-bold text-[#194B35] mb-3 flex items-center gap-2 font-serif">
                  <Camera className="w-4 h-4 text-[#8C5B0F]" />
                  <span>സമർപ്പിച്ച ഫോട്ടോ തെളിവുകൾ ({issue.images.length})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {issue.images.map((img, idx) => (
                    <div key={idx} className="aspect-4/3 rounded-xl overflow-hidden border border-[#DDD5C5] bg-neutral-100">
                      <img src={img} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Timeline History */}
            <div className="bg-white rounded-3xl border border-[#E8DCBF] p-6 shadow-xs">
              <h3 className="text-sm font-bold text-[#194B35] mb-4 flex items-center gap-2 font-serif border-b border-neutral-100 pb-3">
                <Clock className="w-4 h-4 text-[#8C5B0F]" />
                <span>ഓഡിറ്റ് ടൈംലൈൻ ചരിത്രം ({issue.timeline.length})</span>
              </h3>

              <div className="space-y-3">
                {issue.timeline.map((event) => (
                  <div key={event.id} className="p-3 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs">
                    <div className="flex items-center justify-between font-bold text-[#194B35] mb-1">
                      <span>{event.title}</span>
                      <span className="text-[10px] text-neutral-400">
                        {new Date(event.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-[#5C6A64]">{event.description}</p>
                    <div className="text-[10px] text-neutral-400 mt-1">
                      നടപടി സ്വീകരിച്ചത്: <span className="font-semibold">{event.actor}</span> ({event.actor_role})
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Col: Moderation & Administrative Action Form */}
          <div className="space-y-6">

            <form onSubmit={handleSaveChanges} className="bg-white rounded-3xl border border-[#E8DCBF] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="text-sm font-bold text-[#194B35] font-serif flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8C5B0F]" />
                  <span>മോഡറേഷൻ നടപടികൾ</span>
                </h3>
                {savedSuccess && (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <Check className="w-3.5 h-3.5" /> മാറ്റങ്ങൾ സേവ് ചെയ്തു
                  </span>
                )}
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1.5">
                  നിലവിലെ സ്റ്റാറ്റസ് മാറ്റുക:
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs font-bold text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                >
                  <option value="submitted">സമർപ്പിച്ചു (Submitted)</option>
                  <option value="under_review">അവലോകനത്തിൽ (Under Review)</option>
                  <option value="verified">സ്ഥിരീകരിച്ചു (Verified by Moderator)</option>
                  <option value="forwarded">അധികൃതർക്ക് കൈമാറി (Forwarded to Authority)</option>
                  <option value="in_progress">നടപടി പുരോഗമിക്കുന്നു (In Progress)</option>
                  <option value="resolved">പ്രശ്നം പരിഹരിച്ചു (Resolved)</option>
                  <option value="rejected">പരാതി തള്ളി (Rejected)</option>
                </select>
              </div>

              {/* Moderator Note */}
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  മോഡറേറ്റർ കുറിപ്പ് (പൊതുവായി കാണാം):
                </label>
                <textarea
                  rows={2}
                  value={moderatorNote}
                  onChange={(e) => setModeratorNote(e.target.value)}
                  placeholder="പരിശോധനാ വിവരങ്ങൾ രേഖപ്പെടുത്തുക..."
                  className="w-full p-2.5 rounded-xl border border-[#DDD5C5] text-xs focus:outline-hidden focus:border-[#194B35]"
                />
              </div>

              {/* Authority Forwarding Form Section */}
              <div className="pt-3 border-t border-neutral-100 space-y-3">
                <span className="text-xs font-bold text-[#8C5B0F] block flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>വകുപ്പിലേക്ക് കൈമാറൽ (Authority Forwarding)</span>
                </span>

                <div>
                  <label className="block text-[11px] text-neutral-500 mb-1">ബന്ധപ്പെട്ട സ്ഥാപനം:</label>
                  <select
                    value={selectedAuthorityId}
                    onChange={(e) => setSelectedAuthorityId(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#DDD5C5] text-xs"
                  >
                    {CIVIC_AUTHORITIES.map((auth) => (
                      <option key={auth.id} value={auth.id}>
                        {auth.name_ml} ({auth.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-500 mb-1">ഡിപ്പാർട്ട്മെന്റ് / സെക്ഷൻ:</label>
                  <input
                    type="text"
                    value={forwardingDepartment}
                    onChange={(e) => setForwardingDepartment(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#DDD5C5] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-500 mb-1">റഫറൻസ് നമ്പർ (Official Ref No):</label>
                  <input
                    type="text"
                    value={forwardingRefNo}
                    onChange={(e) => setForwardingRefNo(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#DDD5C5] text-xs font-mono"
                  />
                </div>
              </div>

              {/* Resolution Evidence Form Section (Active when status is resolved) */}
              {selectedStatus === "resolved" && (
                <div className="pt-3 border-t border-neutral-100 space-y-3 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800 block flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>പരിഹാര സ്ഥിരീകരണം (Resolution Proof)</span>
                  </span>

                  <div>
                    <label className="block text-[11px] text-emerald-900 mb-1">പരിഹാര വിവരണം:</label>
                    <textarea
                      rows={2}
                      value={resolutionNotes}
                      onChange={(e) => setResolutionNotes(e.target.value)}
                      placeholder="നടത്തിയ പ്രവർത്തനങ്ങൾ..."
                      className="w-full p-2 rounded-lg border border-emerald-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-emerald-900 mb-1">പൂർത്തീകരിച്ച ഫോട്ടോ ലിങ്ക് (Optional):</label>
                    <input
                      type="text"
                      value={resolutionImage}
                      onChange={(e) => setResolutionImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-2 rounded-lg border border-emerald-300 text-xs bg-white"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-xs text-emerald-900 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={isResolutionVerified}
                      onChange={(e) => setIsResolutionVerified(e.target.checked)}
                      className="rounded text-emerald-700"
                    />
                    <span>മോഡറേറ്റർ നേരിട്ട് സന്ദർശിച്ചു സ്ഥിരീകരിച്ചു</span>
                  </label>
                </div>
              )}

              {/* Submit Save Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>നടപടികൾ സേവ് ചെയ്യുക</span>
                </button>
              </div>
            </form>

          </div>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
