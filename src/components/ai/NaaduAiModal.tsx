"use client";

import React, { useState, useEffect } from "react";
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
  X
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

export function NaaduAiModal({ 
  isOpen, 
  onClose,
  initialQuery 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  initialQuery?: string;
}) {
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

  useEffect(() => {
    if (isOpen && initialQuery) {
      handleSend(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialQuery]);

  const suggestedQuestions = language === "ml"
    ? [
        "താനൂർ നഗരസഭയിൽ ഈ ആഴ്ച നടക്കുന്ന പരിപാടികൾ ഏതെല്ലാമാണ്?",
        "താനൂരിലെയും തിരൂരിലെയും പ്ലംബർ/ഇലക്ട്രീഷ്യൻമാരെ ലഭിക്കുമോ?",
        "താനൂർ കെഎസ്ഇബി വൈദ്യുതി മുടങ്ങുന്ന അറിയിപ്പ് വിശദീകരിക്കാമോ?",
        "താനൂർ നഗരസഭയിൽ റോഡിലെ കുഴികൾ എങ്ങനെയാണ് അറിയിക്കേണ്ടത്?",
      ]
    : [
        "What upcoming events are scheduled around Tanur & Malappuram?",
        "Can I find verified electricians or plumbers in Tanur?",
        "Tell me about the latest KSEB scheduled maintenance notice in Tanur.",
        "How do I report civic issues to Tanur Municipality?",
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#FAF7F0] rounded-3xl shadow-2xl border border-[#E7DFD0] flex flex-col h-[85vh] max-h-[700px] overflow-hidden text-[#1A2420]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E5DFD1] flex items-center justify-between bg-[#F3EFE6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1B4D36] text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold font-malayalam-serif text-base text-[#1B4D36] leading-none">
                  {t("aiTitle")}
                </h3>
                <span className="text-[10px] bg-[#E0F1E7] text-[#1B4D36] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#BDE3CE]">
                  Verified AI
                </span>
              </div>
              <p className="text-xs text-[#5C6A64] mt-1">
                {currentCommunity ? (language === "ml" ? currentCommunity.name_ml : currentCommunity.name) : "Kerala"} • {t("aiGroundedNotice")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#5C6A64] hover:text-[#1A2420] border border-[#DDD5C5] flex items-center justify-center transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex-shrink-0 flex items-center justify-center font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? "bg-[#1B4D36] text-white rounded-br-xs"
                      : "bg-white text-[#1A2420] border border-[#EAE4D7] rounded-bl-xs font-malayalam-body"
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Sources citations */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#F3EFE6]">
                      <div className="text-[10px] font-bold text-[#1B4D36] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#B87A1E]" />
                        <span>{t("sourceRecords")}</span>
                      </div>
                      <div className="space-y-1.5">
                        {msg.sources.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.link}
                            className="block px-2.5 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE6] text-xs text-[#1A2420] border border-[#E5DFD1] transition"
                          >
                            <div className="font-semibold flex items-center justify-between text-[#1B4D36]">
                              <span>{src.title}</span>
                              <ExternalLink className="w-3 h-3 text-[#B87A1E]" />
                            </div>
                            <div className="text-[10px] text-[#5C6A64] truncate mt-0.5">
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
                  <div className="w-8 h-8 rounded-full bg-[#E8E1D2] text-[#1B4D36] flex-shrink-0 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-[#5C6A64] animate-pulse">
              <div className="w-8 h-8 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center">
                <Sparkles className="w-4 h-4 animate-spin text-[#1B4D36]" />
              </div>
              <span>പ്രാദേശിക വിവരങ്ങൾ പരിശോധിക്കുന്നു...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2.5 bg-[#F3EFE6] border-t border-[#E5DFD1]">
          <div className="text-[11px] font-semibold text-[#5C6A64] mb-1.5 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-[#1B4D36]" />
            <span>{t("aiSuggestedTitle")}</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs bg-white border border-[#E1D9C8] hover:border-[#1B4D36] hover:text-[#1B4D36] text-[#3E4D45] transition active:scale-95 flex-shrink-0 shadow-xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-[#E5DFD1]">
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
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] focus:outline-none focus:ring-2 focus:ring-[#1B4D36] transition text-[#1A2420]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-4 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-50 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95 shadow-sm"
            >
              <span>{t("aiAskBtn")}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-[#7A8880] text-center mt-2 flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3 text-[#B87A1E]" />
            <span>{t("aiDisclaimer")}</span>
          </p>
        </div>

      </div>
    </div>
  );
}
