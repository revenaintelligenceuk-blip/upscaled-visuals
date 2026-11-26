import React from "react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import Backdrop from "./Backdrop";
import { Reveal } from "./ui";

/** Who we are. Shows a photo beside the text once one is added. */
export default function AboutSection() {
  const { title, text, photo } = siteConfig.about;
  return (
    <DotSection id="about" tone="light" className="py-24 sm:py-32">
      <Backdrop tone="light" />
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <Reveal className={photo.src ? "lg:col-span-6" : "lg:col-span-9"}>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-brass-deep">{title}</h2>
          <p className="mt-6 text-3xl font-medium leading-[1.2] tracking-[-0.025em] sm:text-5xl">{text}</p>
        </Reveal>
        {photo.src && (
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <img src={photo.src} alt={photo.alt} loading="lazy" width={1200} height={1500} className="w-full rounded-2xl object-cover" />
          </Reveal>
        )}
      </div>
    </DotSection>
  );
}
