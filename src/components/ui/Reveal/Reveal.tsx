"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./Reveal.module.css";

type RevealProps = {
  as?: ElementType;
  delay?: number;
  rise?: number;
  className?: string;
  children: ReactNode;
  id?: string;
};

/** Fade-and-rise on first view: 550ms ease-soft, 18px rise (DESIGN-REFS §7.7). */
export function Reveal({ as: Tag = "div", delay = 0, rise = 18, className, children, id }: RevealProps) {
  const [ref, shown] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      className={`${styles.reveal} ${className ?? ""}`}
      data-shown={shown ? "" : undefined}
      style={{ "--delay": `${delay}s`, "--rise": `${rise}px` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
