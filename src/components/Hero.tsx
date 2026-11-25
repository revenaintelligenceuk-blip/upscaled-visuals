import React from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Accent, Label, RiseWords, scrollToId } from "./ui";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  const { hero, cta, founderLine } = siteConfig;
  const wordCount = hero.headlineStart.split(" ").filter(Boolean).length;
  const accentAt = 100 + wordCount * 50; // the accent word lands after the others

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-clip bg-ink pt-28 sm:pt-32">
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
            style={{ fontSize: "clamp(2.75rem, 6.2vw, 6.25rem)" }}
          >
            <RiseWords text={hero.headlineStart} start={100} step={50} />
            <span className="intro inline-block" style={d(accentAt)}>
              <Accent>
                <span className="bg-gradient-to-b from-brass-light via-brass to-[#9c8453] bg-clip-text pr-[0.06em] text-transparent">{hero.headlineAccent}</span>
              </Accent>
              {/^[.,!?]/.test(hero.headlineEnd) ? hero.headlineEnd : ` ${hero.headlineEnd}`}
            </span>
          </h1>

          <p className="rise mt-8 max-w-[34rem] text-[17px] leading-relaxed text-muted sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="intro mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" style={d(accentAt + 150)}>
            <LiquidButton size="xl" className="rounded-full" onClick={() => scrollToId("contact")}>
              {cta.label}
              <ArrowUpRight aria-hidden="true" />
            </LiquidButton>
            <a
              href="#work"
              className="group inline-flex min-h-11 items-center gap-2 text-sm text-ivory"
            >
              <span className="border-b border-brass/60 pb-1 transition-colors group-hover:border-brass">{hero.ctaSecondary}</span>
              <span aria-hidden="true" className="text-brass transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          <p className="intro mt-5 max-w-md text-sm leading-relaxed text-muted" style={d(accentAt + 220)}>{cta.support}</p>
          <p className="intro mt-8 text-sm text-ivory" style={d(accentAt + 300)}>{founderLine}</p>
        </div>
      </div>

      {/* ---------- facts strip ---------- */}
      <div className="intro relative border-t border-white/[0.07] bg-ink/80" style={d(accentAt + 350)}>
        <dl className="mx-auto grid max-w-[1400px] grid-cols-3 divide-x divide-white/[0.07] px-4 sm:px-8">
          {hero.facts.map((f) => (
            <div key={f.title} className="px-3 py-5 first:pl-0 sm:px-8 sm:first:pl-0">
              <dt className="text-sm font-medium text-ivory sm:text-base">{f.title}</dt>
              <dd className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
