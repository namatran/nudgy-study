"use client";

import { useRef } from "react";
import { Mascot } from "@/components/ui/Mascot/Mascot";
import { ScrollWords } from "@/components/ui/ScrollWords/ScrollWords";
import { manifesto } from "@/data/content";
import styles from "./Manifesto.module.css";

/** Big scroll-lit paragraph on a 240vh sticky track; inline clouds dance when it's done. */
export function Manifesto() {
  const trackRef = useRef<HTMLDivElement>(null);
  return (
    <section className={styles.section}>
      <div ref={trackRef} className={styles.track}>
        <div className={styles.sticky}>
          <p className={styles.text}>
            <ScrollWords
              track={trackRef}
              runs={[
                { text: manifesto.first, tone: "soft" },
                { text: manifesto.second, tone: "ink" },
              ]}
              insert={{
                after: manifesto.insertAfter,
                node: (
                  <span className={styles.crew} aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className={styles.dancer} data-dance="">
                        <Mascot tone="dark" width="100%" seed={80 + i} mood={i === 1 ? "happy" : "smile"} />
                      </span>
                    ))}{" "}
                  </span>
                ),
              }}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
