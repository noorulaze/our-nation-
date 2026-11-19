"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { useAuth } from "@/lib/auth/context";
import { localGovernmentStore } from "@/lib/store/localGovernmentStore";
import { 
  LocalGovernmentBody, 
  LocalRepresentative, 
  VerificationStatus,
  RepresentativeAudit 
} from "@/types/localGovernment";
import {
  Landmark,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Edit,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  Save,
  X,
  History,
  Lock,
  Phone
} from "lucide-react";

export default function AdminLocalGovernmentsPage() {
  const { role, user } = useAuth();
  const isAuthorized = role === "admin" || role === "moderator";

  const [bodies, setBodies] = useState<LocalGovernmentBody[]>(() => localGovernmentStore.getLocalBodies());
  const [representatives, setRepresentatives] = useState<LocalRepresentative[]>(() => localGovernmentStore.getRepresentatives());
  const [audits, setAudits] = useState<RepresentativeAudit[]>(() => localGovernmentStore.getAudits());

  const [selectedBodyFilter, setSelectedBodyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Edit Modal State
  const [editingRep, setEditingRep] = useState<LocalRepresentative | null>(null);
  const [editFormData, setEditFormData] = useState<{
    name: string;
    party: string;
    phone: string;
    photo_url: string;
    source_url: string;
    verification_status: VerificationStatus;
    note: string;
  }>({
    name: "",
    party: "",
    phone: "",
    photo_url: "",
    source_url: "",
    verification_status: "verified",
    note: "",
  });

  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  // Metrics
  const metrics = useMemo(() => {
    const totalBodies = bodies.length;
    const totalReps = representatives.length;
    const verifiedReps = representatives.filter((r) => r.verification_status === "verified").length;
    const pendingReps = representatives.filter((r) => r.verification_status === "pending_verification").length;
    const disputedReps = representatives.filter((r) => r.verification_status === "disputed").length;
    const withCustomPhotos = representatives.filter((r) => r.photo_url && !r.photo_url.includes("placeholder")).length;

    return { totalBodies, totalReps, verifiedReps, pendingReps, disputedReps, withCustomPhotos };
  }, [bodies, representatives]);

  // Filtered representatives
  const filteredReps = useMemo(() => {
    let list = [...representatives];
    if (selectedBodyFilter !== "all") {
      list = list.filter((r) => r.local_body_id === selectedBodyFilter);
    }
    if (statusFilter !== "all") {
      list = list.filter((r) => r.verification_status === statusFilter);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.ward_name.toLowerCase().includes(q) ||
          r.local_body_name.toLowerCase().includes(q) ||
          (r.party && r.party.toLowerCase().includes(q))
      );
    }
    return list;
  }, [representatives, selectedBodyFilter, statusFilter, searchTerm]);

  const handleOpenEdit = (rep: LocalRepresentative) => {
    setEditingRep(rep);
    setEditFormData({
      name: rep.name,
      party: rep.party || "",
      phone: rep.phone || "",
      photo_url: rep.photo_url || "",
      source_url: rep.source_url || "",
      verification_status: rep.verification_status,
      note: "",
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRep) return;

    try {
      const updated = localGovernmentStore.updateRepresentative(
        editingRep.id,
        {
          name: editFormData.name,
          party: editFormData.party,
          phone: editFormData.phone,
          photo_url: editFormData.photo_url,
          source_url: editFormData.source_url,
          verification_status: editFormData.verification_status,
        },
        user?.username || "admin",
        editFormData.note || "Administrative review update"
      );

      // Refresh local state
      setRepresentatives(localGovernmentStore.getRepresentatives());
      setAudits(localGovernmentStore.getAudits());
      setEditingRep(null);
      showNotification(`Representative ${updated.name} updated successfully.`);
    } catch (err: any) {
      showNotification(`Error: ${err.message}`);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-4 py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-[#194B35]">Access Restricted</h1>
          <p className="text-xs text-[#5C6A64]">
            This administrative console is restricted to verified municipal administrators and moderators.
          </p>
          <Link
            href="/profile"
            className="inline-block px-5 py-2.5 bg-[#194B35] text-white text-xs font-bold rounded-xl"
          >
            Sign In with Authorized Account
          </Link>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/admin" className="hover:text-[#194B35] transition">Admin Console</Link>
          <span>/</span>
          <span className="font-bold text-[#194B35]">Local Governments &amp; Representatives</span>
        </div>

        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE6D8] pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-[#194B35] font-sans">
              Local Government &amp; Representative Administration
            </h1>
            <p className="text-xs text-[#5C6A64]">
              Manage local bodies, wards, elected members, photograph sources, and verification status across Tanur Municipality and Tanur Block.
            </p>
          </div>

          <Link
            href="/local-governments"
            target="_blank"
            className="px-4 py-2 bg-white hover:bg-neutral-50 text-[#194B35] border border-[#EDE6D8] rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Live Public Directory</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-bold animate-in fade-in">
            {feedbackMsg}
          </div>
        )}

        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 text-center">
            <span className="text-2xl font-black text-[#194B35] block">{metrics.totalBodies}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Local Bodies</span>
          </div>

          <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 text-center">
            <span className="text-2xl font-black text-[#194B35] block">{metrics.totalReps}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Reps</span>
          </div>

          <div className="bg-white rounded-2xl border border-emerald-200 p-4 text-center bg-emerald-50/50">
            <span className="text-2xl font-black text-emerald-800 block">{metrics.verifiedReps}</span>
            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Verified</span>
          </div>

          <div className="bg-white rounded-2xl border border-amber-200 p-4 text-center bg-amber-50/50">
            <span className="text-2xl font-black text-amber-800 block">{metrics.pendingReps}</span>
            <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Pending</span>
          </div>

          <div className="bg-white rounded-2xl border border-red-200 p-4 text-center bg-red-50/50">
            <span className="text-2xl font-black text-red-800 block">{metrics.disputedReps}</span>
            <span className="text-[10px] text-red-800 font-bold uppercase tracking-wider">Disputed</span>
          </div>

          <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 text-center">
            <span className="text-2xl font-black text-[#C39A5B] block">{metrics.withCustomPhotos}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Photos</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-3xl border border-[#EDE6D8] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search representative, ward or party..."
              className="w-full pl-9 pr-3 py-2 bg-[#FAF7F0] text-xs rounded-xl border border-[#EDE6D8] focus:outline-none focus:ring-1 focus:ring-[#194B35]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Local Body Filter */}
            <select
              value={selectedBodyFilter}
              onChange={(e) => setSelectedBodyFilter(e.target.value)}
              className="bg-[#FAF7F0] text-xs py-2 px-3 rounded-xl border border-[#EDE6D8] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#194B35]"
            >
              <option value="all">All Local Bodies ({bodies.length})</option>
              {bodies.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            {/* Verification Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#FAF7F0] text-xs py-2 px-3 rounded-xl border border-[#EDE6D8] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#194B35]"
            >
              <option value="all">All Statuses</option>
              <option value="verified">Verified Only</option>
              <option value="pending_verification">Pending Verification</option>
              <option value="disputed">Disputed / Special Note</option>
            </select>
          </div>
        </div>

        {/* Representative Management Table */}
        <div className="bg-white rounded-3xl border border-[#EDE6D8] shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EDE6D8] flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#194B35]">
              Elected Representatives Directory ({filteredReps.length})
            </h3>
            <span className="text-[11px] text-gray-400 font-mono">
              Click &quot;Edit Profile&quot; to update records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-gray-500 uppercase tracking-wider font-bold border-b border-[#EDE6D8] text-[10px]">
                <tr>
                  <th className="py-3 px-4">Representative</th>
                  <th className="py-3 px-4">Local Body</th>
                  <th className="py-3 px-4">Ward / Role</th>
                  <th className="py-3 px-4">Party</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Verified</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReps.slice(0, 50).map((rep) => (
                  <tr key={rep.id} className="hover:bg-[#FAF7F0]/60 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#EDE6D8] flex items-center justify-center shrink-0">
                          <Image
                            src={rep.photo_url || "/placeholder-representative.svg"}
                            alt={rep.name}
                            width={28}
                            height={28}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#194B35]">{rep.name}</div>
                          {rep.phone && <div className="text-[10px] text-gray-400">{rep.phone}</div>}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-gray-700">
                      {rep.local_body_name}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold">Ward {rep.ward_number}:</span> {rep.ward_name}
                      <span className="block text-[10px] text-gray-400">{rep.role_title}</span>
                    </td>

                    <td className="py-3 px-4 font-mono text-gray-600">
                      {rep.party || "—"}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rep.verification_status === "verified"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : rep.verification_status === "disputed"
                          ? "bg-red-50 text-red-800 border border-red-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}>
                        {rep.verification_status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-gray-400 font-mono text-[11px]">
                      {rep.last_verified}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenEdit(rep)}
                        className="px-3 py-1 bg-[#FAF7F0] hover:bg-[#194B35] hover:text-white text-[#194B35] rounded-lg border border-[#EDE6D8] font-bold transition text-[11px]"
                      >
                        Edit Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReps.length > 50 && (
            <div className="p-3 bg-[#FAF7F0] text-center text-xs text-gray-500 border-t border-[#EDE6D8]">
              Showing first 50 representatives of {filteredReps.length}. Use search or filters to narrow results.
            </div>
          )}
        </div>

        {/* Audit Trail Section */}
        {audits.length > 0 && (
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-[#EDE6D8] pb-2">
              <History className="w-4 h-4 text-[#C39A5B]" />
              <h3 className="text-xs font-bold text-[#194B35] uppercase tracking-wider">
                Recent Administrative Audits ({audits.length})
              </h3>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {audits.map((a) => (
                <div key={a.id} className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-[11px] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#194B35]">{a.action}:</span> {a.note}
                  </div>
                  <div className="text-gray-400 font-mono text-[10px]">
                    by {a.modified_by} • {new Date(a.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Edit Representative Modal */}
      {editingRep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#EDE6D8] max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setEditingRep(null)}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
              aria-label="Close Edit"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                Admin Profile Editor
              </span>
              <h2 className="text-lg font-bold text-[#194B35]">
                Edit {editingRep.name}
              </h2>
              <p className="text-xs text-gray-500">
                {editingRep.local_body_name} (Ward {editingRep.ward_number}: {editingRep.ward_name})
              </p>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  Representative Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] text-[#1A2420] focus:ring-1 focus:ring-[#194B35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Political Party / Alliance
                  </label>
                  <input
                    type="text"
                    value={editFormData.party}
                    onChange={(e) => setEditFormData({ ...editFormData, party: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] text-[#1A2420] focus:ring-1 focus:ring-[#194B35]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] text-[#1A2420] focus:ring-1 focus:ring-[#194B35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  Photograph URL (Official government source or asset)
                </label>
                <input
                  type="text"
                  value={editFormData.photo_url}
                  onChange={(e) => setEditFormData({ ...editFormData, photo_url: e.target.value })}
                  placeholder="/placeholder-representative.svg"
                  className="w-full px-3 py-2 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] text-[#1A2420] focus:ring-1 focus:ring-[#194B35]"
                />
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  Never use AI-generated images. Use neutral placeholder if real photo is not yet published.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Verification Status
                  </label>
                  <select
                    value={editFormData.verification_status}
                    onChange={(e) => setEditFormData({ ...editFormData, verification_status: e.target.value as VerificationStatus })}
                    className="w-full px-3 py-2 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] text-[#1A2420] focus:ring-1 focus:ring-[#194B35]"
                  >
                    <option value="verified">Verified (Official Match)</option>
                    <option value="pending_verification">Pending Verification</option>
                    <option value="disputed">Disputed / Special Case</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Source Document URL
                  </label>
                  <input
                    type="text"
                    value={editFormData.source_url}
                    onChange={(e) => setEditFormData({ ...editFormData, source_url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] text-[#1A2420] focus:ring-1 focus:ring-[#194B35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  Audit Log Note (Reason for Change)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Updated telephone number from gazette notice"
                  value={editFormData.note}
                  onChange={(e) => setEditFormData({ ...editFormData, note: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] text-[#1A2420] focus:ring-1 focus:ring-[#194B35]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingRep(null)}
                  className="px-4 py-2 bg-[#FAF7F0] hover:bg-neutral-200 rounded-xl text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#194B35] hover:bg-[#123626] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
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
