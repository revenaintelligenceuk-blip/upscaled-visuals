import React from "react";
import DottedTrailCursor from "./ui/dotted-trail-cursor";

/** The cursor's colours on dark and on cream backgrounds, in the brand's brass and copper. */
export const dotThemes = {
  dark: {
    backgroundColor: "#0e0e0c",
    colorA: "#5f4a26",
    colorB: "#3d2112",
    dotColor: "rgb(242 238 230 / 0.13)",
    activeDotColor: "#0e0e0c",
  },
  light: {
    backgroundColor: "#f6f3ec",
    colorA: "#e3c990",
    colorB: "#e2ab74",
    dotColor: "rgb(14 14 12 / 0.14)",
    activeDotColor: "#f6f3ec",
  },
};

/** Spacing is half the 72px square grid, so dots and lines stay in step. */
export const dotShape = { dotSpacing: 36, headRadius: 70, glowRadius: 280, maxPixelRatio: 1.5 };

/** A page section with the square grid and the dot cursor behind its content. */
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
    <Tag id={id} className={tone === "dark" ? "bg-ink text-ivory" : "on-light bg-paper text-ink"}>
      <DottedTrailCursor className="h-auto!" {...dotThemes[tone]} {...dotShape}>
        <div className={`relative isolate ${className}`}>
          <div aria-hidden="true" className={`square-grid square-grid-${tone}`} />
          {children}
        </div>
      </DottedTrailCursor>
    </Tag>
  );
}
