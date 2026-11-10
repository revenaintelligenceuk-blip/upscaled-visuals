/**
 * Upscaled — site content
 *
 * Every headline, price, FAQ answer and contact detail lives here.
 * Anything marked TODO is a placeholder to confirm before launch.
 */

export const siteConfig = {
  brand: {
    name: "Upscaled",
    wordmark: "upscaled",
    tagline: "A two-person web studio for small businesses",
    email: "hello@upscaledvisuals.co.uk", // TODO: confirm the real inbox
    instagramHandle: "@upscaledvisuals", // TODO: confirm handle
    instagramUrl: "https://instagram.com/upscaledvisuals", // TODO: confirm URL
    location: "Based in London · Working UK-wide",
    // Optional: paste a Formspree / Basin / Getform endpoint here to receive form
    // submissions by email. Left empty, the form opens the visitor's email app instead.
    formEndpoint: "",
  },

  founders: [
    // TODO: swap in photos (put them in /public/images) and real roles
    { name: "Raffaele", role: "Co-founder", initial: "R", photo: "" },
    { name: "Brilliana", role: "Co-founder", initial: "B", photo: "" },
  ],

  navigation: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    eyebrow: "Web design & development studio",
    headlineStart: "Websites that make your business look as",
    headlineAccent: "good",
    headlineEnd: "as it really is.",
    subheadline:
      "We're Raffaele and Brilliana. We design, build and launch fast, modern websites for small businesses, at a fixed price, live in about two weeks.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See our work",
    proof: [
      { value: "~2 weeks", label: "From kickoff to launch" },
      { value: "Fixed price", label: "Agreed up front, no surprises" },
      { value: "100% yours", label: "You own the site and domain" },
    ],
  },

  statement: {
    lead: "We believe a great small-business website isn't built through decoration,",
    rest: "but through clarity: it says who you are, earns trust in seconds, and quietly turns visitors into customers.",
  },

  industries: [
    "Cafés & restaurants",
    "Salons & barbers",
    "Trades & contractors",
    "Personal trainers",
    "Estate & letting agents",
    "Consultants",
    "Creative studios",
    "Local shops",
    "Clinics & therapists",
    "Start-ups",
  ],

  comparison: {
    eyebrow: "The difference",
    heading: "Same business. Different first impression.",
    subheading:
      "Most visitors decide in a few seconds whether to stay. Drag the slider to see what a redesign does for a typical small-business site.",
    beforeLabel: "Before",
    afterLabel: "After",
    highlights: [
      "Clear headline that says what you do and where",
      "One obvious next step: call, book or enquire",
      "Built mobile-first, since most visitors are on a phone",
      "Fast loading and set up to be found on Google",
    ],
  },

  services: [
    {
      id: "design",
      number: "01",
      title: "Website design & build",
      description:
        "A custom-designed website, built from scratch around your business. No cookie-cutter templates. Responsive, fast and easy to navigate.",
      features: ["Custom design, not a template", "Mobile-first and fast", "Contact forms, maps & booking links"],
    },
    {
      id: "redesign",
      number: "02",
      title: "Redesigns",
      description:
        "Already have a site that's dated, slow or hard to update? We rebuild it with a modern look and keep your domain and search rankings intact.",
      features: ["Content moved over for you", "Old links redirected", "Clear before/after improvements"],
    },
    {
      id: "care",
      number: "03",
      title: "Launch & ongoing care",
      description:
        "We handle the technical side: domain, hosting, SEO basics and Google Business setup. Optional monthly care keeps it updated and secure.",
      features: ["Domain & hosting set up", "On-page SEO & analytics", "Monthly edits on the care plan"],
    },
  ],

  // Rendered as: lead + struck-through word + highlighted phrase
  principles: [
    { lead: "Clarity over", strike: "decoration,", highlight: "every time.", body: "A visitor should know what you do and how to reach you within seconds." },
    { lead: "Fewer", strike: "pages,", highlight: "better decisions.", body: "We cut what doesn't help a customer choose you, and make what's left beautiful." },
    { lead: "Say it plainly, then", strike: "", highlight: "make it beautiful.", body: "No jargon, in our copy or in our conversations with you." },
    { lead: "Design for the second look,", strike: "", highlight: "not just the first scroll.", body: "Details that keep holding up after the first impression." },
    { lead: "Small team. Direct line.", strike: "", highlight: "No account managers.", body: "You talk to the two people actually designing and building your site." },
  ],

  process: [
    { step: "01", title: "Discovery call", timing: "Day 1", description: "A free 20-minute call about your business, your customers and what the site needs to do." },
    { step: "02", title: "Design", timing: "Week 1", description: "We design the homepage first, share it with you and refine it together until it feels right." },
    { step: "03", title: "Build", timing: "Week 2", description: "We build the full site, add your content and test it on phones, tablets and desktops." },
    { step: "04", title: "Launch", timing: "Go live", description: "We connect your domain, set up Google and analytics, and show you how to make simple edits." },
  ],

  // TODO: confirm pricing before launch
  packages: [
    {
      name: "Starter",
      subtitle: "One-page website",
      price: "£495",
      popular: false,
      cta: "Choose Starter",
      bullets: [
        "Single scrolling page with up to 6 sections",
        "Custom design in your brand colours",
        "Mobile-first, fast-loading build",
        "Contact form, map and social links",
        "Live in about 1 week",
      ],
    },
    {
      name: "Business",
      subtitle: "Multi-page website",
      price: "£1,250",
      popular: true,
      badge: "Most popular",
      cta: "Choose Business",
      bullets: [
        "Up to 6 pages (Home, About, Services, Contact…)",
        "Custom design with 2 rounds of revisions",
        "On-page SEO and Google Business setup",
        "Booking, enquiry or quote forms",
        "Live in about 2 weeks",
      ],
    },
    {
      name: "Custom",
      subtitle: "Online shop, bookings or bigger builds",
      price: "From £2,500",
      popular: false,
      cta: "Get a quote",
      bullets: [
        "Online shop or booking system",
        "Unlimited pages and custom features",
        "Copywriting help for every page",
        "Integrations (payments, calendars, CRM)",
        "Timeline agreed on the discovery call",
      ],
    },
  ],

  carePlan: {
    title: "Care plan · £49/month",
    body: "Hosting, security updates, backups and up to 1 hour of edits each month. Optional, and you can cancel anytime.",
  },

  // Concept projects. Replace with real client work as it comes in.
  // `palette` drives the mini website mockup drawn on each card.
  portfolio: [
    {
      id: "ember",
      title: "Ember & Oak",
      industry: "Café & bakery",
      tag: "Concept",
      description: "Warm one-page site with menu, opening hours and a click-to-call button for orders.",
      palette: { bg: "#F3E9DC", ink: "#3B2A1E", accent: "#C8553D" },
      image: "/images/enhanced_after_room_1794274507997.jpg",
      nav: ["Menu", "Visit", "Order"],
      headline: "Fresh bread, slow coffee.",
    },
    {
      id: "keystone",
      title: "Keystone Lettings",
      industry: "Letting agent",
      tag: "Concept",
      description: "Property-led site with listings, valuation form and landlord resources.",
      palette: { bg: "#0F1A17", ink: "#EDEDE6", accent: "#C9B48A" },
      image: "/images/hero_london_property_1794274507487.jpg",
      nav: ["To let", "Landlords", "Valuation"],
      headline: "Homes worth moving for.",
    },
    {
      id: "form",
      title: "Form Studio",
      industry: "Personal trainer",
      tag: "Concept",
      description: "Bold, high-energy site with class timetable and online booking.",
      palette: { bg: "#141414", ink: "#F5F2EC", accent: "#B8653A" },
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
      nav: ["Classes", "Coaching", "Book"],
      headline: "Train with intent.",
    },
    {
      id: "skyline",
      title: "Skyline Interiors",
      industry: "Interior designer",
      tag: "Concept",
      description: "Image-first portfolio with project case studies and a consultation request form.",
      palette: { bg: "#ECEAE4", ink: "#1E1E1C", accent: "#6C7A64" },
      image: "/images/london_luxury_penthouse_1794274508266.jpg",
      nav: ["Projects", "Studio", "Contact"],
      headline: "Spaces that feel like you.",
    },
  ],

  faq: [
    {
      q: "How long does a website take?",
      a: "A one-page Starter site is usually live in about a week. A multi-page Business site takes around two weeks. The biggest factor is how quickly we get your content (text, photos, logo).",
    },
    {
      q: "Do I need to have my text and photos ready?",
      a: "It helps, but it's not essential. We'll give you a simple checklist, and we can write or polish your copy and source quality stock photos if needed.",
    },
    {
      q: "Who owns the website?",
      a: "You do. The domain is registered in your name and you own all of the content and design. Nothing is held hostage.",
    },
    {
      q: "Can I update the site myself?",
      a: "Yes. We'll show you how to edit text and images. If you'd rather not touch it, the care plan covers monthly edits for you.",
    },
    {
      q: "How does payment work?",
      a: "50% up front to book your slot and 50% when you're happy and ready to launch. Hosting and domain costs are passed on at cost, or included in the care plan.",
    },
    {
      q: "I already have a website. Can you improve it?",
      a: "Absolutely. Redesigns are a big part of what we do. We'll keep your domain, move your content over and set up redirects so you don't lose your Google rankings.",
    },
  ],

  contact: {
    eyebrow: "Start a project",
    heading: "Let's build something you're proud to share.",
    subheading:
      "Tell us a little about your business. We reply within one working day with next steps and a time for a free discovery call.",
    projectTypes: ["New website", "Redesign of an existing site", "Online shop / bookings", "Not sure yet"],
    budgets: ["Under £500", "£500 – £1,500", "£1,500 – £3,000", "£3,000+", "Not sure yet"],
  },

  footer: {
    cta: "Got something in mind?",
    copyright: `© ${new Date().getFullYear()} Upscaled. All rights reserved.`,
  },
};

export type Project = (typeof siteConfig.portfolio)[number];
