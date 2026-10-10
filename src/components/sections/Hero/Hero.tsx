import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Mascot, type MascotMood, type MascotProp } from "@/components/ui/Mascot/Mascot";
import { Phone } from "@/components/ui/Phone/Phone";
import { HomeScreen } from "@/components/ui/Screens/HomeScreen";
import { hero } from "@/data/content";
import { HeroCards } from "./HeroCards";
import styles from "./Hero.module.css";

// Positions, tilts and delays measured on the original (DESIGN-REFS §1, §7.2).
const FLOATERS: {
  cls: string;
  tilt: number;
  delay: number;
  width: number;
  mood: MascotMood;
  prop: MascotProp;
  act?: "idle" | "nod" | "hop" | "sway";
}[] = [
  { cls: "f1", tilt: -6, delay: 0, width: 176, mood: "smile", prop: "phone" },
  { cls: "f2", tilt: 8, delay: 0.8, width: 144, mood: "sleepy", prop: "headphones", act: "nod" },
  { cls: "f3", tilt: -4, delay: 1.6, width: 128, mood: "happy", prop: "notes", act: "sway" },
  { cls: "f4", tilt: 6, delay: 2.2, width: 128, mood: "wow", prop: "sparkles", act: "hop" },
];

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {FLOATERS.map((f, i) => (
        <div
          key={f.cls}
          className={`${styles.float} ${styles.pop} ${styles[f.cls]}`}
          style={{ "--tilt": `${f.tilt}deg`, "--delay": `${f.delay}s`, width: f.width } as CSSProperties}
          aria-hidden="true"
        >
          <Mascot width="100%" mood={f.mood} prop={f.prop} act={f.act} seed={i + 20} />
        </div>
      ))}

      {hero.notes.map((n, i) => (
        <div
          key={n.title}
          className={`${styles.float} ${styles.pop} ${styles.note} ${styles[`n${i + 1}`]}`}
          style={{ "--tilt": `${i ? 3 : -4}deg`, "--delay": `${i ? 1.1 : 0.9}s` } as CSSProperties}
          aria-hidden="true"
        >
          <p className={styles.noteHead}>
            <span>{n.title}</span>
            <span className={styles.noteTime}>{n.time}</span>
          </p>
          <p className={styles.noteBody}>{n.body}</p>
        </div>
      ))}

      <p
        className={`${styles.float} ${styles.pop} ${styles.aside}`}
        style={{ "--tilt": "-8deg", "--delay": "1.4s" } as CSSProperties}
        aria-hidden="true"
      >
        {hero.aside}
      </p>

      <div className={styles.inner}>
        <h1 className={`${styles.title} ${styles.pop}`} style={{ "--delay": "0.05s" } as CSSProperties}>
          {hero.titleLine1}
          <Mascot width="0.84em" className={styles.titleMascot} seed={3} />
          <br />
          {hero.titleLine2}
        </h1>
        <p className={`${styles.sub} ${styles.pop}`} style={{ "--delay": "0.18s" } as CSSProperties}>
          {hero.sub}
        </p>
        <div className={`${styles.ctas} ${styles.pop}`} style={{ "--delay": "0.3s" } as CSSProperties}>
          <div className={styles.ctaCol}>
            <ButtonLink href={hero.primary.href} variant="pill3d" icon="laptop">
              {hero.primary.label}
            </ButtonLink>
            <p className={styles.micro}>{hero.micro}</p>
          </div>
          <ButtonLink href={hero.secondary.href} variant="ghost" icon="phone">
            {hero.secondary.label}
          </ButtonLink>
        </div>

        <figure className={`${styles.device} ${styles.pop}`} style={{ "--delay": "0.45s" } as CSSProperties}>
          <Phone>
            <HomeScreen />
          </Phone>
          <HeroCards />
        </figure>
      </div>
    </section>
  );
}
