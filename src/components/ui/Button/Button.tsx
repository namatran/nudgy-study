import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon, type IconName } from "../Icon";
import styles from "./Button.module.css";

type Variant = "pill3d" | "ink" | "ghost" | "outline";
type Size = "md" | "sm" | "nav";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  children: ReactNode;
};

/** Link-styled button. Variants match DESIGN-REFS §6. */
export function ButtonLink({ variant = "ink", size = "md", icon, className, children, ...rest }: ButtonLinkProps) {
  return (
    <a className={`${styles.button} ${styles[variant]} ${styles[size]} ${className ?? ""}`} {...rest}>
      {icon ? <Icon name={icon} size={22} /> : null}
      <span>{children}</span>
    </a>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant = "ink", size = "md", className, ...rest }: ButtonProps) {
  return <button className={`${styles.button} ${styles[variant]} ${styles[size]} ${className ?? ""}`} {...rest} />;
}
