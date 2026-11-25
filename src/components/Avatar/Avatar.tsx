import { type CSSProperties, type HTMLAttributeReferrerPolicy, type ReactNode, useState } from "react";
import { cx } from "../../utils/cx";
import { hueFrom, initials } from "../../utils/hue";
import "./Avatar.css";

export interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  /** Ponto de presença. */
  status?: "online" | "away" | "busy" | "offline";
  /** Anel em gradiente (história/destaque). */
  ring?: boolean;
  /** Repassado ao `<img>`, ex.: `"no-referrer"` para CDNs que bloqueiam hotlink. */
  referrerPolicy?: HTMLAttributeReferrerPolicy;
  className?: string;
}

const STATUS_LABEL = { online: "online", away: "ausente", busy: "ocupado", offline: "offline" };

/** Foto ou iniciais com cor estável derivada do nome. */
export function Avatar({ name, src, size = 40, status, ring, referrerPolicy, className }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const style = { "--sn-av-size": `${size}px`, "--sn-av-h": hueFrom(name) } as CSSProperties;
  return (
    <span className={cx("sn-avatar", ring && "sn-avatar--ring", className)} style={style}>
      <span className="sn-avatar__img">
        {src && !failed ? (
          <img src={src} alt={name} referrerPolicy={referrerPolicy} onError={() => setFailed(true)} />
        ) : (
          <span role="img" aria-label={name}>
            {initials(name)}
          </span>
        )}
      </span>
      {status && <span className={`sn-avatar__status sn-avatar__status--${status}`} title={STATUS_LABEL[status]} />}
    </span>
  );
}

export interface AvatarGroupProps {
  children: ReactNode;
  /** Quantos aparecem antes do "+N". */
  max?: number;
  size?: number;
  className?: string;
}

/** Avatares sobrepostos com contador do excedente. */
export function AvatarGroup({ children, max = 4, size = 36, className }: AvatarGroupProps) {
  const list = (Array.isArray(children) ? children : [children]).filter(Boolean);
  const extra = list.length - max;
  return (
    <span className={cx("sn-avatar-group", className)} style={{ ["--sn-av-size" as string]: `${size}px` }}>
      {list.slice(0, max)}
      {extra > 0 && <span className="sn-avatar-group__more">+{extra}</span>}
    </span>
  );
}
