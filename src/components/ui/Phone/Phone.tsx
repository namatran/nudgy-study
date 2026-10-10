import type { CSSProperties, ReactNode } from "react";
import styles from "./Phone.module.css";

type PhoneProps = {
  children: ReactNode;
  /** Outer width in px; height follows the 300×626 proportions measured on the original. */
  width?: number;
  /** Screen background: "paper" or "sky". */
  screen?: "paper" | "sky";
  className?: string;
  style?: CSSProperties;
};

/** A plain HTML/CSS phone mockup: dark shell, rounded screen, status bar, island. */
export function Phone({ children, width = 300, screen = "paper", className, style }: PhoneProps) {
  const scale = width / 300;
  return (
    <div
      className={`${styles.shell} ${className ?? ""}`}
      style={{ "--phone-w": `${width}px`, "--phone-k": scale, ...style } as CSSProperties}
    >
      <div className={`${styles.screen} ${screen === "sky" ? styles.sky : ""}`}>
        <div className={styles.status} aria-hidden="true">
          <span>9:41</span>
          <span className={styles.island} />
          <span className={styles.glyphs}>
            <i />
            <i />
            <i />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
