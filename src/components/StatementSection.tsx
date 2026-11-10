import React from "react";
import { siteConfig } from "../siteConfig";
import { Label, Reveal } from "./ui";

/** Lumóra-style "about" statement with a bento row underneath. */
export default function StatementSection() {
  const { statement, founders } = siteConfig;
  return (
    <section id="about" className="bg-ink py-24 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <Label>About the studio</Label>
          </Reveal>
          <Reveal className="lg:col-span-9">
            <p className="font-serif text-3xl font-light leading-[1.2] text-ivory text-balance sm:text-5xl">
              {statement.lead} <span className="text-muted/60">{statement.rest}</span>
            </p>
          </Reveal>
        </div>

        {/* Bento */}
        <div className="mt-16 grid gap-3 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="h-full">
            <div className="flex h-full min-h-64 flex-col justify-between rounded-3xl border border-line bg-card p-7">
              <div className="flex -space-x-3">
                {founders.map((f) => (
                  <span key={f.name} className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-card bg-ivory font-serif text-2xl text-ink" aria-hidden="true">
                    {f.initial}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-sm text-muted">Founders, designers, builders</p>
                <p className="mt-1 font-serif text-3xl font-light text-ivory">{founders.map((f) => f.name).join(" & ")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="h-full">
            <div className="flex h-full min-h-64 flex-col justify-between rounded-3xl bg-ivory p-7 text-ink">
              <p className="text-sm text-ink/60">Pricing</p>
              <div>
                <p className="font-serif text-5xl font-light">Fixed.</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">A clear quote before we start. No hourly billing, no surprise invoices.</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="h-full">
            <div className="flex h-full min-h-64 flex-col justify-between rounded-3xl border border-line bg-card p-7">
              <p className="text-sm text-muted">Kickoff to launch</p>
              <div>
                <p className="font-serif text-6xl font-light text-ivory">
                  ~2<span className="text-brass">wk</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">A focused process with just two rounds of feedback.</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="h-full">
            <div className="relative flex h-full min-h-64 flex-col justify-end overflow-hidden rounded-3xl p-7">
              <img src="/images/london_luxury_penthouse_1794274508266.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <div className="relative">
                <p className="text-sm text-ivory/70">Ownership</p>
                <p className="mt-1 font-serif text-5xl font-light text-ivory">100%</p>
                <p className="mt-2 text-sm text-ivory/70">Your domain, design and content. Always.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
