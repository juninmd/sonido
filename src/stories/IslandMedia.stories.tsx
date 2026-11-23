import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { IslandMedia } from "../index";

const code = `function Demo() {
  return (
    <div style={{ maxWidth: 380 }}>
      <IslandMedia
        title="Midnight Drive"
        artist="Lumen Avenue"
        duration={215}
        defaultPosition={89}
        onCast={() => {}}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof IslandMedia> = {
  title: "Ilhas/IslandMedia",
  component: IslandMedia,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Player expandido: capa (gradiente do título quando não há imagem), equalizador ligado ao play, barra arrastável com \`aria-valuetext\` e controles.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof IslandMedia> = { render: () => <LiveExample code={code} /> };
