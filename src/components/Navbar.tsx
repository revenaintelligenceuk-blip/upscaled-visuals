import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { scrollToId } from "./ui";

export default function Navbar() {
  const { navigation, cta, brand } = siteConfig;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Header background, plus the thin brass line showing how far down the page you are.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Mobile menu: move focus into it, keep Tab inside it, Escape closes and returns focus.
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const links = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a") ?? []);
    links()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggleRef.current, ...links()].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        open ? "border-line bg-ink" : scrolled ? "border-line bg-ink/95 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <div ref={progressRef} aria-hidden="true" style={{ transform: "scaleX(0)" }} className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-brass" />
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-8">
        <a href="#top" className="flex min-h-11 items-center text-xl font-semibold tracking-[-0.04em] text-ivory">
          {brand.name}
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 text-sm text-muted lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center underline-offset-8 transition-colors hover:text-ivory hover:underline hover:decoration-brass"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LiquidButton size="xl" className="rounded-full px-4 text-[13px] has-[>svg]:px-4 sm:px-6" onClick={() => scrollToId("contact")}>
            <span className="min-[420px]:hidden">{cta.shortLabel}</span>
            <span className="max-[419px]:hidden">{cta.label}</span>
          </LiquidButton>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? (
              <X size={22} aria-hidden="true" className="text-ivory" />
            ) : (
              <>
                <span className="h-px w-7 bg-ivory" />
                <span className="h-px w-7 bg-ivory" />
              </>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div ref={menuRef} id="mobile-menu" className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-ink px-4 pb-10 pt-2 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={close} className="border-b border-line py-4 font-serif text-3xl text-ivory">
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={close} className="mt-8 flex min-h-12 items-center justify-center rounded-full bg-ivory text-sm font-medium text-ink">
              {cta.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
