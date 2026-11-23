import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { IslandChip } from "../index";

const code = `function Demo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <IslandChip
        icon={<Icon name="star" />}
        value="6s"
        tone="gold"
        label="Café pronto em 6 segundos"
      />
      <IslandChip
        icon={<Icon name="play" />}
        value="45m"
        tone="success"
        label="Carregando, 45 minutos"
      />
      <IslandChip
        icon={<Icon name="search" />}
        value="46m"
        tone="info"
        label="Voo em 46 minutos"
      />
      <IslandChip
        icon={<Icon name="heart" />}
        value="86"
        tone="danger"
        label="Batimentos: 86"
      />
      <IslandChip
        icon={<Icon name="chart" />}
        value="2,0 km"
        tone="warning"
        label="Pedalada: 2 km"
      />
      <IslandChip
        icon={<Icon name="tag" />}
        value="22m"
        tone="violet"
        label="Entrega em 22 minutos"
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof IslandChip> = {
  title: "Ilhas/IslandChip",
  component: IslandChip,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Mini ilha com ícone e valor na cor do tom, para status compactos (tempo de entrega, batimentos, carga). \`label\` é obrigatório: é o que o leitor de tela lê.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof IslandChip> = { render: () => <LiveExample code={code} /> };
