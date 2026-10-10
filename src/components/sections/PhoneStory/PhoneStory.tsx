"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mac } from "@/components/ui/Mac/Mac";
import { Mascot } from "@/components/ui/Mascot/Mascot";
import { Phone } from "@/components/ui/Phone/Phone";
import { HomeScreen } from "@/components/ui/Screens/HomeScreen";
import { StoryScreen } from "@/components/ui/Screens/StoryScreens";
import { clamp01, useScrollFrame } from "@/hooks/useScrollFrame";
import { story } from "@/data/content";
import styles from "./PhoneStory.module.css";

// Fade windows in story progress p (0..1), measured on the original (DESIGN-REFS §7.10).
type Win = [inStart: number, inEnd: number, outStart: number, outEnd: number];
const STEP_WINDOWS: Win[] = [
  [0.06, 0.1, 0.18, 0.22],
  [0.23, 0.25, 0.31, 0.34],
  [0.44, 0.47, 0.52, 0.55],
  [0.56, 0.59, 0.63, 0.66],
];
const END_WINDOW: Win = [0.7, 0.73, 0.78, 0.82];
const MAC_DEVICE: Win = [0.86, 0.9, 2, 2];
const MAC_TEXT: Win = [0.9, 0.94, 2, 2];

// Which mock screen the phone shows, by progress.
const SCREEN_BREAKS = [0.225, 0.39, 0.555, 0.68];

// Phone pose keyframes: x = centre as % of stage width, ry/rz = rotateY/Z (deg).
const POSES = [
  { p: 0, x: 76, y: 60, ry: -28, rz: 3, s: 0.94, o: 0 },
  { p: 0.08, x: 76, y: 0, ry: -20, rz: 2.5, s: 0.98, o: 1 },
  { p: 0.14, x: 76, y: 0, ry: -16, rz: 2, s: 1, o: 1 },
  { p: 0.3, x: 76, y: 0, ry: -10, rz: 1, s: 1, o: 1 },
  { p: 0.38, x: 52, y: 0, ry: 8, rz: -1, s: 0.97, o: 1 },
  { p: 0.47, x: 27, y: 0, ry: 18, rz: -2, s: 1, o: 1 },
  { p: 0.62, x: 27, y: 0, ry: 12, rz: -1, s: 1, o: 1 },
  { p: 0.7, x: 50, y: 0, ry: 0, rz: 0, s: 0.94, o: 1 },
  { p: 0.8, x: 50, y: 0, ry: 0, rz: 0, s: 0.94, o: 1 },
  { p: 0.86, x: 50, y: -40, ry: 0, rz: 0, s: 0.86, o: 0 },
  { p: 1, x: 50, y: -40, ry: 0, rz: 0, s: 0.86, o: 0 },
];

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const smooth = (t: number) => t * t * (3 - 2 * t);

function windowOpacity(p: number, [a, b, c, d]: Win) {
  if (p <= a || p >= d) return 0;
  if (p < b) return ease((p - a) / (b - a));
  if (p <= c) return 1;
  return 1 - ease((p - c) / (d - c));
}

function pose(p: number) {
  let i = 0;
  while (i < POSES.length - 2 && p > POSES[i + 1].p) i++;
  const a = POSES[i];
  const b = POSES[i + 1];
  const t = smooth(clamp01((p - a.p) / (b.p - a.p)));
  const mix = (k: "x" | "y" | "ry" | "rz" | "s" | "o") => a[k] + (b[k] - a[k]) * t;
  return { x: mix("x"), y: mix("y"), ry: mix("ry"), rz: mix("rz"), s: mix("s"), o: mix("o") };
}

/** Sticky, scroll-scrubbed phone story (≥768px, motion allowed). */
export function PhoneStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const macRef = useRef<HTMLDivElement>(null);
  const macTextRef = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const [screenIndex, setScreenIndex] = useState(0);
  const [macActive, setMacActive] = useState(false);
  const [phoneWidth, setPhoneWidth] = useState(336);

  useEffect(() => {
    const size = () => setPhoneWidth(Math.round(((window.innerHeight * 0.78) / 626) * 300));
    size();
    window.addEventListener("resize", size);
    return () => window.removeEventListener("resize", size);
  }, []);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track || getComputedStyle(track).display === "none") return;
    const r = track.getBoundingClientRect();
    const p = clamp01(-r.top / (r.height - window.innerHeight));

    const apply = (el: HTMLElement | null, o: number, rise = 24, extra = "") => {
      if (!el) return;
      el.style.opacity = String(o);
      el.style.visibility = o > 0.001 ? "visible" : "hidden";
      el.style.transform = `translateY(calc(-50% + ${(rise * (1 - o)).toFixed(2)}px))${extra}`;
    };

    STEP_WINDOWS.forEach((w, i) => apply(stepRefs.current[i], windowOpacity(p, w)));
    const end = endRef.current;
    if (end) {
      const o = windowOpacity(p, END_WINDOW);
      end.style.opacity = String(o);
      end.style.visibility = o > 0.001 ? "visible" : "hidden";
      end.style.transform = `translateY(${(24 * (1 - o)).toFixed(2)}px)`;
    }
    const macO = windowOpacity(p, MAC_DEVICE);
    apply(macRef.current, macO, 40, ` scale(${(0.92 + 0.08 * macO).toFixed(4)})`);
    apply(macTextRef.current, windowOpacity(p, MAC_TEXT));
    setMacActive(macO > 0.95);

    const rig = rigRef.current;
    if (rig) {
      const q = pose(p);
      rig.style.left = `${q.x}%`;
      rig.style.opacity = String(q.o);
      rig.style.transform = `translate(-50%, calc(-50% + ${q.y}px)) perspective(1800px) rotateY(${q.ry}deg) rotateZ(${q.rz}deg) scale(${q.s})`;
    }
    const idx = SCREEN_BREAKS.findIndex((b) => p < b);
    setScreenIndex(idx === -1 ? 4 : idx);
  }, []);

  useScrollFrame(update);

  return (
    <div ref={trackRef} className={styles.track}>
      <div className={styles.stage}>
        <div ref={rigRef} className={styles.rig}>
          <Phone width={phoneWidth} className={styles.phone}>
            {story.steps.map((step, i) => (
              <div key={step.index} className={styles.screen} data-on={screenIndex === i ? "" : undefined}>
                <StoryScreen screen={step.screen} />
              </div>
            ))}
            <div className={styles.screen} data-on={screenIndex === 4 ? "" : undefined}>
              <HomeScreen />
            </div>
          </Phone>
        </div>

        {story.steps.map((step, i) => (
          <article
            key={step.index}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className={`${styles.step} ${i < 2 ? styles.left : styles.right}`}
          >
            <p className={styles.label}>
              {step.index} <span aria-hidden="true">·</span> {step.label}
            </p>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.tagline}>{step.tagline}</p>
            <p className={styles.body}>{step.body}</p>
          </article>
        ))}

        <div ref={endRef} className={styles.end} aria-hidden="true">
          <div className={styles.endMark}>
            <Mascot tone="dark" width="48%" seed={51} />
            <span>{story.end.word}</span>
          </div>
          <div className={styles.endLine}>
            <p className={styles.endLine1}>{story.end.line1}</p>
            <p className={styles.endLine2}>{story.end.line2}</p>
          </div>
        </div>

        <div ref={macRef} className={styles.mac}>
          <Mac active={macActive} />
        </div>
        <article ref={macTextRef} className={styles.macText}>
          <p className={styles.label}>{story.mac.label}</p>
          <h3 className={styles.title}>{story.mac.title}</h3>
          <p className={styles.tagline}>{story.mac.tagline}</p>
          <p className={styles.body}>{story.mac.body}</p>
        </article>
      </div>
    </div>
  );
}
