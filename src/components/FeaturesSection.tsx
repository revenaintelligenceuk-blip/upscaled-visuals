import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import Backdrop from "./Backdrop";
import { Reveal } from "./ui";
import { chooseNeed, trackPointer } from "../lib/motion";

/** What you get: one large card, smaller ones beside it, and the AI extra underneath. */
export default function FeaturesSection() {
  const { title, intro, items } = siteConfig.features;
  const { aiLink, picker } = siteConfig;
  const [lead, ...small] = items.filter((item) => !item.ai);
  const extra = items.find((item) => item.ai);
  const link = "inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium underline underline-offset-4";

  return (
    <DotSection id="more" tone="light" className="py-24 sm:py-32">
      <Backdrop tone="light" />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <Reveal className="mb-12 grid gap-5 sm:mb-14 lg:grid-cols-12 lg:items-end">
          <h2 className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:col-span-7">{title}</h2>
          <p className="text-base leading-relaxed text-stone lg:col-span-4 lg:col-start-9">{intro}</p>
        </Reveal>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Reveal as="li" className="md:col-span-2 lg:row-span-2">
            <div onPointerMove={trackPointer} className="spot group flex h-full min-h-[22rem] flex-col justify-between rounded-2xl bg-ink p-8 text-ivory sm:min-h-[26rem] sm:p-10">
              <p aria-hidden="true" className="w-fit origin-bottom-left font-serif text-[7rem] italic leading-none text-brass transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 sm:text-[9rem]">
                Aa
              </p>
              <div>
                <h3 className="text-4xl font-medium tracking-[-0.035em] sm:text-5xl">{lead.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{lead.body}</p>
              </div>
            </div>
          </Reveal>

          {small.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 2) * 90 + 90}>
              <div onPointerMove={trackPointer} className="spot spot-light lift card-light flex h-full min-h-[12rem] flex-col justify-end p-7">
                <h3 className="text-2xl font-medium tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-stone">{item.body}</p>
              </div>
            </Reveal>
          ))}

          {extra && (
            <Reveal as="li" className="md:col-span-2 lg:col-span-4">
              <div onPointerMove={trackPointer} className="spot spot-light flex h-full flex-col gap-3 rounded-2xl border border-brass-deep/40 bg-brass/25 p-8 md:flex-row md:items-center md:justify-between md:gap-8">
                <h3 className="font-serif text-4xl italic">{extra.title}</h3>
                <p className="text-lg text-stone">{extra.body}</p>
                {aiLink.href ? (
                  <a href={aiLink.href} target="_blank" rel="noreferrer" className={link}>
                    {aiLink.label} <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <a href="#need" onClick={() => chooseNeed(picker.aiOption)} className={link}>
                    Ask about AI <ArrowRight size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            </Reveal>
          )}
        </ul>
      </div>
    </DotSection>
  );
}
