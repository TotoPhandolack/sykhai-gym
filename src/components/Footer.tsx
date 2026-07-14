"use client";

import Image from "next/image";
import { MapPinIcon, ArrowRightIcon } from "./icons";
import { MAPS_URL } from "@/data/business";
import { useT } from "@/i18n/LanguageProvider";

export default function Footer() {
  const t = useT();
  const links = [
    { id: "pricing", label: t.nav.pricing },
    { id: "virtual-tour", label: t.nav.virtualTour },
    { id: "location", label: t.nav.location },
    { id: "reviews", label: t.nav.reviews },
  ];
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-3">
        <div>
          <a href="#hero" className="flex items-center gap-2.5">
            <Image
              src="/logo.jpg"
              alt="Sykhai Gym logo"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="font-display text-2xl tracking-wide text-white">
              SYKHAI <span className="text-brand">GYM</span>
            </span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-white/60">
            {t.footer.tagline}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-[0.3em] text-brand">
            {t.footer.quickLinks}
          </h3>
          <ul className="mt-4 space-y-3">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-sm text-white/70 hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-[0.3em] text-brand">
            {t.footer.visitUs}
          </h3>
          <p className="mt-4 text-sm text-white/70">
            {t.footer.hoursLine}
            <br />
            {t.footer.sundayClosed}
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dim"
          >
            <MapPinIcon className="h-4 w-4" />
            {t.footer.getDirections}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} Sykhai Gym. {t.footer.rights}
      </div>
    </footer>
  );
}
