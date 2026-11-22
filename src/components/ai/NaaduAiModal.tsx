"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  X,
  Copy,
  Check,
  ChevronRight,
  Maximize2,
  RotateCcw
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

interface Message {
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

export function NaaduAiModal({ 
  isOpen, 
  onClose,
  initialQuery 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  initialQuery?: string;
}) {
  const { user } = useAuth();
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialWelcomeMessage: Message = {
    id: "welcome-modal",
    sender: "ai",
    text: `Hello! I am **Naadu AI**, your verified civic assistant for **Tanur Municipality**.

Ask me about:
• **Public Services**: Certificates, permits, and K-Smart procedures.
• **Civic Issues**: Lodging complaints for potholes, streetlights, or waste.
• **Development Projects**: Budget allocations and ongoing civil works in Wards 1 to 45.
• **Municipal Facts**: Official contacts and the municipal switchboard (**0494 2440228**).`,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    suggestedActions: [
      { label: "Browse Services", link: "/public-services", description: "View service directory" },
      { label: "Report Issue", link: "/civic/report", description: "Lodge a complaint" }
    ]
  };

  const [messages, setMessages] = useState<Message[]>([initialWelcomeMessage]);

  useEffect(() => {
    if (isOpen && initialQuery) {
      handleSend(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialQuery]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleReset = () => {
    setMessages([
      {
        ...initialWelcomeMessage,
        id: "welcome-modal-" + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
    setInputQuery("");
  };

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
          userId: user?.id,
          userName: user?.display_name || user?.username,
          language: "en",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const aiMsg: Message = {
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
        const errorMsg: Message = {
          id: "err-" + Date.now(),
          sender: "ai",
          text: data.message || "I could not process your inquiry at this moment. Please rephrase or try again shortly.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const errorMsg: Message = {
        id: "err-" + Date.now(),
        sender: "ai",
        text: "Network connection error. Please check your internet connection and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in font-sans">
      <div className="w-full max-w-2xl bg-[#FAF7F0] rounded-3xl shadow-2xl border border-[#EDE6D8] flex flex-col h-[85vh] max-h-[720px] overflow-hidden text-[#1A2420]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#EDE6D8] flex items-center justify-between bg-gradient-to-r from-[#194B35] to-[#123626] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs text-[#C39A5B] flex items-center justify-center shadow-xs border border-white/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base leading-none tracking-tight">
                  Naadu AI
                </h3>
                <span className="text-[10px] bg-[#C39A5B]/20 text-[#C39A5B] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#C39A5B]/30">
                  Verified Civic Assistant
                </span>
              </div>
              <p className="text-[11px] text-[#EDE6D8] mt-1">
                Tanur Municipality • Grounded in official public records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href="/ai"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/20"
              title="Open full page assistant"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleReset}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/20"
              title="Reset conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/20 ml-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
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
                  <div className="w-8 h-8 rounded-2xl bg-white text-[#194B35] border border-[#DDD5C5] shrink-0 flex items-center justify-center font-bold text-xs mt-1 shadow-2xs">
                    <Sparkles className="w-4 h-4 text-[#C39A5B]" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs space-y-2.5 ${
                    isUser
                      ? "bg-[#194B35] text-white rounded-br-xs"
                      : msg.isError
                      ? "bg-rose-50 text-rose-900 border border-rose-200 rounded-bl-xs"
                      : "bg-white text-[#1A2420] border border-[#EDE6D8] rounded-bl-xs"
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Exact Reference Match */}
                  {msg.exactReferenceMatch && (
                    <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#194B35]">
                        <span>Reference Record</span>
                        <span className="font-mono text-[10px]">{msg.exactReferenceMatch.referenceNumber}</span>
                      </div>
                      <p className="text-[11px] text-[#5C6A64]">{msg.exactReferenceMatch.details}</p>
                      <Link
                        href={msg.exactReferenceMatch.link}
                        onClick={onClose}
                        className="text-xs font-bold text-[#194B35] underline block pt-0.5"
                      >
                        Open Public Tracking Page →
                      </Link>
                    </div>
                  )}

                  {/* Sources citations */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2.5 border-t border-[#EDE6D8]">
                      <div className="text-[10px] font-bold text-[#194B35] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C39A5B]" />
                        <span>Verified Sources</span>
                      </div>
                      <div className="space-y-1.5">
                        {msg.sources.map((src, idx) => (
                          <Link
                            key={idx}
                            href={src.link}
                            onClick={onClose}
                            className="block px-2.5 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-neutral-100 text-xs text-[#1A2420] border border-[#EDE6D8] transition"
                          >
                            <div className="font-bold flex items-center justify-between text-[#194B35]">
                              <span className="truncate">{src.title}</span>
                              <ExternalLink className="w-3 h-3 text-[#C39A5B] shrink-0" />
                            </div>
                            <div className="text-[10px] text-[#7A8880] truncate mt-0.5">
                              {src.verifiedSource} ({src.verificationDate})
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested action pills */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="pt-1.5 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, aIdx) => (
                        <Link
                          key={aIdx}
                          href={action.link}
                          onClick={onClose}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF7F0] hover:bg-neutral-100 border border-[#DDD5C5] text-[#194B35] text-[11px] font-bold transition"
                        >
                          <span>{action.label}</span>
                          <ChevronRight className="w-3 h-3 text-[#C39A5B]" />
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] opacity-60 mt-1">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-[#194B35] transition inline-flex items-center gap-1"
                      >
                        {copiedId === msg.id ? (
                          <span className="text-emerald-700 font-bold">Copied</span>
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
                  <div className="w-8 h-8 rounded-2xl bg-[#EDE6D8] text-[#194B35] shrink-0 flex items-center justify-center font-bold text-xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-[#5C6A64] animate-pulse">
              <div className="w-8 h-8 rounded-2xl bg-white border border-[#EDE6D8] text-[#194B35] flex items-center justify-center">
                <Sparkles className="w-4 h-4 animate-spin text-[#C39A5B]" />
              </div>
              <span>Checking verified municipal records...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2 bg-white border-t border-[#EDE6D8]">
          <div className="text-[10px] font-bold text-[#7A8880] mb-1 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-[#194B35]" />
            <span>Suggested Questions</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] bg-[#FAF7F0] border border-[#DDD5C5] hover:border-[#194B35] hover:text-[#194B35] text-[#1A2420] transition active:scale-95 shrink-0 shadow-2xs disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-[#EDE6D8]">
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
              placeholder="Ask about public services, complaints, or ward projects..."
              className="flex-1 px-4 py-2 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35] transition"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-4 py-2 rounded-xl bg-[#194B35] hover:bg-[#123626] disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95 shadow-xs"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <p className="text-[10px] text-[#7A8880] text-center mt-2 flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3 text-[#C39A5B]" />
            <span>Grounded in official municipal data • Switchboard: <strong>0494 2440228</strong></span>
          </p>
        </div>

      </div>
    </div>
  );
}
