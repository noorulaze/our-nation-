"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Info
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  sources?: Array<{
    type: string;
    title: string;
    details: string;
    link: string;
  }>;
  engine?: string;
  timestamp: string;
}

export default function AiPage() {
  const { t, language } = useLanguage();
  const { currentCommunity } = useCommunity();
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: language === "ml"
        ? `നമസ്കാരം! ഞാൻ നിങ്ങളുടെ പ്രാദേശിക AI സഹായിയായ "നാട് AI". ${currentCommunity ? currentCommunity.name_ml : "കേരളത്തിലെ"} പരിപാടികൾ, സേവനങ്ങൾ, പൊതു അറിയിപ്പുകൾ എന്നിവയെക്കുറിച്ച് എന്നോട് ചോദിക്കാം.`
        : `Hello! I am Naadu AI, your verified community assistant. Ask me about upcoming events, trusted local services, announcements, or civic updates in ${currentCommunity ? currentCommunity.name : "Kerala"}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const suggestedQuestions = language === "ml"
    ? [
        "കാക്കനാട് ഈ ആഴ്ച നടക്കുന്ന പരിപാടികൾ ഏതെല്ലാമാണ്?",
        "ഫോർട്ട് കൊച്ചിയിലെ ഇലക്ട്രീഷ്യൻമാരുടെ നമ്പർ ലഭിക്കുമോ?",
        "കെഎസ്ഇബി വൈദ്യുതി മുടങ്ങുന്ന അറിയിപ്പ് വിശദീകരിക്കാമോ?",
        "റോഡിലെ കുഴികൾ എങ്ങനെയാണ് അധികാരികളെ അറിയിക്കേണ്ടത്?",
      ]
    : [
        "What upcoming events are scheduled around Kakkanad?",
        "Can I find verified electricians or plumbers in this area?",
        "Tell me about the latest KSEB scheduled maintenance notice.",
        "How do I report a pothole or streetlight issue?",
      ];

  const handleSend = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q || isLoading) return;

    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          communityId: currentCommunity?.id,
          language,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const aiMsg: Message = {
          id: "ai-" + Date.now(),
          sender: "ai",
          text: data.answer,
          sources: data.sources,
          engine: data.engine,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        const errorMsg: Message = {
          id: "err-" + Date.now(),
          sender: "ai",
          text: language === "ml"
            ? "ക്ഷമിക്കണം, താൽക്കാലികമായി മറുപടി നൽകാൻ സാധിച്ചില്ല. ദയവായി അല്പം കഴിഞ്ഞ് ശ്രമിക്കുക."
            : "Sorry, I could not process your query at this moment. Please try again shortly.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const errorMsg: Message = {
        id: "err-" + Date.now(),
        sender: "ai",
        text: "Network connection error. Please verify your connection.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-brand-800 to-brand-900 rounded-2xl p-6 text-white mb-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6 text-brand-100" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">{t("aiTitle")}</h1>
              <p className="text-xs sm:text-sm text-brand-100">{t("aiSubtitle")}</p>
            </div>
          </div>
          <p className="text-xs text-brand-200/90 leading-relaxed max-w-2xl mt-2">
            {t("aiGroundedNotice")}
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-surface rounded-2xl border border-border shadow-sm flex flex-col h-[600px] overflow-hidden">
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                      isUser
                        ? "bg-brand-700 text-white rounded-br-xs"
                        : "bg-muted/70 text-foreground border border-border/80 rounded-bl-xs"
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/60">
                        <div className="text-[11px] font-bold text-brand-800 dark:text-brand-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{t("sourceRecords")}</span>
                        </div>
                        <div className="space-y-1.5">
                          {msg.sources.map((src, idx) => (
                            <a
                              key={idx}
                              href={src.link}
                              className="block px-2.5 py-1.5 rounded-lg bg-surface hover:bg-brand-50 text-xs text-foreground border border-border/70 hover:border-brand-300 transition"
                            >
                              <div className="font-semibold flex items-center justify-between text-brand-700">
                                <span>{src.title}</span>
                                <ExternalLink className="w-3 h-3 opacity-60" />
                              </div>
                              <div className="text-[10px] text-muted-foreground truncate">
                                {src.details}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-[10px] opacity-60 mt-1 text-right">
                      {msg.timestamp}
                    </div>
                  </div>
                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex-shrink-0 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 items-center text-xs text-muted-foreground animate-pulse">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <span>Checking verified platform records...</span>
              </div>
            )}
          </div>

          {/* Suggested prompts */}
          <div className="px-5 py-3 bg-muted/30 border-t border-border/50">
            <div className="text-[11px] font-semibold text-muted-foreground mb-1.5 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-brand-600" />
              <span>{t("aiSuggestedTitle")}</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs bg-surface border border-border hover:border-brand-400 hover:text-brand-700 text-muted-foreground transition active:scale-95 flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-4 bg-surface border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={t("aiInputPlaceholder")}
                className="flex-1 px-4 py-3 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-foreground"
              />
              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="px-5 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-medium text-sm flex items-center gap-2 transition active:scale-95"
              >
                <span>{t("aiAskBtn")}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[11px] text-muted-foreground text-center mt-2.5 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>{t("aiDisclaimer")}</span>
            </p>
          </div>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
