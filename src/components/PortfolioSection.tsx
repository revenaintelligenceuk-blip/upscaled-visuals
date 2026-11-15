import React from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Reveal, SectionHeading, scrollToId } from "./ui";

/**
 * 2. Portfolio teaser. Text only on purpose: the full examples live on their own
 * page (siteConfig.portfolioPage.url). Until that page exists, the button opens
 * the contact form with "Portfolio & walkthrough" selected.
 */
export default function PortfolioSection({ onRequestWalkthrough }: { onRequestWalkthrough: () => void }) {
  const { portfolio, portfolioPage } = siteConfig;

  const handleClick = () => {
    if (portfolioPage.url) {
      window.location.href = portfolioPage.url;
      return;
    }
    onRequestWalkthrough();
    scrollToId("contact");
  };

  return (
    <section id="work" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading
          label="Selected work"
          title="Built around the customer each business needs to win."
          intro="A few of the sites we've designed. Ask for the full portfolio and we'll walk you through how each one was planned and built."
        />

        <ol className="border-t border-line">
          {portfolio.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 80} className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-8 sm:py-12">
              <div className="md:col-span-5">
                <p className="text-sm text-muted">{p.industry}{p.tag ? ` · ${p.tag}` : ""}</p>
                <h3 className="mt-2 text-3xl font-medium tracking-[-0.03em] text-ivory sm:text-4xl">
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brass">
                      {p.title} <ArrowUpRight size={22} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
              </div>
              <div className="md:col-span-4">
                <p className="text-[15px] leading-relaxed text-ivory/85">{p.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.built.join(", ")}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted md:col-span-3 md:text-right">
                <span className="text-ivory/85">Goal:</span> {p.goal}
              </p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm text-muted">{portfolioPage.note}</p>
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center gap-2 self-start rounded-full border border-ivory/30 px-6 py-3 text-sm text-ivory transition-colors hover:border-brass hover:text-brass sm:self-auto"
          >
            {portfolioPage.cta} <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
