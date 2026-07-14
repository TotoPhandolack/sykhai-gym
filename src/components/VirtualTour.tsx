"use client";

import { useState } from "react";
import { tourStops } from "@/data/tour-stops";
import TourViewer from "./TourViewer";
import TourStopThumb from "./TourStopThumb";
import { useT } from "@/i18n/LanguageProvider";
import { interpolate } from "@/i18n/translations";

export default function VirtualTour() {
  const t = useT();
  const [activeId, setActiveId] = useState(tourStops[0].id);
  const active = tourStops.find((s) => s.id === activeId) ?? tourStops[0];

  return (
    <section
      id="virtual-tour"
      className="scroll-mt-20 bg-zinc-950 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm tracking-[0.3em] text-brand">
            {t.tour.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">
            {t.tour.heading}
          </h2>
          <p className="mt-4 text-white/70">{t.tour.subtitle}</p>
        </div>

        <div className="mt-14">
          <TourViewer
            src={active.image}
            alt={active.title}
            hotspots={active.hotspots}
            defaultYaw={active.defaultYaw}
            defaultPitch={active.defaultPitch}
            onNavigate={setActiveId}
            className="h-72 w-full sm:h-[28rem]"
          />

          <div className="mt-4 flex items-center justify-between gap-4">
            <h3 className="font-display text-2xl tracking-wide text-white">
              {active.title}
            </h3>
            <span className="shrink-0 text-sm text-white/50">
              {interpolate(t.tour.stopOf, {
                index: tourStops.findIndex((s) => s.id === active.id) + 1,
                total: tourStops.length,
              })}
            </span>
          </div>

          <div className="mt-8 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2">
            {tourStops.map((stop) => (
              <button
                key={stop.id}
                onClick={() => setActiveId(stop.id)}
                className="w-40 shrink-0 snap-start text-left sm:w-48"
                aria-pressed={stop.id === activeId}
              >
                <TourStopThumb
                  stop={stop}
                  showLabel
                  sizes="200px"
                  className={`h-24 w-full transition sm:h-28 ${
                    stop.id === activeId
                      ? "ring-2 ring-brand"
                      : "opacity-70 hover:opacity-100"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
