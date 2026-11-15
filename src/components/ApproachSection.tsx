import React from "react";
import { Check, PenTool, Users } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Label, Reveal } from "./ui";

const icons = [Users, PenTool];

/** 4. Our approach: consumer understanding + careful design and build. */
export default function ApproachSection() {
  const { pillars, outcome } = siteConfig.approach;
  return (
    <section id="approach" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Label>Our approach</Label>
            <h2 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-ivory text-balance sm:text-6xl">
              We get to know your customers before we design anything.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-muted lg:col-span-4">
            Great websites come from understanding the people who'll use them. We turn that understanding into a finished site faster than a traditional agency.
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-3 sm:mt-20 md:grid-cols-2">

          {pillars.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={p.title} className="h-full" delay={i * 140}>
                <div className="lift flex h-full flex-col rounded-2xl border border-line bg-card p-7 hover:border-brass/40 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">{p.kicker}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brass/10 text-brass">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                  </div>
                  <h3 className="mt-12 text-3xl font-medium tracking-[-0.03em] text-ivory sm:text-4xl">{p.title}</h3>
                  <p className="mb-10 mt-4 max-w-md text-[15px] leading-relaxed text-muted">{p.body}</p>
                  <ul className="mt-auto space-y-3 border-t border-line pt-6">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm text-ivory/85">
                        <Check size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-brass" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-xl tracking-[-0.02em] text-ivory sm:text-2xl">
            <span style={{ background: "linear-gradient(to top, rgb(201 180 138 / 0.28) 40%, transparent 40%)" }}>
              {outcome}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
