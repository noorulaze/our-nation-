"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CivicNav } from "@/components/civic/CivicNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  civicStore, 
  CivicNotification 
} from "@/lib/data/civicConnectData";
import { 
  Bell, 
  CheckCheck, 
  CheckCircle2, 
  Clock, 
  Send, 
  ShieldCheck, 
  MessageSquare, 
  AlertTriangle, 
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function CivicNotificationsPage() {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<CivicNotification[]>(() => civicStore.getNotifications());
  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleMarkAsRead = (id: string) => {
    civicStore.markNotificationAsRead(id);
    setNotifications([...civicStore.getNotifications()]);
  };

  const handleMarkAllAsRead = () => {
    civicStore.markAllNotificationsAsRead();
    setNotifications([...civicStore.getNotifications()]);
  };

  const filteredNotifs = filterUnreadOnly
    ? notifications.filter(n => !n.is_read)
    : notifications;

  const getNotifIcon = (type: CivicNotification['type']) => {
    switch (type) {
      case "resolved":
        return { icon: CheckCircle2, color: "text-emerald-700 bg-emerald-100" };
      case "forwarded":
        return { icon: Send, color: "text-amber-700 bg-amber-100" };
      case "verified":
        return { icon: ShieldCheck, color: "text-purple-700 bg-purple-100" };
      case "comment":
        return { icon: MessageSquare, color: "text-blue-700 bg-blue-100" };
      default:
        return { icon: Bell, color: "text-[#194B35] bg-[#E0F1E7]" };
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <CivicNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-[#194B35] text-amber-300 flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-[#194B35] uppercase tracking-wider">
                  സിവിക് നോട്ടിഫിക്കേഷനുകൾ
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "പൗര അറിയിപ്പുകൾ" : "Civic Notifications"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                {language === "ml"
                  ? "നിങ്ങൾ സമർപ്പിച്ചതും ഫോളോ ചെയ്യുന്നതുമായ പരാതികളുടെ പുതിയ സ്റ്റാറ്റസ് അപ്‌ഡേറ്റുകൾ ഇവിടെ കാണാം."
                  : "Status updates, verification notices, and authority forwardings for your civic issues."}
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs font-bold text-[#194B35] hover:bg-[#FAF4E6] transition shadow-xs self-start sm:self-auto"
              >
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                <span>{language === "ml" ? "എല്ലാം വായിച്ചതായി രേഖപ്പെടുത്തുക" : "Mark All as Read"}</span>
              </button>
            )}
          </div>

          {/* Quick Filter Switch */}
          <div className="flex items-center gap-2 mt-6 text-xs">
            <button
              onClick={() => setFilterUnreadOnly(false)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                !filterUnreadOnly
                  ? "bg-[#194B35] text-white"
                  : "bg-white text-neutral-600 border border-[#DDD5C5] hover:bg-neutral-50"
              }`}
            >
              എല്ലാ അറിയിപ്പുകളും ({notifications.length})
            </button>
            <button
              onClick={() => setFilterUnreadOnly(true)}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                filterUnreadOnly
                  ? "bg-[#194B35] text-white"
                  : "bg-white text-neutral-600 border border-[#DDD5C5] hover:bg-neutral-50"
              }`}
            >
              <span>വായിക്കാത്തവ മാത്രം</span>
              {unreadCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Notifications List */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredNotifs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8DCBF] p-10 text-center max-w-md mx-auto shadow-xs my-6">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <Bell className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-[#194B35] mb-1 font-serif">
              {language === "ml" ? "പുതിയ അറിയിപ്പുകളൊന്നുമില്ല" : "No Notifications"}
            </h3>
            <p className="text-xs text-[#5C6A64]">
              {language === "ml"
                ? "നിങ്ങളുടെ പരാതികളിലോ ഫോളോ ചെയ്യുന്ന വിഷയങ്ങളിലോ പുതിയ പുരോഗതി ഉണ്ടാകുമ്പോൾ ഇവിടെ കാണിക്കും."
                : "You are all caught up! New updates on your reports or followed issues will appear here."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifs.map((notif) => {
              const { icon: Icon, color } = getNotifIcon(notif.type);
              return (
                <div
                  key={notif.id}
                  className={`p-4 rounded-2xl border transition shadow-xs flex items-start justify-between gap-4 ${
                    !notif.is_read
                      ? "bg-[#FFFDF7] border-amber-300/80 ring-1 ring-amber-200/50"
                      : "bg-white border-[#E8DCBF] hover:border-[#194B35]/30"
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-xs sm:text-sm text-[#1A2420]">
                          {notif.title}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-[#194B35] bg-[#E0F1E7] px-2 py-0.2 rounded border border-[#BDE3CE]">
                          {notif.issue_tracking_id}
                        </span>
                        {!notif.is_read && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        )}
                      </div>

                      <p className="text-xs text-[#5C6A64] leading-relaxed mb-2">
                        {notif.description}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                        <span>{new Date(notif.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                        <span>•</span>
                        <Link
                          href={`/civic/issues/${notif.issue_id}`}
                          className="font-bold text-[#194B35] hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>പരാതി പരിശോധിക്കുക</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {!notif.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="text-[11px] text-neutral-400 hover:text-[#194B35] shrink-0 font-medium p-1"
                      title="വായിച്ചതായി അടയാളപ്പെടുത്തുക"
                    >
                      വായിച്ചു
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
