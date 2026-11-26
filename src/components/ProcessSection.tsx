import React from "react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import Backdrop from "./Backdrop";
import { Reveal, SectionHeading } from "./ui";

/** How it works: four numbered steps. */
export default function ProcessSection() {
  const { title, intro, steps } = siteConfig.process;
  return (
    <DotSection id="process" tone="dark" className="py-24 sm:py-32">
      <Backdrop />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading title={title} intro={intro} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110}>
              <div className="card-dark flex h-full flex-col p-7 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brass">Step {i + 1}</p>
                <h3 className="mt-10 text-3xl font-medium tracking-[-0.03em] text-ivory">{s.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </DotSection>
  );
}
