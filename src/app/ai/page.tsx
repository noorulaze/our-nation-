"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth/context";
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
  Copy, 
  Check, 
  RotateCcw, 
  ArrowRight, 
  ChevronRight, 
  Info, 
  Clock, 
  Compass, 
  Building2, 
  Phone,
  RefreshCw
} from "lucide-react";

interface MessageSource {
  id: string;
  title: string;
  domain: string;
  summary: string;
  link: string;
  verifiedSource: string;
  verificationDate: string;
}

interface ActionPill {
  label: string;
  link: string;
  description: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  sources?: MessageSource[];
  suggestedActions?: ActionPill[];
  exactReferenceMatch?: {
    type: "civic_issue" | "service_application";
    referenceNumber: string;
    status: string;
    title: string;
    details: string;
    link: string;
  };
  engine?: string;
  timestamp: string;
  isError?: boolean;
}

const SUGGESTED_QUESTIONS = [
  "How can I report a pothole?",
  "What public services are available?",
  "How do I track my complaint?",
  "What development projects are happening in my ward?",
  "Where can I find official municipality contact information?"
];

export default function AiPage() {
  const { user } = useAuth();
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialWelcomeMessage: ChatMessage = {
    id: "welcome-msg",
    sender: "ai",
    text: `Hello! I am **Naadu AI**, your intelligent civic assistant for **Tanur Municipality**.

I can help you understand:
• **Online Public Services**: Document requirements, statutory procedures, and fees under K-Smart.
• **Civic Issue Reporting**: How to lodge reports for roads, streetlights, or waste, and track complaint statuses.
• **Development Projects**: Verified civil works, three-way budgets, and physical progress across Wards 1 to 45.
• **Municipal Facts**: Statutory offices, verified council facts, and the central switchboard (**0494 2440228**).

*Notice: Naadu AI is operated by the independent OUR NATION civic platform. I provide verified municipal guidance and do not make official administrative decisions.*`,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    suggestedActions: [
      { label: "Browse Services", link: "/public-services", description: "View 8 statutory service categories" },
      { label: "Report Civic Issue", link: "/civic/report", description: "Lodge a community problem" },
      { label: "Development Tracker", link: "/development", description: "Inspect projects across 45 wards" }
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcomeMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleResetConversation = () => {
    setMessages([
      {
        ...initialWelcomeMessage,
        id: "welcome-msg-" + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
    setInputQuery("");
    setLastFailedQuery(null);
  };

  const handleSend = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q || isLoading) return;

    setLastFailedQuery(null);

    const userMsg: ChatMessage = {
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
          userId: user?.id,
          userName: user?.display_name || user?.username,
          language: "en",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const aiMsg: ChatMessage = {
          id: "ai-" + Date.now(),
          sender: "ai",
          text: data.answer,
          sources: data.sources,
          suggestedActions: data.suggestedActions,
          exactReferenceMatch: data.exactReferenceMatch,
          engine: data.engine,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        setLastFailedQuery(q);
        const errorMsg: ChatMessage = {
          id: "err-" + Date.now(),
          sender: "ai",
          text: data.message || "I encountered a temporary communication issue. Please retry your inquiry or rephrase your question.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      setLastFailedQuery(q);
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "ai",
        text: "Network connection error. Please verify your internet connection and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420] font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col">
        {/* Assistant Header Hero */}
        <div className="bg-gradient-to-r from-[#194B35] to-[#123626] rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-card border border-[#276449] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center font-bold text-[#C39A5B] border border-white/20 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Naadu AI</h1>
                  <span className="text-[10px] bg-[#C39A5B]/20 text-[#C39A5B] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#C39A5B]/30">
                    Grounded Civic Intelligence
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#EDE6D8] mt-0.5">
                  Verified Municipal Guidance & Citizen Navigation for Tanur (Wards 1–45)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleResetConversation}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
                title="Start a fresh conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Conversation</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-5 text-[11px] text-[#EDE6D8]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C39A5B]" />
              <span>Grounded in statutory Kerala gazettes & municipal charters</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C39A5B]" />
              <span>Central Switchboard: <strong>0494 2440228</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#C39A5B]" />
              <span>Grade II Urban Local Body • 45 Wards</span>
            </div>
          </div>
        </div>

        {/* Chat Window Container */}
        <div className="bg-white rounded-3xl border border-[#EDE6D8] shadow-card flex flex-col flex-1 h-[680px] overflow-hidden">
          
          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 sm:gap-4 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-9 h-9 rounded-2xl bg-[#FAF7F0] text-[#194B35] border border-[#DDD5C5] shrink-0 flex items-center justify-center font-bold text-xs shadow-xs mt-1">
                      <Sparkles className="w-4 h-4 text-[#C39A5B]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-xs space-y-3 ${
                      isUser
                        ? "bg-[#194B35] text-white rounded-br-xs"
                        : msg.isError
                        ? "bg-rose-50 text-rose-900 border border-rose-200 rounded-bl-xs"
                        : "bg-[#FAF7F0] text-[#1A2420] border border-[#EDE6D8] rounded-bl-xs"
                    }`}
                  >
                    {/* Message Body with Markdown formatting */}
                    <div className="whitespace-pre-line leading-relaxed font-normal">
                      {msg.text}
                    </div>

                    {/* Exact Reference Tracking Highlight */}
                    {msg.exactReferenceMatch && (
                      <div className="p-3 rounded-2xl bg-white border border-[#DDD5C5] shadow-xs space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-[#194B35]">
                          <span>Verified Tracking Record</span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[#FAF7F0] border border-[#DDD5C5]">
                            {msg.exactReferenceMatch.referenceNumber}
                          </span>
                        </div>
                        <p className="text-xs text-[#5C6A64]">
                          {msg.exactReferenceMatch.details}
                        </p>
                        <div className="pt-1">
                          <Link
                            href={msg.exactReferenceMatch.link}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#194B35] hover:text-[#C39A5B] transition underline"
                          >
                            <span>Open Public Status Tracking Page</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Grounded Source Citations */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#DDD5C5]/60 space-y-2">
                        <div className="text-[10px] font-bold text-[#194B35] uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#C39A5B]" />
                          <span>Verified Municipal Source Records</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {msg.sources.map((src, idx) => (
                            <Link
                              key={idx}
                              href={src.link}
                              className="p-2.5 rounded-xl bg-white hover:bg-neutral-50 border border-[#EDE6D8] text-xs text-[#1A2420] transition group block"
                            >
                              <div className="font-bold text-[#194B35] group-hover:text-[#C39A5B] flex items-center justify-between transition">
                                <span className="truncate">{src.title}</span>
                                <ExternalLink className="w-3 h-3 text-[#C39A5B] shrink-0 ml-1" />
                              </div>
                              <div className="text-[10px] text-[#7A8880] truncate mt-0.5">
                                {src.verifiedSource} ({src.verificationDate})
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contextual Action Buttons */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        {msg.suggestedActions.map((action, aIdx) => (
                          <Link
                            key={aIdx}
                            href={action.link}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF7F0] border border-[#DDD5C5] text-[#194B35] text-xs font-bold transition shadow-2xs hover:border-[#194B35]"
                            title={action.description}
                          >
                            <span>{action.label}</span>
                            <ChevronRight className="w-3 h-3 text-[#C39A5B]" />
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Message Footer: Timestamp & Copy */}
                    <div className="flex items-center justify-between text-[10px] text-[#7A8880] pt-1">
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="inline-flex items-center gap-1 text-[#5C6A64] hover:text-[#194B35] transition p-1"
                          title="Copy response text"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-9 h-9 rounded-2xl bg-[#EDE6D8] text-[#194B35] shrink-0 flex items-center justify-center font-bold text-xs mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 items-center text-xs text-[#5C6A64] animate-pulse">
                <div className="w-9 h-9 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] text-[#194B35] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 animate-spin text-[#C39A5B]" />
                </div>
                <span>Checking verified municipal records and gazettes...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Question Prompts */}
          <div className="px-4 sm:px-6 py-2.5 bg-[#FAF7F0] border-t border-[#EDE6D8]">
            <div className="text-[11px] font-bold text-[#5C6A64] mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#194B35]" />
              <span>Suggested Inquiries</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl text-xs bg-white border border-[#DDD5C5] hover:border-[#194B35] hover:text-[#194B35] text-[#1A2420] transition active:scale-95 shrink-0 shadow-2xs disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Retry Prompt Bar if previous query failed */}
          {lastFailedQuery && (
            <div className="px-4 sm:px-6 py-2 bg-rose-50 border-t border-rose-200 flex items-center justify-between text-xs text-rose-800">
              <span>Previous inquiry failed to complete.</span>
              <button
                onClick={() => handleSend(lastFailedQuery)}
                className="font-bold underline flex items-center gap-1 hover:text-rose-950"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* Input Form Bar */}
          <div className="p-3.5 sm:p-4 bg-white border-t border-[#EDE6D8]">
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
                placeholder="Ask about public services, complaint tracking, or ward development..."
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35] transition"
              />
              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#194B35] hover:bg-[#123626] disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95 shadow-xs"
              >
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="text-[10px] text-[#7A8880] text-center mt-2 flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3 text-[#C39A5B]" />
              <span>
                Naadu AI answers using verified municipal data. For official council orders, contact the Tanur Switchboard at <strong>0494 2440228</strong>.
              </span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
