"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Mascot } from "@/components/ui/Mascot/Mascot";
import { nav, site } from "@/data/content";
import styles from "./Header.module.css";

/**
 * Fixed header. Slides away while scrolling down and returns on scroll up;
 * a floating 3D pill takes its place while it's hidden (DESIGN-REFS §7.5–7.6).
 */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [onSky, setOnSky] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const hero = document.getElementById("hero");
      setOnSky(hero ? y < hero.offsetHeight - 120 : false);
      const delta = y - lastY;
      if (y < 120) setHidden(false);
      else if (delta > 4) setHidden(true);
      else if (delta < -4) setHidden(false);
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header className={styles.header} data-hidden={hidden ? "" : undefined} data-on-sky={onSky ? "" : undefined}>
        <a href="#hero" className={styles.logo} aria-label={`${site.brand}, back to top`}>
          <Mascot tone={onSky ? "light" : "dark"} width={50} seed={1} />
          <span>{site.brand}</span>
        </a>

        <nav className={styles.pill} aria-label="Main">
          {nav.links.map((l) => (
            <a key={l.label} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
          <ButtonLink href={nav.cta.href} variant="ink" size="nav" className={styles.cta}>
            {nav.cta.label}
          </ButtonLink>
        </nav>

        <ButtonLink href={nav.cta.href} variant="ink" size="nav" className={styles.mobileCta}>
          {nav.cta.label}
        </ButtonLink>
      </header>

      <ButtonLink
        href={nav.cta.href}
        variant="pill3d"
        size="sm"
        className={styles.floating}
        data-shown={hidden ? "" : undefined}
        aria-hidden={!hidden}
        tabIndex={hidden ? 0 : -1}
      >
        {nav.floatingCta}
      </ButtonLink>
    </>
  );
}
