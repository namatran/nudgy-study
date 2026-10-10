import { Accordion } from "@/components/ui/Accordion/Accordion";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { ScrollWords } from "@/components/ui/ScrollWords/ScrollWords";
import { faq } from "@/data/content";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <section id="faq" className={styles.section}>
      <Reveal className={styles.head}>
        <p className={styles.eyebrow}>{faq.eyebrow}</p>
        <h2 className={styles.title}>
          <ScrollWords runs={faq.title} />
        </h2>
      </Reveal>
      <Reveal className={styles.list} delay={0.06}>
        <Accordion items={faq.items} />
      </Reveal>
      <p className={styles.more}>
        {faq.moreTitle}{" "}
        {faq.moreLinks.map((l, i) => (
          <span key={l.label}>
            {i > 0 ? " or " : null}
            <a href={l.href} className={styles.moreLink}>
              {l.label}
            </a>
          </span>
        ))}
        .
      </p>
    </section>
  );
}
