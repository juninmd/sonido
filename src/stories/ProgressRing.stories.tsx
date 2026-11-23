import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { ProgressRing } from "../index";

const code = `function Demo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
      <ProgressRing value={0.35} label="Nível" size={64}>
        7
      </ProgressRing>
      <ProgressRing value={0.72} label="Meta diária" size={88} thickness={8}>
        72%
      </ProgressRing>
      <ProgressRing value={1} label="Concluído" size={56}>
        ✓
      </ProgressRing>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof ProgressRing> = {
  title: "Dados/ProgressRing",
  component: ProgressRing,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Progresso circular com o gradiente assinatura ember→rose→orchid. \`role=progressbar\` com valor; conteúdo central livre.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof ProgressRing> = { render: () => <LiveExample code={code} /> };
