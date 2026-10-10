import { Icon } from "../Icon";
import { Mascot } from "../Mascot/Mascot";
import { hero } from "@/data/content";
import s from "./Screens.module.css";

const RING_COLORS = ["#7c8cff", "#2fd4a7", "#ff9f43"];
const RING_FILL = [0.62, 0.8, 0.3];

/** Invented puff home screen: rings, status, ask button, and a short list. */
export function HomeScreen() {
  const p = hero.phone;
  return (
    <div className={s.home}>
      <div className={s.homeSky}>
        <div className={s.homeTop}>
          <Icon name="gear" size={16} />
          <span className={s.homeDate}>
            <Icon name="sun" size={13} /> {p.date}
          </span>
          <Icon name="mic" size={16} />
        </div>
        <div className={s.rings}>
          {p.rings.map((r, i) => (
            <div key={r.label} className={s.ring}>
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="32" r="27" fill="none" stroke="rgb(255 255 255 / 0.22)" strokeWidth="5" />
                <circle
                  cx="32"
                  cy="32"
                  r="27"
                  fill="none"
                  stroke={RING_COLORS[i]}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${RING_FILL[i] * 169.6} 169.6`}
                  transform="rotate(-90 32 32)"
                />
              </svg>
              <span className={s.ringValue}>{r.value}</span>
              <span className={s.ringLabel}>{r.label}</span>
            </div>
          ))}
        </div>
        <p className={s.homeStatus}>{p.status}</p>
        <p className={s.homeStatusSub}>{p.statusSub}</p>
        <span className={s.homePause}>{p.pause}</span>
        <span className={s.homeAsk}>{p.ask}</span>
      </div>
      <p className={s.homeListTitle}>{p.listTitle}</p>
      <ul className={s.homeList}>
        {p.list.map((item) => (
          <li key={item.title}>
            <span className={s.homeItemTitle}>
              <Icon name="list" size={11} /> {item.title}
            </span>
            <span className={s.homeItemTime}>{item.time}</span>
            <span className={s.homeItemBody}>{item.body}</span>
          </li>
        ))}
      </ul>
      <div className={s.homeTabs}>
        <span>
          <Icon name="bars" size={16} />
          week
        </span>
        <Mascot tone="dark" width={66} seed={4} />
        <span>
          <Icon name="brain" size={16} />
          forecast
        </span>
      </div>
    </div>
  );
}
