import React, { useCallback, useRef, useState } from "react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import Backdrop from "./Backdrop";
import { Reveal } from "./ui";
import { prefersReducedMotion, trackPointer, useScrollFrame } from "../lib/motion";

/**
 * How it works. The heading stays in place while the steps scroll past, a brass
 * line fills beside them, and the step being read lights up.
 */
export default function ProcessSection() {
  const { title, intro, steps } = siteConfig.process;
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(-1);

  const update = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const mark = window.innerHeight * 0.6; // reading position
    const box = list.getBoundingClientRect();
    const filled = prefersReducedMotion() ? 1 : Math.min(1, Math.max(0, (mark - box.top) / box.height));
    if (lineRef.current) lineRef.current.style.transform = `scaleY(${filled})`;
    let index = -1;
    Array.from(list.children).forEach((step, i) => {
      if (step.getBoundingClientRect().top < mark) index = i;
    });
    setCurrent(index);
  }, []);
  useScrollFrame(update);

  return (
    <DotSection id="process" className="py-24 sm:py-32">
      <Backdrop />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <h2 className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-ivory sm:text-6xl">{title}</h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{intro}</p>
              <p aria-hidden="true" className="mt-10 hidden font-serif text-3xl italic text-brass lg:block">
                {steps[Math.max(0, current)].title}
                <span className="text-muted">, step {Math.max(0, current) + 1} of {steps.length}</span>
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative pl-6 sm:pl-10 lg:col-span-6 lg:col-start-7">
          <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-ivory/15" />
          <span ref={lineRef} aria-hidden="true" style={{ transform: "scaleY(0)" }} className="absolute bottom-0 left-0 top-0 w-[2px] origin-top bg-brass" />
          <ol ref={listRef} className="space-y-5 lg:space-y-8">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title}>
                <div
                  onPointerMove={trackPointer}
                  aria-current={i === current ? "step" : undefined}
                  className={`spot step-card card-dark grid gap-5 p-7 sm:grid-cols-[6rem_1fr] sm:p-10 lg:min-h-[15rem] lg:items-center ${i === current ? "is-current" : ""}`}
                >
                  <p aria-hidden="true" className="step-number font-serif text-7xl italic leading-[0.8] text-brass sm:text-8xl">{i + 1}</p>
                  <div>
                    <h3 className="text-3xl font-medium tracking-[-0.03em] text-ivory sm:text-4xl">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-muted">{s.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </DotSection>
  );
}
