import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PortfolioSection from "./components/PortfolioSection";
import ProblemSection from "./components/ProblemSection";
import ApproachSection from "./components/ApproachSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";
import { siteConfig } from "./siteConfig";

/**
 * Page order: Hero → Portfolio → The problem → Our approach → Process →
 * Testimonials → FAQ → Final CTA (free consultation).
 * No pricing section on purpose: prices are discussed in the consultation.
 * All copy and contact details are edited in src/siteConfig.ts.
 */
export default function App() {
  const [projectType, setProjectType] = useState<string>(siteConfig.contact.projectTypes[0]);

  return (
    <div className="min-h-screen bg-ink text-ivory">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <PortfolioSection onRequestWalkthrough={() => setProjectType("Portfolio & walkthrough")} />
        <ProblemSection />
        <ApproachSection />
        <ProcessSection />
        <TestimonialsSection />
        <FaqSection />
        <BookingSection selectedService={projectType} />
      </main>
      <Footer />
    </div>
  );
}
