import React from "react";
import { siteConfig } from "../siteConfig";

/**
 * The "get in touch" button. It stays hidden until siteConfig.contact.href is
 * set, e.g. "mailto:you@yourdomain.co.uk", "tel:+44..." or a booking link.
 */
export default function ContactButton({ small = false }: { small?: boolean }) {
  const { href, label } = siteConfig.contact;
  if (!href) return null;
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-ivory text-sm font-medium text-ink hover:bg-brass ${
        small ? "min-h-11 px-5" : "min-h-12 px-7"
      }`}
    >
      {label}
    </a>
  );
}
