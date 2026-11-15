import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Label, Reveal } from "./ui";

/** 3. The problem: why outdated websites lose potential customers. */
export default function ProblemSection() {
  const { stats, signs, whyWebsite } = siteConfig.problem;
  return (
    <section id="problem" className="bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Label tone="light">The problem</Label>
            <h2 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl">
              An outdated website quietly sends customers to your competitors.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-stone lg:col-span-4">
            Most people check your website before they ever call, book or visit. If it's slow, confusing or dated, they don't complain. They just leave.
          </p>
        </Reveal>

        {/* Stats */}
        <div className="mt-14 grid gap-3 sm:mt-20 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.value} className="h-full" delay={i * 120}>
              <div className="lift flex h-full flex-col rounded-2xl bg-ink p-7 text-ivory sm:p-8">
                <p className="text-6xl font-medium tabular-nums tracking-[-0.05em] text-brass sm:text-7xl">
                  {s.value}
                </p>
                <p className="mt-4 text-lg leading-snug tracking-[-0.01em]">{s.text}</p>
                <p className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Source: {s.source}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* No website at all? Why social media alone isn't enough */}
        <Reveal className="mt-16 sm:mt-24">
          <div className="rounded-3xl bg-ink p-7 text-ivory sm:p-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">{whyWebsite.eyebrow}</p>
                <h3 className="mt-4 text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-balance sm:text-5xl">
                  {whyWebsite.headlineStart} {whyWebsite.headlineAccent}
                </h3>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">{whyWebsite.intro}</p>
              </div>

              {/* Social → attention, website → trust */}
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:col-span-6">
                {whyWebsite.flow.map((f, i) => (
                  <React.Fragment key={f.label}>
                    {i > 0 && (
                      <ArrowRight aria-hidden="true" size={22} strokeWidth={1.5} className="mx-auto shrink-0 rotate-90 text-brass sm:rotate-0" />
                    )}
                    <div className={`lift flex-1 rounded-2xl border p-6 ${i > 0 ? "border-brass/40 bg-brass/10" : "border-line bg-card"}`}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{f.label}</p>
                      <p className={`mt-3 text-3xl font-medium tracking-[-0.03em] ${i > 0 ? "text-brass" : "text-ivory"}`}>{f.result}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <ul className="mt-12 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {whyWebsite.reasons.map((r, i) => (
                <Reveal as="li" key={r.title} delay={(i % 3) * 100} className="flex gap-3 border-b border-line py-6">
                  <Check size={18} strokeWidth={1.75} className="mt-1 shrink-0 text-brass" aria-hidden="true" />
                  <div>
                    <h4 className="text-lg font-medium tracking-[-0.02em]">{r.title}</h4>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{r.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Warning signs */}
        <div className="mt-16 sm:mt-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">Sound familiar?</p>
          <ol className="mt-6 grid gap-x-10 border-t border-paper-line sm:grid-cols-2 lg:grid-cols-3">
            {signs.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 3) * 100} className="flex gap-4 border-b border-paper-line py-6">
                  <span className="pt-1 font-mono text-xs text-brass-deep">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.02em]">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-stone">{s.body}</p>
                  </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
