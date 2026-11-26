import React from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Accent, RiseWords } from "./ui";
import ContactButton from "./ContactButton";
import DotSection from "./DotSection";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  const { hero, contact } = siteConfig;
  const wordCount = hero.headlineStart.split(" ").filter(Boolean).length;
  const accentAt = 100 + wordCount * 50; // the accent word lands after the others
  const hasImage = Boolean(hero.image.src);

  return (
    <DotSection id="top" className="pb-20 pt-32 sm:pb-28 sm:pt-44">
          <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-4 sm:px-8 lg:grid-cols-12">
            <div className={hasImage ? "lg:col-span-6" : "lg:col-span-10"}>
              <h1
                className="font-medium leading-[0.98] tracking-[-0.045em] text-ivory"
                style={{ fontSize: hasImage ? "clamp(2.75rem, 5vw, 5rem)" : "clamp(2.75rem, 7vw, 6.5rem)" }}
              >
                <RiseWords text={hero.headlineStart} start={100} step={50} />
                <span className="intro inline-block" style={d(accentAt)}>
                  <Accent>
                    <span className="bg-gradient-to-b from-brass-light via-brass to-[#9c8453] bg-clip-text pr-[0.06em] text-transparent">{hero.headlineAccent}</span>
                  </Accent>
                  {hero.headlineEnd}
                </span>
              </h1>

              <p className="rise mt-8 max-w-[36rem] text-[17px] leading-relaxed text-ivory/75 sm:text-xl">
                {hero.subheadline}
              </p>

              <div className="intro mt-10 flex flex-wrap items-center gap-x-7 gap-y-4" style={d(accentAt + 150)}>
                <ContactButton />
                <a
                  href="#process"
                  className={
                    contact.href
                      ? "group inline-flex min-h-11 items-center gap-2 text-sm text-ivory"
                      : "group inline-flex min-h-12 items-center gap-2 rounded-full bg-ivory px-7 text-sm font-medium text-ink hover:bg-brass"
                  }
                >
                  {hero.secondary}
                  <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {hasImage && (
              <div className="intro lg:col-span-6" style={d(accentAt + 250)}>
                <img src={hero.image.src} alt={hero.image.alt} width={1600} height={1000} className="w-full rounded-2xl border border-line" />
              </div>
            )}
          </div>
    </DotSection>
  );
}
