import type { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Card.module.css";

type CardProps<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

/** White raised card: 22px radius, hairline border, soft drop shadow. */
export function Card<T extends ElementType = "div">({ as, className, ...rest }: CardProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag className={`${styles.card} ${className ?? ""}`} {...rest} />;
}
