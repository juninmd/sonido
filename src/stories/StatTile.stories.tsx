import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { StatTile } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState(12);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
        gap: 12,
      }}
    >
      <StatTile
        label="Mensagens"
        value={value}
        hint="clique para somar"
        onClick={() => {
          setValue(value + 1);
        }}
        tone="accent"
        icon={<Icon name="mail" />}
      />
      <StatTile label="Ativos" value="8/9" tone="success" />
      <StatTile label="Erros" value={2} tone="danger" />
      <StatTile label="Latência" value="240 ms" tone="info" />
      <StatTile label="Versão" value="2.4.1" />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof StatTile> = {
  title: "Dados/StatTile",
  component: StatTile,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Número compacto do mika: rótulo espaçado em caixa alta, tom (\`accent\`, \`success\`, \`warning\`, \`danger\`, \`info\`), dica e clique opcional. Quando o valor muda, ele entra de novo subindo 4px.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof StatTile> = { render: () => <LiveExample code={code} /> };
