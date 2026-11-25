/**
 * Upscaled — site content
 *
 * Every headline, FAQ answer and contact detail lives here.
 * Anything marked TODO is a placeholder to confirm before launch.
 *
 * Page order: Hero → Work → What's included → Why your website matters →
 * How it works → More than a website → Client stories → FAQ → Free audit
 */

const env = import.meta.env;
const formspreeId: string = env.VITE_FORMSPREE_ID ?? "";

export const siteConfig = {
  brand: {
    name: "Upscaled",
    wordmark: "upscaled",
    // TODO: confirm the live domain. Also change it in index.html, the legal
    // page HTML files, public/robots.txt, public/sitemap.xml and public/llms.txt.
    url: "https://upscaledvisuals.co.uk",
    description:
      "London web design studio building custom websites for UK small businesses. Fixed price, live in about two weeks.",
    email: "hello@upscaledvisuals.co.uk", // TODO: confirm the real inbox
    phone: "[PHONE]", // TODO: your phone number, e.g. "+442012345678" (also in public/llms.txt)
    instagramHandle: "@upscaledvisuals", // TODO: confirm handle
    instagramUrl: "https://instagram.com/upscaledvisuals", // TODO: confirm URL
    location: "Based in London · Working UK-wide",
    // Both come from environment variables — see .env.example.
    formEndpoint: formspreeId ? `https://formspree.io/f/${formspreeId}` : "", // TODO: VITE_FORMSPREE_ID
    formProvider: "Formspree, Inc. (USA)",
    bookingUrl: (env.VITE_BOOKING_URL ?? "") as string, // TODO: VITE_BOOKING_URL (your Calendly link)
    bookingProvider: "Calendly (USA)",
  },

  /* LEGAL & BUSINESS DETAILS
     Shown in the footer and on /privacy, /cookies and /terms. */
  legal: {
    //   "trading-name" – one or two people trading, not incorporated
    //   "ltd"          – a limited company registered at Companies House
    structure: "trading-name" as "trading-name" | "ltd",
    tradingName: "Upscaled",
    ownerNames: "[FULL NAME] and [FULL NAME]", // TODO: full legal names
    address: "[ADDRESS]", // TODO: a real address for correspondence (not a PO box)
    companyName: "", // Ltd only, e.g. "Upscaled Studio Ltd"
    companyNumber: "", // Ltd only
    registeredOffice: "", // Ltd only
    placeOfRegistration: "England and Wales", // Ltd only
    vatNumber: "", // only if VAT-registered
    icoRegistration: "", // TODO: your ICO data protection fee reference, e.g. "ZB123456"
    // Services that handle visitor data. Keep this list true to what you actually use.
    hostingProvider: "[HOSTING PROVIDER]", // TODO: e.g. "Vercel Inc. (USA)"
    emailProvider: "[EMAIL PROVIDER]", // TODO: e.g. "Google Workspace"
    lastUpdated: "25 November 2026",
  },

  /* The one place on the marketing pages that names the founders. */
  founderLine: "Run by Raffaele & Brilliana from London.",

  navigation: [
    { label: "Work", href: "#work" },
    { label: "What's included", href: "#included" },
    { label: "How it works", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],

  /* The main call to action, used in the hero, nav, footer and contact section. */
  cta: {
    label: "Get a free website audit",
    shortLabel: "Free audit", // narrow phones only
    support:
      "Send us your site and we'll send back 5 specific fixes within 2 working days. Free, no obligation.",
  },

  /* HERO */
  hero: {
    eyebrow: "Web design & development studio",
    headlineStart: "Websites that turn visitors into",
    headlineAccent: "customers",
    headlineEnd: ".",
    subheadline:
      "We're a London studio building custom websites for UK small businesses, designed to make it easy for customers to get in touch. Fixed price, live in about two weeks.",
    ctaSecondary: "See our work",
    facts: [
      { title: "Fixed price", detail: "Agreed in writing before we start" },
      { title: "About 2 weeks", detail: "Typical time from first call to launch" },
      { title: "UK-wide", detail: "Studio based in London" },
    ],
  },

  /* WORK
     Images: drop 16:10 JPGs into public/work/ using the file names below, then
     rebuild (or restart the dev server). A placeholder shows until they exist. */
  work: {
    title: "Concept designs for three kinds of business",
    intro:
      "These are concepts we made to show how we'd approach each business. They aren't client projects.",
    note: "Want to know the thinking behind a concept? We'll talk you through it on a short call.",
    cta: "Ask for a walkthrough",
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

  /* WHAT'S INCLUDED */
  included: {
    title: "What's included",
    intro: "Every website project comes with the following.",
    items: [
      "Custom design, with no templates",
      "Mobile-first build",
      "Copywriting help",
      "Google Business Profile set-up",
      "Basic search engine optimisation (SEO)",
      "Analytics",
      "Domain and email set-up",
      "30 days of free fixes after launch",
      "You own your site and domain, always",
    ],
  },

  /* WHY YOUR WEBSITE MATTERS */
  why: {
    title: "Why your website matters",
    points: [
      {
        title: "It builds trust",
        body: "People often look a business up before spending money with it, and a clear website shows them what you do and how to reach you.",
      },
      {
        title: "People find you on Google",
        body: "Your own pages give Google something to show when someone searches for your services in your area.",
      },
      {
        title: "You own it",
        body: "A social platform can change what people see or close your account, while your website and domain stay in your name.",
      },
    ],
  },

  /* HOW IT WORKS */
  process: {
    title: "How it works",
    intro: "We start by learning who your customers are, then design and build around them.",
    steps: [
      { title: "Call", timing: "Day 1", description: "We talk about your business, your customers and what the site needs to do." },
      { title: "Design", timing: "Week 1", description: "We design your homepage first and refine it with you." },
      { title: "Build", timing: "Week 2", description: "We build the other pages, add your content and test on phones and desktops." },
      { title: "Launch", timing: "Go live", description: "We connect your domain, set up Google and analytics, and check it all works." },
    ],
  },

  /* MORE THAN A WEBSITE: optional add-ons, no prices */
  addons: {
    title: "More than a website",
    intro: "Optional extras you can add now or later.",
    items: [
      { title: "Missed-call text-back", body: "If you miss a call, the caller gets a text so they can reply or arrange a time." },
      { title: "AI enquiry replies", body: "An AI assistant answers common questions from enquiries and passes the details on to you." },
      { title: "Online booking and reminders", body: "Customers choose a time online and get a reminder before their appointment." },
      { title: "Review requests", body: "After a job or visit, customers get a message asking them to leave a review." },
      { title: "Ongoing care plan", body: "We look after your hosting, updates and small edits." },
    ],
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
      q: "How long does a website take?",
      a: "A one-page site is usually live in about 1 week. A site with several pages typically takes about 2 weeks. The biggest factor is how quickly we receive your text, photos and logo, so late content moves the launch date.",
    },
    {
      q: "What does \"fixed price\" mean?",
      a: "After our call, we send a written quote listing what you'll get and what it costs. That price doesn't change while the work stays within the list. If you ask for something extra, we agree the cost with you before doing it.",
    },
    {
      q: "Will my site be original, or a template?",
      a: "It's original. We design the layout and write the pages around your business and your customers. We don't start from a bought theme.",
    },
    {
      q: "Who owns the website?",
      a: "You do. The domain is registered in your name, and the content and design are yours once the project is paid for. If you move to another provider later, you can take them with you.",
    },
    {
      q: "Can I edit the site myself?",
      a: "Yes. At handover we show you how to change text and images. If you'd rather not, we can make the changes for you, either as one-off edits or through a care plan.",
    },
    {
      q: "How does payment work?",
      a: "You pay in two stages. A 50% deposit books your project, and the remaining balance is due at launch, once you're happy. Hosting and domain costs are passed on at cost.",
    },
    {
      q: "I already have a website. Can you improve it?",
      a: "Yes. Start with the free audit and we'll send you 5 specific fixes. If you want a rebuild, we can keep your domain, move your content across and set up redirects to help protect your Google rankings.",
    },
  ],

  /* FREE AUDIT / CONTACT */
  contact: {
    eyebrow: "Free website audit",
    heading: "Get a free website audit.",
    quoteLine: "Fixed quote within 48 hours of your call.",
    noSite: "No website yet? Choose \"New website\" and we'll arrange a free call instead.",
    auditType: "Free audit of my current site",
    walkthroughType: "Concept walkthrough",
    auditSubmitLabel: "Get my free audit",
    submitLabel: "Send my enquiry",
    success: "Thanks, we'll reply within one working day with times for a call.",
    projectTypes: [
      "Free audit of my current site",
      "New website",
      "Redesign of an existing site",
      "Online shop / bookings",
      "Concept walkthrough",
      "Not sure yet",
    ],
    budgets: ["Under £800", "£800 – £1,500", "£1,500 – £2,500", "£2,500+", "Not sure yet"],
  },

  footer: {
    cta: "Want a second opinion on your site?",
    copyright: `© ${new Date().getFullYear()} Upscaled. All rights reserved.`,
  },
};
