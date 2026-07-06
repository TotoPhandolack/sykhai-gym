import { MapPinIcon, ArrowRightIcon } from "./icons";
import { MAPS_URL } from "@/data/business";

const LINKS = [
  { id: "pricing", label: "Pricing" },
  { id: "virtual-tour", label: "Virtual Tour" },
  { id: "location", label: "Location" },
  { id: "reviews", label: "Reviews" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-3">
        <div>
          <a href="#hero" className="font-display text-2xl tracking-wide text-white">
            SYKHAI <span className="text-brand">GYM</span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-white/60">
            Vientiane&apos;s most affordable full-equipment gym. Train hard,
            pay less.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-[0.3em] text-brand">
            QUICK LINKS
          </h3>
          <ul className="mt-4 space-y-3">
            {LINKS.map((link) => (
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
            VISIT US
          </h3>
          <p className="mt-4 text-sm text-white/70">
            Mon&ndash;Sat: 15:00&ndash;20:30
            <br />
            Sunday: Closed
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dim"
          >
            <MapPinIcon className="h-4 w-4" />
            Get Directions
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} Sykhai Gym. All rights reserved.
      </div>
    </footer>
  );
}
