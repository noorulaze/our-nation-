"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, TranslationKey } from "./translations";
import { PreferredLanguage } from "@/types/database";

interface LanguageContextType {
  language: PreferredLanguage;
  setLanguage: (lang: PreferredLanguage) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<PreferredLanguage>("ml");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check saved preference or browser setting
    const saved = localStorage.getItem("nammude_naadu_lang") as PreferredLanguage | null;
    const initial = saved === "en" || saved === "ml" ? saved : "ml";
    setLanguageState(initial);
    if (typeof document !== "undefined") {
      document.documentElement.lang = initial;
      document.documentElement.classList.toggle("lang-ml", initial === "ml");
      document.documentElement.classList.toggle("lang-en", initial === "en");
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: PreferredLanguage) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("nammude_naadu_lang", lang);
      document.documentElement.lang = lang;
      document.documentElement.classList.toggle("lang-ml", lang === "ml");
      document.documentElement.classList.toggle("lang-en", lang === "en");
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "ml" ? "en" : "ml");
  };

  const t = (key: TranslationKey): string => {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
