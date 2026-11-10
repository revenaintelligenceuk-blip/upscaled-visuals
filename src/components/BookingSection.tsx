import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { MetalButton } from "@/components/ui/liquid-glass-button";
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
});

const inputClass =
  "w-full border-0 border-b bg-transparent px-0 py-3 text-[15px] font-light text-ivory placeholder:text-muted/50 transition-colors focus:border-brass focus:outline-none focus:ring-0";

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
    if (Object.keys(next).length) return;

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

  const line = (name: string) => (errors[name] ? "border-red-400/80" : "border-line");

  return (
    <section id="contact" className="bg-ink px-3 py-12 sm:px-5 sm:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-12 overflow-hidden rounded-[28px] border border-line bg-card p-6 sm:p-12 lg:grid-cols-12 lg:p-16">
        <Reveal className="flex flex-col lg:col-span-5">
          <Label>{contact.eyebrow}</Label>
          <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] tracking-tight text-ivory text-balance sm:text-6xl">
            Let's make something <em className="text-brass">worth remembering.</em>
          </h2>
          <p className="mt-6 max-w-md font-light leading-relaxed text-muted">{contact.subheading}</p>
          <div className="mt-10 lg:mt-auto">
            <p className="text-sm text-muted">Prefer email?</p>
            <a href={`mailto:${brand.email}`} className="mt-1 inline-block font-serif text-2xl text-ivory underline decoration-brass/50 underline-offset-8 hover:decoration-brass sm:text-3xl">
              {brand.email}
            </a>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          {status === "sent" || status === "mailto" ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center" role="status">
              <CheckCircle2 size={40} strokeWidth={1.25} className="text-brass" />
              <h3 className="mt-5 font-serif text-3xl font-light text-ivory">
                {status === "sent" ? `Thank you, ${form.name.split(" ")[0]}.` : "Almost there."}
              </h3>
              <p className="mx-auto mt-3 max-w-sm font-light text-muted">
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
                className="mt-8 text-sm text-brass underline-offset-4 hover:underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <Field label="Your name" htmlFor="name" required error={errors.name}>
                <input id="name" name="name" autoComplete="name" value={form.name} onChange={update} className={`${inputClass} ${line("name")}`} />
              </Field>
              <Field label="Email" htmlFor="email" required error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} className={`${inputClass} ${line("email")}`} />
              </Field>
              <Field label="Business name" htmlFor="business">
                <input id="business" name="business" autoComplete="organization" value={form.business} onChange={update} className={`${inputClass} border-line`} />
              </Field>
              <Field label="Current website (if any)" htmlFor="website">
                <input id="website" name="website" type="url" inputMode="url" placeholder="www.yourbusiness.co.uk" value={form.website} onChange={update} className={`${inputClass} border-line`} />
              </Field>
              <Field label="What do you need?" htmlFor="projectType">
                <select id="projectType" name="projectType" value={form.projectType} onChange={update} className={`${inputClass} border-line [&>option]:bg-card`}>
                  {[...new Set([form.projectType, ...contact.projectTypes])].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Rough budget" htmlFor="budget">
                <select id="budget" name="budget" value={form.budget} onChange={update} className={`${inputClass} border-line [&>option]:bg-card`}>
                  {contact.budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tell us about your business and the project" htmlFor="message" required error={errors.message} className="sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={update}
                  placeholder="e.g. We're a family-run bakery in Hackney and want a simple site with our menu and a way to pre-order cakes."
                  className={`${inputClass} resize-none ${line("message")}`}
                />
              </Field>

              <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <MetalButton variant="gold" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </MetalButton>
                <p className="text-sm font-light text-muted">
                  {status === "error" ? (
                    <span className="text-red-300">Something went wrong. Please email {brand.email}.</span>
                  ) : (
                    "Free discovery call. No obligation."
                  )}
                </p>
              </div>
            </form>
          )}
        </div>
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
      <label htmlFor={htmlFor} className="block text-[11px] uppercase tracking-[0.18em] text-muted">
        {label} {required && <span className="text-brass">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-300">{error}</p>}
    </div>
  );
}
