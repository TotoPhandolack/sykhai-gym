"use client";

import { useEffect, useState } from "react";
import { weeklyHours, getOpenStatus } from "@/lib/hours";
import { ClockIcon } from "./icons";

export default function HoursPanel() {
  const [status, setStatus] = useState<{
    openNow: boolean;
    today: string;
  } | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 text-brand">
        <ClockIcon className="h-5 w-5" />
        <span className="font-display text-sm tracking-[0.3em]">HOURS</span>
      </div>

      <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">
        Find Us & Visit
      </h2>

      {status && (
        <span
          className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
            status.openNow
              ? "bg-brand/15 text-brand"
              : "bg-white/10 text-white/60"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              status.openNow ? "bg-brand" : "bg-white/40"
            }`}
          />
          {status.openNow ? "Open now" : "Closed now"} · Vientiane time
        </span>
      )}

      <ul className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-950">
        {weeklyHours.map((d) => {
          const isToday = status?.today === d.day;
          return (
            <li
              key={d.day}
              className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                isToday ? "bg-brand/10" : ""
              }`}
            >
              <span
                className={`text-sm ${
                  isToday ? "font-semibold text-brand" : "text-white/80"
                }`}
              >
                {d.day}
                <span className="ml-2 text-white/40">{d.thai}</span>
              </span>
              <span
                className={`text-sm ${
                  isToday ? "font-semibold text-brand" : "text-white/60"
                }`}
              >
                {d.open && d.close ? `${d.open}–${d.close}` : "Closed"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
