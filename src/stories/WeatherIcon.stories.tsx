import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { WeatherIcon } from "../index";

const code = `const C = ["clear", "cloudy", "fog", "drizzle", "rain", "storm", "snow"];
function Demo() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {[false, true].map((n) => (
        <div
          key={String(n)}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}
        >
          {C.map((c) => (
            <div
              key={c}
              style={{
                display: "grid",
                justifyItems: "center",
                gap: 4,
                fontSize: 11,
                color: "var(--sn-color-text-dim)",
              }}
            >
              <WeatherIcon condition={c} night={n} size={44} label={c} />
              {c}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof WeatherIcon> = {
  title: "Widgets/WeatherIcon",
  component: WeatherIcon,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Ícones SVG animados do canto-widget: raios do sol girando, nuvem que flutua, gotas e flocos caindo, raio piscando, lua com estrelas. Parados com reduced-motion.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof WeatherIcon> = { render: () => <LiveExample code={code} /> };
