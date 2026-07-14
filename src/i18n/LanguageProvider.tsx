"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEFAULT_LANGUAGE,
  LanguageCode,
  Translation,
  translations,
} from "./translations";

type LanguageContextValue = {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "sykhai-lang";

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "en" || value === "lo" || value === "th";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  // Restore the saved choice after mount (avoids hydration mismatch).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguageCode(saved)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: LanguageCode) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

/** Convenience hook for the current translation dictionary. */
export function useT() {
  return useLanguage().t;
}
