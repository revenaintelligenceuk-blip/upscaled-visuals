import React, { useEffect, useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { siteConfig } from "../siteConfig";
import DotSection from "./DotSection";
import Backdrop from "./Backdrop";
import { Reveal } from "./ui";
import { NEED_EVENT } from "../lib/motion";

/**
 * "What do you need?" Visitors tap options and the email writes itself. Nothing
 * is sent or stored by the site: the button opens the visitor's own email app.
 */
export default function ContactSection() {
  const { picker, brand } = siteConfig;
  const [picked, setPicked] = useState<string[]>([picker.options[0]]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const add = (e: Event) => {
      const option = (e as CustomEvent<string>).detail;
      setPicked((p) => (p.includes(option) ? p : [...p, option]));
    };
    window.addEventListener(NEED_EVENT, add);
    return () => window.removeEventListener(NEED_EVENT, add);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  const toggle = (option: string) => {
    setCopied(false);
    setPicked((p) => (p.includes(option) ? p.filter((x) => x !== option) : [...p, option]));
  };

  const chosen = picker.options.filter((o) => picked.includes(o));
  const lines = chosen.map((o) => `- ${o}`);
  const body = [picker.greeting, "", "I'm interested in:", ...(lines.length ? lines : ["- "]), "", "My business is:", ""].join("\n");
  const href = `mailto:${brand.email}?subject=${encodeURIComponent(picker.subject)}&body=${encodeURIComponent(body)}`;

  const copy = () => {
    navigator.clipboard?.writeText(body).then(() => setCopied(true), () => setCopied(false));
  };

  return (
    <DotSection id="need" tone="light" className="py-24 sm:py-32">
      <Backdrop tone="light" />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl">{picker.title}</h2>
          <p className="mt-5 max-w-md text-lg text-stone">{picker.intro}</p>
          <div role="group" aria-label={picker.title} className="mt-10 flex flex-wrap gap-3">
            {picker.options.map((option) => {
              const on = picked.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(option)}
                  className={`inline-flex min-h-14 items-center gap-2 rounded-full border px-6 text-base font-medium ${
                    on ? "border-ink bg-ink text-ivory" : "border-ink/25 bg-white/70 text-ink hover:-translate-y-0.5 hover:border-ink"
                  }`}
                >
                  {on && <Check size={18} aria-hidden="true" className="pop text-brass" />}
                  {option}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
          <div className="bg-ink rounded-2xl p-7 text-ivory shadow-[0_32px_64px_-32px_rgb(14_14_12/0.55)] sm:p-10">
            <p className="break-words border-b border-line pb-4 text-sm leading-relaxed text-muted">
              To: <span className="text-ivory">{brand.email}</span>
              <br />
              Subject: <span className="text-ivory">{picker.subject}</span>
            </p>
            <div className="mt-6 min-h-[17rem] text-lg leading-relaxed">
              <p>{picker.greeting}</p>
              <p className="mt-4">I'm interested in:</p>
              <ul aria-live="polite">
                {chosen.length ? (
                  chosen.map((o) => <li key={o} className="line-in">- {o}</li>)
                ) : (
                  <li className="text-muted">Tap an option to add it here.</li>
                )}
              </ul>
              <p className="mt-4">
                My business is:<span aria-hidden="true" className="caret" />
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={href} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-brass px-7 text-sm font-medium text-ink hover:bg-brass-light">
                Open this email <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button type="button" onClick={copy} className="inline-flex min-h-11 items-center gap-2 text-sm text-ivory">
                {copied ? <Check size={16} aria-hidden="true" className="pop text-brass" /> : <Copy size={16} aria-hidden="true" />}
                <span aria-live="polite">{copied ? "Copied" : "Copy the message"}</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </DotSection>
  );
}
