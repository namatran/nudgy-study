import { Mascot } from "../Mascot/Mascot";
import styles from "./NotifCard.module.css";

type NotifCardProps = { meta: string; title: string; body: string; action: string; tilt?: number };

/** Dark notification card used in the accounts and privacy demos (radius 26, slight tilt). */
export function NotifCard({ meta, title, body, action, tilt = -1.5 }: NotifCardProps) {
  return (
    <div className={styles.card} style={{ transform: `rotate(${tilt}deg)` }}>
      <p className={styles.meta}>
        <Mascot width={34} seed={71} />
        {meta}
      </p>
      <p className={styles.title}>{title}</p>
      <p className={styles.body}>{body}</p>
      <p className={styles.action}>{action}</p>
    </div>
  );
}
