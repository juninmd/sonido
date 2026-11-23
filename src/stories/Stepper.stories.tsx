import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Stepper } from "../index";

const code = `function Demo() {
  const [current, setCurrent] = useState(1);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Stepper
        current={current}
        steps={[
          { label: "Conta", description: "E-mail e senha" },
          { label: "Perfil", description: "Nome e avatar" },
          { label: "Biblioteca", description: "Importar da Steam" },
          { label: "Pronto" },
        ]}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setCurrent(Math.max(0, current - 1));
          }}
        >
          Voltar
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setCurrent(Math.min(3, current + 1));
          }}
        >
          Avançar
        </Button>
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Stepper> = {
  title: "Navegação/Stepper",
  component: Stepper,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Indicador de etapas horizontal ou vertical: feita (check), atual (destaque) e pendente.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Stepper> = { render: () => <LiveExample code={code} /> };
