import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { siteConfig } from "../siteConfig";
import { Label, Reveal } from "./ui";

interface Props {
  selectedService?: string;
}

const { contact, brand, cta } = siteConfig;

const emptyForm = (projectType: string) => ({
  name: "",
  email: "",
  website: "",
  projectType,
  budget: contact.budgets[contact.budgets.length - 1],
  message: "",
  _gotcha: "", // honeypot: hidden from people, bots fill it in
});

const inputClass =
  "w-full min-h-11 rounded-sm border bg-white/70 px-3 py-2.5 text-base text-ink placeholder:text-stone transition-colors focus:border-ink focus:bg-white focus:outline-2 focus:outline-offset-1 focus:outline-ink";

const contactLink = "flex min-h-11 w-fit items-center font-mono text-sm underline underline-offset-4";

export default function BookingSection({ selectedService }: Props) {
  const [form, setForm] = useState(() => emptyForm(selectedService || contact.auditType));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const resultRef = useRef<HTMLDivElement>(null);
  const isAudit = form.projectType === contact.auditType;

  useEffect(() => {
    if (selectedService) setForm((f) => ({ ...f, projectType: selectedService }));
  }, [selectedService]);

  // The form is replaced by the confirmation, so move focus to it.
  useEffect(() => {
    if (status === "sent" || status === "mailto") resultRef.current?.focus();
  }, [status]);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Changing the type changes which fields are required, so clear old errors.
    if (name === "projectType") setErrors({});
    else if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please add your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please add a valid email";
    if (isAudit && !/\S\.\S/.test(form.website)) next.website = "Add your website address so we can audit it";
    if (!isAudit && !form.message.trim()) next.message = "A sentence or two about the project helps";
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
      `Current website: ${form.website || "-"}`,
      `Project: ${form.projectType}`,
      `Budget: ${form.budget}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
      `${form.projectType}: ${form.name}`
    )}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  };

  const line = (name: string) => (errors[name] ? "border-red-700" : "border-stone/50");

  return (
    <section id="contact" className="on-light relative overflow-hidden bg-brass py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 sm:px-8 lg:grid-cols-12">
        <Reveal className="flex flex-col lg:col-span-5">
          <Label tone="light">{contact.eyebrow}</Label>
          <h2 className="mt-6 text-5xl font-medium leading-[1] tracking-[-0.045em] sm:text-7xl">
            {contact.heading}
          </h2>
          <div className="mt-auto pt-10">
            <p className="max-w-md text-base leading-relaxed">{cta.support}</p>
            <p className="mt-3 max-w-md text-base font-medium">{contact.quoteLine}</p>
            <div className="mt-6">
              <a href={`tel:${brand.phone}`} className={contactLink}>Call {brand.phone}</a>
              <a href={`mailto:${brand.email}`} className={`${contactLink} break-all`}>{brand.email}</a>
            </div>
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
              <div ref={resultRef} tabIndex={-1} className="py-12 text-center" role="status">
                <CheckCircle2 size={40} strokeWidth={1.25} aria-hidden="true" className="mx-auto text-brass-deep" />
                {status === "sent" ? (
                  <p className="mx-auto mt-5 max-w-sm text-xl font-medium leading-snug tracking-tight">{contact.success}</p>
                ) : (
                  <>
                    <p className="mt-5 text-2xl font-medium tracking-tight">Almost there.</p>
                    <p className="mx-auto mt-3 max-w-sm text-stone">
                      Your email app should have opened with your enquiry filled in. Just hit send. If nothing opened, email us at {brand.email}.
                    </p>
                  </>
                )}
                {status === "sent" && brand.bookingUrl && (
                  <a
                    href={brand.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex min-h-12 items-center gap-2 bg-ink px-6 text-sm font-medium text-ivory hover:bg-ink/85"
                  >
                    Or book a time now <ArrowRight size={14} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm(contact.auditType));
                    setStatus("idle");
                  }}
                  className="mx-auto mt-4 flex min-h-11 items-center text-sm underline underline-offset-4"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              // method + action are the fallback if scripts haven't loaded: data is
              // POSTed (or emailed) and never appears in the page address.
              <form
                onSubmit={submit}
                method="post"
                action={brand.formEndpoint || `mailto:${brand.email}`}
                encType={brand.formEndpoint ? undefined : "text/plain"}
                aria-busy={status === "sending"}
                noValidate
              >
                <p className="text-center text-xl font-medium tracking-tight">Tell us about your site</p>
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="_gotcha">Leave this field empty</label>
                  <input id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" value={form._gotcha} onChange={update} />
                </div>
                <div className="mt-8 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <Field label="Name" htmlFor="name" required error={errors.name}>
                    <input id="name" name="name" autoComplete="name" value={form.name} onChange={update} className={`${inputClass} ${line("name")}`} />
                  </Field>
                  <Field label="Email" htmlFor="email" required error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} className={`${inputClass} ${line("email")}`} />
                  </Field>
                  <Field label="Current website" htmlFor="website" required={isAudit} error={errors.website} className="sm:col-span-2">
                    <input id="website" name="website" inputMode="url" autoComplete="url" placeholder="yourbusiness.co.uk" value={form.website} onChange={update} className={`${inputClass} ${line("website")}`} />
                  </Field>
                  <Field label="What do you need?" htmlFor="projectType">
                    <select id="projectType" name="projectType" value={form.projectType} onChange={update} className={`${inputClass} border-stone/50`}>
                      {contact.projectTypes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Rough budget" htmlFor="budget">
                    <select id="budget" name="budget" value={form.budget} onChange={update} className={`${inputClass} border-stone/50`}>
                      {contact.budgets.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label={isAudit ? "Anything we should know?" : "Project details"} htmlFor="message" required={!isAudit} error={errors.message} className="sm:col-span-2">
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={update}
                      className={`${inputClass} resize-y ${line("message")}`}
                    />
                  </Field>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-stone">{contact.noSite}</p>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 bg-ink px-4 text-sm font-medium text-ivory transition-colors hover:bg-ink/85 disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} aria-hidden="true" className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      {isAudit ? contact.auditSubmitLabel : contact.submitLabel}
                      <ArrowRight size={14} aria-hidden="true" />
                    </>
                  )}
                </button>
                <div role="alert">
                  {status === "error" && (
                    <p className="mt-3 text-center text-sm text-red-700">
                      Something went wrong and your message wasn't sent. Please try again, or email {brand.email}.
                    </p>
                  )}
                </div>
                <p className="mt-4 text-center text-sm leading-relaxed text-stone">
                  We reply within one working day and only use your details to answer your enquiry. See our{" "}
                  <a href="/privacy/" className="underline underline-offset-2 hover:text-ink">privacy policy</a>.
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
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm text-ink">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      {React.isValidElement<Record<string, unknown>>(children)
        ? React.cloneElement(children, {
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? `${htmlFor}-error` : undefined,
            "aria-required": required || undefined,
          })
        : children}
      {error && <p id={`${htmlFor}-error`} className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}
