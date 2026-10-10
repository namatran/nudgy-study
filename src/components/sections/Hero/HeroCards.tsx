"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Mascot } from "@/components/ui/Mascot/Mascot";
import { hero } from "@/data/content";
import styles from "./HeroCards.module.css";

type Card = (typeof hero.cards)[number];

// Timing measured on the original (DESIGN-REFS §7.4).
const CYCLE = 5200;
const SWAP_AT = 1700;
const TYPE_START = 700;
const TYPE_STEP = 50;
const TILTS = [-2.6, 3.1, -1.4, 2.2];
const FROM = ["rotate(-9deg)", "rotate(12deg)", "rotate(-12deg)", "rotate(6deg)"];

/** The looping stack of dark notification cards that sits over the hero phone. */
export function HeroCards() {
  const [step, setStep] = useState(0);
  const [swapped, setSwapped] = useState(false);
  const [typed, setTyped] = useState(0);
  const [reduced, setReduced] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const index = step % hero.cards.length;
  const card = hero.cards[index];
  const prevIndex = (step - 1 + hero.cards.length) % hero.cards.length;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Advance the loop only while the stage is on screen.
  useEffect(() => {
    if (reduced) return;
    const el = stageRef.current;
    if (!el) return;
    let visible = false;
    let timers: number[] = [];
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const run = () => {
      clear();
      setSwapped(false);
      setTyped(0);
      if (card.kind === "answer") {
        for (let i = 1; i <= card.answer.length; i++) {
          timers.push(window.setTimeout(() => setTyped(i), TYPE_START + i * TYPE_STEP));
        }
      } else {
        timers.push(window.setTimeout(() => setSwapped(true), SWAP_AT));
      }
      timers.push(window.setTimeout(() => setStep((s) => s + 1), CYCLE));
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        visible = true;
        run();
      } else if (!entry.isIntersecting && visible) {
        visible = false;
        clear();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, [step, card, reduced]);

  return (
    <div ref={stageRef} className={styles.stage} aria-live="off">
      {step > 0 && !reduced ? (
        <div
          key={`leave-${step}`}
          className={`${styles.card} ${styles.leave}`}
          style={{ "--tilt": `${TILTS[prevIndex]}deg` } as CSSProperties}
          aria-hidden="true"
        >
          <CardBody card={hero.cards[prevIndex]} swapped typed={999} />
        </div>
      ) : null}
      <div
        key={`arrive-${step}`}
        className={`${styles.card} ${reduced ? "" : styles.arrive}`}
        style={{ "--tilt": `${TILTS[index]}deg`, "--from": `translate3d(0, -48px, 0) ${FROM[index]}` } as CSSProperties}
      >
        <CardBody card={card} swapped={swapped || reduced} typed={reduced ? 999 : typed} />
      </div>
    </div>
  );
}

function Dots() {
  return (
    <span className={styles.dots} aria-hidden="true">
      <i>·</i>
      <i>·</i>
      <i>·</i>
    </span>
  );
}

function CardBody({ card, swapped, typed }: { card: Card; swapped: boolean; typed: number }) {
  if (card.kind === "answer") {
    const text = card.answer.slice(0, typed);
    const typing = typed < card.answer.length;
    return (
      <div className={styles.shell}>
        <div className={styles.head}>
          <Mascot width="7.4cqw" seed={7} />
          <span>found it</span>
        </div>
        <p className={styles.title}>{card.question}</p>
        <p className={styles.detail}>
          {text || <Dots />}
          {typed > 0 && typing ? <span className={styles.caret} /> : null}
        </p>
        <div className={styles.actions}>
          <span className={styles.btnBlue}>open</span>
          <span className={styles.btnDark}>{card.action}</span>
        </div>
      </div>
    );
  }

  if (card.kind === "listen") {
    return (
      <div className={styles.shell}>
        {swapped ? (
          <div key="b" className={styles.swap}>
            <div className={styles.head}>
              <Mascot width="7.4cqw" seed={8} mood="happy" />
              <span>saved just now</span>
            </div>
            <p className={styles.title}>{card.title}</p>
            <p className={styles.detail}>{card.body}</p>
          </div>
        ) : (
          <div className={styles.listen}>
            <Mascot width="11cqw" seed={9} />
            <span className={styles.waves}>)))</span>
            <div>
              <p className={styles.title}>
                {card.label} <Dots />
              </p>
              <p className={styles.detail}>{card.sub}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (card.kind === "work") {
    return (
      <div className={styles.shell}>
        <div className={styles.head}>
          <Mascot width="7.4cqw" seed={10} mood={swapped ? "happy" : "smile"} />
          {swapped ? (
            <span key="done" className={styles.swap}>
              {card.done}
            </span>
          ) : (
            <span>
              {card.label} <Dots />
            </span>
          )}
        </div>
        <p className={styles.title}>{card.title}</p>
        <p className={styles.detail}>{card.body}</p>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <div className={styles.head}>
        <Mascot width="7.4cqw" seed={11} mood={swapped ? "happy" : "smile"} />
        {swapped ? (
          <span key="done" className={`${styles.swap} ${styles.doneLabel}`}>
            ✓ {card.done}
          </span>
        ) : (
          <span>{card.label}</span>
        )}
      </div>
      <p className={styles.title}>{card.title}</p>
      <p className={styles.detail}>{card.body}</p>
      {swapped ? null : (
        <div className={styles.actions}>
          <span className={styles.btnBlue}>{card.yes}</span>
          <span className={styles.btnDark}>{card.no}</span>
        </div>
      )}
    </div>
  );
}
