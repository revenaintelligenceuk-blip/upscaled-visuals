import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Accent, Circled, Label, RiseWords, scrollToId } from "./ui";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  const { hero, founders } = siteConfig;
  const wordCount = hero.headlineStart.split(" ").filter(Boolean).length;
  const accentAt = 150 + wordCount * 70; // the accent word lands after the others

  // Draw the circle around the accent word once it has arrived.
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), accentAt + 200);
    return () => clearTimeout(t);
  }, [accentAt]);

  return (
    <section id="top" className="relative overflow-hidden bg-ink pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
        <Label className="intro" style={d(0)}>{hero.eyebrow} · {siteConfig.brand.location.split("·")[0].trim()}</Label>

        <h1 className="mt-6 max-w-[15ch] font-medium leading-[0.98] tracking-[-0.045em] text-ivory" style={{ fontSize: "clamp(2.8rem, 7.4vw, 7rem)" }}>
          <RiseWords text={hero.headlineStart} start={150} />
          <span className="intro inline-block" style={d(accentAt)}>
            <Circled className={`px-1 ${drawn ? "is-visible" : ""}`}>
              <Accent>{hero.headlineAccent}</Accent>
            </Circled>
            {/^[.,!?]/.test(hero.headlineEnd) ? hero.headlineEnd : ` ${hero.headlineEnd}`}
          </span>
        </h1>

        <div className="mt-12 lg:mt-14">
          {/* Copy + CTAs */}
          <div className="max-w-xl">
            <p className="intro max-w-md text-lg leading-relaxed text-muted" style={d(accentAt + 150)}>{hero.subheadline}</p>

            <div className="intro mt-9 flex flex-wrap items-center gap-5" style={d(accentAt + 280)}>
              <LiquidButton size="xl" className="rounded-full" onClick={() => scrollToId("contact")}>
                {hero.ctaPrimary}
                <ArrowUpRight />
              </LiquidButton>
              <a href="#work" className="text-sm text-ivory/80 underline decoration-brass/60 underline-offset-8 hover:text-ivory hover:decoration-brass">
                {hero.ctaSecondary}
              </a>
            </div>

            <div className="intro mt-12 flex items-center gap-4 border-t border-line pt-6" style={d(accentAt + 400)}>
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
      </div>
    </section>
  );
}
