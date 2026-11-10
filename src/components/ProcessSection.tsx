import React from "react";
import { siteConfig } from "../siteConfig";
import { Reveal, SectionHeading } from "./ui";

/** Lumóra-style stepped process: bars descend across four columns. */
export default function ProcessSection() {
  const steps = siteConfig.process;
  return (
    <section id="process" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading
          label="Our process"
          title={<>Our process moves <em className="text-brass">like production.</em></>}
          intro="Every project begins with a clear conversation. From there, a focused four-step process turns your business into a site you're proud to share."
        />

        <Reveal>
          <div className="hidden overflow-hidden rounded-[28px] border border-line bg-card md:grid md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.step} className="relative h-72 border-l border-line first:border-l-0">
                <div
                  className="absolute inset-x-0 flex items-center justify-between bg-ivory px-5 py-3 text-ink"
                  style={{ top: `${12 + i * 20}%` }}
                >
                  <span className="text-sm font-medium">{s.title}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60">{s.timing}</span>
                </div>
                <span className="absolute bottom-4 right-5 font-mono text-xs text-muted">{s.step}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <ol className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((s) => (
            <Reveal key={s.step} className="h-full">
              <li className="h-full rounded-3xl border border-line bg-card p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl font-light text-ivory">{s.title}</h3>
                  <span className="font-mono text-xs text-brass md:hidden">{s.timing}</span>
                </div>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted">{s.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
