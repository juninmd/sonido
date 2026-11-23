import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Switch } from "../index";

const code = `function Demo() {
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Switch
        checked={checked}
        onChange={setChecked}
        label="Sons de acerto"
        description="Toca um efeito ao acertar um exercício."
      />
      <Switch checked={checked2} onChange={setChecked2} label="Modo TV" />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Switch> = {
  title: "Formulários/Switch",
  component: Switch,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Interruptor binário com efeito imediato. Para escolhas que precisam de "Salvar", use checkbox.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Switch> = { render: () => <LiveExample code={code} /> };
