import React, { useEffect, useRef } from "react";
import type { Project } from "../siteConfig";

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

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/** Small bracketed label, e.g. [ OUR PROCESS ] */
export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.22em] text-brass ${className}`}>
      [ {children} ]
    </p>
  );
}

export function SectionHeading({
  label,
  title,
  intro,
}: {
  label: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <Reveal className="mb-14 grid gap-6 sm:mb-20 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Label>{label}</Label>
        <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] tracking-tight text-ivory text-balance sm:text-6xl">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="text-[15px] font-light leading-relaxed text-muted lg:col-span-4 lg:col-start-9">{intro}</p>
      )}
    </Reveal>
  );
}

/** A small browser-window frame. */
export function BrowserFrame({ children, url, className = "" }: { children: React.ReactNode; url?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-card shadow-2xl shadow-black/50 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-card-2 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        {url && <span className="ml-3 truncate font-mono text-[10px] text-muted/80">{url}</span>}
      </div>
      {children}
    </div>
  );
}

const FALLBACK_IMG = "/images/hero_london_property_1794274507487.jpg";

/** A miniature website drawn from a project's palette. Purely decorative. */
export function SiteMockup({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { bg, ink, accent } = project.palette;
  return (
    <div className="flex h-full w-full flex-col" style={{ background: bg, color: ink }} aria-hidden="true">
      <div className={`flex items-center justify-between ${compact ? "px-3 py-2" : "px-6 py-4"}`}>
        <span className={`font-serif ${compact ? "text-[10px]" : "text-sm"}`}>{project.title}</span>
        <span className={`flex gap-3 ${compact ? "text-[7px]" : "text-[10px]"}`} style={{ opacity: 0.65 }}>
          {project.nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
      </div>
      <div className={`grid flex-1 grid-cols-5 gap-4 ${compact ? "px-3 pb-3" : "px-6 pb-6"}`}>
        <div className="col-span-3 flex flex-col justify-center">
          <span className={`font-serif font-light leading-[1.02] ${compact ? "text-base" : "text-3xl"}`}>{project.headline}</span>
          {!compact && (
            <span className="mt-3 space-y-1.5">
              <span className="block h-1 w-11/12 rounded-full" style={{ background: ink, opacity: 0.15 }} />
              <span className="block h-1 w-8/12 rounded-full" style={{ background: ink, opacity: 0.15 }} />
            </span>
          )}
          <span
            className={`mt-3 inline-block w-fit rounded-full ${compact ? "px-2 py-0.5 text-[7px]" : "px-3.5 py-1.5 text-[10px]"}`}
            style={{ background: accent, color: bg }}
          >
            {project.nav[project.nav.length - 1]} →
          </span>
        </div>
        <div className="col-span-2 overflow-hidden rounded-lg">
          <img
            src={project.image || FALLBACK_IMG}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.endsWith(FALLBACK_IMG)) img.src = FALLBACK_IMG;
            }}
          />
        </div>
      </div>
    </div>
  );
}
