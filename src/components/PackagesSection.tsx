import React from "react";
import { Check } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { MetalButton } from "@/components/ui/liquid-glass-button";
import { Reveal, SectionHeading, scrollToId } from "./ui";

interface Props {
  onSelectPackage?: (packageName: string) => void;
}

export default function PackagesSection({ onSelectPackage }: Props) {
  const select = (name: string) => {
    onSelectPackage?.(name);
    scrollToId("contact");
  };

  return (
    <section id="pricing" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading
          label="Pricing"
          title={<>Clear investment. <em className="text-brass">No hourly billing.</em></>}
          intro="Every package includes a custom design, mobile-first build, basic SEO and launch support. 50% to start, 50% at launch."
        />

        <div className="grid items-stretch gap-3 lg:grid-cols-3">
          {siteConfig.packages.map((pkg) => (
            <Reveal key={pkg.name} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-[28px] p-8 sm:p-10 ${
                  pkg.popular ? "border border-brass/60 bg-card-2 shadow-2xl shadow-brass/5" : "border border-line bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl font-light text-ivory">{pkg.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{pkg.subtitle}</p>
                  </div>
                  {pkg.popular && (
                    <span className="rounded-full border border-brass/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brass">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                <p className="mt-10 font-serif text-6xl font-light tracking-tight text-ivory">{pkg.price}</p>
                <p className="mt-1 text-xs text-muted">One-off, fixed price</p>

                <ul className="mt-8 space-y-3 border-t border-line pt-8">
                  {pkg.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm font-light leading-relaxed text-muted">
                      <Check size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brass" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  {pkg.popular ? (
                    <MetalButton variant="gold" className="w-full" onClick={() => select(pkg.name)}>
                      {pkg.cta}
                    </MetalButton>
                  ) : (
                    <button
                      type="button"
                      onClick={() => select(pkg.name)}
                      className="h-11 w-full rounded-md border border-line text-sm text-ivory transition-colors hover:border-brass hover:text-brass"
                    >
                      {pkg.cta}
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-3 flex flex-col justify-between gap-4 rounded-[28px] border border-line bg-card p-7 sm:flex-row sm:items-center sm:px-10">
            <div>
              <h4 className="font-serif text-2xl font-light text-ivory">{siteConfig.carePlan.title}</h4>
              <p className="mt-1 max-w-2xl text-sm font-light text-muted">{siteConfig.carePlan.body}</p>
            </div>
            <a href="#faq" className="shrink-0 text-sm text-brass underline-offset-4 hover:underline">
              Questions? Read the FAQ
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
