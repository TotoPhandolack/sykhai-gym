import Image from "next/image";
import type { TourStop } from "@/data/tour-stops";

export default function TourStopThumb({
  stop,
  className = "",
  showLabel = true,
  sizes = "400px",
}: {
  stop: TourStop;
  className?: string;
  showLabel?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 ${className}`}
    >
      <Image
        src={stop.image}
        alt={stop.title}
        fill
        sizes={sizes}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
      <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-brand">
        360&deg; PHOTO
      </div>
      {showLabel && (
        <span className="absolute inset-x-0 bottom-0 p-4 font-display text-lg tracking-wide text-white sm:text-xl">
          {stop.title}
        </span>
      )}
    </div>
  );
}
