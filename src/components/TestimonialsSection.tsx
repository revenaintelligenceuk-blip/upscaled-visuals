import React from "react";
import { Quote } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Reveal, SectionHeading, scrollToId } from "./ui";

/**
 * 7. Client stories. Shows real quotes from siteConfig.testimonials.
 * While that list is empty, it shows an honest "new studio" message instead,
 * so the site never displays made-up reviews.
 */
export default function TestimonialsSection() {
  const { testimonials, cta } = siteConfig;
  return (
    <section id="testimonials" className="on-light bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading tone="light" title="Client stories" />

        {testimonials.length ? (
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
        ) : (
          <Reveal>
            <div className="grid gap-8 rounded-2xl bg-ink p-8 text-ivory sm:p-12 lg:grid-cols-12 lg:items-center">
              <p className="text-2xl leading-snug tracking-[-0.02em] sm:text-3xl lg:col-span-7">
                We're a new studio, so we don't have client reviews to show yet. We'll add them here as we finish real projects, and we won't invent any.
              </p>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="text-base leading-relaxed text-muted">
                  If you're one of our early clients, your project gets our full attention.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ivory px-6 text-sm font-medium text-ink transition-colors hover:bg-brass"
                >
                  {cta.label}
                </button>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
