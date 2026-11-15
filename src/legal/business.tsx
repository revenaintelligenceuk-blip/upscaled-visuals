import React from "react";
import { siteConfig } from "../siteConfig";

const { legal, brand } = siteConfig;

/** One sentence identifying who runs the site, built from siteConfig.legal. */
export function businessIdentity(): string {
  if (legal.structure === "ltd") {
    return `${legal.tradingName} is a trading name of ${legal.companyName || "[COMPANY NAME] Ltd"}, a company registered in ${legal.placeOfRegistration} (company number ${legal.companyNumber || "[NUMBER]"}), registered office ${legal.registeredOffice || "[REGISTERED OFFICE]"}.`;
  }
  const how = legal.structure === "partnership" ? "a partnership of" : "the trading name of";
  return `${legal.tradingName} is ${how} ${legal.ownerNames}, ${legal.address}.`;
}

/** Small-print block for footers: identity, VAT, contact and legal links. */
export function BusinessDetails({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p>
        {businessIdentity()}
        {legal.vatNumber && ` VAT no. ${legal.vatNumber}.`}
        {legal.icoRegistration && ` ICO registration ${legal.icoRegistration}.`}{" "}
        Email <a href={`mailto:${brand.email}`} className="underline underline-offset-2 hover:text-brass">{brand.email}</a>.
      </p>
      <nav aria-label="Legal" className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
        <a href="/privacy/" className="hover:text-brass">Privacy policy</a>
        <a href="/cookies/" className="hover:text-brass">Cookies</a>
        <a href="/terms/" className="hover:text-brass">Terms of use</a>
      </nav>
    </div>
  );
}
