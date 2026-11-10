import React from "react";
import { ArrowUpRight, Coffee, Scissors, Hammer, Dumbbell, Home, Briefcase } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { SiteMockup, scrollToId } from "./ui";

const builtFor = [
  { icon: Coffee, label: "Cafés" },
  { icon: Scissors, label: "Salons" },
  { icon: Hammer, label: "Trades" },
  { icon: Dumbbell, label: "Fitness" },
  { icon: Home, label: "Property" },
  { icon: Briefcase, label: "Consultants" },
];

export default function Hero() {
  const { hero, founders, portfolio } = siteConfig;
  const featured = portfolio[0];

  return (
    <section id="top" className="bg-ink px-3 pt-20 sm:px-5 sm:pt-24">
      <div className="relative mx-auto flex min-h-[min(calc(100svh-6rem),860px)] max-w-[1400px] flex-col overflow-hidden rounded-[28px] border border-line">
        {/* Background image */}
        <img
          src="/images/hero_london_property_1794274507487.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/40 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

        <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-10 lg:p-14">
          {/* Top row: wordmark + intro */}
          <div className="grid gap-8 lg:grid-cols-12">
            <h1 className="lg:col-span-8">
              <span className="sr-only">Upscaled, web design studio. </span>
              <span
                aria-hidden="true"
                className="block font-serif font-light leading-[0.85] tracking-[-0.03em] text-ivory"
                style={{ fontSize: "clamp(4.5rem, 16vw, 15rem)" }}
              >
                Upscaled<sup className="align-super text-[0.25em] text-brass">®</sup>
              </span>
            </h1>

            <div className="max-w-sm lg:col-span-4 lg:justify-self-end lg:pt-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {founders.map((f) =>
                    f.photo ? (
                      <img key={f.name} src={f.photo} alt={f.name} className="h-9 w-9 rounded-full border border-ink object-cover" />
                    ) : (
                      <span key={f.name} aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink bg-ivory font-serif text-base text-ink">
                        {f.initial}
                      </span>
                    )
                  )}
                </div>
                <span className="h-px w-10 bg-ivory/30" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">[ Built to last ]</span>
              </div>
              <p className="mt-5 text-[15px] font-light leading-relaxed text-ivory/80">{hero.subheadline}</p>
            </div>
          </div>

          {/* Bottom row: headline + CTAs + featured card */}
          <div className="mt-auto grid gap-10 pt-16 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="max-w-xl font-serif text-3xl font-light leading-[1.1] text-ivory sm:text-4xl">
                {hero.headlineStart} <em className="text-brass">{hero.headlineAccent}</em> {hero.headlineEnd}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <LiquidButton size="xl" className="rounded-full" onClick={() => scrollToId("contact")}>
                  {hero.ctaPrimary}
                  <ArrowUpRight />
                </LiquidButton>
                <a href="#work" className="text-sm text-ivory/80 underline-offset-8 transition-colors hover:text-ivory hover:underline">
                  {hero.ctaSecondary}
                </a>
              </div>
            </div>

            <a
              href="#work"
              className="group hidden w-72 justify-self-end rounded-2xl border border-white/10 bg-ink/50 p-2 backdrop-blur-xl transition-colors hover:border-brass/40 md:block lg:col-span-5"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-xl">
                <SiteMockup project={featured} compact />
              </div>
              <div className="flex items-center justify-between px-2 pb-1 pt-3">
                <div>
                  <p className="text-sm text-ivory">{featured.title}<sup className="text-brass">®</sup></p>
                  <p className="text-xs text-muted">Website · {new Date().getFullYear()}</p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-ivory transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </a>
          </div>

          {/* Built-for strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Built for</span>
            {builtFor.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-sm text-ivory/70">
                <Icon size={16} strokeWidth={1.5} className="text-brass" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Proof strip */}
      <dl className="mx-auto mt-3 grid max-w-[1400px] gap-3 sm:grid-cols-3">
        {hero.proof.map((p) => (
          <div key={p.label} className="rounded-2xl border border-line bg-card px-6 py-5">
            <dt className="text-xs uppercase tracking-[0.18em] text-muted">{p.label}</dt>
            <dd className="mt-1 font-serif text-3xl font-light text-ivory">{p.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
