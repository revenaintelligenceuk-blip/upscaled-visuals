import React from "react";
import { Check } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Reveal, SectionHeading } from "./ui";

/** 3. What's included with every website. */
export default function IncludedSection() {
  const { title, intro, items } = siteConfig.included;
  return (
    <section id="included" className="on-light bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading tone="light" title={title} intro={intro} />
        <Reveal>
          <ul className="grid gap-x-12 border-t border-paper-line md:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 border-b border-paper-line py-5 text-lg tracking-[-0.01em]">
                <Check size={20} strokeWidth={1.75} className="mt-1 shrink-0 text-brass-deep" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
