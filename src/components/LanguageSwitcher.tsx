"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LANGUAGES } from "@/i18n/translations";
import { GlobeIcon, ChevronDownIcon } from "./icons";

type Props = {
  /** Renders the options inline instead of in a dropdown (mobile menu). */
  variant?: "dropdown" | "inline";
};

export default function LanguageSwitcher({ variant = "dropdown" }: Props) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-3">
        <GlobeIcon className="h-5 w-5 text-white/60" />
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`text-lg font-medium transition-colors ${
              l.code === lang ? "text-brand" : "text-white/70 hover:text-white"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    );
  }

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
      >
        <GlobeIcon className="h-4 w-4" />
        <span>{current.short}</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[9rem] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 py-1 shadow-xl"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                  l.code === lang ? "text-brand" : "text-white/80"
                }`}
              >
                <span>{l.label}</span>
                <span className="text-xs text-white/40">{l.short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
