import React from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import Backdrop from "./Backdrop";
import { Reveal, SectionHeading } from "./ui";

const tints = ["from-amber-700/50 to-stone-900/60", "from-orange-800/50 to-stone-900/60", "from-yellow-700/45 to-stone-900/60"];

/** 2. Work: concept cards. Add images to public/work/ (see siteConfig.work). */
export default function PortfolioSection({ asPage = false }: { asPage?: boolean }) {
  const { portfolio, work } = siteConfig;

  return (
    <DotSection id="work" tone="dark" className={`pb-24 sm:pb-32 ${asPage ? "pt-32 sm:pt-44" : "pt-24 sm:pt-32"}`}>
      <Backdrop />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        {asPage ? (
          <div className="mb-12 sm:mb-16">
            <h1 className="max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-ivory sm:text-7xl">{work.title}</h1>
            <p className="mt-5 max-w-xl text-lg text-muted">{work.intro}</p>
          </div>
        ) : (
          <SectionHeading title={work.title} intro={work.intro} />
        )}

        <ul className="grid gap-x-6 gap-y-14 md:grid-cols-3">
          {portfolio.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 100} className="flex flex-col">
              <div className="lift rounded-xl">
                <Preview file={p.image} alt={p.alt} title={p.title} tint={tints[i % tints.length]} />
              </div>
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

        {!asPage && (
          <a href="/work/" className="mt-14 inline-flex min-h-12 items-center rounded-full border border-ivory/40 px-6 text-sm text-ivory hover:border-brass hover:text-brass">
            See all work
          </a>
        )}

      </div>
    </DotSection>
  );
}

/** 16:10 image slot. Shows a styled placeholder until public/work/<file> exists. */
function Preview({ file, alt, title, tint }: { file: string; alt: string; title: string; tint: string }) {
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
        <div className={`flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br p-6 text-center ${tint}`}>
          <span className="font-serif text-3xl italic text-ivory">{title}</span>
          <span className="text-sm text-ivory/80">Preview coming soon</span>
        </div>
      )}
    </div>
  );
}
