import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { scrollToId } from "./ui";
import { BusinessDetails } from "../legal/business";


export default function Footer() {
  const { brand, footer, navigation, founders } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-ink pt-20 sm:pt-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-ivory sm:text-5xl">
              Got something
              <br />
              in mind?
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              A business to show off, a site that needs a rethink, or an idea that needs somewhere to go.
            </p>
            <LiquidButton size="lg" className="mt-6 rounded-full" onClick={() => scrollToId("contact")}>
              Free consultation <ArrowUpRight />
            </LiquidButton>
          </div>

          <FooterCol title="Navigate" className="md:col-span-2 md:col-start-7">
            {navigation.map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-brass">{n.label}</a></li>
            ))}
          </FooterCol>
          <FooterCol title="Contact" className="md:col-span-3">
            <li><a href={`mailto:${brand.email}`} className="break-all hover:text-brass">{brand.email}</a></li>
            <li><a href={brand.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-brass">Instagram</a></li>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-muted/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright} · {founders.map((f) => f.name).join(" & ")}</p>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-ivory">
            Back to top <ArrowUp size={12} />
          </a>
        </div>
        <BusinessDetails className="mt-4 max-w-3xl text-xs leading-relaxed text-muted/70" />
      </div>

      {/* Giant wordmark */}
      <div className="relative mt-6 select-none">
        <p
          aria-hidden="true"
          className="text-center font-semibold leading-[0.78] tracking-[-0.06em] text-ivory"
          style={{ fontSize: "clamp(5rem, 24vw, 22rem)" }}
        >
          upscaled
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title} className={className}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted/70">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-ivory/85">{children}</ul>
    </nav>
  );
}
