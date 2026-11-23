import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { EmojiBurst } from "../index";

const code = `function Demo() {
  return (
    <EmojiBurst>
      <div
        style={{
          height: 170,
          display: "grid",
          placeItems: "center",
          borderRadius: 20,
          border: "1px dashed var(--sn-color-border)",
          color: "var(--sn-color-text-dim)",
          userSelect: "none",
          cursor: "pointer",
        }}
      >
        Clique em qualquer lugar aqui
      </div>
    </EmojiBurst>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof EmojiBurst> = {
  title: "Assistente/EmojiBurst",
  component: EmojiBurst,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Envolve uma área e, a cada toque, solta emojis que sobem e caem com um anel de onda (EmojiReaction do mika). No máximo 12 rajadas; desligado com reduced-motion.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof EmojiBurst> = { render: () => <LiveExample code={code} /> };
