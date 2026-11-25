import React from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Reveal, SectionHeading, scrollToId } from "./ui";

/** 2. Work: concept cards. Add images to public/work/ (see siteConfig.work). */
export default function PortfolioSection({ onRequestWalkthrough }: { onRequestWalkthrough: () => void }) {
  const { portfolio, work } = siteConfig;

  return (
    <section id="work" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading title={work.title} intro={work.intro} />

        <ul className="grid gap-x-6 gap-y-14 md:grid-cols-3">
          {portfolio.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 100} className="flex flex-col">
              <Preview file={p.image} alt={p.alt} title={p.title} />
              <p className="mt-5 text-sm text-muted">{p.industry} · {p.tag}</p>
              <h3 className="mt-1 text-2xl font-medium tracking-[-0.03em] text-ivory sm:text-3xl">{p.title}</h3>
              <dl className="mt-4 space-y-3 border-t border-line pt-4 text-[15px] leading-relaxed">
                {[
                  ["The problem", p.problem],
                  ["What we built", p.built],
                  ["What it's designed to do", p.aim],
                ].map(([term, detail]) => (
                  <div key={term}>
                    <dt className="font-medium text-ivory">{term}</dt>
                    <dd className="text-muted">{detail}</dd>
                  </div>
                ))}
              </dl>
              {p.url && (
                <a href={p.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 w-fit items-center gap-2 text-sm text-brass underline underline-offset-4">
                  View the {p.title} concept <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[15px] leading-relaxed text-muted">{work.note}</p>
          <button
            type="button"
            onClick={() => {
              onRequestWalkthrough();
              scrollToId("contact");
            }}
            className="inline-flex min-h-12 items-center gap-2 self-start rounded-full border border-ivory/40 px-6 text-sm text-ivory transition-colors hover:border-brass hover:text-brass sm:self-auto"
          >
            {work.cta} <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

/** 16:10 image slot. Shows a styled placeholder until public/work/<file> exists. */
function Preview({ file, alt, title }: { file: string; alt: string; title: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-card">
      {__WORK_IMAGES__.includes(file) ? (
        <img
          src={`/work/${file}`}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(min-width: 1400px) 440px, (min-width: 768px) 31vw, calc(100vw - 32px)"
          srcSet={`/work/${file} 1600w`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="bg-grid flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
          <span className="font-serif text-3xl italic text-brass">{title}</span>
          <span className="text-sm text-muted">Preview coming soon</span>
        </div>
      )}
    </div>
  );
}
