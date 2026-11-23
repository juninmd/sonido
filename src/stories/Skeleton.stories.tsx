import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Skeleton } from "../index";

const code = `function Demo() {
  return (
    <div style={{ maxWidth: 420 }}>
      <Skeleton media rows={3} />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Placeholder de carregamento com \`role=status\` e rótulo oculto. Brilho para com reduced-motion.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Skeleton> = { render: () => <LiveExample code={code} /> };
