import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import PortfolioSection from "./components/PortfolioSection";
import FeaturesSection from "./components/FeaturesSection";
import ProcessSection from "./components/ProcessSection";
import AboutSection from "./components/AboutSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import SkipLink from "./components/SkipLink";
import { siteConfig } from "./siteConfig";

/**
 * Page order: Hero → Work → What you get → How it works → About →
 * Client stories → FAQ → Get in touch.
 * The logo banner, Work, Client stories and Get in touch only show once they
 * have content (see siteConfig). All copy lives in src/siteConfig.ts.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-ink text-ivory">
      <SkipLink />
      <Navbar />
      <main id="main">
        <Hero />
        <Ticker />
        {siteConfig.showWork && <PortfolioSection />}
        <FeaturesSection />
        <ProcessSection />
        <AboutSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
