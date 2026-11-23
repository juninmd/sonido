import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Tooltip } from "../index";

const code = `function Demo() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        alignItems: "center",
        paddingTop: 44,
      }}
    >
      <Tooltip content="Adicionar aos favoritos">
        <Button size="icon" variant="secondary" aria-label="Favoritar">
          <Icon name="heart" />
        </Button>
      </Tooltip>
      <Tooltip content={<>Buscar <Kbd>/</Kbd></>}>
        <Button variant="secondary" iconStart={<Icon name="search" />}>
          Buscar
        </Button>
      </Tooltip>
      <Tooltip content="Abaixo também" side="bottom">
        <Button variant="ghost">Passe o mouse</Button>
      </Tooltip>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Tooltip> = {
  title: "Exibição/Tooltip",
  component: Tooltip,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Dica curta no hover e no foco do teclado, ligada ao gatilho por \`aria-describedby\`. Só CSS, sem portal: use em botões e links, nunca para informação essencial.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Tooltip> = { render: () => <LiveExample code={code} /> };
