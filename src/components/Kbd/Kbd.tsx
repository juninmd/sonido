import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import "./Kbd.css";

/** Tecla de atalho. Ex.: `<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>`. */
export function Kbd({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  return <kbd className={cx("sn-kbd", className)} {...rest} />;
}
