import React from "react";
import { Quote } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Label, Reveal, scrollToId } from "./ui";

/**
 * 7. Testimonials. Shows real client quotes from siteConfig.testimonials.
 * While that list is empty, it shows an honest "we're new" message instead,
 * so the site never displays made-up reviews.
 */
export default function TestimonialsSection() {
  const { testimonials } = siteConfig;
  return (
    <section id="testimonials" className="bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Label tone="light">Testimonials</Label>
            <h2 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl">
              {testimonials.length ? (
                <>What our clients say.</>
              ) : (
                <>Client stories</>
              )}
            </h2>
          </div>
        </Reveal>

        {testimonials.length ? (
          <div className="mt-14 grid gap-3 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name + t.business} className="h-full" delay={(i % 3) * 120}>
                <figure className="lift flex h-full flex-col rounded-2xl border border-paper-line bg-white/70 p-7 sm:p-8">
                  <Quote size={22} className="text-brass-deep" />
                  <blockquote className="mb-8 mt-5 text-lg leading-relaxed tracking-[-0.01em]">"{t.quote}"</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 border-t border-paper-line pt-5">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-ivory" aria-hidden="true">
                        {t.name.charAt(0)}
                      </span>
                    )}
                    <span>
                      <span className="block text-sm font-medium">{t.name}</span>
                      <span className="block text-xs text-stone">{t.role}, {t.business}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="mt-14 grid gap-8 rounded-2xl bg-ink p-8 text-ivory sm:mt-20 sm:p-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <Quote size={26} className="text-brass" />
                <p className="mt-5 text-2xl leading-snug tracking-[-0.02em] sm:text-3xl">
                  We're a new studio, and we'd rather show you nothing than show you fake reviews. Our first client stories will live right here.
                </p>
                <p className="mt-4 text-sm text-muted">Raffaele &amp; Brilliana</p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="text-[15px] leading-relaxed text-muted">
                  Being one of our first clients means our full attention on your project, and a site we'll be proud to put in this section.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-brass"
                >
                  Be one of our first clients
                </button>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
