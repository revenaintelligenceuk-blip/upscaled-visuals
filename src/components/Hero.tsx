import React from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Accent, Label, RiseWords, scrollToId } from "./ui";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  const { hero, founders } = siteConfig;
  const wordCount = hero.headlineStart.split(" ").filter(Boolean).length;
  const accentAt = 150 + wordCount * 70; // the accent word lands after the others

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-28 sm:pt-32">
      {/* ---------- atmosphere ---------- */}
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="glow -z-10 -right-[10%] -top-[15%] h-[75vh] w-[75vh]" />
      <div aria-hidden="true" className="glow -z-10 -bottom-[30%] left-[-10%] h-[60vh] w-[60vh] opacity-60" style={{ animationDelay: "-9s" }} />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto grid w-full max-w-[1400px] flex-1 items-center px-4 pb-16 sm:px-8">
        {/* ---------- copy ---------- */}
        <div className="max-w-3xl">
          <Label className="intro flex items-center gap-3" style={d(0)}>
            <span className="h-px w-8 bg-brass/70" aria-hidden="true" />
            {hero.eyebrow}
          </Label>

          <h1
            className="mt-7 font-medium leading-[0.96] tracking-[-0.045em] text-ivory"
            style={{ fontSize: "clamp(2.9rem, 6.2vw, 6.25rem)" }}
          >
            <RiseWords text={hero.headlineStart} start={150} />
            <span className="intro inline-block" style={d(accentAt)}>
              <Accent>
                <span className="bg-gradient-to-b from-brass-light via-brass to-brass-deep bg-clip-text pr-[0.06em] text-transparent">{hero.headlineAccent}</span>
              </Accent>
              {/^[.,!?]/.test(hero.headlineEnd) ? hero.headlineEnd : ` ${hero.headlineEnd}`}
            </span>
          </h1>

          <p className="intro mt-8 max-w-[34rem] text-[17px] leading-relaxed text-muted sm:text-lg" style={d(accentAt + 150)}>
            {hero.subheadline}
          </p>

          <div className="intro mt-10 flex flex-wrap items-center gap-x-7 gap-y-5" style={d(accentAt + 280)}>
            <LiquidButton size="xl" className="rounded-full" onClick={() => scrollToId("contact")}>
              {hero.ctaPrimary}
              <ArrowUpRight />
            </LiquidButton>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-sm text-ivory/80 transition-colors hover:text-ivory"
            >
              <span className="border-b border-brass/50 pb-1 transition-colors group-hover:border-brass">{hero.ctaSecondary}</span>
              <span aria-hidden="true" className="text-brass transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="intro mt-14 flex items-center gap-4" style={d(accentAt + 400)}>
            <div className="flex -space-x-2">
              {founders.map((f) =>
                f.photo ? (
                  <img key={f.name} src={f.photo} alt={f.name} className="h-10 w-10 rounded-full border-2 border-ink object-cover" />
                ) : (
                  <span key={f.name} aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-ivory text-sm font-semibold text-ink">
                    {f.initial}
                  </span>
                )
              )}
            </div>
            <p className="text-sm text-muted">
              Designed &amp; built by <span className="text-ivory">{founders.map((f) => f.name).join(" & ")}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ---------- facts strip ---------- */}
      <div className="intro relative border-t border-white/[0.07] bg-ink/60 backdrop-blur-sm" style={d(accentAt + 550)}>
        <dl className="mx-auto grid max-w-[1400px] grid-cols-3 divide-x divide-white/[0.07] px-4 sm:px-8">
          {[
            ["Fixed price", "No surprise invoices"],
            ["~2 weeks", "From brief to live"],
            ["UK-wide", "Studio based in London"],
          ].map(([k, v]) => (
            <div key={k} className="px-3 py-5 first:pl-0 sm:px-8 sm:first:pl-0">
              <dt className="text-sm font-medium text-ivory sm:text-base">{k}</dt>
              <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-stone sm:text-[11px]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
