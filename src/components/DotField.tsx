import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

const DottedTrailCursor = lazy(() => import("./ui/dotted-trail-cursor"));

/**
 * The cursor's colours on dark and on cream backgrounds, in the brand's brass and copper.
 */
const dotThemes = {
  dark: {
    backgroundColor: "#0e0e0c",
    colorA: "#5f4a26",
    colorB: "#3d2112",
    dotColor: "rgb(242 238 230 / 0.13)",
    activeDotColor: "#0e0e0c",
  },
  light: {
    backgroundColor: "#f6f3ec",
    colorA: "#e3c990",
    colorB: "#e2ab74",
    dotColor: "rgb(14 14 12 / 0.14)",
    activeDotColor: "#f6f3ec",
  },
};

/** Spacing is half the 72px square grid, so dots and lines stay in step. */
const dotShape = { dotSpacing: 36, headRadius: 70, glowRadius: 280, maxPixelRatio: 1.5 };

/**
 * The dotted background behind a section. Everyone gets the dots as plain CSS.
 * Mouse users also get the cursor effect, loaded as the section nears the screen.
 * The parent needs `relative isolate overflow-hidden`.
 */
export default function DotField({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-20 dots dots-${tone}`}>
      {live && (
        <Suspense fallback={null}>
          <DottedTrailCursor className="h-full!" {...dotThemes[tone]} {...dotShape} />
        </Suspense>
      )}
    </div>
  );
}
