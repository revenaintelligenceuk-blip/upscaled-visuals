import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:h-20 sm:px-8">
        <a href="#top" className="font-serif text-2xl tracking-tight text-ivory">
          Upscaled<sup className="ml-0.5 text-[10px] text-brass">®</sup>
        </a>

        <nav aria-label="Main" className="hidden items-center text-[13px] text-muted lg:flex">
          {siteConfig.navigation.map((item, i) => (
            <React.Fragment key={item.href}>
              {i > 0 && <span className="px-6 text-line" aria-hidden="true">+</span>}
              <a href={item.href} className="transition-colors hover:text-ivory">
                {item.label}
              </a>
            </React.Fragment>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LiquidButton size="lg" className="hidden rounded-full text-[13px] sm:inline-flex" onClick={() => scrollToId("contact")}>
            Start a project
          </LiquidButton>
          <button
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
        <div id="mobile-menu" className="border-t border-line bg-ink px-4 pb-10 pt-2 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {siteConfig.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={close} className="border-b border-line py-4 font-serif text-3xl font-light text-ivory">
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={close} className="mt-8 rounded-full bg-ivory py-3.5 text-center text-sm font-medium text-ink">
              Start a project
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
