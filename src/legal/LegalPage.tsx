import React from "react";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "../siteConfig";
import Backdrop from "../components/Backdrop";
import DottedTrailCursor from "../components/ui/dotted-trail-cursor";
import { dotShape, dotThemes } from "../components/DotSection";
import { BusinessDetails, businessIdentity } from "./business";

/*
 * CLIENT TO APPROVE
 * The wording on these three pages is a starting draft based on ICO guidance
 * for a small UK service business. It is not legal advice. Check every
 * statement is true for how you actually work, fill in the TODOs in
 * siteConfig.legal, and have it reviewed before launch.
 */

export type LegalPageKey = "privacy" | "cookies" | "terms";

const titles: Record<LegalPageKey, string> = {
  privacy: "Privacy policy",
  cookies: "Cookie policy",
  terms: "Terms of use",
};

export default function LegalPage({ page }: { page: LegalPageKey }) {
  React.useEffect(() => {
    document.title = `${titles[page]} | ${siteConfig.brand.name}`;
  }, [page]);

  return (
    <div className="on-light relative isolate min-h-screen overflow-hidden bg-paper text-ink">
      {/* Fixed to the screen, so long pages cost no more than short ones */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <DottedTrailCursor className="h-full!" {...dotThemes.light} {...dotShape}>
          <div className="square-grid square-grid-light" />
        </DottedTrailCursor>
      </div>
      <header className="border-b border-paper-line">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-8">
          <a href="/" className="flex min-h-11 items-center text-xl font-semibold tracking-[-0.04em]">
            {siteConfig.brand.name}
          </a>
          <a href="/" className="flex min-h-11 items-center gap-1.5 text-sm text-stone hover:text-ink">
            <ArrowLeft size={14} aria-hidden="true" /> Back to site
          </a>
        </div>
      </header>

      <main id="main" className="legal mx-auto max-w-3xl px-4 py-16 sm:px-8 sm:py-24">
        <p className="text-sm text-stone">Last updated {siteConfig.legal.lastUpdated}</p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-6xl">{titles[page]}</h1>
        {page === "privacy" && <Privacy />}
        {page === "cookies" && <Cookies />}
        {page === "terms" && <Terms />}
      </main>

      <footer className="border-t border-paper-line">
        {/* The terms and privacy pages already name the business in their text. */}
        <BusinessDetails identity={page === "cookies"} className="mx-auto max-w-3xl px-4 py-8 text-sm leading-relaxed text-stone sm:px-8" />
      </footer>
    </div>
  );
}

const email = siteConfig.brand.email;
const Mail = () => <a href={`mailto:${email}`}>{email}</a>;

function Privacy() {
  const { legal } = siteConfig;
  const processors = [
    { who: legal.hostingProvider || "Our website hosting provider", why: "hosts this website. Like any web server, it briefly records technical data such as IP address and browser type to keep the site running and secure." },
    { who: legal.emailProvider || "Our email provider", why: "provides our email, where your enquiries and our conversations with you are stored." },
    { who: "Vercel Inc. (USA)", why: "provides Vercel Web Analytics, which gives us anonymous, aggregated visitor statistics without cookies." },
    { who: "Our accountant and HMRC", why: "if you become a client, for bookkeeping and tax purposes." },
  ].filter(Boolean) as { who: string; why: string }[];

  return (
    <>
      <p className="lead">
        This policy explains what personal information we collect when you visit this website or get in touch with us, why we
        collect it, and your rights. We keep it short because we collect very little.
      </p>

      <h2>Who we are</h2>
      <p>
        {businessIdentity()} We are the "controller" of your personal information. If you have any questions about this policy
        or your data, email us at <Mail />.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>When you email or call us:</strong> whatever you choose to tell us, and your contact details.</li>
        <li><strong>If you become a client:</strong> the details we need to deliver and invoice the project, such as billing name, address and payment records.</li>
        <li><strong>When you visit the site:</strong> our hosting provider's servers record basic technical data (IP address, browser, pages requested) in security logs. We use privacy-friendly analytics that don't set cookies, which show us which pages are visited, the referring site, and general details such as country, device and browser. We don't use advertising trackers. See our <a href="/cookies/">cookie policy</a>.</li>
      </ul>
      <p>Please don't send us sensitive information (for example about health). We don't need it.</p>

      <h2>Why we use it, and our lawful basis</h2>
      <ul>
        <li><strong>To reply to your enquiry and give you a quote.</strong> Lawful basis: taking steps at your request before entering into a contract, and our legitimate interest in responding to business enquiries.</li>
        <li><strong>To deliver a project you've hired us for.</strong> Lawful basis: performance of our contract with you.</li>
        <li><strong>To keep accounts and meet tax rules.</strong> Lawful basis: legal obligation.</li>
        <li><strong>To keep the website secure.</strong> Lawful basis: our legitimate interest in protecting the site.</li>
        <li><strong>To understand how the website is used.</strong> Lawful basis: our legitimate interest in improving it.</li>
      </ul>
      <p>
        We will not add you to a mailing list or send you marketing without your clear permission, and we never sell or rent your
        information.
      </p>

      <h2>Who we share it with</h2>
      <p>We use a small number of trusted services to run our business. They only process your information on our instructions:</p>
      <ul>
        {processors.map((p) => (
          <li key={p.who}><strong>{p.who}</strong> {p.why}</li>
        ))}
      </ul>
      <p>We may also share information if the law requires it, for example with HMRC or the police.</p>

      <h2>International transfers</h2>
      <p>
        Some of the services above are based in, or store data in, the United States or elsewhere outside the UK. Where that happens
        we rely on the legal safeguards UK law requires, such as the UK–US "data bridge" or the ICO's International Data Transfer
        Agreement / Addendum.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li><strong>Enquiries that don't go ahead:</strong> up to 12 months, then deleted.</li>
        <li><strong>Client project and billing records:</strong> 6 years after the end of the financial year they relate to, as required for tax.</li>
        <li><strong>Server security logs:</strong> kept by our hosting provider for a short period, usually no more than 30 days.</li>
      </ul>

      <h2>Your rights</h2>
      <p>Under UK data protection law you have the right to:</p>
      <ul>
        <li>ask for a copy of the information we hold about you;</li>
        <li>ask us to correct information that is wrong or incomplete;</li>
        <li>ask us to delete your information;</li>
        <li>ask us to restrict or stop using your information, or object to how we use it;</li>
        <li>ask for your information in a portable format; and</li>
        <li>withdraw any consent you have given, at any time.</li>
      </ul>
      <p>
        To use any of these rights, email <Mail />. It's free, and we'll respond within one month. Some rights have exceptions, for
        example we must keep invoices for tax purposes.
      </p>

      <h2>Complaints</h2>
      <p>
        If you're unhappy with how we've handled your information, please tell us first so we can put it right. You also have the
        right to complain to the Information Commissioner's Office (ICO), the UK data protection regulator:{" "}
        <a href="https://ico.org.uk/make-a-complaint/" rel="noreferrer" target="_blank">ico.org.uk/make-a-complaint</a> or 0303 123 1113.
      </p>

      <h2>Changes to this policy</h2>
      <p>If we change how we use your information, we'll update this page and the date at the top.</p>
    </>
  );
}

function Cookies() {
  return (
    <>
      <p className="lead">
        Short version: this website does not set cookies. We use privacy-friendly analytics that don't set cookies.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Vercel Web Analytics to count visits and see which pages are useful. It doesn't set cookies or store anything on
        your device, and it doesn't follow you across other websites. We see aggregated figures such as page views, referring
        sites, country, device type and browser. Our <a href="/privacy/">privacy policy</a> says more.
      </p>

      <h2>What we don't use</h2>
      <ul>
        <li>No cookie-based analytics (such as Google Analytics).</li>
        <li>No advertising or social media tracking pixels.</li>
        <li>No session recording, chat widgets or embedded videos and maps that set cookies.</li>
        <li>No browser storage (localStorage or sessionStorage).</li>
      </ul>
      <p>
        Our fonts and images are served from our own website rather than from third parties, so loading a page doesn't send your
        details to Google or anyone else. Because nothing optional is stored on your device, we don't need to show you a cookie
        banner.
      </p>

      <h2>Cookies we set</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr><th>Name</th><th>Provider</th><th>Purpose</th><th>Category</th><th>Duration</th></tr>
          </thead>
          <tbody>
            <tr><td colSpan={5}>None</td></tr>
          </tbody>
        </table>
      </div>

      <h2>If this changes</h2>
      <p>
        If we ever add something that uses cookies, such as an embedded booking widget, we'll list it here first. Where the law
        requires it, we'll ask for your permission before it's switched on, and you'll be able to change your mind at any time.
      </p>

      <h2>Questions</h2>
      <p>Email <Mail />. Our <a href="/privacy/">privacy policy</a> explains how we handle personal information more generally.</p>
    </>
  );
}

function Terms() {
  const { legal } = siteConfig;
  return (
    <>
      <p className="lead">These terms cover your use of this website. By using the site, you agree to them.</p>

      <h2>About us</h2>
      <p>{businessIdentity()} You can contact us at <Mail />.</p>

      <h2>Information on this site</h2>
      <p>
        We work to keep the information here accurate and up to date, but it is general information about our services, not an offer
        that can be accepted. This website doesn't list prices: we send a written quote for each project.{" "}
        {legal.vatNumber
          ? "VAT is added to quotes at the current rate."
          : "We are not currently VAT-registered, so no VAT is added to our quotes."}{" "}
        Every project is confirmed in a written quote and agreement, and that agreement, not this website, sets out what we'll
        deliver, the price and the payment terms.
      </p>
      {siteConfig.showWork && (
        <p>
          The example projects marked "Concept" are designs we've created to show our approach. They are not sites for real
          clients unless stated.
        </p>
      )}

      <h2>Enquiries, audits and projects</h2>
      <p>
        Contacting us doesn't commit you to anything. Website audits, website projects and other services,
        including AI services, are paid. We agree what's included and what it costs in writing before we start.
      </p>

      <h2>Our content</h2>
      <p>
        The design, text, code and graphics on this site belong to us or are used with permission. You're welcome to view and share
        links to the site, but please don't copy or reuse our content for commercial purposes without asking us first.
      </p>

      <h2>Using the site</h2>
      <p>
        Please don't misuse the site, for example by trying to gain unauthorised access or introducing viruses. We may suspend access to the site at any time, for example for maintenance.
      </p>

      <h2>Links to other websites</h2>
      <p>Where we link to other websites, we aren't responsible for their content or how they handle your information.</p>

      <h2>Our liability</h2>
      <p>
        We provide this website free of charge and "as is". To the extent the law allows, we aren't liable for any loss arising from
        your use of it. Nothing in these terms limits or excludes liability that can't be limited by law, such as liability for death
        or personal injury caused by negligence, or for fraud.
      </p>

      <h2>Law</h2>
      <p>These terms are governed by the law of England and Wales, and the courts of England and Wales will deal with any dispute.</p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. The date at the top shows when they last changed.</p>
    </>
  );
}
