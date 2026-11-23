/** Cenas animadas de fundo dos alertas do canto-widget (AlertFx + WeatherAlertFx), num só mapa. */
import type { CanvasFrame } from "../../utils/useCanvasLoop";
import { rnd } from "../../utils/useCanvasLoop";

export type AlertScene =
  | "calendar"
  | "ticks"
  | "sparks"
  | "bugs"
  | "branches"
  | "bubbles"
  | "rays"
  | "pulse"
  | "rain"
  | "storm"
  | "flood"
  | "snow"
  | "cold"
  | "heat"
  | "dry"
  | "wind"
  | "uv"
  | "smoke"
  | "fog";

type P = { x: number; y: number; v: number; r: number; a: number; s: number };
export type SceneState = {
  p: P[];
  ripples: { x: number; r: number; a: number }[];
  nextBolt: number;
  bolt: { life: number; pts: [number, number][] } | null;
};
type F = CanvasFrame & { st: SceneState; rgb: string; hot: boolean; flash: () => void };

const COUNT: Record<AlertScene, number> = {
  calendar: 0,
  ticks: 16,
  sparks: 34,
  bugs: 40,
  branches: 3,
  bubbles: 18,
  rays: 30,
  pulse: 0,
  rain: 70,
  storm: 110,
  flood: 70,
  snow: 50,
  cold: 26,
  heat: 14,
  dry: 40,
  wind: 26,
  uv: 1,
  smoke: 60,
  fog: 7,
};
const WEATHER = new Set<AlertScene>([
  "rain",
  "storm",
  "flood",
  "snow",
  "cold",
  "heat",
  "dry",
  "wind",
  "uv",
  "smoke",
  "fog",
]);

export function seedScene(scene: AlertScene, w: number, h: number, hot: boolean): SceneState {
  const n = Math.floor(COUNT[scene] * (hot && WEATHER.has(scene) ? 3.2 : 1));
  return {
    p: Array.from({ length: n }, () => ({
      x: rnd(0, w || 400),
      y: rnd(0, h || 200),
      v: rnd(0.6, 1.4),
      r: rnd(1, 3),
      a: rnd(0, 6.28),
      s: rnd(0.2, 1),
    })),
    ripples: [],
    nextBolt: 60,
    bolt: null,
  };
}

const rainLines = ({ ctx, w, h, st, hot }: F, storm: boolean) => {
  ctx.lineCap = "round";
  ctx.strokeStyle = storm ? "rgba(165,180,252,.5)" : "rgba(96,165,250,.5)";
  ctx.lineWidth = hot ? 1.6 : 1.2;
  ctx.beginPath();
  for (const p of st.p) {
    const sp = (storm ? 9 : 6) * p.v * (hot ? 1.5 : 1);
    p.y += sp;
    p.x -= sp * 0.25;
    if (p.y > h) {
      p.y = -10;
      p.x = rnd(0, w + 60);
    }
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + 3, p.y - 12 * p.v);
  }
  ctx.stroke();
};

const snowFlakes = ({ ctx, w, h, t, st, hot }: F, cold: boolean) => {
  ctx.fillStyle = "rgba(224,242,254,.75)";
  for (const p of st.p) {
    p.y += (hot ? 1.6 : 0.5) * p.v;
    p.x += Math.sin(t / 40 + p.a) * 0.5 + (hot ? -1.4 : 0);
    if (p.y > h) {
      p.y = -5;
      p.x = rnd(0, w + 60);
    }
    if (p.x < -5) p.x = w + 5;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * (cold ? 0.7 : 1), 0, 7);
    ctx.fill();
  }
};

const sunGlow = ({ ctx, w, h }: F, color: string) => {
  const g = ctx.createRadialGradient(w - 40, 20, 0, w - 40, 20, 160);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(251,191,36,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
};

export const SCENES: Record<AlertScene, (f: F) => void> = {
  // Uma folha de mês: o dia de hoje pulsa; quanto mais perto do início, mais rápido.
  calendar({ ctx, w, h, t, rgb, hot }) {
    const cell = 15;
    const gap = 5;
    const cols = 7;
    const rows = 4;
    const gw = cols * (cell + gap) - gap;
    const gh = rows * (cell + gap) - gap;
    const x0 = w - gw - 18;
    const y0 = Math.max(12, (h - gh) / 2 + 6);
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${rgb},0.22)`;
    ctx.beginPath();
    ctx.roundRect(x0 - 8, y0 - 22, gw + 16, gh + 30, 8);
    ctx.stroke();
    ctx.fillStyle = `rgba(${rgb},0.14)`;
    ctx.beginPath();
    ctx.roundRect(x0 - 8, y0 - 22, gw + 16, 12, [8, 8, 0, 0]);
    ctx.fill();
    const beat = hot ? 40 : 90;
    const k = (t % beat) / beat;
    const today = 10;
    for (let i = 0; i < cols * rows; i++) {
      const x = x0 + (i % cols) * (cell + gap);
      const y = y0 + Math.floor(i / cols) * (cell + gap);
      ctx.strokeStyle = `rgba(${rgb},0.16)`;
      ctx.beginPath();
      ctx.roundRect(x, y, cell, cell, 3);
      ctx.stroke();
      if (i === today) {
        ctx.fillStyle = `rgba(${rgb},${(1 - k) * (hot ? 0.6 : 0.4) + 0.12})`;
        ctx.beginPath();
        ctx.roundRect(x - 1, y - 1, cell + 2, cell + 2, 4);
        ctx.fill();
      }
    }
  },
  ticks({ ctx, w, h, st, t }) {
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
    for (const q of st.p) {
      q.y -= 0.35 * q.v;
      if (q.y < -12) {
        q.y = h + 8;
        q.x = rnd(0, w);
      }
      ctx.strokeStyle = `rgba(74,222,128,${0.14 + 0.18 * Math.sin(t / 30 + q.a) ** 2})`;
      ctx.beginPath();
      ctx.moveTo(q.x - 4 * q.s - 2, q.y);
      ctx.lineTo(q.x - 1, q.y + 4 * q.s + 1);
      ctx.lineTo(q.x + 5 * q.s + 2, q.y - 4 * q.s - 1);
      ctx.stroke();
    }
  },
  sparks({ ctx, w, h, st, t, hot }) {
    for (const q of st.p) {
      q.y -= 0.25 * q.v * (hot ? 2 : 1);
      if (q.y < -8) {
        q.y = h + 8;
        q.x = rnd(0, w);
      }
      const k = 0.5 + 0.5 * Math.sin(t / 14 + q.a);
      const r = q.r * (1 + 2 * k);
      ctx.fillStyle = `rgba(${q.s > 0.66 ? "253,224,71" : q.s > 0.33 ? "244,114,182" : "125,211,252"},${0.15 + 0.5 * k})`;
      ctx.beginPath();
      ctx.moveTo(q.x, q.y - r * 2);
      ctx.quadraticCurveTo(q.x, q.y, q.x + r * 2, q.y);
      ctx.quadraticCurveTo(q.x, q.y, q.x, q.y + r * 2);
      ctx.quadraticCurveTo(q.x, q.y, q.x - r * 2, q.y);
      ctx.quadraticCurveTo(q.x, q.y, q.x, q.y - r * 2);
      ctx.fill();
    }
  },
  bugs({ ctx, w, h, st, t }) {
    for (const q of st.p) {
      q.y += 1.1 * q.v;
      if (q.y > h) {
        q.y = -6;
        q.x = rnd(0, w);
      }
      ctx.fillStyle = `rgba(251,113,133,${0.12 + 0.2 * q.s})`;
      ctx.fillRect(q.x, q.y, q.r * 2.5, q.r);
    }
    if (t % 70 < 6) {
      ctx.fillStyle = "rgba(251,113,133,.14)";
      ctx.fillRect(0, rnd(0, h), w, rnd(3, 9));
    }
  },
  branches({ ctx, w, h, t, rgb }) {
    const y0 = h * 0.5;
    for (const dir of [-1, 1]) {
      ctx.strokeStyle = `rgba(${rgb},.22)`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.bezierCurveTo(w * 0.3, y0, w * 0.35, y0 + dir * h * 0.28, w * 0.6, y0 + dir * h * 0.28);
      ctx.lineTo(w, y0 + dir * h * 0.28);
      ctx.stroke();
      const k = ((t / 120 + (dir > 0 ? 0.5 : 0)) % 1) * w;
      const y =
        k < w * 0.6 ? y0 + dir * h * 0.28 * Math.min(1, Math.max(0, (k - w * 0.1) / (w * 0.35))) : y0 + dir * h * 0.28;
      ctx.fillStyle = `rgba(${rgb},.7)`;
      ctx.beginPath();
      ctx.arc(k, y, 3, 0, 7);
      ctx.fill();
    }
  },
  bubbles({ ctx, w, h, st, t, rgb }) {
    ctx.lineWidth = 1.2;
    for (const q of st.p) {
      q.y -= 0.4 * q.v;
      q.x += Math.sin(t / 50 + q.a) * 0.3;
      if (q.y < -10) {
        q.y = h + 10;
        q.x = rnd(0, w);
      }
      ctx.strokeStyle = `rgba(${rgb},${0.12 + 0.18 * q.s})`;
      ctx.beginPath();
      ctx.arc(q.x, q.y, 3 + q.r * 2.5, 0, 7);
      ctx.stroke();
    }
  },
  rays({ ctx, w, h, st, t }) {
    ctx.save();
    ctx.translate(30, h + 10);
    ctx.rotate(-Math.PI / 2 + Math.sin(t / 200) * 0.15);
    for (let i = 0; i < 9; i++) {
      ctx.rotate(Math.PI / 12);
      ctx.fillStyle = "rgba(251,191,36,.07)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w * 1.2, -24);
      ctx.lineTo(w * 1.2, 24);
      ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle = "rgba(253,230,138,.45)";
    for (const q of st.p) {
      q.x += 0.2 * q.v;
      q.y += Math.sin(t / 40 + q.a) * 0.15;
      if (q.x > w) q.x = -3;
      ctx.fillRect(q.x, q.y, q.r * 0.7, q.r * 0.7);
    }
  },
  pulse({ ctx, w, h, t, rgb, hot }) {
    const base = h * 0.82;
    const beat = hot ? 70 : 120;
    ctx.strokeStyle = `rgba(${rgb},${hot ? 0.45 : 0.28})`;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 2) {
      const u = (((x - t * (hot ? 2.2 : 1.4)) % beat) + beat) % beat;
      const s = Math.sin(((u - 6) / 6) * Math.PI);
      const y = u < 6 ? -6 * Math.sin((u / 6) * Math.PI) : u < 12 ? -20 * s + 8 * s : 0;
      if (x) ctx.lineTo(x, base + y);
      else ctx.moveTo(x, base + y);
    }
    ctx.stroke();
  },
  rain: (f) => rainLines(f, false),
  storm(f) {
    rainLines(f, true);
    const { ctx, w, h, st, hot } = f;
    if (--st.nextBolt <= 0) {
      const pts: [number, number][] = [];
      let x = rnd(w * 0.3, w);
      let y = 0;
      while (y < h * 0.7) {
        pts.push([x, y]);
        x += rnd(-18, 18);
        y += rnd(10, 26);
      }
      st.bolt = { life: 10, pts };
      st.nextBolt = rnd(hot ? 30 : 80, hot ? 80 : 260);
      f.flash();
    }
    if (st.bolt && st.bolt.life-- > 0) {
      ctx.strokeStyle = `rgba(253,224,71,${st.bolt.life / 10})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      st.bolt.pts.forEach(([x, y], i) => {
        if (i) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      });
      ctx.stroke();
    }
  },
  // Enchente: a água sobe até ~40% do cartão, com duas ondas e anéis onde a chuva cai.
  flood(f) {
    rainLines(f, false);
    const { ctx, w, h, t, st } = f;
    const level = h * (1 - (0.08 + 0.34 * (1 - Math.exp(-t / 220))));
    if (t % 3 === 0) st.ripples.push({ x: rnd(0, w), r: 1, a: 0.6 });
    const wave = (off: number, amp: number, spd: number, color: string) => {
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 6)
        ctx.lineTo(x, level + off + Math.sin(x / 26 + t / spd) * amp + Math.sin(x / 11 - t / (spd * 0.7)) * amp * 0.4);
      ctx.lineTo(w, h);
      ctx.fillStyle = color;
      ctx.fill();
    };
    wave(4, 4, 14, "rgba(37,99,235,.22)");
    wave(0, 3, 10, "rgba(56,189,248,.28)");
    ctx.strokeStyle = "rgba(186,230,253,.55)";
    for (let i = st.ripples.length - 1; i >= 0; i--) {
      const rp = st.ripples[i];
      rp.r += 0.9;
      rp.a -= 0.018;
      if (rp.a <= 0) {
        st.ripples.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = rp.a;
      ctx.beginPath();
      ctx.ellipse(rp.x, level + 6, rp.r * 2.2, rp.r * 0.6, 0, 0, 7);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  },
  snow: (f) => snowFlakes(f, false),
  cold(f) {
    snowFlakes(f, true);
    const { ctx, w, h, t } = f;
    const frost = Math.max(0.01, Math.min(1, t / 100));
    for (const [x, y] of [
      [0, 0],
      [w, h],
    ]) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, 130 * frost);
      g.addColorStop(0, "rgba(186,230,253,.33)");
      g.addColorStop(1, "rgba(186,230,253,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
  },
  heat(f) {
    const { ctx, w, h, t, st, hot } = f;
    sunGlow(f, "rgba(251,191,36,.35)");
    if (hot) {
      const v = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, w * 0.75);
      v.addColorStop(0, "rgba(239,68,68,0)");
      v.addColorStop(1, `rgba(239,68,68,${0.22 + Math.sin(t / 25) * 0.08})`);
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.lineWidth = 1.5;
    for (const p of st.p) {
      p.y -= 0.6 * p.v;
      if (p.y < -20) {
        p.y = h + 10;
        p.x = rnd(0, w);
      }
      ctx.strokeStyle = `rgba(251,146,60,${0.25 * p.s})`;
      ctx.beginPath();
      for (let i = 0; i < 30; i++) ctx.lineTo(p.x + Math.sin((p.y + i * 2) / 8 + t / 10) * 4, p.y + i * 2);
      ctx.stroke();
    }
  },
  dry(f) {
    const { ctx, w, h, t, st, hot } = f;
    sunGlow(f, "rgba(253,186,116,.25)");
    ctx.fillStyle = "rgba(214,170,110,.45)";
    for (const p of st.p) {
      p.x += (hot ? 3.5 : 1.2) * p.v;
      p.y += Math.sin(t / 30 + p.a) * 0.3;
      if (p.x > w) {
        p.x = -4;
        p.y = rnd(0, h);
      }
      ctx.fillRect(p.x, p.y, p.r * 0.8, p.r * 0.8);
    }
  },
  wind({ ctx, w, h, t, st, hot }) {
    for (const p of st.p) {
      p.x += (hot ? 15 : 8) * p.v;
      if (p.x > w + 80) {
        p.x = -80;
        p.y = rnd(0, h);
      }
      ctx.strokeStyle = `rgba(167,243,208,${0.35 * p.s})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.quadraticCurveTo(p.x - 30, p.y + Math.sin(t / 12 + p.a) * 6, p.x - 70 * p.v, p.y);
      ctx.stroke();
    }
    // Folhas girando no vento forte.
    for (let i = 0; i < Math.min(9, st.p.length); i++) {
      const q = st.p[i];
      ctx.save();
      ctx.translate(((q.x * 1.3 + t * 7) % (w + 40)) - 20, q.y + Math.sin(t / 10 + q.a) * 14);
      ctx.rotate(t / 6 + q.a);
      ctx.fillStyle = i % 3 ? "rgba(134,239,172,.6)" : "rgba(250,204,21,.55)";
      ctx.beginPath();
      ctx.ellipse(0, 0, 5, 2.4, 0, 0, 7);
      ctx.fill();
      ctx.restore();
    }
  },
  uv({ ctx, w, t, hot }) {
    ctx.save();
    ctx.translate(w - 30, 10);
    ctx.rotate(t / 300);
    for (let i = 0; i < 14; i++) {
      ctx.rotate(Math.PI / 7);
      ctx.fillStyle = `rgba(244,114,182,${hot ? 0.26 + Math.sin(t / 15) * 0.08 : 0.12})`;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w, -26);
      ctx.lineTo(w, 26);
      ctx.fill();
    }
    ctx.restore();
  },
  smoke: (f) => blobs(f, false),
  fog: (f) => blobs(f, true),
};

function blobs({ ctx, w, st, hot }: F, fog: boolean) {
  for (const p of st.p) {
    p.x += (fog ? 0.25 : 0.4) * p.v;
    if (p.x - 140 > w) p.x = -140;
    const radius = fog ? 90 + p.r * 30 : p.r * 2;
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
    g.addColorStop(
      0,
      fog ? `rgba(203,213,225,${hot ? 0.3 : 0.12})` : hot ? "rgba(239,68,68,.28)" : "rgba(168,162,158,.35)",
    );
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(p.x - radius, p.y - radius, radius * 2, radius * 2);
  }
}
