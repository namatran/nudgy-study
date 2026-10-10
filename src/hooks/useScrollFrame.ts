"use client";

import { useEffect } from "react";

/**
 * Calls `onFrame` on scroll and resize, at most once per animation frame.
 * Used for scroll-scrubbed effects that write styles directly (no re-renders).
 */
export function useScrollFrame(onFrame: () => void) {
  useEffect(() => {
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        onFrame();
      });
    };
    onFrame();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [onFrame]);
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
