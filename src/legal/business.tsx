import React from "react";
import { siteConfig } from "../siteConfig";

const { legal, brand } = siteConfig;

/**
 * The line identifying who runs the site. Empty details are left out.
 * Before launch, fill in siteConfig.legal.ownerNames and siteConfig.legal.address:
 * UK law requires a business to show who runs it and where it can be contacted.
 */
export function businessIdentity(): string {
  if (legal.structure === "ltd" && legal.companyName) {
    const number = legal.companyNumber ? ` (company number ${legal.companyNumber})` : "";
    const office = legal.registeredOffice ? `, registered office ${legal.registeredOffice}` : "";
    return `${legal.tradingName} is a trading name of ${legal.companyName}, a company registered in ${legal.placeOfRegistration}${number}${office}.`;
  }
  const who = legal.ownerNames
    ? `${legal.tradingName} is a trading name of ${legal.ownerNames}.`
    : `${legal.tradingName} is a web design studio based in London.`;
  return legal.address ? `${who} Address for correspondence: ${legal.address}.` : who;
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
