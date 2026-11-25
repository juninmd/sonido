import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { EmptyState } from "../index";

const code = `function Demo() {
  return (
    <EmptyState
      icon={
        <svg viewBox="0 0 24 24" width={26} height={26}>
          <path
            d="M4 7h16M4 12h10M4 17h6"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      }
      title="Nada por aqui ainda"
      titleAs="h2"
      description="Adicione uma pasta de jogos ou conecte uma loja para começar."
      action={<Button press>Adicionar pasta</Button>}
    />
  );
}

render(<Demo />);
`;

const meta: Meta<typeof EmptyState> = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Estado vazio ou de erro recuperável: ícone, título, descrição e uma ação. O título é um parágrafo; \`titleAs\` troca por um heading quando o estado ocupa a página ou a seção.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof EmptyState> = { render: () => <LiveExample code={code} /> };
