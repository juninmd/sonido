import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { RouteMap } from "../index";

const code = `function Demo() {
  const [selected, setSelected] = useState("w");
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) auto",
        gap: 16,
        alignItems: "center",
      }}
    >
      <RouteMap
        live
        me={[18, 38.5]}
        selected={selected}
        onSelectPin={setSelected}
        segments={[
          {
            points: [
              [12, 40],
              [25, 37],
              [33, 42],
            ],
            traffic: "free",
          },
          {
            points: [
              [33, 42],
              [45, 44],
              [55, 42],
            ],
            traffic: "slow",
          },
          {
            points: [
              [55, 42],
              [64, 36],
              [70, 30],
            ],
            traffic: "jam",
          },
          {
            points: [
              [70, 30],
              [80, 24],
              [88, 22],
            ],
            traffic: "free",
          },
        ]}
        pins={[
          { id: "h", at: [12, 40], label: "Casa", kind: "home" },
          { id: "x", at: [60, 39], label: "Acidente", kind: "incident" },
          { id: "w", at: [88, 22], label: "Trabalho", kind: "work" },
        ]}
        height={260}
      />
      <div style={{ display: "grid", gap: 14, justifyItems: "center" }}>
        <TrafficGauge delay={9} eta="32 min" />
        <TrafficGauge delay={1} eta="18 min" label="Volta" />
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof RouteMap> = {
  title: "Widgets/RouteMap",
  component: RouteMap,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Mapa de trajeto (aba Mapa do canto-widget): rota que se desenha, brilho, trechos pelas cores de trânsito (\`--sn-traffic-*\`), pinos que crescem, "você" com pulso e selo ao vivo. \`TrafficGauge\` é o medidor de atraso que varre e muda de cor.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof RouteMap> = { render: () => <LiveExample code={code} /> };
