import { ButtonLink } from "@/components/ui/Button/Button";
import { Mascot } from "@/components/ui/Mascot/Mascot";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { ScrollWords } from "@/components/ui/ScrollWords/ScrollWords";
import { closing } from "@/data/content";
import styles from "./Closing.module.css";

/** Closing call to action on a pale radial "dome". */
export function Closing() {
  return (
    <div className={styles.dome}>
      <Reveal rise={24}>
        <Mascot tone="light" mood="happy" prop="notes" act="sway" width={130} seed={120} className={styles.mascot} />
        <h2 className={styles.title}>
          <ScrollWords runs={closing.title} />
        </h2>
        <p className={styles.sub}>{closing.sub}</p>
        <div className={styles.ctas}>
          <div className={styles.ctaCol}>
            <ButtonLink href={closing.primary.href} variant="ink" icon="laptop">
              {closing.primary.label}
            </ButtonLink>
            <p className={styles.micro}>{closing.micro}</p>
          </div>
          <ButtonLink href={closing.secondary.href} variant="outline" icon="phone">
            {closing.secondary.label}
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
