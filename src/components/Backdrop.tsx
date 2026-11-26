import React from "react";

/**
 * The one background treatment: a soft brass glow behind a section.
 * The parent needs `relative isolate overflow-hidden`.
 */
export default function Backdrop({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return <div aria-hidden="true" className={`backdrop backdrop-${tone}`} />;
}
