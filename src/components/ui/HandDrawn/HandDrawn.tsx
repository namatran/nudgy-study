"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./HandDrawn.module.css";

/** A word with a hand-drawn coral loop around it, drawn in on first view. */
export function HandCircle({ children, delay = 0.4 }: { children: ReactNode; delay?: number }) {
  const [ref, shown] = useInView<HTMLSpanElement>();
  return (
    <span ref={ref} className={styles.circled} data-shown={shown ? "" : undefined}>
      {children}
      <svg
        className={styles.loop}
        viewBox="0 0 120 50"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ "--delay": `${delay}s` } as CSSProperties}
      >
        <path
          d="M8 30C6 14 40 6 66 7c26 1 48 9 46 22-2 14-36 18-62 17C24 45 6 38 9 24c2-8 12-13 22-15"
          fill="none"
          stroke="var(--coral)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** A small hand-drawn curved arrow pointing down. */
export function HandArrow({ delay = 0.3, className }: { delay?: number; className?: string }) {
  const [ref, shown] = useInView<HTMLSpanElement>();
  return (
    <span ref={ref} className={`${styles.arrowWrap} ${className ?? ""}`} data-shown={shown ? "" : undefined}>
      <svg
        className={styles.arrow}
        width="34"
        height="48"
        viewBox="0 0 34 48"
        fill="none"
        aria-hidden="true"
        style={{ "--delay": `${delay}s` } as CSSProperties}
      >
        <path
          d="M12 3c10 6 14 18 6 30-2 3-5 6-8 8m0 0 1-9m-1 9 8-2"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
