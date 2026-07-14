"use client";

import HoursPanel from "./HoursPanel";
import { MapPinIcon, ArrowRightIcon } from "./icons";
import { MAPS_URL, MAPS_EMBED_URL } from "@/data/business";
import { useT } from "@/i18n/LanguageProvider";

export default function Location() {
  const t = useT();
  return (
    <section id="location" className="scroll-mt-20 bg-black px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <HoursPanel />

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-dim"
          >
            <MapPinIcon className="h-4 w-4" />
            {t.hours.getDirections}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="h-80 overflow-hidden rounded-2xl border border-white/10 lg:h-full lg:min-h-[420px]">
          <iframe
            src={MAPS_EMBED_URL}
            className="h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sykhai Gym location on Google Maps"
          />
        </div>
      </div>
    </section>
  );
}
