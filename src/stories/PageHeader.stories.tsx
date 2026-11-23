import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { PageHeader } from "../index";

const code = `function Demo() {
  const [checked, setChecked] = useState(true);
  return (
    <PageHeader
      icon={<Icon name="chart" />}
      title="Uso de modelos"
      pills={[
        <Badge key={1} tone="success" live>
          Conectado
        </Badge>,
        <Badge key={2} tone="violet">
          3 provedores
        </Badge>,
      ]}
      description="Quanto cada assistente consumiu hoje e quando a cota renova."
      actions={[
        <Switch key={1} checked={checked} onChange={setChecked} label="Alertas" />,
        <Button key={2} size="sm" variant="secondary">
          Atualizar
        </Button>,
      ]}
      aside={[
        <StatTile key={1} label="Hoje" value="R$ 4,20" tone="accent" />,
        <StatTile key={2} label="Pedidos" value="1.284" />,
      ]}
      note="Os números vêm da API de cada provedor e atualizam a cada 5 minutos."
    />
  );
}

render(<Demo />);
`;

const meta: Meta<typeof PageHeader> = {
  title: "Superfícies/PageHeader",
  component: PageHeader,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Cabeçalho canônico de página (PageHero do mika): ícone com brilho no acento, pílulas de estado (use \`Badge live\`), título, descrição, ações, uma grade de \`StatTile\` à direita e uma nota de contexto no rodapé.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof PageHeader> = { render: () => <LiveExample code={code} /> };
