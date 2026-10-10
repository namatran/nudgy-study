import { Mac } from "@/components/ui/Mac/Mac";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { story } from "@/data/content";
import styles from "./MacSection.module.css";

/** Static Mac step, used where the sticky story is off (below 768px or reduced motion). */
export function MacSection() {
  const m = story.mac;
  return (
    <section id="mac" className={styles.section}>
      <Reveal className={styles.copy}>
        <p className={styles.eyebrow}>{m.label}</p>
        <h2 className={styles.title}>{m.title}</h2>
        <p className={styles.tagline}>{m.tagline}</p>
        <p className={styles.body}>{m.body}</p>
      </Reveal>
      <Reveal delay={0.1} className={styles.device}>
        <Mac />
      </Reveal>
    </section>
  );
}
