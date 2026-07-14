"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MenuIcon, CloseIcon } from "./icons";
import { useT } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { id: "pricing", label: t.nav.pricing },
    { id: "virtual-tour", label: t.nav.virtualTour },
    { id: "location", label: t.nav.location },
    { id: "reviews", label: t.nav.reviews },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavigate = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-black/90 backdrop-blur-md border-b border-white/10"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => handleNavigate("hero")}
          className="flex items-center gap-2.5"
        >
          <Image
            src="/logo.jpg"
            alt="Sykhai Gym logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
            priority
          />
          <span className="font-display font-brand text-2xl tracking-wide text-white">
            SYKHAI <span className="text-brand">GYM</span>
          </span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavigate(link.id)}
                className="text-sm font-medium text-white/80 transition-colors hover:text-brand"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
          <button
            onClick={() => handleNavigate("pricing")}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-brand-dim"
          >
            {t.nav.getDayPass}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center text-white"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col items-center gap-8 border-t border-white/10 bg-black px-6 py-10 md:hidden">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              className="font-display text-2xl tracking-wide text-white hover:text-brand"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavigate("pricing")}
            className="mt-2 rounded-full bg-brand px-8 py-3 font-semibold text-black hover:bg-brand-dim"
          >
            {t.nav.getDayPass}
          </button>
        </div>
      )}
    </header>
  );
}
