import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { WeekStrip } from "../index";

const code = `function Demo() {
  const hoje = new Date();
  const dia = (n) => localIsoDate(new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + n));
  const [value, setValue] = useState(null);
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <WeekStrip
        label="Próximos 7 dias"
        value={value}
        onChange={setValue}
        counts={{ [dia(0)]: 2, [dia(2)]: 5, [dia(5)]: 1 }}
      />
      <small>{value ? "Filtrando " + value : "Todos os dias"}</small>
    </div>
  );
}

render(<Demo />);`;

const meta: Meta<typeof WeekStrip> = {
  title: "Formulários/WeekStrip",
  component: WeekStrip,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Faixa de dias para filtrar por data: dia da semana, número, selo de contagem e marca de hoje. Botões alternáveis com foco itinerante (setas, Home, End); clicar de novo desfaz a escolha.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof WeekStrip> = { render: () => <LiveExample code={code} /> };
