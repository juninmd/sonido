import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Slider } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState(70);
  const [value2, setValue2] = useState(2);
  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 420 }}>
      <Slider
        label="Volume"
        value={value}
        onChange={setValue}
        format={(n) => n + "%"}
      />
      <Slider
        label="Velocidade"
        value={value2}
        onChange={setValue2}
        min={0.5}
        max={3}
        step={0.25}
        format={(n) => n + "×"}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Slider> = {
  title: "Formulários/Slider",
  component: Slider,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Faixa nativa com trilho preenchido pelo gradiente de assinatura e o valor formatado ao lado.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Slider> = { render: () => <LiveExample code={code} /> };
