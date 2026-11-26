import React from "react";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import Backdrop from "./Backdrop";
import { BusinessDetails } from "../legal/business";

const link = "flex min-h-11 min-w-11 items-center hover:text-brass";

export default function Footer() {
  const { brand, footer, navigation } = siteConfig;

  return (
    <DotSection as="footer" tone="dark" className="pt-20 sm:pt-28">
      <Backdrop />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <FooterCol title="Navigate" className="md:col-span-5">
            {navigation.map((n) => (
              <li key={n.href}><a href={n.href} className={link}>{n.label}</a></li>
            ))}
          </FooterCol>
          <FooterCol title="Contact" className="md:col-span-4">
            {brand.phone && <li><a href={`tel:${brand.phone}`} className={link}>Call {brand.phone}</a></li>}
            <li><a href={`mailto:${brand.email}`} className={`${link} break-all`}>{brand.email}</a></li>
            <li><a href={brand.instagramUrl} target="_blank" rel="noreferrer" className={link}>Instagram<span className="sr-only"> (opens in a new tab)</span></a></li>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <a href="#main" className="flex min-h-11 w-fit items-center gap-1.5 hover:text-ivory">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
        <BusinessDetails className="mt-2 max-w-3xl text-sm leading-relaxed text-muted" />
      </div>

      {/* Giant wordmark */}
      <div className="relative mt-6 select-none">
        <p
          aria-hidden="true"
          className="wordmark-colour text-center font-semibold leading-[0.78] tracking-[-0.06em]"
          style={{ fontSize: "clamp(5rem, 24vw, 22rem)" }}
        >
          {brand.wordmark}
        </p>
      </div>
    </DotSection>
  );
}

function FooterCol({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title} className={className}>
      <p className="text-sm font-medium text-ivory">{title}</p>
      <ul className="mt-2 text-sm text-muted">{children}</ul>
    </nav>
  );
}
