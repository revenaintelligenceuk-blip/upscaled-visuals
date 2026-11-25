import React from "react";
import { siteConfig } from "../siteConfig";
import { Reveal, SectionHeading } from "./ui";

/** 4. Why your website matters: three plain points. */
export default function WhySection() {
  const { title, points } = siteConfig.why;
  return (
    <section id="why" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading title={title} />
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className="border-t border-brass/40 pt-6">
              <h3 className="text-2xl font-medium tracking-[-0.02em] text-ivory">{p.title}</h3>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
