import React, { useEffect, useRef } from "react";

export const scrollToId = (id: string) => {
  // Lay out every section first, so the scroll target is in its final position.
  document.documentElement.classList.add("rendered");
  document.getElementById(id.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
};

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

/** Small mono eyebrow label. Used sparingly: the hero and the contact section. */
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
    <p style={style} className={`font-mono text-xs uppercase tracking-[0.18em] ${tone === "dark" ? "text-brass" : "text-ink"} ${className}`}>
      {children}
    </p>
  );
}

export function SectionHeading({
  title,
  intro,
  tone = "dark",
}: {
  title: React.ReactNode;
  intro?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Reveal className="mb-12 grid gap-5 sm:mb-16 lg:grid-cols-12 lg:items-end">
      <h2
        className={`text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl lg:col-span-7 ${
          tone === "dark" ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`text-base leading-relaxed lg:col-span-4 lg:col-start-9 ${tone === "dark" ? "text-muted" : "text-stone"}`}>
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
