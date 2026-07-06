"use client";

import { useEffect, useState } from "react";
import { MenuIcon, CloseIcon } from "./icons";

const LINKS = [
  { id: "pricing", label: "Pricing" },
  { id: "virtual-tour", label: "Virtual Tour" },
  { id: "location", label: "Location" },
  { id: "reviews", label: "Reviews" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          className="font-display text-2xl tracking-wide text-white"
        >
          SYKHAI <span className="text-brand">GYM</span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
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

        <button
          onClick={() => handleNavigate("pricing")}
          className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-brand-dim md:inline-flex"
        >
          Get a Day Pass
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center text-white md:hidden"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col items-center gap-8 border-t border-white/10 bg-black px-6 py-10 md:hidden">
          {LINKS.map((link) => (
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
            Get a Day Pass
          </button>
        </div>
      )}
    </header>
  );
}
