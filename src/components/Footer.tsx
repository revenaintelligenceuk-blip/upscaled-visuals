import React from "react";
import { ArrowUp, Instagram, Mail } from "lucide-react";
import { siteConfig } from "../siteConfig";

export default function Footer() {
  const { brand, footer, navigation, services, founders } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] border border-line bg-[#0a0a09] p-6 sm:p-12 lg:p-16">
        <div className="flex items-start justify-between gap-6">
          <p className="font-serif font-light leading-[0.85] tracking-[-0.03em] text-ivory" style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}>
            Upscaled<sup className="align-super text-[0.25em] text-brass">®</sup>
          </p>
          <div className="hidden text-right sm:block">
            <p className="font-serif text-3xl font-light text-ivory">© 20–{String(year).slice(2)}°</p>
            <span className="ml-auto mt-4 block h-px w-24 bg-ivory/40" />
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-xs text-sm font-light text-muted">{footer.cta} For small businesses ready to look as good online as they are in person.</p>
            <a href={`mailto:${brand.email}`} className="mt-4 inline-block font-serif text-2xl text-ivory underline decoration-brass/50 underline-offset-8 hover:decoration-brass sm:text-3xl">
              {brand.email}
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted/70">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/80">
              {navigation.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-brass">{n.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted/70">Services</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/80">
              {services.map((s) => (
                <li key={s.id}><a href="#services" className="hover:text-brass">{s.title}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted/70">Social</p>
            <div className="mt-4 flex gap-2">
              <a href={brand.instagramUrl} target="_blank" rel="noreferrer" aria-label={`Instagram ${brand.instagramHandle}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ivory hover:border-brass hover:text-brass">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a href={`mailto:${brand.email}`} aria-label="Email" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ivory hover:border-brass hover:text-brass">
                <Mail size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 text-xs font-light text-muted/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright} · Made by {founders.map((f) => f.name).join(" & ")} · {brand.location}</p>
          <a href="#top" aria-label="Back to top" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ivory hover:border-brass hover:text-brass">
            <ArrowUp size={15} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
