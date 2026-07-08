"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { tourStops } from "@/data/tour-stops";
import { clamp, bandOpacity } from "@/lib/utils";
import { ChevronDownIcon, ArrowRightIcon } from "./icons";
import TourStopThumb from "./TourStopThumb";

const TRACK_VH = 350;
const firstStop = tourStops[0];

const BarbellScene = dynamic(() => import("./BarbellScene"), { ssr: false });

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [checkedMotionPref, setCheckedMotionPref] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    setCheckedMotionPref(true);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!checkedMotionPref || reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolledIntoTrack = -rect.top;
      const p = total > 0 ? clamp(scrolledIntoTrack / total, 0, 1) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [checkedMotionPref, reducedMotion]);

  const goToTour = useCallback(() => scrollToId("virtual-tour"), []);

  const introOpacity = clamp(1 - progress / 0.12, 0, 1);
  const headline1Opacity = bandOpacity(progress, -0.04, 0, 0.18, 0.24);
  const headline2Opacity = bandOpacity(progress, 0.3, 0.34, 0.5, 0.56);
  const showTeaser = progress > 0.94;

  if (checkedMotionPref && reducedMotion) {
    return (
      <section
        id="hero"
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url(/videos/hero-poster.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
        <div className="relative flex flex-col items-center gap-6 px-6 text-center">
          <h1 className="font-display text-5xl tracking-wide text-brand sm:text-7xl">
            SYKHAI GYM
          </h1>
          <p className="max-w-md text-lg text-white/80">
            Train hard. Pay less. Vientiane&apos;s most affordable full-equipment
            gym.
          </p>
          <button
            onClick={goToTour}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-black transition-colors hover:bg-brand-dim"
          >
            Take the Virtual Tour
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      ref={trackRef}
      style={{ height: `${TRACK_VH}vh` }}
      className="relative bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <BarbellScene className="h-full w-full" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/70" />

        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: headline1Opacity }}
        >
          <h1 className="font-display text-6xl tracking-wide text-brand sm:text-8xl">
            SYKHAI GYM
          </h1>
          <p className="mt-4 text-base tracking-wide text-white/80 sm:text-lg">
            Vientiane&apos;s Most Affordable Gym
          </p>
        </div>

        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: headline2Opacity }}
        >
          <h2 className="font-display text-4xl tracking-wide text-white sm:text-6xl">
            TRAIN HARD. <span className="text-brand">PAY LESS.</span>
          </h2>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Full equipment. Day passes from ₭20,000.
          </p>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-white/80"
          style={{ opacity: introOpacity }}
        >
          <span className="font-display text-sm tracking-[0.3em]">
            SCROLL TO EXPLORE
          </span>
          <ChevronDownIcon className="h-6 w-6 animate-bounce" />
        </div>

        <div
          aria-hidden={!showTeaser}
          className={`absolute inset-0 flex items-center justify-center bg-black backdrop-blur-sm transition-opacity duration-700 ${
            showTeaser ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            onClick={goToTour}
            className="group flex flex-col items-center gap-5 px-6 text-center"
          >
            <span className="font-display text-2xl tracking-wide text-brand sm:text-3xl">
              Ready to see it yourself?
            </span>
            <TourStopThumb
              stop={firstStop}
              className="h-44 w-64 shadow-2xl transition-transform duration-300 group-hover:scale-[1.03] sm:h-52 sm:w-80"
            />
            <span className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-black transition-colors group-hover:bg-brand-dim">
              Take the Virtual Tour
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
