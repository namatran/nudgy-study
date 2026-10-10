import { Card } from "@/components/ui/Card/Card";
import { HandArrow, HandCircle } from "@/components/ui/HandDrawn/HandDrawn";
import { Mascot, type MascotMood } from "@/components/ui/Mascot/Mascot";
import { NotifCard } from "@/components/ui/NotifCard/NotifCard";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { ScrollWords } from "@/components/ui/ScrollWords/ScrollWords";
import { privacy } from "@/data/content";
import styles from "./Privacy.module.css";

/** Values grid (2×2) plus two wide cards with small demos. */
export function Privacy() {
  const { improve: share, forget: clear } = privacy;
  return (
    <section id="privacy" className={styles.section}>
      <Reveal className={styles.head}>
        <p className={styles.eyebrow}>{privacy.eyebrow}</p>
        <h2 className={styles.title}>
          <ScrollWords runs={privacy.title} />
        </h2>
      </Reveal>

      <div className={styles.grid}>
        {privacy.cards.map((c, i) => (
          <Reveal key={c.title} delay={[0, 0.06, 0.12, 0.18][i]}>
            <Card className={styles.card}>
              <Mascot tone="dark" mood={c.mood as MascotMood} width={72} seed={100 + i} className={styles.icon} />
              <div>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardBody}>{c.body}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal className={styles.wideWrap}>
        <Card className={styles.wide}>
          <div className={styles.wideCopy}>
            <Mascot tone="dark" mood="smile" width={72} seed={110} className={styles.icon} />
            <div>
              <p className={styles.wideEyebrow}>{share.eyebrow}</p>
              <h3 className={styles.wideTitle}>{share.title}</h3>
              <p className={styles.cardBody}>{share.body}</p>
            </div>
          </div>
          <figure className={styles.demo}>
            <p className={styles.demoLabel}>{share.saidLabel}</p>
            <p className={styles.demoQuote}>{share.said}</p>
            <HandArrow className={styles.demoArrow} />
            <p className={styles.demoLabel}>{share.keptLabel}</p>
            <p className={styles.demoKept}>
              {share.keptParts.map((part, i) =>
                i % 2 === 1 ? (
                  <span key={i} className={styles.token}>
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </p>
            <p className={styles.demoLine}>
              {share.linePre} <HandCircle>{share.lineCircled}</HandCircle>
              {share.linePost}
            </p>
          </figure>
        </Card>
      </Reveal>

      <Reveal className={styles.wideWrap}>
        <Card className={styles.wide}>
          <div className={styles.wideCopy}>
            <Mascot tone="dark" mood="sleepy" width={72} seed={111} className={styles.icon} />
            <div>
              <p className={styles.wideEyebrow}>{clear.eyebrow}</p>
              <h3 className={styles.wideTitle}>{clear.title}</h3>
              <p className={styles.cardBody}>{clear.body}</p>
            </div>
          </div>
          <figure className={styles.demo}>
            <p className={styles.demoLabel}>{clear.saidLabel}</p>
            <p className={styles.demoQuote}>{clear.said}</p>
            <HandArrow className={styles.demoArrow} />
            <NotifCard {...clear.card} tilt={-1.2} />
            <p className={styles.demoLine}>
              <HandCircle>{clear.lineCircled}</HandCircle>
              {clear.linePost}
            </p>
          </figure>
        </Card>
      </Reveal>

      <p className={styles.fine}>
        {privacy.finePre}{" "}
        <a href={privacy.fineLink.href} className={styles.fineLink}>
          {privacy.fineLink.label}
        </a>
        {privacy.finePost}
      </p>
    </section>
  );
}
