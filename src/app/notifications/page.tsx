"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { AppNotification, NotificationPreferences } from "@/types/database";
import {
  Bell,
  CheckCheck,
  Trash2,
  Settings,
  AlertTriangle,
  HardHat,
  TrendingUp,
  MessageSquare,
  Calendar,
  Megaphone,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  X,
  ShieldCheck,
  Sparkles
} from "lucide-react";

type NotifFilter = "all" | "civic" | "development" | "ideas" | "announcements" | "bookings";

export default function NotificationsPage() {
  const { language } = useLanguage();
  const { user } = useAuth();

  const userId = user?.id || "u0000000-0000-0000-0000-000000000003";

  const [notifications, setNotifications] = useState<AppNotification[]>(() => store.getNotifications(userId));
  const [activeFilter, setActiveFilter] = useState<NotifFilter>("all");
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>(() => store.getNotificationPreferences(userId));
  const [prefSaveSuccess, setPrefSaveSuccess] = useState(false);

  const unreadCount = useMemo(() => notifications.filter(n => !n.is_read).length, [notifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (activeFilter === "all") return true;
      if (activeFilter === "civic") return n.type === "civic_issue_status" || n.category === "civic";
      if (activeFilter === "development") return n.type === "development_update" || n.category === "development";
      if (activeFilter === "ideas") return n.type === "idea_update" || n.type === "comment_reply" || n.category === "ideas";
      if (activeFilter === "announcements") return n.type === "announcement" || n.type === "event_reminder" || n.category === "announcements";
      if (activeFilter === "bookings") return n.category === "bookings" || n.type.startsWith("booking") || n.type === "new_review";
      return true;
    });
  }, [notifications, activeFilter]);

  const handleMarkAsRead = (id: string) => {
    store.markNotificationAsRead(id);
    setNotifications(store.getNotifications(userId));
  };

  const handleMarkAllRead = () => {
    store.markAllNotificationsAsRead(userId);
    setNotifications(store.getNotifications(userId));
  };

  const handleDeleteNotif = (id: string) => {
    store.deleteNotification(id);
    setNotifications(store.getNotifications(userId));
  };

  const handleClearAll = () => {
    store.clearNotifications(userId);
    setNotifications([]);
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateNotificationPreferences(userId, preferences);
    setPrefSaveSuccess(true);
    setTimeout(() => {
      setPrefSaveSuccess(false);
      setIsPreferencesOpen(false);
    }, 1200);
  };

  const getNotificationIcon = (type: string, category?: string) => {
    if (type === "civic_issue_status" || category === "civic") {
      return <AlertTriangle className="w-4 h-4 text-orange-600" />;
    }
    if (type === "development_update" || category === "development") {
      return <HardHat className="w-4 h-4 text-emerald-700" />;
    }
    if (type === "idea_update" || category === "ideas") {
      return <TrendingUp className="w-4 h-4 text-amber-600" />;
    }
    if (type === "comment_reply") {
      return <MessageSquare className="w-4 h-4 text-blue-600" />;
    }
    if (type === "event_reminder") {
      return <Calendar className="w-4 h-4 text-purple-600" />;
    }
    if (type === "announcement" || category === "announcements") {
      return <Megaphone className="w-4 h-4 text-red-600" />;
    }
    return <Briefcase className="w-4 h-4 text-[#194B35]" />;
  };

  const filterTabs: { key: NotifFilter; label: string; label_ml: string; count: number }[] = [
    { key: "all", label: "All", label_ml: "എല്ലാം", count: notifications.length },
    { key: "civic", label: "Civic Connect", label_ml: "സിവിക് കണക്ട്", count: notifications.filter(n => n.type === "civic_issue_status" || n.category === "civic").length },
    { key: "development", label: "Development", label_ml: "വികസന പദ്ധതികൾ", count: notifications.filter(n => n.type === "development_update" || n.category === "development").length },
    { key: "ideas", label: "People's Voice", label_ml: "ജനകീയ ശബ്ദം", count: notifications.filter(n => n.type === "idea_update" || n.type === "comment_reply" || n.category === "ideas").length },
    { key: "announcements", label: "Announcements", label_ml: "അറിയിപ്പുകൾ & ഇവന്റ്", count: notifications.filter(n => n.type === "announcement" || n.type === "event_reminder" || n.category === "announcements").length },
    { key: "bookings", label: "Services", label_ml: "സേവനങ്ങൾ", count: notifications.filter(n => n.category === "bookings" || n.type.startsWith("booking") || n.type === "new_review").length },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "അറിയിപ്പുകൾ (Notifications)" : "Notifications" },
          ]}
        />

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#194B35] text-white flex items-center justify-center relative shadow-sm">
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "അറിയിപ്പുകൾ & അപ്‌ഡേറ്റുകൾ" : "Centralized Notifications"}
              </h1>
              <p className="text-xs text-[#5C6A64]">
                {language === "ml"
                  ? `നിങ്ങൾ പിന്തുടരുന്ന ${unreadCount} വായിക്കാത്ത അറിയിപ്പുകൾ ഉൾപ്പെടെ.`
                  : `${unreadCount} unread updates from followed issues, ideas, and municipal projects.`}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="px-3.5 py-2 bg-[#FAF7F0] hover:bg-[#194B35] hover:text-white text-[#194B35] text-xs font-bold rounded-xl border border-[#EDE6D8] transition flex items-center gap-1.5"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "എല്ലാം വായിച്ചതായി അടയാളപ്പെടുത്തുക" : "Mark All as Read"}</span>
              </button>
            )}

            <button
              onClick={() => setIsPreferencesOpen(true)}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 transition flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-gray-500" />
              <span>{language === "ml" ? "ക്രമീകരണങ്ങൾ" : "Preferences"}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
                activeFilter === tab.key
                  ? "bg-[#194B35] text-white shadow-xs"
                  : "bg-white text-gray-600 border border-[#EDE6D8] hover:bg-gray-50"
              }`}
            >
              <span>{language === "ml" ? tab.label_ml : tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Notification Stream */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-[#EDE6D8] p-12 text-center max-w-md mx-auto space-y-3">
            <Bell className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-bold text-gray-800">
              {language === "ml" ? "പുതിയ അറിയിപ്പുകൾ ഇല്ല" : "No Notifications Found"}
            </h3>
            <p className="text-xs text-gray-500">
              {language === "ml"
                ? "തിരഞ്ഞെടുത്ത വിഭാഗത്തിൽ പുതിയ അറിയിപ്പുകൾ ലഭ്യമല്ല."
                : "There are no notifications in this category right now."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                className={`bg-white rounded-2xl border p-4 sm:p-5 transition shadow-xs flex items-start justify-between gap-4 ${
                  !n.is_read
                    ? "border-[#194B35] bg-[#FAF7F0]/60 ring-1 ring-[#194B35]/20"
                    : "border-[#EDE6D8] hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-center justify-center shrink-0 mt-0.5">
                    {getNotificationIcon(n.type, n.category)}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-sm font-bold ${!n.is_read ? "text-[#194B35]" : "text-gray-900"}`}>
                        {language === "ml" ? n.title_ml : n.title}
                      </h3>
                      {!n.is_read && (
                        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                      )}
                    </div>

                    <p className="text-xs text-[#5C6A64] leading-relaxed">
                      {language === "ml" ? n.message_ml : n.message}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {n.link && (
                        <Link
                          href={n.link}
                          onClick={() => handleMarkAsRead(n.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#194B35] hover:text-[#C39A5B] transition"
                        >
                          <span>{language === "ml" ? "വിശദാംശങ്ങൾ കാണുക" : "View Details"}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      <span className="text-[10px] text-gray-400">
                        {new Date(n.created_at).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {!n.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(n.id)}
                      title="Mark as read"
                      className="p-1.5 text-gray-400 hover:text-[#194B35] hover:bg-[#FAF7F0] rounded-lg transition"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteNotif(n.id)}
                    title="Delete notification"
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* NOTIFICATION PREFERENCES MODAL */}
      {isPreferencesOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-[#EDE6D8]">
            <button
              onClick={() => setIsPreferencesOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] text-[#194B35] flex items-center justify-center border border-[#EDE6D8]">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#194B35] font-malayalam-heading">
                    {language === "ml" ? "അറിയിപ്പ് മുൻഗണനകൾ" : "Notification Preferences"}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    {language === "ml" ? "നിങ്ങൾക്ക് ലഭിക്കേണ്ട അറിയിപ്പുകൾ തിരഞ്ഞെടുക്കുക" : "Manage what updates you receive"}
                  </p>
                </div>
              </div>

              {prefSaveSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-bold text-emerald-800 text-sm">
                    {language === "ml" ? "മുൻഗണനകൾ സൂക്ഷിച്ചു!" : "Preferences Saved Successfully!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSavePreferences} className="space-y-3">
                  <div className="space-y-2.5 divide-y divide-gray-100 text-xs">
                    <label className="flex items-center justify-between pt-2 cursor-pointer">
                      <div>
                        <span className="font-bold text-gray-800 block">
                          {language === "ml" ? "സിവിക് പരാതി പുരോഗതി" : "Civic Issue Status Changes"}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {language === "ml" ? "പരാതികൾ ഇൻസ്പെക്ട് ചെയ്യുമ്പോഴും പരിഹരിക്കുമ്പോഴും" : "When reported issues are acknowledged or resolved"}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.civic_issue_status}
                        onChange={(e) => setPreferences({ ...preferences, civic_issue_status: e.target.checked })}
                        className="rounded text-[#194B35] focus:ring-[#194B35] w-4 h-4"
                      />
                    </label>

                    <label className="flex items-center justify-between pt-2 cursor-pointer">
                      <div>
                        <span className="font-bold text-gray-800 block">
                          {language === "ml" ? "വികസന പദ്ധതി മൈൽസ്റ്റോണുകൾ" : "Development Project Milestones"}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {language === "ml" ? "നിങ്ങൾ പിന്തുടരുന്ന വാർഡുകളിലെ പ്രവൃത്തികൾ" : "Progress on municipal works in your ward"}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.development_update}
                        onChange={(e) => setPreferences({ ...preferences, development_update: e.target.checked })}
                        className="rounded text-[#194B35] focus:ring-[#194B35] w-4 h-4"
                      />
                    </label>

                    <label className="flex items-center justify-between pt-2 cursor-pointer">
                      <div>
                        <span className="font-bold text-gray-800 block">
                          {language === "ml" ? "ജനകീയ ആശയ അപ്‌ഡേറ്റുകൾ" : "People's Voice Idea Updates"}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {language === "ml" ? "പിന്തുണച്ച ആശയങ്ങൾ കൗൺസിലിലേക്ക് നീങ്ങുമ്പോൾ" : "When supported ideas are forwarded or reviewed"}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.idea_update}
                        onChange={(e) => setPreferences({ ...preferences, idea_update: e.target.checked })}
                        className="rounded text-[#194B35] focus:ring-[#194B35] w-4 h-4"
                      />
                    </label>

                    <label className="flex items-center justify-between pt-2 cursor-pointer">
                      <div>
                        <span className="font-bold text-gray-800 block">
                          {language === "ml" ? "കമന്റുകളും ചർച്ചാ മറുപടികളും" : "Comments & Discussion Replies"}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {language === "ml" ? "നിങ്ങളുടെ കുറിപ്പുകൾക്ക് മറ്റുള്ളവർ പ്രതികരിക്കുമ്പോൾ" : "When residents reply to your civic inputs"}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.comment_reply}
                        onChange={(e) => setPreferences({ ...preferences, comment_reply: e.target.checked })}
                        className="rounded text-[#194B35] focus:ring-[#194B35] w-4 h-4"
                      />
                    </label>

                    <label className="flex items-center justify-between pt-2 cursor-pointer">
                      <div>
                        <span className="font-bold text-gray-800 block">
                          {language === "ml" ? "പരിപാടി ഓർമ്മപ്പെടുത്തലുകൾ" : "Event Reminders"}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {language === "ml" ? "ആർ.എസ്.വി.പി ചെയ്ത തദ്ദേശീയ പരിപാടികൾ" : "Reminders for RSVPs and local programs"}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.event_reminder}
                        onChange={(e) => setPreferences({ ...preferences, event_reminder: e.target.checked })}
                        className="rounded text-[#194B35] focus:ring-[#194B35] w-4 h-4"
                      />
                    </label>

                    <label className="flex items-center justify-between pt-2 cursor-pointer">
                      <div>
                        <span className="font-bold text-gray-800 block">
                          {language === "ml" ? "നഗരസഭാ ഔദ്യോഗിക അറിയിപ്പുകൾ" : "Municipal Announcements"}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {language === "ml" ? "ശുചിത്വ മിഷൻ, കുടിവെള്ള നോട്ടീസുകൾ" : "Official public notifications and advisories"}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.announcement}
                        onChange={(e) => setPreferences({ ...preferences, announcement: e.target.checked })}
                        className="rounded text-[#194B35] focus:ring-[#194B35] w-4 h-4"
                      />
                    </label>
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsPreferencesOpen(false)}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
                    >
                      {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#194B35] text-white rounded-xl text-xs font-bold hover:bg-[#143E2C] transition"
                    >
                      {language === "ml" ? "മുൻഗണനകൾ സൂക്ഷിക്കുക" : "Save Preferences"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
      <Footer />
    </div>
  );
}
