import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { SegmentedBar } from "../index";

const code = `function Demo() {
  return (
    <SegmentedBar
      label="Composição da biblioteca"
      format={(n) => n + " títulos"}
      segments={[
        { label: "Filmes", value: 142, tone: "accent" },
        { label: "Séries", value: 88, tone: "violet" },
        { label: "Animes", value: 41, tone: "aqua" },
        { label: "Documentários", value: 9, tone: "gold" },
      ]}
    />
  );
}

render(<Demo />);`;

const meta: Meta<typeof SegmentedBar> = {
  title: "Dados/SegmentedBar",
  component: SegmentedBar,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Um todo dividido em partes numa barra horizontal. Blocos largos mostram o percentual; os valores completos ficam no title e numa tabela oculta para leitores de tela.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof SegmentedBar> = { render: () => <LiveExample code={code} /> };
