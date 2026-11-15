import React from "react";
import { siteConfig } from "../siteConfig";
import { Label, Reveal } from "./ui";

// Per-card layout for the "notebook" look (desktop only).
const layout = [
  { offset: 0, rotate: -3, tone: "brass" },
  { offset: 72, rotate: 2.5, tone: "paper" },
  { offset: 8, rotate: -1.5, tone: "brass" },
  { offset: 96, rotate: 3, tone: "paper" },
] as const;

export default function ProcessSection() {
  const steps = siteConfig.process;
  return (
    <section id="process" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="mb-16 grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Label>Process</Label>
            <h2 className="mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-ivory sm:text-6xl">
              Four steps, from first call to launch.
            </h2>
          </Reveal>
          <p className="text-[15px] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Every project runs the same four moves. The order never changes; the length of each depends on how much there is to untangle.
          </p>
        </div>

        <div className="relative">
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:pb-24">
            {steps.map((s, i) => {
              const l = layout[i % layout.length];
              const brass = l.tone === "brass";
              return (
                <Reveal key={s.step} delay={i * 130}>
                  <li
                    className="relative transition-transform duration-500 hover:!rotate-0 lg:[margin-top:var(--offset)] lg:[transform:rotate(var(--rot))]"
                    style={{ ["--offset" as string]: `${l.offset}px`, ["--rot" as string]: `${l.rotate}deg` } as React.CSSProperties}
                  >
                    {/* tape */}
                    <span className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-[-4deg] bg-ivory/25 backdrop-blur-sm" aria-hidden="true" />
                    <div
                      className={`relative overflow-hidden rounded-sm p-5 pl-10 shadow-2xl shadow-black/40 ${brass ? "bg-brass text-ink" : "bg-paper text-ink"}`}
                      style={{
                        backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 27px, ${brass ? "rgba(14,14,12,0.12)" : "rgba(14,14,12,0.08)"} 27px 28px)`,
                      }}
                    >
                      {/* margin holes */}
                      <span className="absolute left-3 top-0 flex h-full flex-col justify-around py-4" aria-hidden="true">
                        {[0, 1, 2, 3].map((h) => (
                          <span key={h} className="h-2 w-2 rounded-full bg-ink/80" />
                        ))}
                      </span>
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink/60">
                        <span>{s.step}</span>
                        <span>{s.timing}</span>
                      </div>
                      <h3 className="mt-5 font-mono text-xl font-medium">{s.title}</h3>
                      <p className="mt-2 font-mono text-[12px] leading-[28px] text-ink/75">{s.description}</p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
