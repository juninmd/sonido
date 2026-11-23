import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Motion } from "../index";

const code = `const M = [
  ["sn-m-rise", "rise"],
  ["sn-m-pop", "pop"],
  ["sn-m-drop", "drop"],
  ["sn-m-slide", "slide"],
  ["sn-m-unfold", "unfold"],
  ["sn-m-roll", "roll"],
  ["sn-m-star", "star"],
  ["sn-m-bump", "bump"],
  ["sn-m-shake", "shake"],
  ["sn-m-flash", "flash"],
  ["sn-m-tick-up", "tick-up"],
  ["sn-m-tick-down", "tick-down"],
];
const L = [
  ["sn-m-ping", "ping"],
  ["sn-m-blink", "blink"],
  ["sn-m-glow", "glow"],
  ["sn-m-halo", "halo"],
  ["sn-m-float", "float"],
  ["sn-m-wiggle", "wiggle"],
  ["sn-m-spin", "spin"],
  ["sn-m-shimmer", "shimmer"],
];
const box = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid var(--sn-color-border)",
  background: "var(--sn-color-surface)",
  font: "600 12px var(--sn-font-mono)",
  display: "inline-block",
};
function Demo() {
  const [kValue, setKValue] = useState(0);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Button
          size="sm"
          onClick={() => {
            setKValue(kValue + 1);
          }}
        >
          Tocar de novo
        </Button>
        <span style={{ fontSize: 13, color: "var(--sn-color-text-dim)" }}>Uma vez</span>
      </div>
      <div
        key={kValue}
        style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}
      >
        {M.map((m, i) => (
          <span key={m[0]} className={m[0]} style={Object.assign({ "--i": i }, box)}>
            {m[1]}
          </span>
        ))}
      </div>
      <span style={{ fontSize: 13, color: "var(--sn-color-text-dim)" }}>Em loop</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        {L.map((m) => (
          <span
            key={m[0]}
            className={m[0]}
            style={Object.assign({}, box, {
              color: m[1] === "ping" ? "var(--sn-color-danger)" : undefined,
            })}
          >
            {m[1]}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <span className="sn-m-strike" data-fresh key={"s" + kValue} style={box}>
          tarefa riscada
        </span>
        <span className="sn-m-raise" style={box}>
          raise (hover)
        </span>
        <span className="sn-m-tilt" style={box}>
          tilt (hover)
        </span>
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Motion> = {
  title: "Movimento/Motion",
  component: Motion,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `A camada \`motion.css\`: classes \`sn-m-*\` reunidas do canto-widget, pobre-lingo e games-gallery. Entradas (rise, pop, drop, slide, unfold, roll), feedback (star, bump, shake, flash, tick-up/down, strike), loops (ping, blink, glow, halo, float, wiggle, spin, shimmer), saídas (exit-swipe/archive/trash) e hovers (raise, lift, tilt). Escalone com \`--i\`. Tudo sob reduced-motion; \`data-paused\` no \`<html>\` pausa tudo.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Motion> = { render: () => <LiveExample code={code} /> };
