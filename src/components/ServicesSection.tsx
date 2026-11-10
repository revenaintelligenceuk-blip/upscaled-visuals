import React from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Reveal, SectionHeading } from "./ui";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading
          label="Services"
          title={<>Everything you need to get online, <em className="text-brass">properly.</em></>}
          intro="From the first sketch to the day it goes live, and after. One small team handles design, build and launch, so nothing falls through the cracks."
        />

        <div className="border-t border-line">
          {siteConfig.services.map((s) => (
            <Reveal key={s.id}>
              <a href="#contact" className="group grid gap-6 border-b border-line py-10 transition-colors hover:bg-card/50 sm:py-12 lg:grid-cols-12 lg:items-start lg:px-4">
                <span className="font-mono text-xs text-brass lg:col-span-1 lg:pt-3">{s.number}</span>
                <h3 className="font-serif text-4xl font-light tracking-tight text-ivory transition-colors group-hover:text-brass sm:text-5xl lg:col-span-4">
                  {s.title}
                </h3>
                <p className="max-w-md text-[15px] font-light leading-relaxed text-muted lg:col-span-4">{s.description}</p>
                <div className="flex items-start justify-between gap-6 lg:col-span-3">
                  <ul className="space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="text-sm text-ivory/80">— {f}</li>
                    ))}
                  </ul>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ivory transition-all group-hover:border-brass group-hover:text-brass">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
