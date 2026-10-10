import { Phone } from "@/components/ui/Phone/Phone";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { ScrollWords } from "@/components/ui/ScrollWords/ScrollWords";
import { StoryScreen } from "@/components/ui/Screens/StoryScreens";
import { story, what } from "@/data/content";
import styles from "./WhatItDoes.module.css";

/**
 * "How it works" intro. Below 768px (or with reduced motion) it also carries the
 * stacked version of the phone story; the sticky version takes over above that.
 */
export function WhatItDoes() {
  return (
    <section id="what" className={styles.section}>
      <Reveal className={styles.head}>
        <p className={styles.eyebrow}>{what.eyebrow}</p>
        <h2 className={styles.title}>
          <ScrollWords runs={what.title} />
        </h2>
        <p className={styles.sub}>{what.sub}</p>
      </Reveal>

      <ol className={styles.stack}>
        {story.steps.map((step) => (
          <li key={step.index} className={styles.step}>
            <Reveal className={styles.preview}>
              <p className={styles.previewLabel}>
                <span className={styles.recDot} aria-hidden="true" />
                {what.previewLabel}
              </p>
              <Phone width={270} className={styles.phone}>
                <StoryScreen screen={step.screen} />
              </Phone>
            </Reveal>
            <Reveal className={styles.copy} delay={0.06}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.tagline}>{step.tagline}</p>
              <p className={styles.body}>{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
