import React from "react";
import Navbar from "../components/Navbar";
import PortfolioSection from "../components/PortfolioSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import SkipLink from "../components/SkipLink";

/** The /work/ page. Only built once siteConfig.showWork is true. */
export default function WorkPage() {
  return (
    <div className="min-h-screen bg-ink text-ivory">
      <SkipLink />
      <Navbar />
      <main id="main">
        <PortfolioSection asPage />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
