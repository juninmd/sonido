import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Checkbox } from "../index";

const code = `function Demo() {
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label="Notificar ofertas"
        description="Quando um jogo da lista de desejos baixar de preço."
      />
      <Checkbox
        checked={checked2}
        onChange={setChecked2}
        label="Sincronizar conquistas"
      />
      <Checkbox
        checked={false}
        indeterminate
        onChange={() => {}}
        label="Selecionar todos"
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Checkbox> = {
  title: "Formulários/Checkbox",
  component: Checkbox,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Caixa de seleção com rótulo e descrição, marca que salta (canto-check) e estado \`indeterminate\`.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Checkbox> = { render: () => <LiveExample code={code} /> };
