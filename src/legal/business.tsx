import React from "react";
import { siteConfig } from "../siteConfig";

const { legal, brand } = siteConfig;

/**
 * The one line identifying who runs the site.
 * TODO: fill in siteConfig.legal.ownerNames and siteConfig.legal.address.
 */
export function businessIdentity(): string {
  if (legal.structure === "ltd") {
    return `${legal.tradingName} is a trading name of ${legal.companyName || "[COMPANY NAME] Ltd"}, a company registered in ${legal.placeOfRegistration} (company number ${legal.companyNumber || "[NUMBER]"}), registered office ${legal.registeredOffice || "[REGISTERED OFFICE]"}.`;
  }
  return `${legal.tradingName} is a trading name of ${legal.ownerNames}. Address for correspondence: ${legal.address}.`;
}

/** Small-print block for footers: identity, VAT and legal links. */
export function BusinessDetails({ className = "", identity = true }: { className?: string; identity?: boolean }) {
  return (
    <div className={className}>
      {identity && (
        <p>
          {businessIdentity()}
          {legal.vatNumber && ` VAT no. ${legal.vatNumber}.`}
          {legal.icoRegistration && ` ICO registration ${legal.icoRegistration}.`}
        </p>
      )}
      <nav aria-label="Legal" className="mt-1 flex flex-wrap gap-x-5">
        {[
          ["/privacy/", "Privacy policy"],
          ["/cookies/", "Cookie policy"],
          ["/terms/", "Terms of use"],
        ].map(([href, label]) => (
          <a key={href} href={href} className="flex min-h-11 min-w-11 items-center hover:underline">{label}</a>
        ))}
        <a href={`mailto:${brand.email}`} className="flex min-h-11 items-center hover:underline">Email us</a>
      </nav>
    </div>
  );
}
