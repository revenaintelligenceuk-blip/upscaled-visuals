/**
 * Upscaled — site content
 *
 * Every headline, price, FAQ answer and contact detail lives here.
 * Anything marked TODO is a placeholder to confirm before launch.
 *
 * Page order: Hero → Portfolio → The problem → Our approach → Process →
 * Testimonials → FAQ → Final CTA (free consultation)
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
    // Name of the form service above, shown in the privacy policy (e.g. "Formspree, Inc. (USA)").
    formProvider: "",
    // Optional: a Cal.com / Calendly link so people can book the call themselves.
    bookingUrl: "",
  },

  /* LEGAL & BUSINESS DETAILS
     Shown in the footer and on /privacy, /cookies and /terms.
     UK law (E-Commerce Regulations 2002) requires your trading name, a
     geographic address and an email on the site. A virtual office or
     registered-office service address is fine if you don't want to show home. */
  legal: {
    // TODO: how are you trading? Pick one and fill in the matching fields.
    //   "partnership"  – two people trading together, not incorporated
    //   "sole-trader"  – one of you trading, the other helping
    //   "ltd"          – a limited company registered at Companies House
    structure: "partnership" as "partnership" | "sole-trader" | "ltd",
    tradingName: "Upscaled",
    ownerNames: "Raffaele [SURNAME] and Brilliana [SURNAME]", // TODO: full legal names (non-Ltd)
    address: "[BUSINESS ADDRESS], London, [POSTCODE]", // TODO: geographic address (not a PO box)
    companyName: "", // Ltd only, e.g. "Upscaled Studio Ltd"
    companyNumber: "", // Ltd only
    registeredOffice: "", // Ltd only
    placeOfRegistration: "England and Wales", // Ltd only
    vatNumber: "", // only if VAT-registered
    icoRegistration: "", // TODO: your ICO data protection fee reference, e.g. "ZB123456"
    // Services that handle visitor data. Keep this list true to what you actually use.
    hostingProvider: "[HOSTING PROVIDER, e.g. Vercel Inc. or Netlify Inc.]", // TODO
    emailProvider: "[EMAIL PROVIDER, e.g. Google Workspace or Microsoft 365]", // TODO
    lastUpdated: "15 November 2026",
  },

  founders: [
    // TODO: swap in photos (put them in /public/images) and real roles
    { name: "Raffaele", role: "Co-founder", initial: "R", photo: "" },
    { name: "Brilliana", role: "Co-founder", initial: "B", photo: "" },
  ],

  // Used by the footer. The top liquid navbar is configured in components/Navbar.tsx.
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Approach", href: "#approach" },
    { label: "Process", href: "#process" },
    { label: "Consultation", href: "#contact" },
  ],

  /* 1. HERO: the result we deliver */
  hero: {
    eyebrow: "Web design & development studio",
    headlineStart: "Websites that turn visitors into",
    headlineAccent: "customers",
    headlineEnd: ".",
    subheadline:
      "We're Raffaele and Brilliana. We design and build fast, modern websites for small businesses, so more people call, book and buy. Fixed price, live in about two weeks.",
    ctaPrimary: "Get a free consultation",
    ctaSecondary: "See our work",
  },

  /* 2. PORTFOLIO teaser on the homepage (text only, no images).
     The full examples go on their own page. Put its address in
     portfolioPage.url once it exists; until then the button opens the
     contact form with "Portfolio & walkthrough" selected. */
  portfolioPage: {
    url: "", // e.g. "/work"
    cta: "Request the portfolio & a walkthrough",
    note: "Want to see more? We'll send you the full portfolio and talk you through any of these sites on a short call.",
  },

  portfolio: [
    {
      id: "ember",
      title: "Ember & Oak",
      industry: "Café & bakery",
      tag: "Concept",
      summary: "A warm, appetising one-pager that gets people through the door.",
      built: ["Menu & opening hours", "Click-to-call ordering", "Google Maps & reviews"],
      goal: "More walk-ins and phone orders",
      url: "", // add the live demo link once built, e.g. "https://ember.upscaledvisuals.co.uk"
    },
    {
      id: "maison",
      title: "Maison Hair Studio",
      industry: "Salon",
      tag: "Concept",
      summary: "An elegant site that turns Instagram followers into booked appointments.",
      built: ["Online booking", "Price list & stylist profiles", "Instagram gallery"],
      goal: "Fewer DMs, more bookings",
      url: "",
    },
    {
      id: "northline",
      title: "Northline Architects",
      industry: "Architecture practice",
      tag: "Concept",
      summary: "An image-led portfolio that wins bigger, better-fit enquiries.",
      built: ["Project case studies", "Services & process pages", "Consultation request form"],
      goal: "Higher-quality enquiries",
      url: "",
    },
  ],

  /* 3. THE PROBLEM: why outdated websites lose customers */
  problem: {
    // TODO: double-check these figures and sources before launch
    stats: [
      { value: "53%", text: "of mobile visits are abandoned if a page takes longer than 3 seconds to load.", source: "Google / DoubleClick, 2016" },
      { value: "75%", text: "of people judge a business's credibility by the design of its website.", source: "Stanford Web Credibility Research" },
      { value: "0.05s", text: "is all it takes for a visitor to form a first impression of a website.", source: "Lindgaard et al., 2006" },
    ],
    signs: [
      { title: "It's slow", body: "Every extra second of loading sends people back to Google, and on to a competitor." },
      { title: "It breaks on phones", body: "Most local searches happen on a phone. Tiny text and broken layouts lose them instantly." },
      { title: "It doesn't say what you do", body: "If visitors can't tell what you offer and where in a few seconds, they leave." },
      { title: "There's no clear next step", body: "No obvious way to call, book or enquire means interest never turns into business." },
      { title: "Google can't find it", body: "Without the basics of SEO, the people searching for you never see you." },
      { title: "It looks out of date", body: "An old design quietly tells customers the business might be out of date too." },
    ],
    // "Only on social media?" block: why a business needs a website at all
    whyWebsite: {
      eyebrow: "Only on Instagram or TikTok?",
      headlineStart: "Social media gets you noticed.",
      headlineAccent: "A website gets you chosen.",
      intro:
        "Social is brilliant for attention. But when someone's deciding whether to trust you with their money, they look you up, and if there's no website, a lot of them move on.",
      flow: [
        { label: "Social media", result: "Attention", body: "People discover you, scroll past, maybe follow." },
        { label: "Your website", result: "Trust", body: "They check you're legit, see your prices and services, and get in touch." },
      ],
      reasons: [
        { title: "It builds trust", body: "A proper website is the first thing people check before they spend money with someone new." },
        { title: "It proves you're a real business", body: "Your own domain, email and site say \"established\". A profile on someone else's app says \"side hustle\"." },
        { title: "You can actually run ads", body: "Google and Meta ads need somewhere to send people. Without a website there's nowhere to land, and nothing to track." },
        { title: "You can build a brand", body: "On social you're squeezed into the same template as everyone else. A website is where your brand gets its own space." },
        { title: "You own it", body: "Algorithms change, reach drops and accounts get banned. Your website and your customers stay yours." },
        { title: "Google can find you", body: "People searching \"near me\" find websites, not Instagram posts. No site means no search traffic." },
      ],
    },
  },

  /* 4. OUR APPROACH: consumer understanding + careful design and build */
  approach: {
    pillars: [
      {
        kicker: "01 · Understanding",
        title: "We start with your customers.",
        body: "Before we design anything, we learn who your customers are, what they search for, what makes them hesitate, and what makes them choose you.",
        points: [
          "Customer and competitor research before any design",
          "Copy written around the questions customers actually ask",
          "One clear next step on every page",
        ],
      },
      {
        kicker: "02 · Building",
        title: "Then we design and build it.",
        body: "We turn that understanding into a fast, modern website, designed from scratch for your business. A small team and a lean process mean no waiting around and no agency overheads.",
        points: [
          "Live in weeks, not months",
          "More polish for the same budget",
          "Every word and pixel checked by us",
        ],
      },
    ],
    outcome: "The result is a website that answers your customers' questions and makes it easy for them to get in touch.",
  },

  /* 5. PROCESS */
  process: [
    { step: "01", title: "Discover", timing: "Day 1", description: "A free consultation about your business, your customers and what the site needs to achieve." },
    { step: "02", title: "Design", timing: "Week 1", description: "We design your homepage first, share it with you and refine it together until it feels right." },
    { step: "03", title: "Build", timing: "Week 2", description: "We build the full site, add your content and test it on phones, tablets and desktops." },
    { step: "04", title: "Launch", timing: "Go live", description: "We connect your domain, set up Google and analytics, and stay on hand afterwards." },
  ],


  /* 7. TESTIMONIALS
     Only add real feedback from real clients, with their permission.
     While this list is empty, the section shows an honest "we're new" message.
     Example:
     { quote: "…", name: "Jane Smith", role: "Owner", business: "Ember & Oak", photo: "" },
  */
  testimonials: [] as { quote: string; name: string; role: string; business: string; photo?: string }[],

  faq: [
    {
      q: "How long does a website take?",
      a: "A one-page Starter site is usually live in about a week. A multi-page Business site takes around two weeks. The biggest factor is how quickly we get your content (text, photos, logo).",
    },
    {
      q: "Will my site be original, or a template?",
      a: "Original. Every design, word and page is shaped by us around your business and your customers, so your site won't look like anyone else's.",
    },
    {
      q: "Who owns the website?",
      a: "You do. The domain is registered in your name and you own all of the content and design. Nothing is held hostage.",
    },
    {
      q: "Can I update the site myself?",
      a: "Yes. We'll show you how to edit text and images. If you'd rather not touch it, we can make the changes for you.",
    },
    {
      q: "How does payment work?",
      a: "50% up front to book your slot and 50% when you're happy and ready to launch. Hosting and domain costs are passed on at cost.",
    },
    {
      q: "I already have a website. Can you improve it?",
      a: "Absolutely. We'll keep your domain, move your content over and set up redirects so you don't lose your Google rankings.",
    },
  ],

  /* 8. FINAL CTA: free website consultation */
  contact: {
    eyebrow: "Free consultation",
    heading: "Get a free website consultation.",
    subheading:
      "Tell us a little about your business. Within one working day we'll book a free 20-minute call to look at your current site (if you have one) and talk through what would win you more customers. No obligation.",
    submitLabel: "Book my free consultation",
    projectTypes: ["New website", "Portfolio & walkthrough", "Redesign of an existing site", "Online shop / bookings", "Not sure yet"],
    budgets: ["Under £500", "£500 – £1,500", "£1,500 – £3,000", "£3,000+", "Not sure yet"],
  },



  footer: {
    cta: "Got something in mind?",
    copyright: `© ${new Date().getFullYear()} Upscaled. All rights reserved.`,
  },
};
