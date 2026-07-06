import { plans, formatKip, perMonth, savingsPercent } from "@/data/pricing";
import { CheckIcon } from "./icons";

const INCLUDED = [
  "Full free-weights floor",
  "Cardio + strength machines",
  "Open 6 days a week, 15:00–20:30",
  "Locker room access",
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-black px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm tracking-[0.3em] text-brand">
            MEMBERSHIP
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">
            Simple, Honest Pricing
          </h2>
          <p className="mt-4 text-white/70">
            One gym, full access. Pick a day pass with zero commitment, or
            save more the longer you train with us.
          </p>
        </div>

        <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3">
          {INCLUDED.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-white/70"
            >
              <CheckIcon className="h-4 w-4 shrink-0 text-brand" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {plans.map((plan) => {
            const monthly = perMonth(plan);
            const savings = savingsPercent(plan);
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  plan.highlight
                    ? "border-brand bg-zinc-900 shadow-[0_0_40px_-12px_rgba(255,212,0,0.4)] lg:-translate-y-2"
                    : "border-white/10 bg-zinc-950"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold tracking-wide text-black">
                    BEST VALUE
                  </span>
                )}

                <h3 className="font-display text-xl tracking-wide text-white">
                  {plan.name}
                </h3>

                <div className="mt-4">
                  <span className="font-display text-3xl text-brand">
                    {formatKip(plan.price)}
                  </span>
                  <span className="ml-1 text-sm text-white/50">
                    {plan.unit}
                  </span>
                </div>

                <div className="mt-2 h-5 text-xs text-white/50">
                  {monthly && <span>≈ {formatKip(monthly)} / month</span>}
                </div>

                {savings ? (
                  <span className="mt-3 inline-block w-fit rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
                    Save {savings}% vs. monthly
                  </span>
                ) : (
                  <span className="mt-3 inline-block w-fit rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-white/50">
                    No commitment
                  </span>
                )}

                <a
                  href="#location"
                  className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    plan.highlight
                      ? "bg-brand text-black hover:bg-brand-dim"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Get Started
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-white/40">
          Prices in Lao Kip (₭). Visit us in person to purchase or renew a
          membership.
        </p>
      </div>
    </section>
  );
}
