import React, { useEffect, useRef } from "react";

export const scrollToId = (id: string) =>
  document.getElementById(id.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });

/** Adds `is-visible` to the element once it scrolls into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  /** Element to render, e.g. "li" inside a list. */
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useReveal<HTMLElement>();
  return React.createElement(
    as,
    {
      ref,
      className: `reveal ${className}`,
      style: delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined,
    },
    children
  );
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Counts a value like "53%", "0.05s" or "£1,200" up from zero when it scrolls
 * into view. Non-numeric values are shown as-is.
 */
export function CountUp({ value, duration = 1600, className = "" }: { value: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\D*)([\d,]*\.?\d+)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const [, prefix, raw, suffix] = match;
    const target = parseFloat(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const format = (n: number) =>
      prefix + n.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

    el.textContent = format(0);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = t < 1 ? format(target * eased) : value;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/** Splits text into words that rise in one after another (hero headline). */
export function RiseWords({ text, start = 0, step = 70 }: { text: string; start?: number; step?: number }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="word-mask">
            <span className="word" style={{ "--d": `${start + i * step}ms` } as React.CSSProperties}>
              {w}
            </span>
          </span>{" "}
        </React.Fragment>
      ))}
    </>
  );
}

/** Seamless, slowly scrolling strip of items. Pauses on hover. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-8 text-2xl font-medium tracking-[-0.03em] sm:text-4xl">{item}</span>
          <span className="text-brass" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Small mono label, e.g. 01 — PROCESS */
export function Label({
  children,
  className = "",
  tone = "dark",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
  style?: React.CSSProperties;
}) {
  return (
    <p style={style} className={`font-mono text-[11px] uppercase tracking-[0.2em] ${tone === "dark" ? "text-brass" : "text-brass-deep"} ${className}`}>
      {children}
    </p>
  );
}

export function SectionHeading({
  label,
  title,
  intro,
  tone = "dark",
}: {
  label: string;
  title: React.ReactNode;
  intro?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Reveal className="mb-14 grid gap-6 sm:mb-20 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Label tone={tone}>{label}</Label>
        <h2
          className={`mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl ${
            tone === "dark" ? "text-ivory" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </div>
      {intro && (
        <p className={`text-[15px] leading-relaxed lg:col-span-4 lg:col-start-9 ${tone === "dark" ? "text-muted" : "text-stone"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}

/** Serif italic accent word. */
export const Accent = ({ children }: { children: React.ReactNode }) => (
  <em className="font-serif font-normal italic tracking-normal">{children}</em>
);

/** A phrase with a hand-drawn ellipse around it. */
export function Circled({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        className="draw pointer-events-none absolute -inset-x-[12%] -inset-y-[30%] h-[160%] w-[124%] text-brass"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M28 8 C 70 0, 170 2, 192 22 C 206 40, 150 56, 92 56 C 38 56, 4 46, 8 28 C 11 16, 40 8, 120 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/** A phrase with a loose hand-drawn underline. */
export function Underlined({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg className="draw pointer-events-none absolute -bottom-2 left-0 h-3 w-full text-brass" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 8 C 50 2, 120 12, 198 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}

/** Small tilted sticker. */
export function Sticker({ children, rotate = -6, className = "" }: { children: React.ReactNode; rotate?: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-brass px-2.5 py-1 font-mono text-[11px] text-ink shadow-lg shadow-black/30 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

/** Deterministic pixel mosaic, used as an overlay on photos. */
export function Mosaic({ cols = 12, rows = 8, density = 0.42, seed = 7, className = "" }: { cols?: number; rows?: number; density?: number; seed?: number; className?: string }) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const x = i % cols;
    // Cluster towards the right-hand side, like a pixel dissolve.
    const bias = x / cols;
    const r = rand();
    return r < density * (0.35 + bias) ? (r < density * 0.25 ? 2 : 1) : 0;
  });
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none grid ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
    >
      {cells.map((v, i) => (
        <span key={i} className={v === 2 ? "bg-brass-light" : v === 1 ? "bg-brass" : ""} />
      ))}
    </div>
  );
}

/** Photo with grayscale treatment and optional brass mosaic. */
const FALLBACK_IMG = "/images/hero_london_property_1794274507487.jpg";
export function Photo({ src, alt = "", className = "", mosaic = true, seed = 7 }: { src: string; alt?: string; className?: string; mosaic?: boolean; seed?: number }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover grayscale contrast-[1.05]"
        onError={(e) => {
          const img = e.currentTarget;
          if (!img.src.endsWith(FALLBACK_IMG)) img.src = FALLBACK_IMG;
        }}
      />
      <div className="absolute inset-0 bg-ink/20" />
      {mosaic && <Mosaic seed={seed} className="absolute inset-y-0 right-0 w-[70%] opacity-95" />}
    </div>
  );
}
