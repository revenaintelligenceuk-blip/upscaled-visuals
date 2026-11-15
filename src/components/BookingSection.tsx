import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Label, Reveal } from "./ui";

interface Props {
  selectedService?: string;
}

const emptyForm = (projectType: string) => ({
  name: "",
  email: "",
  business: "",
  website: "",
  projectType,
  budget: siteConfig.contact.budgets[siteConfig.contact.budgets.length - 1],
  message: "",
  _gotcha: "", // honeypot: hidden from people, bots fill it in
});

const inputClass =
  "w-full rounded-sm border bg-white/70 px-3 py-2.5 text-[15px] text-ink placeholder:text-stone/50 transition-colors focus:border-ink focus:bg-white focus:outline-none";

export default function BookingSection({ selectedService }: Props) {
  const { contact, brand } = siteConfig;
  const [form, setForm] = useState(() => emptyForm(selectedService || contact.projectTypes[0]));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");

  useEffect(() => {
    if (selectedService) setForm((f) => ({ ...f, projectType: selectedService }));
  }, [selectedService]);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please add your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please add a valid email";
    if (!form.message.trim()) next.message = "A sentence or two about the project helps";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    // A bot filled the hidden field: pretend it worked and send nothing.
    if (form._gotcha) {
      setStatus("sent");
      return;
    }

    if (brand.formEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(brand.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        setStatus(res.ok ? "sent" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }

    // No form service configured: hand the enquiry to the visitor's email app.
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Business: ${form.business || "-"}`,
      `Current website: ${form.website || "-"}`,
      `Project: ${form.projectType}`,
      `Budget: ${form.budget}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
      `New project enquiry: ${form.business || form.name}`
    )}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  };

  const line = (name: string) => (errors[name] ? "border-red-600" : "border-paper-line");

  return (
    <section id="contact" className="relative overflow-hidden bg-brass py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 sm:px-8 lg:grid-cols-12">
        <Reveal className="flex flex-col lg:col-span-5">
          <Label tone="light" className="!text-ink/60">{contact.eyebrow}</Label>
          <h2 className="mt-6 text-5xl font-medium leading-[1] tracking-[-0.045em] sm:text-7xl">
            {contact.heading}
          </h2>
          <div className="mt-auto pt-12">
            <p className="max-w-md text-[15px] leading-relaxed text-ink/80">{contact.subheading}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {["A free 20-minute call", "Honest feedback on your current site", "A clear quote, with no obligation"].map((x) => (
                <li key={x} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 bg-ink" />
                  {x}
                </li>
              ))}
            </ul>
            <a href={`mailto:${brand.email}`} className="mt-6 inline-block font-mono text-sm underline underline-offset-4">
              {brand.email}
            </a>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7">
          {/* Notebook page */}
          <div className="relative rotate-[0.6deg] rounded-sm bg-paper p-6 pl-12 shadow-2xl shadow-ink/30 sm:p-10 sm:pl-16">
            <span className="absolute left-4 top-0 flex h-full flex-col justify-around py-8 sm:left-6" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="h-3 w-3 rounded-full bg-brass shadow-inner" />
              ))}
            </span>

            {status === "sent" || status === "mailto" ? (
              <div className="py-12 text-center" role="status">
                <CheckCircle2 size={40} strokeWidth={1.25} className="mx-auto text-brass-deep" />
                <h3 className="mt-5 text-2xl font-medium tracking-tight">
                  {status === "sent" ? `Thank you, ${form.name.split(" ")[0]}.` : "Almost there."}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-stone">
                  {status === "sent"
                    ? "Your enquiry is with us. We'll reply within one working day."
                    : `Your email app should have opened with your enquiry filled in. Just hit send. If nothing opened, email us at ${brand.email}.`}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm(contact.projectTypes[0]));
                    setStatus("idle");
                  }}
                  className="mt-8 font-mono text-xs uppercase tracking-widest underline underline-offset-4"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <p className="text-center text-xl font-medium tracking-tight">let's get started</p>
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="_gotcha">Leave this field empty</label>
                  <input id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" value={form._gotcha} onChange={update} />
                </div>
                <div className="mt-8 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <Field label="name" htmlFor="name" required error={errors.name}>
                    <input id="name" name="name" autoComplete="name" value={form.name} onChange={update} className={`${inputClass} ${line("name")}`} />
                  </Field>
                  <Field label="email" htmlFor="email" required error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} className={`${inputClass} ${line("email")}`} />
                  </Field>
                  <Field label="business name" htmlFor="business">
                    <input id="business" name="business" autoComplete="organization" value={form.business} onChange={update} className={`${inputClass} border-paper-line`} />
                  </Field>
                  <Field label="current website" htmlFor="website">
                    <input id="website" name="website" type="url" inputMode="url" placeholder="optional" value={form.website} onChange={update} className={`${inputClass} border-paper-line`} />
                  </Field>
                  <Field label="what do you need?" htmlFor="projectType">
                    <select id="projectType" name="projectType" value={form.projectType} onChange={update} className={`${inputClass} border-paper-line`}>
                      {[...new Set([form.projectType, ...contact.projectTypes])].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="rough budget" htmlFor="budget">
                    <select id="budget" name="budget" value={form.budget} onChange={update} className={`${inputClass} border-paper-line`}>
                      {contact.budgets.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="project details" htmlFor="message" required error={errors.message} className="sm:col-span-2">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={update}
                      placeholder="Tell us a little about your business and what you need."
                      className={`${inputClass} resize-none ${line("message")}`}
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 flex w-full items-center justify-center gap-2 bg-ink py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ink/85 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : contact.submitLabel}
                  <ArrowRight size={14} />
                </button>
                <p className="mt-4 text-center text-xs leading-relaxed text-stone">
                  We'll only use your details to reply to your enquiry. See our{" "}
                  <a href="/privacy/" className="underline underline-offset-2 hover:text-ink">privacy policy</a>.
                </p>
                {brand.bookingUrl && (
                  <p className="mt-2 text-center text-xs text-stone">
                    Prefer to pick a time?{" "}
                    <a href={brand.bookingUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ink">Book the call directly</a>.
                  </p>
                )}
                <p className="mt-3 text-center text-xs text-stone">
                  {status === "error" ? (
                    <span className="text-red-700">Something went wrong. Please email {brand.email}.</span>
                  ) : (
                    "Free discovery call · No obligation · Reply within one working day"
                  )}
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block font-mono text-[11px] text-stone">
        {label} {required && <span className="text-brass-deep">*</span>}
      </label>
      {React.isValidElement<Record<string, unknown>>(children)
        ? React.cloneElement(children, {
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? `${htmlFor}-error` : undefined,
            "aria-required": required || undefined,
          })
        : children}
      {error && <p id={`${htmlFor}-error`} className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}
