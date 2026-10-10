"use client";

import { useState, type CSSProperties } from "react";
import { Card } from "@/components/ui/Card/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Mascot } from "@/components/ui/Mascot/Mascot";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { ShelfArt } from "@/components/ui/ShelfArt";
import { board } from "@/data/content";
import styles from "./Board.module.css";

// Unit vectors for the arc, −160° … −20° (DESIGN-REFS §7.13).
const ARC: [number, number][] = [
  [-0.94, -0.342],
  [-0.727, -0.686],
  [-0.396, -0.918],
  [0, -1],
  [0.396, -0.918],
  [0.727, -0.686],
  [0.94, -0.342],
];

type Item = (typeof board.items)[number];

/** "The shelf": tap-to-fan-out ways in, a filterable masonry shelf, and a chat demo. */
export function Board() {
  const [open, setOpen] = useState(true);
  const [picked, setPicked] = useState<string | null>(null);

  const hint = !open ? board.hintClosed : picked ? board.ways.find((w) => w.id === picked)?.hint : board.hintOpen;

  return (
    <section id="give" className={styles.section}>
      <div className={styles.grid}>
        <Reveal className={styles.intro}>
          <p className={styles.eyebrow}>{board.eyebrow}</p>
          <h2 className={styles.title}>{board.title}</h2>
          <p className={styles.body}>{board.body}</p>
        </Reveal>

        <Reveal className={styles.boardCol} delay={0.1}>
          <Card className={styles.board}>
            <div className={styles.fan}>
              <div className={styles.hub}>
                {board.ways.map((w, i) => {
                  const [dx, dy] = ARC[i];
                  const style = {
                    transform: open
                      ? `translate(-50%, -50%) translate(calc(${dx} * var(--r)), calc(${dy} * var(--r)))`
                      : "translate(-50%, -50%) scale(0.2)",
                    opacity: open ? 1 : 0,
                    transitionDelay: open ? `${i * 35}ms` : "0ms",
                  } as CSSProperties;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      className={styles.way}
                      style={style}
                      aria-label={w.label}
                      aria-pressed={picked === w.id}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setPicked((p) => (p === w.id ? null : w.id))}
                    >
                      <span className={styles.wayDot} style={{ background: w.color, color: w.ink }}>
                        <Icon name={w.icon as IconName} size={24} />
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                className={styles.toggle}
                aria-expanded={open}
                aria-label={open ? board.toggleOpen : board.toggleClosed}
                onClick={() => {
                  setOpen((o) => !o);
                  setPicked(null);
                }}
              >
                <Mascot tone="dark" width={92} seed={61} mood={open ? "happy" : "smile"} />
              </button>
            </div>
            <p className={styles.hint} aria-live="polite">
              {hint}
            </p>

            <div className={styles.shelfHead}>
              <p className={styles.shelfTitle}>{board.shelfTitle}</p>
              <p className={styles.shelfMeta}>{board.shelfMeta}</p>
            </div>
            <div className={styles.shelf}>
              {board.items.map((item) => (
                <ShelfItem key={item.id} item={item} dim={picked !== null && item.source !== picked} />
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal className={styles.chatCol} delay={0.15}>
          <div className={styles.chat}>
            <p className={styles.ask}>{board.chat.question}</p>
            <div className={styles.replyRow}>
              <Mascot tone="dark" width={58} seed={62} />
              <Card className={styles.reply}>
                <div className={styles.thumb} style={{ background: "#e9e3d3" }}>
                  <ShelfArt art="lamp" />
                </div>
                <p className={styles.replyText}>{board.chat.answer}</p>
              </Card>
            </div>
          </div>
          <p className={styles.fine}>
            {board.fine}{" "}
            <a href={board.fineLink.href} className={styles.fineLink}>
              {board.fineLink.label}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ShelfItem({ item, dim }: { item: Item; dim: boolean }) {
  const cls = `${styles.item} ${dim ? styles.dim : ""}`;
  if (item.kind === "image") {
    return (
      <Card className={`${cls} ${styles.imageItem}`}>
        <div className={styles.art} style={{ background: item.tone, aspectRatio: item.ratio }}>
          <ShelfArt art={item.art} />
          <span className={styles.tag}>{board.drawnTag}</span>
        </div>
        <div className={styles.caption}>
          <p>{item.caption}</p>
          {"sub" in item ? <p className={styles.captionSub}>{item.sub}</p> : null}
        </div>
      </Card>
    );
  }
  if (item.kind === "note") {
    return (
      <Card className={`${cls} ${styles.noteItem}`}>
        <p>{item.text}</p>
      </Card>
    );
  }
  if (item.kind === "voice") {
    return (
      <div className={`${cls} ${styles.voiceItem}`}>
        <Icon name="waves" size={18} />
        <p className={styles.voiceText}>{item.text}</p>
        <p className={styles.captionSub}>{item.sub}</p>
      </div>
    );
  }
  return (
    <Card className={`${cls} ${styles.fileItem}`}>
      <span className={styles.fileIcon}>
        <Icon name="doc" size={20} />
      </span>
      <span>
        <span className={styles.fileName}>{item.caption}</span>
        <span className={styles.captionSub}>{item.sub}</span>
      </span>
    </Card>
  );
}
