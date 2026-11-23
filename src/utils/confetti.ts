/** Explosão de confete a partir de um elemento (Web Animations; nada com reduced-motion). */
export function burst(from: Element, opts: { count?: number; colors?: string[] } = {}): void {
  if (typeof window === "undefined" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const css = getComputedStyle(document.documentElement);
  const colors =
    opts.colors ??
    ["--sn-sig-1", "--sn-sig-2", "--sn-sig-3", "--sn-color-gold", "--sn-color-aqua"].map(
      (v) => css.getPropertyValue(v).trim() || "#ff4d8d",
    );
  const r = from.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  for (let i = 0; i < (opts.count ?? 28); i++) {
    const p = document.createElement("i");
    const a = Math.random() * Math.PI * 2;
    const d = 60 + Math.random() * 110;
    const s = 5 + Math.random() * 5;
    Object.assign(p.style, {
      position: "fixed",
      left: `${cx}px`,
      top: `${cy}px`,
      width: `${s}px`,
      height: `${s * (Math.random() > 0.5 ? 1 : 0.45)}px`,
      borderRadius: Math.random() > 0.6 ? "50%" : "2px",
      background: colors[i % colors.length],
      pointerEvents: "none",
      zIndex: "9999",
    });
    document.body.appendChild(p);
    p.animate(
      [
        { transform: "translate(-50%,-50%) rotate(0)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d + 40}px)) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      { duration: 900 + Math.random() * 300, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    ).onfinish = () => p.remove();
  }
}
