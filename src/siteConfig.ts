/**
 * Upscaled — site content
 *
 * Every headline, FAQ answer and contact detail lives here.
 *
 * Page order: Hero → logo banner (once there are logos) → Work (once ready) →
 * What you get → How it works → About → Client stories (once there are quotes)
 * → FAQ → What do you need? (once contact.href is set)
 */

/* Set to true once your sample sites are in "portfolio" below. It adds the Work
   section on the homepage, the /work/ page, the menu link and the terms wording. */
const showWork: boolean = false;

/* Set to true to bring back the "About Upscaled" section and its menu link. */
const showAbout: boolean = false;

export const siteConfig = {
  showWork,
  showAbout,

  brand: {
    name: "Upscaled",
    wordmark: "upscaled",
    // TODO: confirm the live domain. Also change it in index.html, the legal
    // page HTML files, public/robots.txt and public/llms.txt.
    url: "https://upscaledvisuals.co.uk",
    description:
      "Upscaled designs and builds custom websites for small businesses in London and across the UK. Mobile-first, with SEO meta tags and analytics.",
    email: "hello@upscaledvisuals.co.uk", // TODO: confirm the real inbox
    phone: "", // Hidden while empty. e.g. "+442012345678" (add it to public/llms.txt too)
    instagramHandle: "@upscaledvisuals", // TODO: confirm handle
    instagramUrl: "https://instagram.com/upscaledvisuals", // TODO: confirm URL
    // Google Search Console: the code from its "HTML tag" verification option.
    googleVerification: "",
  },

  /* LEGAL & BUSINESS DETAILS
     Shown in the footer and on /privacy, /cookies and /terms. */
  legal: {
    //   "trading-name" – one or two people trading, not incorporated
    //   "ltd"          – a limited company registered at Companies House
    structure: "trading-name" as "trading-name" | "ltd",
    tradingName: "Upscaled",
    ownerNames: "", // TODO before launch: full legal names (a legal requirement)
    address: "", // TODO before launch: an address for correspondence (a legal requirement)
    companyName: "", // Ltd only, e.g. "Upscaled Studio Ltd"
    companyNumber: "", // Ltd only
    registeredOffice: "", // Ltd only
    placeOfRegistration: "England and Wales", // Ltd only
    vatNumber: "", // only if VAT-registered
    icoRegistration: "", // TODO: your ICO data protection fee reference, e.g. "ZB123456"
    // Services that handle visitor data. Keep this list true to what you actually use.
    hostingProvider: "", // optional, e.g. "Vercel Inc. (USA)"
    emailProvider: "", // optional, e.g. "Google Workspace"
    lastUpdated: "26 November 2026",
  },

  navigation: [
    ...(showWork ? [{ label: "Work", href: "/work/" }] : []),
    { label: "What you get", href: "/#more" },
    { label: "How it works", href: "/#process" },
    ...(showAbout ? [{ label: "About", href: "/#about" }] : []),
    { label: "FAQ", href: "/#faq" },
  ],

  /* CONTACT BUTTON. Jumps to the "What do you need?" section, which writes an
     email to brand.email. Set href to "" to hide the buttons and that section. */
  contact: {
    label: "Start here",
    href: "/#need",
  },

  /* WHAT DO YOU NEED? Visitors tap options and the email writes itself. */
  picker: {
    title: "What do you need?",
    intro: "Choose anything that fits. We'll start the email for you.",
    options: ["A new website", "A redesign of my website", "A website audit", "Help with AI", "I'm not sure yet"],
    aiOption: "Help with AI", // must match one of the options
    subject: "Website enquiry",
    greeting: "Hello Raffaele and Brilliana,",
  },

  /* HERO */
  hero: {
    headlineStart: "Web design for small businesses in",
    headlineAccent: "London",
    headlineEnd: ".",
    subheadline:
      "We design and build custom websites that make it easy for your customers to get in touch. Based in London, working across the UK.",
    primary: "Tell us what you need",
    secondary: "See how it works",
    // The row of short facts along the bottom of the first screen.
    facts: [
      { title: "Custom design", detail: "No templates" },
      { title: "Looked after", detail: "We maintain your site after launch" },
      { title: "Search-ready", detail: "Set up for Google to read" },
      { title: "UK-wide", detail: "Studio based in London" },
    ],
  },

  /* LOGO BANNER under the hero. Hidden until you add logos. Drop image files
     into public/logos/ and list them here, for example:
     { name: "Ember & Oak", image: "/logos/ember-oak.svg" }, */
  logos: [] as { name: string; image: string }[],

  /* WORK
     Images: drop 16:10 JPGs into public/work/ using the file names below, then
     rebuild (or restart the dev server). A placeholder shows until they exist. */
  work: {
    title: "Concept designs for three kinds of business",
    intro:
      "These are concepts we made to show how we'd approach each business. They aren't client projects.",
  },

  portfolio: [
    {
      id: "ember",
      image: "ember-oak.jpg",
      alt: "Concept website design for Ember & Oak, a café and bakery",
      title: "Ember & Oak",
      industry: "Café & bakery",
      tag: "Concept",
      problem: "Hungry people can't quickly find the menu or opening hours.",
      built: "A one-page site with the menu, hours, map and click-to-call ordering.",
      aim: "Make it quicker to visit or phone an order through.",
      url: "", // add the live demo link once built
    },
    {
      id: "maison",
      image: "maison.jpg",
      alt: "Concept website design for Maison Hair Studio, a salon",
      title: "Maison Hair Studio",
      industry: "Salon",
      tag: "Concept",
      problem: "Bookings arrive as direct messages that someone has to answer by hand.",
      built: "Online booking, a price list, stylist profiles and an Instagram gallery.",
      aim: "Let clients book a slot without sending a message first.",
      url: "",
    },
    {
      id: "northline",
      image: "northline.jpg",
      alt: "Concept website design for Northline Architects, an architecture practice",
      title: "Northline Architects",
      industry: "Architecture practice",
      tag: "Concept",
      problem: "Past projects are hard to browse, so enquiries arrive without much detail.",
      built: "Project case studies, service pages and a structured enquiry form.",
      aim: "Help the right clients describe their project when they get in touch.",
      url: "",
    },
  ],

  /* WHAT YOU GET */
  features: {
    title: "What you get with your website",
    intro: "What a website from us includes, and what you can add.",
    items: [
      { title: "Custom design", body: "A design made around your business, with no templates." },
      { title: "Easy to get in touch", body: "A site built so your customers can reach you without hunting for how." },
      { title: "SEO meta tags", body: "Page titles and descriptions that tell search engines what each page is about." },
      { title: "Google search visibility", body: "Pages set up so that Google can find and understand them." },
      { title: "Analytics", body: "See how many people visit your site and which pages they view." },
      { title: "AI services", body: "An optional extra. Ask us what would help your business.", ai: true },
    ] as { title: string; body: string; ai?: boolean }[],
  },

  /* Link shown on the AI services card once href is set, e.g. your Revena page. */
  aiLink: { label: "Visit Revena", href: "" },

  /* HOW IT WORKS */
  process: {
    title: "How our web design process works",
    intro: "We start by learning who your customers are, then design and build around them.",
    steps: [
      { title: "Call", description: "We talk about your business, your customers and what the site needs to do." },
      { title: "Design", description: "We design your homepage first and refine it with you." },
      { title: "Build", description: "We build the other pages, add your content and test on phones and desktops." },
      { title: "Launch", description: "We put your site live, check that everything works, then keep it maintained." },
    ],
  },

  /* ABOUT */
  about: {
    title: "About Upscaled",
    text: "We're Raffaele and Brilliana. We run Upscaled from London, designing and building websites for small businesses across the UK.",
    // A real photo of the two of you, e.g. { src: "/images/founders.jpg", alt: "Raffaele and Brilliana" }
    photo: { src: "", alt: "" },
  },

  /* CLIENT STORIES
     Only add real feedback from real clients, with their permission.
     While this list is empty, the section shows an honest "new studio" message.
     Example:
     { quote: "…", name: "Jane Smith", role: "Owner", business: "Example Ltd", photo: "" },
  */
  testimonials: [] as { quote: string; name: string; role: string; business: string; photo?: string }[],

  /* FAQ — also published as FAQPage structured data at build time. */
  faq: [
    {
      q: "Will my site be original, or a template?",
      a: "It's original. We design the layout around your business and your customers. We don't start from a bought theme.",
    },
    {
      q: "Who looks after my website once it's live?",
      a: "We do. We maintain your website after it launches, and we agree what that includes in writing.",
    },
    {
      q: "How does payment work?",
      a: "We send you a written quote first. You pay a 50% deposit to book your project, and the remaining balance at launch.",
    },
    {
      q: "I already have a website. Can you improve it?",
      a: "Yes. We offer a paid website audit, or we can rebuild your site. In a rebuild we can move your content across and set up redirects to help protect your Google rankings.",
    },
    {
      q: "Do you offer AI services?",
      a: "Yes. Email us and tell us what you'd like help with.",
    },
  ],

  footer: {
    copyright: `© ${new Date().getFullYear()} Upscaled. All rights reserved.`,
  },
};
