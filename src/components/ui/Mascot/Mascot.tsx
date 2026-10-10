import type { CSSProperties } from "react";
import styles from "./Mascot.module.css";

export type MascotMood = "smile" | "happy" | "sleepy" | "wow";
export type MascotProp = "none" | "phone" | "headphones" | "notes" | "sparkles";

type MascotProps = {
  /** "light" = white cloud for the sky, "dark" = ink cloud for paper. */
  tone?: "light" | "dark";
  mood?: MascotMood;
  prop?: MascotProp;
  /** Ambient motion: idle breathing, or a livelier hop / sway / nod. */
  act?: "idle" | "hop" | "sway" | "nod";
  width?: number | string;
  className?: string;
  /** Seed so several mascots on a page blink and glance out of sync. */
  seed?: number;
  title?: string;
};

// puff: an original cloud character drawn for this study.
const CLOUD =
  "M24 74c-11 0-18-8-16-18-7-4-8-15 0-20 2-10 12-15 21-11 4-11 17-16 28-10 8-6 21-4 26 6 11 0 18 10 15 20 8 5 7 18-3 22-2 7-9 11-16 11z";

export function Mascot({
  tone = "light",
  mood = "smile",
  prop = "none",
  act = "idle",
  width = 120,
  className,
  seed = 0,
  title,
}: MascotProps) {
  const rnd = (n: number) => ((Math.sin(seed * 9.13 + n) + 1) / 2).toFixed(2);
  const vars = {
    "--blink-delay": `${(Number(rnd(1)) * 4).toFixed(2)}s`,
    "--glance-len": `${(11 + Number(rnd(2)) * 4).toFixed(2)}s`,
    "--glance-delay": `-${(Number(rnd(3)) * 12).toFixed(2)}s`,
    width,
  } as CSSProperties;

  const fill = tone === "light" ? "url(#puff-light)" : "var(--ink)";
  const face = tone === "light" ? "var(--ink)" : "#fff";

  return (
    <svg
      viewBox="-14 -14 148 112"
      className={`${styles.mascot} ${styles[`act-${act}`]} ${className ?? ""}`}
      style={vars}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <radialGradient id="puff-light" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f3f7fc" />
          <stop offset="100%" stopColor="#dce8f6" />
        </radialGradient>
      </defs>

      <ellipse className={styles.shadow} cx="60" cy="90" rx="34" ry="4" fill="rgb(0 20 60 / 0.18)" />

      <g className={styles.figure}>
        <path d={CLOUD} fill={fill} />
        {tone === "light" ? (
          <path d={CLOUD} fill="none" stroke="rgb(0 30 80 / 0.06)" strokeWidth="1.5" />
        ) : null}

        {prop === "headphones" ? (
          <g>
            <path d="M22 44c4-26 72-26 76 0" fill="none" stroke={face} strokeWidth="4" strokeLinecap="round" />
            <rect x="12" y="40" width="13" height="22" rx="6" fill="#ff7a59" />
            <rect x="95" y="40" width="13" height="22" rx="6" fill="#ff7a59" />
          </g>
        ) : null}

        <g className={styles.face}>
          <Face mood={mood} color={face} />
          <circle cx="36" cy="60" r="4.5" fill="#ff9aa8" opacity="0.45" />
          <circle cx="84" cy="60" r="4.5" fill="#ff9aa8" opacity="0.45" />
        </g>

        {prop === "phone" ? (
          <g className={styles.phone}>
            <rect x="96" y="20" width="20" height="34" rx="5" fill="#fff" stroke={face} strokeWidth="2.5" />
            <path d="M101 29h10M101 35h10M101 41h6" stroke="#7aa7e0" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        ) : null}
      </g>

      {prop === "notes" ? (
        <g fill="var(--on-sky-soft)">
          <text className={styles.note} x="-6" y="30" fontSize="18" style={{ "--note-delay": "0s" } as CSSProperties}>
            ♪
          </text>
          <text className={styles.note} x="110" y="18" fontSize="14" style={{ "--note-delay": "1.1s" } as CSSProperties}>
            ♫
          </text>
        </g>
      ) : null}

      {prop === "sparkles" ? (
        <g fill="#fff">
          {[
            [-4, 20, 0],
            [112, 8, 0.6],
            [118, 48, 1.1],
            [8, 2, 0.3],
          ].map(([x, y, d]) => (
            <path
              key={`${x}-${y}`}
              className={styles.star}
              style={{ "--star-delay": `${d}s` } as CSSProperties}
              d={`M${x} ${y - 6}l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6z`}
            />
          ))}
        </g>
      ) : null}
    </svg>
  );
}

function Face({ mood, color }: { mood: MascotMood; color: string }) {
  if (mood === "happy") {
    return (
      <g fill="none" stroke={color} strokeWidth="3.4" strokeLinecap="round">
        <path d="M42 50q5-6 10 0M68 50q5-6 10 0" />
        <path d="M53 58q7 8 14 0" />
      </g>
    );
  }
  if (mood === "sleepy") {
    return (
      <g fill="none" stroke={color} strokeWidth="3.4" strokeLinecap="round">
        <path d="M42 51h10M68 51h10" />
        <path d="M55 59q5 4 10 0" />
      </g>
    );
  }
  return (
    <g>
      <g className={styles.eyes} fill={color}>
        <ellipse className={styles.eye} cx="47" cy="50" rx="3.6" ry="4.6" />
        <ellipse className={styles.eye} cx="73" cy="50" rx="3.6" ry="4.6" />
      </g>
      {mood === "wow" ? (
        <ellipse cx="60" cy="60" rx="4" ry="4.6" fill={color} />
      ) : (
        <path d="M54 58q6 6 12 0" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
      )}
    </g>
  );
}
