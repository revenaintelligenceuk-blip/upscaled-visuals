import React from "react";
import { Plus } from "lucide-react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import Backdrop from "./Backdrop";
import { Reveal } from "./ui";

export default function FaqSection() {
  return (
    <DotSection id="faq" tone="dark" className="py-24 sm:py-32">
      <Backdrop />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-ivory sm:text-6xl">
            Web design questions
          </h2>
          <p className="mt-5 text-muted">
            Something we haven't covered?{" "}
            <a href={`mailto:${siteConfig.brand.email}`} className="text-brass underline underline-offset-4">
              Email us
            </a>
            .
          </p>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          {siteConfig.faq.map((item) => (
            <details key={item.q} className="group border-t border-line last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-medium tracking-[-0.02em] text-ivory transition-[padding,color] duration-300 hover:pl-3 hover:text-brass sm:text-2xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus size={20} strokeWidth={1.25} aria-hidden="true" className="shrink-0 text-brass transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-2xl pb-6 text-base leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </DotSection>
  );
}
