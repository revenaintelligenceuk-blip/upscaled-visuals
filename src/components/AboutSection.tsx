import React, { useCallback, useRef, useState } from "react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import Backdrop from "./Backdrop";
import { Reveal } from "./ui";
import { prefersReducedMotion, useScrollFrame } from "../lib/motion";

/** Who we are. The words darken as you scroll. Shows a photo beside the text once one is added. */
export default function AboutSection() {
  const { title, text, photo } = siteConfig.about;
  const words = text.split(" ");
  const textRef = useRef<HTMLParagraphElement>(null);
  // Everything is fully visible until the script has measured the page.
  const [lit, setLit] = useState(words.length);

  const update = useCallback(() => {
    const el = textRef.current;
    if (!el || prefersReducedMotion()) return setLit(words.length);
    const progress = (window.innerHeight * 0.9 - el.getBoundingClientRect().top) / (window.innerHeight * 0.5);
    setLit(Math.round(Math.min(1, Math.max(0, progress)) * words.length));
  }, [words.length]);
  useScrollFrame(update);

  return (
    <DotSection id="about" tone="light" className="py-28 sm:py-40">
      <Backdrop tone="light" />
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <Reveal className={photo.src ? "lg:col-span-6" : "lg:col-span-10"}>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-brass-deep">{title}</h2>
          <p ref={textRef} className="mt-6 text-3xl font-medium leading-[1.2] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
            {words.map((word, i) => (
              <React.Fragment key={i}>
                <span className={`transition-opacity duration-300 ${i < lit ? "opacity-100" : "opacity-20"}`}>{word}</span>{" "}
              </React.Fragment>
            ))}
          </p>
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
