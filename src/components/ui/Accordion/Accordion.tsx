import styles from "./Accordion.module.css";

type AccordionProps = { items: readonly { q: string; a: string }[] };

/**
 * Native <details> accordion, like the original: answer opens instantly,
 * the "+" turns 45° over 200ms. Works without JavaScript.
 */
export function Accordion({ items }: AccordionProps) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.q} className={styles.item}>
          <summary className={styles.summary}>
            {item.q}
            <span className={styles.plus} aria-hidden="true">
              +
            </span>
          </summary>
          <p className={styles.answer}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
