import React, { useCallback, useRef, useState } from "react";
import { siteConfig } from "../siteConfig";
import { Reveal, SectionHeading } from "./ui";

/** A deliberately dated small-business homepage. */
function BeforeSite() {
  return (
    <div className="flex h-full w-full flex-col bg-[#e9e6dd] text-[#222]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      <div className="bg-[#2b4a7a] px-4 py-2 text-center text-[11px] text-yellow-200 sm:text-sm">
        *** WELCOME TO OUR WEBSITE!!! *** Call us on 020 0000 0000 ***
      </div>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 border-b-4 border-double border-[#2b4a7a] bg-[#cfd8e6] px-2 py-2 text-[10px] text-blue-800 underline sm:text-xs">
        {["Home", "About Us", "Our Services", "Gallery", "Prices", "News", "Testimonials", "Links", "Contact Us"].map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="flex flex-1 flex-col items-center px-4 py-4 text-center sm:py-8">
        <p className="text-xl font-bold text-[#7a1f1f] sm:text-3xl">Ember &amp; Oak Bakery Ltd</p>
        <p className="mt-1 text-[11px] italic text-gray-600 sm:text-sm">Established 2009 - Quality Baked Goods - Family Run</p>
        <div className="mt-3 h-16 w-28 border-2 border-gray-500 bg-[repeating-linear-gradient(45deg,#bbb,#bbb_6px,#ccc_6px,#ccc_12px)] sm:h-28 sm:w-48" />
        <p className="mt-3 max-w-md text-[10px] leading-snug sm:text-sm">
          Welcome to our website. We are a bakery. We sell bread, cakes, pastries, sandwiches, coffee, tea and much more.
          Please browse our website using the links above. Click here for more information about our products...
        </p>
        <p className="mt-2 text-[10px] text-blue-800 underline sm:text-xs">Click here to download our menu (PDF, 4.2MB)</p>
        <p className="mt-auto pt-3 text-[9px] text-gray-500 sm:text-[11px]">Best viewed in 1024x768 · Visitors: 004213 · Last updated 2016</p>
      </div>
    </div>
  );
}

/** The same business, redesigned. */
function AfterSite() {
  return (
    <div className="flex h-full w-full flex-col bg-[#F3E9DC] text-[#3B2A1E]">
      <div className="flex items-center justify-between px-5 py-3 sm:px-8 sm:py-5">
        <span className="font-serif text-base sm:text-xl">Ember &amp; Oak</span>
        <span className="hidden gap-6 text-xs sm:flex">
          <span>Menu</span><span>Visit</span><span>Catering</span>
        </span>
        <span className="rounded-full bg-[#3B2A1E] px-3 py-1 text-[10px] text-[#F3E9DC] sm:px-4 sm:py-1.5 sm:text-xs">Order ahead</span>
      </div>
      <div className="grid flex-1 grid-cols-5 gap-4 px-5 pb-5 sm:gap-8 sm:px-8 sm:pb-8">
        <div className="col-span-3 flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#9a5a3c] sm:text-xs">Hackney · Open 7am daily</span>
          <span className="mt-2 font-serif text-3xl font-light leading-[1] sm:text-6xl">
            Fresh bread,<br /><em>slow coffee.</em>
          </span>
          <span className="mt-3 max-w-xs text-[10px] leading-snug opacity-75 sm:text-sm">
            Sourdough baked every morning, seasonal pastries and coffee worth the walk.
          </span>
          <span className="mt-4 flex gap-2">
            <span className="rounded-full bg-[#3B2A1E] px-3 py-1.5 text-[10px] text-[#F3E9DC] sm:px-5 sm:py-2 sm:text-xs">See the menu</span>
            <span className="rounded-full border border-[#3B2A1E]/30 px-3 py-1.5 text-[10px] sm:px-5 sm:py-2 sm:text-xs">Find us</span>
          </span>
        </div>
        <div className="col-span-2 overflow-hidden rounded-xl">
          <img src="/images/enhanced_after_room_1794274507997.jpg" alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterSlider() {
  const { comparison } = siteConfig;
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <section id="difference" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHeading label={comparison.eyebrow} title={comparison.heading} intro={comparison.subheading} />

        <Reveal>
          <div className="rounded-[28px] border border-line bg-card p-2 sm:p-3">
            <div
              ref={ref}
              role="slider"
              tabIndex={0}
              aria-label="Compare the old website with the redesign"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)}% showing the old website`}
              onKeyDown={onKeyDown}
              onPointerDown={(e) => {
                setDragging(true);
                move(e.clientX);
                e.currentTarget.setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => dragging && move(e.clientX)}
              onPointerUp={() => setDragging(false)}
              onPointerCancel={() => setDragging(false)}
              className="relative aspect-[4/3] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-[22px] sm:aspect-[16/9]"
            >
              <div className="absolute inset-0"><AfterSite /></div>
              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                <BeforeSite />
              </div>

              <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted backdrop-blur sm:text-xs">
                {comparison.beforeLabel}
              </span>
              <span className="absolute bottom-3 right-3 rounded-full bg-ink/85 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brass backdrop-blur sm:text-xs">
                {comparison.afterLabel}
              </span>

              <div className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-brass" style={{ left: `${pos}%` }}>
                <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass bg-ink text-sm text-brass shadow-2xl">
                  ‹ ›
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {comparison.highlights.map((h, i) => (
            <li key={h} className="flex gap-3 border-t border-line pt-5">
              <span className="font-mono text-xs text-brass">0{i + 1}</span>
              <span className="text-sm font-light leading-relaxed text-muted">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
