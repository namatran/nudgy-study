"use client";

import { Fragment, useCallback, useRef, useState, type ReactNode, type RefObject } from "react";
import { clamp01, useScrollFrame } from "@/hooks/useScrollFrame";
import styles from "./ScrollWords.module.css";

export type WordRun = { text: string; tone?: "ink" | "soft" };

type ScrollWordsProps = {
  runs: WordRun[];
  /** Rendered after the word at this (0-based) index, e.g. inline mascots. */
  insert?: { after: number; node: ReactNode };
  /**
   * Without a track: lights as the element's top moves from 92% to 47% of the viewport.
   * With a track (sticky manifesto): lights over the first 72% of the track's scroll.
   */
  track?: RefObject<HTMLElement | null>;
  className?: string;
  onDone?: () => void;
};

const UNLIT = 0.14;

/** Words that light up one by one as you scroll (DESIGN-REFS §7.8–7.9). */
export function ScrollWords({ runs, insert, track, className, onDone }: ScrollWordsProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  const words = runs.flatMap((run) =>
    run.text.split(" ").filter(Boolean).map((w) => ({ w, tone: run.tone ?? "ink" })),
  );

  const update = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const vh = window.innerHeight;
    let t: number;
    if (track?.current && getComputedStyle(track.current).position !== "static") {
      const r = track.current.getBoundingClientRect();
      t = clamp01(-r.top / ((r.height - vh) * 0.72));
    } else {
      const top = root.getBoundingClientRect().top;
      t = clamp01((vh * 0.92 - top) / (vh * 0.45));
    }
    const spans = root.querySelectorAll<HTMLElement>("[data-w]");
    const n = spans.length;
    spans.forEach((s, i) => {
      const lit = clamp01(t * (n + 0.4) - i);
      s.style.opacity = String(UNLIT + (1 - UNLIT) * lit);
    });
    if (t >= 1) {
      setDone((d) => {
        if (!d) onDone?.();
        return true;
      });
    }
  }, [track, onDone]);

  useScrollFrame(update);

  return (
    <span ref={rootRef} className={`${styles.words} ${className ?? ""}`} data-done={done ? "" : undefined}>
      {words.map(({ w, tone }, i) => (
        <Fragment key={i}>
          <span data-w="" className={`${styles.word} ${tone === "soft" ? styles.soft : ""}`}>
            {w}
          </span>{" "}
          {insert && insert.after === i ? insert.node : null}
        </Fragment>
      ))}
    </span>
  );
}
