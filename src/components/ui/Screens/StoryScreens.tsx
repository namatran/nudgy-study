import { Icon } from "../Icon";
import { Mascot } from "../Mascot/Mascot";
import { screens, type StoryStep } from "@/data/content";
import s from "./StoryScreens.module.css";

/** The four invented screens shown in the phone story. */
export function StoryScreen({ screen }: { screen: StoryStep["screen"] }) {
  if (screen === "today") return <TodayScreen />;
  if (screen === "lock") return <LockScreen />;
  if (screen === "forecast") return <ForecastScreen />;
  return <LetGoScreen />;
}

function TodayScreen() {
  const t = screens.today;
  return (
    <div className={`${s.screen} ${s.skyScreen}`}>
      <Icon name="arrowLeft" size={18} className={s.back} />
      <p className={s.bigTitle}>{t.title}</p>
      <div className={s.dateRow}>
        <Icon name="arrowLeft" size={14} />
        <span>{t.date}</span>
        <Icon name="arrowRight" size={14} className={s.dim} />
      </div>
      <p className={s.handLabel}>{t.upcoming}</p>
      {t.items.map((i) => (
        <div key={i.title} className={s.glassItem}>
          <span className={s.glassTitle}>
            <Icon name="list" size={11} /> {i.title}
          </span>
          <span className={s.glassTime}>{i.time}</span>
          <span className={s.glassQuote}>{i.quote}</span>
        </div>
      ))}
      <p className={s.handLabel}>{t.dayTitle}</p>
      <ul className={s.dayList}>
        {t.day.map((d) => (
          <li key={d.title}>
            <span>{d.title}</span>
            <span className={s.dayTime}>{d.time}</span>
          </li>
        ))}
      </ul>
      <div className={s.todayFoot}>
        <span className={s.handSmall}>{t.footer}</span>
        <span>{t.footerLink}</span>
      </div>
      <div className={s.askBar}>
        <span>{t.ask}</span>
        <Icon name="waves" size={14} />
      </div>
    </div>
  );
}

function LockScreen() {
  const l = screens.lock;
  return (
    <div className={`${s.screen} ${s.lockScreen}`}>
      <p className={s.lockDate}>{l.date}</p>
      <p className={s.lockTime}>{l.time}</p>
      <div className={s.lockCard}>
        <div className={s.lockHead}>
          <Mascot width={26} seed={31} />
          <span>{l.card.label}</span>
        </div>
        <p className={s.lockQ}>{l.card.question}</p>
        <p className={s.lockA}>{l.card.answer}</p>
        <div className={s.lockBtns}>
          <span className={s.lockOpen}>{l.card.open}</span>
          <span className={s.lockOk}>{l.card.ok}</span>
        </div>
      </div>
      <div className={s.lockDock}>
        <span>
          <Icon name="sun" size={16} />
        </span>
        <span>
          <Icon name="camera" size={16} />
        </span>
      </div>
    </div>
  );
}

function ForecastScreen() {
  const f = screens.forecast;
  const heights = [
    [0.5, 0.3, 0.2],
    [0.7, 0.2, 0.1],
    [0.3, 0.4, 0.3],
    [0.4, 0.2, 0.4],
    [0.8, 0.15, 0.05],
    [0.6, 0.3, 0.1],
    [0.9, 0.1, 0],
  ];
  return (
    <div className={`${s.screen} ${s.paperScreen}`}>
      <Icon name="arrowLeft" size={18} className={s.backInk} />
      <div className={s.card}>
        <p className={s.cardTitle}>{f.title}</p>
        <p className={s.meta}>{f.stats}</p>
        <div className={s.weather}>
          {f.days.map((d, i) => (
            <div key={i} className={s.weatherCol}>
              <div className={s.weatherBar}>
                <i style={{ flex: heights[i][2], background: "#8e7cff" }} />
                <i style={{ flex: heights[i][1], background: "#b9c6d6" }} />
                <i style={{ flex: heights[i][0], background: "#ffc857" }} />
              </div>
              <span>{d}</span>
            </div>
          ))}
        </div>
        <div className={s.legend}>
          {f.legend.map((l, i) => (
            <span key={l}>
              <i style={{ background: ["#ffc857", "#b9c6d6", "#8e7cff"][i] }} />
              {l}
            </span>
          ))}
        </div>
      </div>
      <div className={s.card}>
        <p className={s.cardTitle}>{f.sharpTitle}</p>
        <p className={s.cardBody}>{f.sharpBody}</p>
      </div>
      <div className={s.card}>
        <p className={s.cardTitle}>{f.recurringTitle}</p>
        {f.recurring.map((r) => (
          <div key={r.title} className={s.recurring}>
            <p className={s.cardBody}>{r.title}</p>
            <p className={s.meta}>{r.quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LetGoScreen() {
  const g = screens.letgo;
  return (
    <div className={`${s.screen} ${s.paperScreen}`}>
      <div className={s.letgoSky}>
        <Mascot width={90} seed={33} mood="happy" />
      </div>
      <p className={s.handLabelInk}>{g.title}</p>
      {g.items.map((i) => (
        <div key={i.title} className={`${s.card} ${"gone" in i && i.gone ? s.gone : ""}`}>
          <div className={s.rowBetween}>
            <span className={s.itemTitle}>{i.title}</span>
            <span className={s.meta}>{i.time}</span>
          </div>
          <p className={s.cardHand}>{i.body}</p>
          {"hint" in i && i.hint ? <p className={s.hint}>{i.hint}</p> : null}
          {"action" in i && i.action ? (
            <span className={s.action}>
              <Icon name="bell" size={12} /> {i.action}
            </span>
          ) : null}
        </div>
      ))}
      <div className={s.tabs}>
        <span>
          <Icon name="bars" size={16} />
          {g.tabs[0]}
        </span>
        <Mascot tone="dark" width={60} seed={34} />
        <span>
          <Icon name="brain" size={16} />
          {g.tabs[1]}
        </span>
      </div>
    </div>
  );
}
