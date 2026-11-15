import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { siteConfig } from "../siteConfig";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";
import { scrollToId } from "./ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  // Thin brass line along the bottom of the header showing how far down the page you are.
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-brass"
        style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
      />
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:h-20 sm:px-8">
        <a href="#top" className="text-xl font-semibold tracking-[-0.04em] text-ivory">
          Upscaled<sup className="ml-0.5 text-[10px] text-brass">®</sup>
        </a>

        <nav aria-label="Main" className="hidden items-center text-[13px] text-muted lg:flex">
          {siteConfig.navigation.map((item, i) => (
            <React.Fragment key={item.href}>
              {i > 0 && <span className="px-6 text-line" aria-hidden="true">+</span>}
              <a href={item.href} className="transition-colors hover:text-ivory">
                <RandomLetterSwap label={item.label} staggerDuration={0.025} transition={{ duration: 0.6, type: "spring" }} />
              </a>
            </React.Fragment>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LiquidButton size="lg" className="hidden rounded-full text-[13px] sm:inline-flex" onClick={() => scrollToId("contact")}>
            Free consultation
          </LiquidButton>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? (
              <X size={22} className="text-ivory" />
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
        <div ref={menuRef} id="mobile-menu" className="border-t border-line bg-ink px-4 pb-10 pt-2 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {siteConfig.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={close} className="border-b border-line py-4 font-serif text-3xl font-light text-ivory">
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={close} className="mt-8 rounded-full bg-ivory py-3.5 text-center text-sm font-medium text-ink">
              Free consultation
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
