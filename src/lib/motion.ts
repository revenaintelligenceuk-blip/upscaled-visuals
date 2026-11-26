import { useEffect } from "react";
import type { PointerEvent } from "react";

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Runs `update` now and then at most once per frame while the page scrolls or resizes.
 * Pass a stable function (useCallback) so the listeners aren't re-added on every render.
 */
export function useScrollFrame(update: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const run = () => {
      frame = 0;
      update();
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    queue();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(frame);
    };
  }, [update, enabled]);
}

/** For `.spot` cards: records where the pointer is, so the CSS glow can follow it. */
export function trackPointer(e: PointerEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}

/** Lets a button elsewhere on the page tick an option in the "What do you need?" picker. */
export const NEED_EVENT = "upscaled:need";
export const chooseNeed = (option: string) => window.dispatchEvent(new CustomEvent(NEED_EVENT, { detail: option }));
