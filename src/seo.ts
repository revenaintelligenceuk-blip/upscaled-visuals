/**
 * Search and sharing tags for every page. `npm run build` writes them into each
 * page's <head> (scripts/prerender.mjs), so the domain, email and wording come
 * from one place. Titles: up to 60 characters. Descriptions: 140 to 160.
 */
import { siteConfig } from "./siteConfig";

export type PageKey = "home" | "work" | "privacy" | "cookies" | "terms" | "notFound";

type Page = { path: string; name: string; title: string; description: string; index?: boolean };

export const pages: Record<PageKey, Page> = {
  home: {
    path: "/",
    name: "Home",
    title: "Web Design for Businesses in London | Upscaled",
    description: siteConfig.brand.description,
  },
  work: {
    path: "/work/",
    name: "Work",
    title: "Our Work: Website Designs for Businesses | Upscaled",
    description: "Concept website designs by Upscaled, a London web design studio. See how we would approach a café and bakery, a hair salon and an architecture firm.",
  },
  privacy: {
    path: "/privacy/",
    name: "Privacy policy",
    title: "Privacy policy | Upscaled",
    description: "How Upscaled, a London web design studio, collects, uses and protects your personal information when you visit this website or get in touch with us.",
  },
  cookies: {
    path: "/cookies/",
    name: "Cookie policy",
    title: "Cookie policy | Upscaled",
    description: "The Upscaled website does not set cookies. Read how our privacy-friendly analytics count visits without storing anything on your device or tracking you.",
  },
  terms: {
    path: "/terms/",
    name: "Terms of use",
    title: "Terms of use | Upscaled",
    description: "The terms that cover your use of the Upscaled website, including the information on it, enquiries and projects, our content, links, liability and law.",
  },
  notFound: {
    path: "/404.html",
    name: "Page not found",
    title: "Page not found | Upscaled",
    description: "That page can't be found. Go to the Upscaled homepage.",
    index: false,
  },
};

/** Services named on the site, listed for search engines. */
const services = [
  ["Web design", "Custom website design and build for businesses."],
  ["Website maintenance", "Looking after the websites we build once they are live."],
  ["Website redesign", "Rebuilding an existing website, moving content across and setting up redirects."],
  ["Website audit", "A paid review of an existing website."],
  ["AI services", "An optional extra to help a business."],
];

const url = (path: string) => `${siteConfig.brand.url}${path}`;

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Schema.org data: who the business is, what it offers and what each page is. */
export function structuredData(key: PageKey) {
  const { brand, faq } = siteConfig;
  const page = pages[key];
  const business = { "@id": url("/#business") };
  const website = { "@id": url("/#website") };

  const graph: object[] = [
    {
      "@type": "ProfessionalService",
      ...business,
      name: brand.name,
      url: url("/"),
      description: brand.description,
      email: brand.email,
      telephone: brand.phone || undefined, // left out while empty
      logo: url("/icon-512.png"),
      image: url("/og-image.png"),
      areaServed: "GB",
      founder: [
        { "@type": "Person", name: "Raffaele" },
        { "@type": "Person", name: "Brilliana" },
      ],
      knowsAbout: ["Web design", "Web development", "Website maintenance", "Search engine optimisation"],
      address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
      sameAs: brand.instagramUrl ? [brand.instagramUrl] : undefined,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map(([name, description]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, description },
        })),
      },
    },
    { "@type": "WebSite", ...website, url: url("/"), name: brand.name, inLanguage: "en-GB", publisher: business },
    {
      "@type": "WebPage",
      "@id": url(`${page.path}#webpage`),
      url: url(page.path),
      name: page.title,
      description: page.description,
      inLanguage: "en-GB",
      isPartOf: website,
      about: business,
    },
  ];

  if (key === "home") {
    graph.push({
      "@type": "FAQPage",
      "@id": url("/#faq"),
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  } else {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [pages.home, page].map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, item: url(p.path) })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/** Everything that goes into a page's <head>. */
export function headTags(key: PageKey): string {
  const { brand } = siteConfig;
  const page = pages[key];
  const meta = (attribute: "name" | "property", name: string, content: string) =>
    `<meta ${attribute}="${name}" content="${escape(content)}" />`;

  const tags = [`<title>${escape(page.title)}</title>`, meta("name", "description", page.description)];

  // The not-found page stays out of search results, so it needs nothing else.
  if (page.index === false) return [...tags, meta("name", "robots", "noindex")].join("\n    ");

  const image = url("/og-image.png");
  const imageAlt = "Upscaled: Web design for businesses in London.";
  tags.push(
    meta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1"),
    `<link rel="canonical" href="${escape(url(page.path))}" />`,
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", brand.name),
    meta("property", "og:locale", "en_GB"),
    meta("property", "og:title", page.title),
    meta("property", "og:description", page.description),
    meta("property", "og:url", url(page.path)),
    meta("property", "og:image", image),
    meta("property", "og:image:type", "image/png"),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", imageAlt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", page.title),
    meta("name", "twitter:description", page.description),
    meta("name", "twitter:image", image),
    meta("name", "twitter:image:alt", imageAlt),
  );

  // Google Search Console tag, once its code is set in siteConfig.
  const code = brand.googleVerification.replace(/[^A-Za-z0-9_-]/g, "");
  if (key === "home" && code) tags.push(meta("name", "google-site-verification", code));

  // Escape "<" so text can never close the script tag.
  tags.push(`<script type="application/ld+json">${JSON.stringify(structuredData(key)).replace(/</g, "\\u003c")}</script>`);

  return tags.join("\n    ");
}
