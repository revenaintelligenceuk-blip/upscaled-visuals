"use client";

import * as React from "react";
import { motion, useAnimate, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

export interface RandomLetterSwapProps {
  /** Text to render. */
  label: string;
  className?: string;
  /** Delay between each letter starting its swap (seconds). */
  staggerDuration?: number;
  /** Motion transition used for each letter. */
  transition?: Transition;
  /** Swap direction: letters roll up (default) or down. */
  reverse?: boolean;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

function shuffledOrder(length: number) {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * Text that rolls each letter out and a copy in, in a random order, on hover.
 */
export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.03,
  transition = { type: "spring", duration: 0.7 },
  reverse = false,
  onClick,
}: RandomLetterSwapProps) {
  const [scope, animate] = useAnimate();
  const [busy, setBusy] = React.useState(false);
  const letters = React.useMemo(() => label.split(""), [label]);
  const from = reverse ? "100%" : "-100%";
  const to = reverse ? "-100%" : "100%";

  const swap = async () => {
    if (busy || !scope.current) return;
    setBusy(true);
    const order = shuffledOrder(letters.length);
    const delay = (i: number) => order[i] * staggerDuration;

    await Promise.all([
      animate(".rls-primary", { y: from }, { ...transition, delay }),
      animate(".rls-secondary", { y: "0%" }, { ...transition, delay }),
    ]);

    // Reset instantly so the next hover starts from the same state.
    animate(".rls-primary", { y: "0%" }, { duration: 0 });
    animate(".rls-secondary", { y: to }, { duration: 0 });
    setBusy(false);
  };

  return (
    <motion.span
      ref={scope}
      className={cn("relative inline-flex overflow-hidden", className)}
      onHoverStart={swap}
      onFocus={swap}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      {letters.map((letter, i) => (
        <span key={i} aria-hidden="true" className="relative inline-block whitespace-pre">
          <motion.span className="rls-primary inline-block" initial={{ y: "0%" }}>
            {letter}
          </motion.span>
          <motion.span className="rls-secondary absolute left-0 top-0 inline-block" initial={{ y: to }}>
            {letter}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default RandomLetterSwap;
