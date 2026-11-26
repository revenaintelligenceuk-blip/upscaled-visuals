import React from "react";
import DotField from "./DotField";

/** A page section with the square grid and the dotted background behind its content. */
export default function DotSection({
  as: Tag = "section",
  id,
  tone = "dark",
  className = "",
  children,
}: {
  as?: "section" | "footer";
  id?: string;
  tone?: "dark" | "light";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag id={id} className={`relative isolate overflow-clip ${tone === "dark" ? "bg-ink text-ivory" : "on-light bg-paper text-ink"}`}>
      <DotField tone={tone} />
      <div className={`relative isolate ${className}`}>
        <div aria-hidden="true" className={`square-grid square-grid-${tone}`} />
        {children}
      </div>
    </Tag>
  );
}
