import React from "react";
import { Quote } from "lucide-react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import Backdrop from "./Backdrop";
import { Reveal, SectionHeading } from "./ui";

/**
 * Client stories. Shows real quotes from siteConfig.testimonials, and nothing
 * at all while that list is empty, so the site never displays made-up reviews.
 */
export default function TestimonialsSection() {
  const { testimonials } = siteConfig;
  if (!testimonials.length) return null;

  return (
    <DotSection id="testimonials" tone="light" className="py-24 sm:py-32">
      <Backdrop tone="light" />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading tone="light" title="Client stories" />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + t.business} className="h-full" delay={(i % 3) * 120}>
              <figure className="lift flex h-full flex-col rounded-2xl border border-paper-line bg-white/70 p-7 sm:p-8">
                <Quote size={22} aria-hidden="true" className="text-brass-deep" />
                <blockquote className="mb-8 mt-5 text-lg leading-relaxed tracking-[-0.01em]">"{t.quote}"</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-paper-line pt-5">
                  {t.photo ? (
                    <img src={t.photo} alt="" loading="lazy" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-ivory" aria-hidden="true">
                      {t.name.charAt(0)}
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-medium">{t.name}</span>
                    <span className="block text-sm text-stone">{t.role}, {t.business}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </DotSection>
  );
}
