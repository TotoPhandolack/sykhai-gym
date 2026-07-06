import type { TourStop } from "@/data/tour-stops";
import { TourIcon } from "./icons";

export default function TourStopThumb({
  stop,
  className = "",
  showLabel = true,
}: {
  stop: TourStop;
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${stop.gradient} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-brand">
        360&deg; MOCKUP
      </div>
      <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center text-white">
        <TourIcon name={stop.icon} className="h-10 w-10 text-brand" />
        {showLabel && (
          <span className="font-display text-lg tracking-wide sm:text-xl">
            {stop.title}
          </span>
        )}
      </div>
    </div>
  );
}
