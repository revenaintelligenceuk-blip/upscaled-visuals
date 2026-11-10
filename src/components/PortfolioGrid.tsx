import React from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { BrowserFrame, Reveal, SectionHeading, SiteMockup } from "./ui";

export default function PortfolioGrid() {
  return (
    <section id="work" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading
          label="Selected work"
          title={<>Sites built around the business, <em className="text-brass">not a template.</em></>}
          intro="Concept builds showing the range of styles we design for, each one shaped around a different kind of customer."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {siteConfig.portfolio.map((p) => (
            <Reveal key={p.id}>
              <article className="group rounded-[28px] border border-line bg-card p-3 transition-colors hover:border-brass/40">
                <div className="overflow-hidden rounded-[22px] p-6 sm:p-10" style={{ background: `linear-gradient(140deg, ${p.palette.accent}33, #1a1a17 70%)` }}>
                  <BrowserFrame url={`${p.id}.co.uk`} className="transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.01]">
                    <div className="aspect-[16/10]">
                      <SiteMockup project={p} />
                    </div>
                  </BrowserFrame>
                </div>
                <div className="flex items-start justify-between gap-4 px-3 pb-2 pt-5">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-ivory">
                      {p.title}<sup className="text-xs text-brass">®</sup>
                    </h3>
                    <p className="mt-1 max-w-md text-sm font-light leading-relaxed text-muted">{p.description}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="rounded-full border border-line px-3 py-1 text-xs text-ivory/80">{p.industry}</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                      {p.tag} <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
