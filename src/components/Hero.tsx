import React from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Accent, RiseWords } from "./ui";
import DotSection from "./DotSection";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** First screen: large headline, the two actions, and a row of facts along the bottom. */
export default function Hero() {
  const { hero, contact } = siteConfig;
  const wordCount = hero.headlineStart.split(" ").filter(Boolean).length;
  const accentAt = 100 + wordCount * 50; // the accent word lands after the others

  return (
    <DotSection id="top">
      <div className="flex min-h-[100svh] flex-col">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 pb-14 pt-28 sm:px-8 sm:pt-32">
          <h1
            className="max-w-[1200px] font-medium leading-[0.96] tracking-[-0.05em] text-ivory"
            style={{ fontSize: "clamp(2.75rem, min(8.4vw, 13svh), 8rem)" }}
          >
            <RiseWords text={hero.headlineStart} start={100} step={50} />
            <span className="intro inline-block" style={d(accentAt)}>
              <span className="relative inline-block">
                <Accent>
                  <span className="bg-gradient-to-b from-brass-light via-brass to-[#9c8453] bg-clip-text pr-[0.06em] text-transparent">{hero.headlineAccent}</span>
                </Accent>
                {/* A brass line draws itself under the accent word */}
                <svg aria-hidden="true" viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.06em] left-0 h-[0.16em] w-full">
                  <path className="draw-line" style={d(accentAt + 650)} pathLength={1} d="M4 14 C 70 4, 190 3, 296 11" />
                </svg>
              </span>
              {hero.headlineEnd}
            </span>
          </h1>

          <div className="mt-10 grid items-end gap-8 sm:mt-14 lg:grid-cols-12">
            <p className="rise max-w-[36rem] text-[17px] leading-relaxed text-ivory/75 sm:text-xl lg:col-span-6">{hero.subheadline}</p>
            <div className="intro flex flex-wrap items-center gap-x-7 gap-y-4 lg:col-span-6 lg:justify-end" style={d(accentAt + 150)}>
              {contact.href && (
                <a href={contact.href} className="inline-flex min-h-12 items-center rounded-full bg-ivory px-7 text-sm font-medium text-ink hover:bg-brass">
                  {hero.primary}
                </a>
              )}
              <a href="#process" className="group inline-flex min-h-11 items-center gap-2 text-sm text-ivory">
                {hero.secondary}
                <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.09] bg-ink/60">
          <dl className="mx-auto grid max-w-[1400px] grid-cols-2 px-4 sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-white/[0.09]">
            {hero.facts.map((fact, i) => (
              <div key={fact.title} className="intro group py-5 pr-4 sm:py-7 lg:px-8 lg:first:pl-0" style={d(accentAt + 300 + i * 110)}>
                <dt className="font-serif text-2xl italic text-brass transition-transform duration-300 group-hover:-translate-y-1 sm:text-3xl">{fact.title}</dt>
                <dd className="mt-1 text-sm text-muted">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </DotSection>
  );
}
