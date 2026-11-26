/** Build-time only: renders each page to HTML and builds the structured data. */
import { renderToString } from "react-dom/server";
import App from "./App";
import LegalPage, { type LegalPageKey } from "./legal/LegalPage";
import WorkPage from "./work/WorkPage";
import NotFoundPage from "./NotFoundPage";
import { siteConfig } from "./siteConfig";

export const siteUrl = siteConfig.brand.url;

export const render = (page: "home" | "work" | "notFound" | LegalPageKey) =>
  renderToString(
    page === "home" ? <App /> : page === "work" ? <WorkPage /> : page === "notFound" ? <NotFoundPage /> : <LegalPage page={page} />
  );

/** Google Search Console tag, once its code is set in siteConfig. */
export const verificationTag = () => {
  const code = siteConfig.brand.googleVerification.replace(/[^A-Za-z0-9_-]/g, "");
  return code ? `<meta name="google-site-verification" content="${code}" />` : "";
};

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
        telephone: brand.phone || undefined, // left out while empty
        image: `${brand.url}/og-image.png`,
        areaServed: [
          { "@type": "City", name: "London" },
          { "@type": "Country", name: "United Kingdom" },
        ],
        founder: [
          { "@type": "Person", name: "Raffaele" },
          { "@type": "Person", name: "Brilliana" },
        ],
        knowsAbout: ["Web design", "Web development", "Search engine optimisation"],
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
