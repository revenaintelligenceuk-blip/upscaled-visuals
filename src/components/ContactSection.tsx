import React from "react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import ContactButton from "./ContactButton";

/** Appears only once siteConfig.contact.href is set. */
export default function ContactSection() {
  const { contact } = siteConfig;
  if (!contact.href) return null;
  return (
    <DotSection id="contact" tone="light" className="py-20 sm:py-28">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 px-4 sm:px-8 md:flex-row md:items-center md:justify-between">
        <h2 className="text-4xl font-medium tracking-[-0.03em] sm:text-6xl">{contact.label}</h2>
        <ContactButton />
      </div>
    </DotSection>
  );
}
