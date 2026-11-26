import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SkipLink from "./components/SkipLink";
import DotSection from "./components/DotSection";

/** Shown by the host for any address that doesn't exist (404.html). */
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-ink text-ivory">
      <SkipLink />
      <Navbar />
      <main id="main">
        <DotSection className="pb-24 pt-32 sm:pb-32 sm:pt-44">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
            <h1 className="max-w-3xl text-5xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-7xl">
              We can't find that page.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">The address may be mistyped, or the page may have moved.</p>
            <a href="/" className="mt-10 inline-flex min-h-12 items-center rounded-full bg-ivory px-7 text-sm font-medium text-ink hover:bg-brass">
              Go to the homepage
            </a>
          </div>
        </DotSection>
      </main>
      <Footer />
    </div>
  );
}
