import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { ProgressBar } from "../index";

const code = `function Demo() {
  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 460 }}>
      <ProgressBar value={0.62} label="Conquistas" showValue />
      <ProgressBar value={0.35} label="Meta da semana" showValue tone="accent" />
      <ProgressBar value={0.9} label="Download" tone="aqua" size="sm" />
      <ProgressBar label="Sincronizando" size="sm" />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof ProgressBar> = {
  title: "Dados/ProgressBar",
  component: ProgressBar,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Progresso linear. \`signature\` para conquista, \`accent\` para metas, \`aqua\` para transferências. Sem \`value\` fica indeterminado.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof ProgressBar> = { render: () => <LiveExample code={code} /> };
