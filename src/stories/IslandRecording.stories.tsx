import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { IslandRecording } from "../index";

const code = `function Demo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 380 }}>
      <IslandRecording startAt={51} />
      <IslandRecording variant="wave" startAt={89} />
      <IslandRecording variant="wave" label="Nota de voz" tone="aqua" />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof IslandRecording> = {
  title: "Ilhas/IslandRecording",
  component: IslandRecording,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Gravação em andamento. \`button\` mostra o tempo e um botão de parar; \`wave\` desenha a onda em canvas, lendo \`level()\` do microfone quando houver. Com reduced motion, a onda fica parada.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof IslandRecording> = { render: () => <LiveExample code={code} /> };
