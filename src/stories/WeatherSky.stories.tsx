import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { WeatherSky } from "../index";

const code = `const C = ["clear", "cloudy", "fog", "drizzle", "rain", "storm", "snow"];
const L = {
  clear: "Céu limpo",
  cloudy: "Nublado",
  fog: "Neblina",
  drizzle: "Garoa",
  rain: "Chuva",
  storm: "Tempestade",
  snow: "Neve",
};
function Demo() {
  const [condition, setCondition] = useState("storm");
  const [night, setNight] = useState(false);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <WeatherSky condition={condition} night={night} className="demo">
        <div style={{ display: "flex", alignItems: "center", gap: 16, minHeight: 220 }}>
          <WeatherIcon condition={condition} night={night} size={84} />
          <div>
            <div style={{ font: "800 64px/1 var(--sn-font-display)" }}>
              {condition === "snow" ? "-2°" : condition === "clear" ? "29°" : "21°"}
            </div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>
              {L[condition] + " · Franca, SP"}
            </div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>
              Máx 27° · Mín 18° · Vento 14 km/h
            </div>
          </div>
        </div>
      </WeatherSky>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <FilterChips
          label="Condição"
          chips={C.map((x) => ({ key: x, label: L[x] }))}
          value={condition}
          onChange={(v) => {
            if (v) setCondition(v);
          }}
        />
        <Switch checked={night} onChange={setNight} label="Noite" />
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof WeatherSky> = {
  title: "Widgets/WeatherSky",
  component: WeatherSky,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Cartão de clima do canto-widget com o céu vivo em canvas: sol com raios girando, estrelas que piscam e estrela cadente, nuvens, neblina, chuva com vento e respingos, neve e raios com clarão. DPR limitado, pausa quando a aba some e um quadro parado com reduced-motion.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof WeatherSky> = { render: () => <LiveExample code={code} /> };
