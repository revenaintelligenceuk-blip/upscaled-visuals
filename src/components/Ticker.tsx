import React, { useState } from "react";
import { Pause, Play } from "lucide-react";
import { siteConfig } from "../siteConfig";

/** Enough boxes to fill a wide screen, so the loop never shows a gap. */
const MIN_SLOTS = 20;

/**
 * Scrolling band of business logos, with empty boxes until siteConfig.logos is
 * filled in. Its button pauses the looping motion on the page.
 */
export default function Ticker() {
  const [paused, setPaused] = useState(false);
  const toggle = () => {
    document.documentElement.classList.toggle("motion-paused", !paused);
    setPaused(!paused);
  };

  const { logos } = siteConfig;
  if (!logos.length) return null;
  const slots = Array.from({ length: Math.max(MIN_SLOTS, logos.length) }, (_, i) => logos[i % logos.length]);

  return (
    <div className="ticker on-light relative flex items-stretch overflow-hidden text-ink">
      <div className="ticker-window min-w-0 flex-1 overflow-hidden py-5">
        <div className="ticker-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || !logos.length || undefined} className="flex shrink-0 items-center">
              {slots.map((logo, i) => (
                // Repeats of a logo are hidden from screen readers.
                <li key={i} aria-hidden={i >= logos.length || undefined} className="pr-8 sm:pr-12">
                  <span className={`flex h-14 w-36 items-center justify-center rounded-xl sm:w-44 ${logo ? "" : "border-2 border-dashed border-ink/30 bg-white/25"}`}>
                    {logo && <img src={logo.image} alt={logo.name} className="max-h-10 max-w-full object-contain" />}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? "Play background motion" : "Pause background motion"}
        className="motion-toggle flex w-12 shrink-0 items-center justify-center border-l border-ink/20"
      >
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
