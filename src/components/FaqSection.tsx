import React from "react";
import { Plus } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Label, Reveal } from "./ui";

export default function FaqSection() {
  return (
    <section id="faq" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label>FAQ</Label>
          <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] tracking-tight text-ivory sm:text-6xl">
            Good <em className="text-brass">questions.</em>
          </h2>
          <p className="mt-5 font-light text-muted">
            Something we haven't covered?{" "}
            <a href={`mailto:${siteConfig.brand.email}`} className="text-brass underline-offset-4 hover:underline">
              Email us
            </a>
            .
          </p>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          {siteConfig.faq.map((item) => (
            <details key={item.q} className="group border-t border-line py-7 last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl font-light text-ivory [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus size={20} strokeWidth={1.25} className="shrink-0 text-brass transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-4 max-w-2xl font-light leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
