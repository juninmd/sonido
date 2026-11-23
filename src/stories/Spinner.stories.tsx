import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Spinner } from "../index";

const code = `function Demo() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        alignItems: "center",
        color: "var(--sn-color-accent-2)",
      }}
    >
      <Spinner size={16} />
      <Spinner size={24} />
      <Spinner size={32} label="Carregando" />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Indicador de carregamento. Decorativo por padrão; passe \`label\` quando for o único sinal de carregamento.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Spinner> = { render: () => <LiveExample code={code} /> };
