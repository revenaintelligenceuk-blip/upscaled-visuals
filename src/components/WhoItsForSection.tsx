import React from "react";
import { siteConfig } from "../siteConfig";
import { Label, Reveal } from "./ui";

/** Studio principles: "written on the inside cover". */
export default function WhoItsForSection() {
  const { principles, brand } = siteConfig;
  return (
    <section id="principles" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label>How we work</Label>
          <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] tracking-tight text-ivory sm:text-6xl">
            Written on the <em className="text-brass">inside cover.</em>
          </h2>
          <div className="relative mt-10 hidden aspect-[4/5] max-w-xs overflow-hidden rounded-3xl lg:block">
            <img src="/images/enhanced_after_room_1794274507997.jpg" alt="" className="h-full w-full object-cover grayscale" loading="lazy" />
            <div className="absolute inset-0 bg-ink/30" />
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{brand.location}</p>
        </Reveal>

        <ol className="lg:col-span-7 lg:col-start-6 lg:pt-4">
          {principles.map((p, i) => (
            <Reveal key={p.highlight}>
              <li className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-8 last:border-b">
                <span className="pt-2 font-mono text-xs text-brass">0{i + 1}</span>
                <div>
                  <p className="font-serif text-3xl font-light leading-snug text-ivory sm:text-4xl">
                    {p.lead}{" "}
                    {p.strike && <span className="text-muted/50 line-through decoration-1">{p.strike}</span>}{" "}
                    <em className="rounded-md bg-brass/10 px-1.5 text-brass">{p.highlight}</em>
                  </p>
                  <p className="mt-3 max-w-lg text-[15px] font-light leading-relaxed text-muted">{p.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
