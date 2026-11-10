import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatementSection from "./components/StatementSection";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import ServicesSection from "./components/ServicesSection";
import PortfolioGrid from "./components/PortfolioGrid";
import WhoItsForSection from "./components/WhoItsForSection";
import ProcessSection from "./components/ProcessSection";
import PackagesSection from "./components/PackagesSection";
import FaqSection from "./components/FaqSection";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";
import { siteConfig } from "./siteConfig";

/** All copy, prices and contact details are edited in src/siteConfig.ts. */
export default function App() {
  const [projectType, setProjectType] = useState<string>(siteConfig.contact.projectTypes[0]);

  // Map a pricing card to a sensible "What do you need?" option in the form.
  const handleSelectPackage = (name: string) => {
    setProjectType(name === "Custom" ? "Online shop / bookings" : `${name} package`);
  };

  return (
    <div className="min-h-screen bg-ink text-ivory">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <StatementSection />
        <BeforeAfterSlider />
        <ServicesSection />
        <PortfolioGrid />
        <WhoItsForSection />
        <ProcessSection />
        <PackagesSection onSelectPackage={handleSelectPackage} />
        <FaqSection />
        <BookingSection selectedService={projectType} />
      </main>
      <Footer />
    </div>
  );
}
