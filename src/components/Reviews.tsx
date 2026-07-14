"use client";

import { reviews, featuredQuote, getInitials } from "@/data/reviews";
import { GoogleGIcon, QuoteIcon, ArrowRightIcon } from "./icons";
import { MAPS_URL } from "@/data/business";
import { useT } from "@/i18n/LanguageProvider";

export default function Reviews() {
  const t = useT();
  return (
    <section id="reviews" className="scroll-mt-20 bg-zinc-950 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-brand">
            <GoogleGIcon className="h-5 w-5" />
            <span className="font-display text-sm tracking-[0.3em]">
              {t.reviews.eyebrow}
            </span>
          </div>
          <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">
            {t.reviews.heading}
          </h2>
        </div>

        <blockquote className="mx-auto mt-12 max-w-3xl rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-8 text-center sm:p-10">
          <QuoteIcon className="mx-auto h-8 w-8 text-brand" />
          <p className="mt-4 font-display text-2xl tracking-wide text-white sm:text-3xl">
            &ldquo;{featuredQuote}&rdquo;
          </p>
        </blockquote>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-black p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-800 font-display text-sm text-brand">
                    {getInitials(review.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {review.name}
                    </p>
                    <p className="text-xs text-white/50">{review.meta}</p>
                  </div>
                </div>
                <GoogleGIcon className="h-4 w-4 shrink-0" />
              </div>

              <span className="mt-3 text-xs text-white/40">
                {review.timeAgo}
              </span>

              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dim"
          >
            {t.reviews.readMore}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
