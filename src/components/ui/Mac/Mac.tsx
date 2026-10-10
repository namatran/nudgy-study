import { Mascot } from "../Mascot/Mascot";
import { story } from "@/data/content";
import styles from "./Mac.module.css";

/**
 * Flat MacBook mockup. When `active`, the notch panel drops down with a card
 * (the original's mac-prompt-in: 420ms ease-out from translateY(18px) scale(.98)).
 */
export function Mac({ active = true, className }: { active?: boolean; className?: string }) {
  const n = story.mac.notch;
  return (
    <figure className={`${styles.mac} ${className ?? ""}`} data-active={active ? "" : undefined} aria-hidden="true">
      <div className={styles.lid}>
        <div className={styles.screen}>
          <div className={styles.menubar}>
            <span className={styles.notchCap}>
              <Mascot width="2.2cqw" seed={41} />
              <span className={styles.level}>
                <i />
                <i />
                <i />
              </span>
            </span>
          </div>
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <Mascot width="4.6cqw" seed={42} />
              <span>
                <b>{n.status}</b>
                <small>{n.statusSub}</small>
              </span>
              <span className={styles.toggle} />
            </div>
            <div className={styles.panelCard}>
              <p className={styles.panelTitle}>{n.title}</p>
              <p className={styles.panelBody}>{n.body}</p>
              <div className={styles.panelBtns}>
                <span className={styles.yes}>{n.yes}</span>
                <span className={styles.no}>{n.no}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.base}>
        <span className={styles.thumb} />
      </div>
    </figure>
  );
}
