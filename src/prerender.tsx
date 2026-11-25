/** Build-time only: renders each page to HTML and builds the structured data. */
import { renderToString } from "react-dom/server";
import App from "./App";
import LegalPage, { type LegalPageKey } from "./legal/LegalPage";
import { siteConfig } from "./siteConfig";

export const render = (page: "home" | LegalPageKey) =>
  renderToString(page === "home" ? <App /> : <LegalPage page={page} />);

export function structuredData(): string {
  const { brand, faq } = siteConfig;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${brand.url}/#business`,
        name: brand.name,
        url: `${brand.url}/`,
        description: brand.description,
        email: brand.email,
        telephone: brand.phone,
        image: `${brand.url}/og-image.png`,
        areaServed: { "@type": "Country", name: "United Kingdom" },
        address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
        sameAs: [brand.instagramUrl],
      },
      {
        "@type": "FAQPage",
        "@id": `${brand.url}/#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
  // Escape "<" so text can never close the script tag.
  return `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`;
}
