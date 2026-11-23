import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Odometer } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState(1284530);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ font: "800 48px/1 var(--sn-font-display)" }}>
        <Odometer value={value} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Button
          size="sm"
          onClick={() => {
            setValue(value + Math.round(Math.random() * 90000));
          }}
        >
          + votos
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setValue(Math.round(Math.random() * 9999999));
          }}
        >
          Aleatório
        </Button>
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Odometer> = {
  title: "Dados/Odometer",
  component: Odometer,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Odômetro do eleicoes-radar: cada dígito é uma coluna 0–9 que rola até o valor novo. O leitor de tela recebe o número inteiro.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Odometer> = { render: () => <LiveExample code={code} /> };
