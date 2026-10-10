import { footer, site } from "@/data/content";
import { Closing } from "../Closing/Closing";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Closing />
      <div className={styles.grid}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>{site.brand}</p>
          <p className={styles.blurb}>{footer.blurb}</p>
          <p className={styles.blurb}>
            {footer.feedbackPre}{" "}
            <a href={footer.feedbackLink.href} className={styles.inline}>
              {footer.feedbackLink.label}
            </a>{" "}
            {footer.feedbackMid}{" "}
            <a href={footer.feedbackBoard.href} className={styles.inline}>
              {footer.feedbackBoard.label}
            </a>
            .
          </p>
        </div>
        {footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className={styles.colTitle}>{col.title}</h3>
            <ul className={styles.links}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={styles.link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={styles.bottom}>
        <p>{footer.copyright}</p>
        <p className={styles.disclaimer}>{footer.disclaimer}</p>
      </div>
    </footer>
  );
}
