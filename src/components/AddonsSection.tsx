import React from "react";
import { siteConfig } from "../siteConfig";
import { Reveal, SectionHeading } from "./ui";

/** 6. Optional add-ons. No prices on purpose. */
export default function AddonsSection() {
  const { title, intro, items } = siteConfig.addons;
  return (
    <section id="more" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading title={title} intro={intro} />
        <Reveal>
          <dl className="border-t border-line">
            {items.map((a) => (
              <div key={a.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-8">
                <dt className="text-xl font-medium tracking-[-0.02em] text-ivory md:col-span-5">{a.title}</dt>
                <dd className="text-base leading-relaxed text-muted md:col-span-7">{a.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
