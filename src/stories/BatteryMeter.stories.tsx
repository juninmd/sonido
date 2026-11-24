import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { BatteryMeter } from "../index";

const code = `function Demo() {
  const [level, setLevel] = useState(0.2);
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 380 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
        <BatteryMeter level={level} />
        <BatteryMeter level={0.64} charging />
        <BatteryMeter level={0.9} showValue={false} />
      </div>
      <Slider
        label="Nível"
        value={level}
        onChange={setLevel}
        min={0}
        max={1}
        step={0.01}
        format={(v) => Math.round(v * 100) + "%"}
      />
      <ActivityCard
        tone="danger"
        title="Bateria fraca"
        trailing={<BatteryMeter level={level} />}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof BatteryMeter> = {
  title: "Dados/BatteryMeter",
  component: BatteryMeter,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Bateria com cor por nível: verde, âmbar abaixo de 50% e vermelho piscando abaixo de \`low\`. Exposta como \`role="meter"\`.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof BatteryMeter> = { render: () => <LiveExample code={code} /> };
