import React from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import Backdrop from "./Backdrop";
import { Reveal, SectionHeading } from "./ui";

/** What you get: what a website includes, and what can be added. */
export default function FeaturesSection() {
  const { title, intro, items } = siteConfig.features;
  const { aiLink } = siteConfig;
  return (
    <DotSection id="more" tone="light" className="py-24 sm:py-32">
      <Backdrop tone="light" />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading tone="light" title={title} intro={intro} />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 90}>
              <div className="card-light flex h-full flex-col p-7 sm:p-8">
                <h3 className="text-2xl font-medium tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-stone">{item.body}</p>
                {item.ai && aiLink.href && (
                  <a href={aiLink.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-medium underline underline-offset-4">
                    {aiLink.label} <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </DotSection>
  );
}
