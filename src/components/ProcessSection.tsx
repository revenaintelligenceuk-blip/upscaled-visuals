import React from "react";
import { siteConfig } from "../siteConfig";
import { Reveal, SectionHeading } from "./ui";

/** 5. How it works: a four-step timeline, vertical on phones, horizontal on desktop. */
export default function ProcessSection() {
  const { title, intro, steps } = siteConfig.process;
  return (
    <section id="process" className="on-light bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading tone="light" title={title} intro={intro} />
        <Reveal>
          <ol className="grid lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.title} className="relative border-l border-brass-deep/50 pb-10 pl-7 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-8">
                <span className="absolute -left-[6px] top-1.5 h-[11px] w-[11px] rounded-full bg-brass-deep lg:-top-[6px] lg:left-0" aria-hidden="true" />
                <p className="text-sm text-brass-deep">{s.timing}</p>
                <h3 className="mt-1 text-2xl font-medium tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-stone">{s.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
