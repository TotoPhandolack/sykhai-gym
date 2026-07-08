"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ArrowRightIcon } from "./icons";

const LogoScene = dynamic(() => import("./LogoScene"), { ssr: false });

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function delayStyle(animate: boolean, seconds: number) {
  return animate ? { animationDelay: `${seconds}s` } : undefined;
}

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [checkedMotionPref, setCheckedMotionPref] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mq.matches);
    setCheckedMotionPref(true);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const goToTour = () => scrollToId("virtual-tour");
  const animate = checkedMotionPref && !reducedMotion;
  const introClass = animate ? "animate-hero-in" : "";
  const logoIntroClass = animate ? "animate-logo-in" : "";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black py-24"
    >
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[100px] ${animate ? "animate-glow-pulse" : ""}`}
      />

      <div className="relative flex flex-col items-center gap-6 px-6 text-center">
        <div className={`h-72 w-72 sm:h-96 sm:w-96 ${logoIntroClass}`}>
          {reducedMotion ? (
            <Image
              src="/logo-mark.png"
              alt="Sykhai Gym"
              width={480}
              height={480}
              preload
              className="h-full w-full"
            />
          ) : (
            <LogoScene className="h-full w-full" />
          )}
        </div>
        <h1
          className={`font-display text-6xl tracking-wide text-brand sm:text-8xl ${introClass}`}
          style={delayStyle(animate, 0.15)}
        >
          SYKHAI GYM
        </h1>
        <h2
          className={`font-display text-3xl tracking-wide text-white sm:text-5xl ${introClass}`}
          style={delayStyle(animate, 0.3)}
        >
          TRAIN HARD. <span className="text-brand">PAY LESS.</span>
        </h2>
        <p
          className={`max-w-md text-lg text-white/80 ${introClass}`}
          style={delayStyle(animate, 0.45)}
        >
          Vientiane&apos;s most affordable full-equipment gym. Day passes from
          ₭20,000.
        </p>
        <button
          onClick={goToTour}
          className={`inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-black transition-colors hover:bg-brand-dim ${introClass}`}
          style={delayStyle(animate, 0.6)}
        >
          Take the Virtual Tour
          <ArrowRightIcon className="h-4 w-4" />
        </button>

        <div
          className={`flex flex-col items-center gap-2 pt-6 text-white/80 ${introClass}`}
          style={delayStyle(animate, 0.75)}
        >
          <span className="font-display text-sm tracking-[0.3em]">
            SCROLL TO EXPLORE
          </span>
          <ChevronDownIcon className="h-6 w-6 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
