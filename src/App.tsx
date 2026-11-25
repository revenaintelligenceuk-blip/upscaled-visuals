import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PortfolioSection from "./components/PortfolioSection";
import IncludedSection from "./components/IncludedSection";
import WhySection from "./components/WhySection";
import ProcessSection from "./components/ProcessSection";
import AddonsSection from "./components/AddonsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";
import { siteConfig } from "./siteConfig";

/**
 * Page order: Hero → Work → What's included → Why your website matters →
 * How it works → More than a website → Client stories → FAQ → Free audit.
 * No prices on purpose. All copy and contact details are in src/siteConfig.ts.
 */
export default function App() {
  const [projectType, setProjectType] = useState<string>(siteConfig.contact.auditType);

  return (
    <div className="min-h-screen bg-ink text-ivory">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ivory focus:px-4 focus:py-3 focus:text-ink">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <PortfolioSection onRequestWalkthrough={() => setProjectType(siteConfig.contact.walkthroughType)} />
        <IncludedSection />
        <WhySection />
        <ProcessSection />
        <AddonsSection />
        <TestimonialsSection />
        <FaqSection />
        <BookingSection selectedService={projectType} />
      </main>
      <Footer />
    </div>
  );
}
