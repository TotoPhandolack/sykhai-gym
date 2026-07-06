"use client";

import { useState } from "react";
import { tourStops } from "@/data/tour-stops";
import TourStopThumb from "./TourStopThumb";

export default function VirtualTour() {
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
            SEE IT FOR YOURSELF
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">
            Take the Virtual Tour
          </h2>
          <p className="mt-4 text-white/70">
            A quick look around before you visit. Tap a stop to explore the
            gym floor.
          </p>
        </div>

        <div className="mt-14">
          <TourStopThumb
            stop={active}
            showLabel={false}
            className="h-72 w-full sm:h-96"
          />

          <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-display text-2xl tracking-wide text-white">
              {active.title}
            </h3>
            <span className="text-sm text-white/50">
              Stop {tourStops.findIndex((s) => s.id === active.id) + 1} of{" "}
              {tourStops.length}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-white/70">{active.description}</p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {tourStops.map((stop) => (
              <button
                key={stop.id}
                onClick={() => setActiveId(stop.id)}
                className="text-left"
                aria-pressed={stop.id === activeId}
              >
                <TourStopThumb
                  stop={stop}
                  showLabel={false}
                  className={`h-24 w-full transition sm:h-28 ${
                    stop.id === activeId
                      ? "ring-2 ring-brand"
                      : "opacity-70 hover:opacity-100"
                  }`}
                />
                <span className="mt-2 block truncate text-sm text-white/70">
                  {stop.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
