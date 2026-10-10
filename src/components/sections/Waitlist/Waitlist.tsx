"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { Mascot } from "@/components/ui/Mascot/Mascot";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { ScrollWords } from "@/components/ui/ScrollWords/ScrollWords";
import { waitlist } from "@/data/content";
import styles from "./Waitlist.module.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Waitlist form. Nothing is sent anywhere: submitting only shows a local thank-you state. */
export function Waitlist() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  };

  return (
    <section id="invite" className={styles.section}>
      <div className={styles.grid}>
        <Reveal className={styles.copy}>
          <p className={styles.eyebrow}>{waitlist.eyebrow}</p>
          <h2 className={styles.title}>
            <ScrollWords runs={[{ text: waitlist.title }]} />
          </h2>
          <p className={styles.body}>{waitlist.body}</p>
        </Reveal>

        <Reveal delay={0.1} className={styles.cardWrap}>
          <Card className={styles.card}>
            <div aria-live="polite">
              {done ? (
                <div className={styles.thanks}>
                  <Mascot tone="dark" mood="happy" act="hop" width={84} seed={91} />
                  <p className={styles.thanksTitle}>{waitlist.thanksTitle}</p>
                  <p className={styles.note}>{waitlist.thanksBody}</p>
                  <button
                    type="button"
                    className={styles.again}
                    onClick={() => {
                      setDone(false);
                      setEmail("");
                    }}
                  >
                    {waitlist.again}
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <label htmlFor={`${id}-email`} className={styles.label}>
                    {waitlist.label}
                  </label>
                  <div className={styles.row}>
                    <input
                      id={`${id}-email`}
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder={waitlist.placeholder}
                      className={styles.input}
                      value={email}
                      aria-invalid={error}
                      aria-describedby={`${id}-note`}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(false);
                      }}
                    />
                    <Button type="submit" variant="ink" className={styles.submit}>
                      {waitlist.button}
                    </Button>
                  </div>
                  <p id={`${id}-note`} className={`${styles.note} ${error ? styles.error : ""}`}>
                    {error ? waitlist.invalid : waitlist.note}
                  </p>
                </form>
              )}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
