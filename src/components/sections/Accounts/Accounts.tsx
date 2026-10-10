import { HandArrow, HandCircle } from "@/components/ui/HandDrawn/HandDrawn";
import { NotifCard } from "@/components/ui/NotifCard/NotifCard";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { accounts } from "@/data/content";
import styles from "./Accounts.module.css";

const CHIP_TILT = [-2, 1.5, 1, -1.5];

/** Connected calendars: copy on the left, chips → arrow → dark card on the right. */
export function Accounts() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <Reveal className={styles.copy}>
          <p className={styles.eyebrow}>{accounts.eyebrow}</p>
          <h3 className={styles.title}>{accounts.title}</h3>
          <p className={styles.line}>
            {accounts.linePre} <HandCircle delay={0.5}>{accounts.lineCircled}</HandCircle>
            {accounts.linePost}
          </p>
        </Reveal>
        <Reveal className={styles.demo} delay={0.1}>
          <ul className={styles.chips}>
            {accounts.chips.map((c, i) => (
              <li key={c} className={styles.chip} style={{ transform: `rotate(${CHIP_TILT[i]}deg)` }}>
                {c}
              </li>
            ))}
          </ul>
          <HandArrow className={styles.arrow} />
          <NotifCard {...accounts.card} />
        </Reveal>
      </div>
    </section>
  );
}
