import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { PlayerCard } from "../index";

const code = `function Demo() {
  return (
    <div style={{ maxWidth: 400 }}>
      <PlayerCard
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

const meta: Meta<typeof PlayerCard> = {
  title: "Widgets/PlayerCard",
  component: PlayerCard,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `O que está tocando: capa (gradiente do título quando não há imagem), equalizador ligado ao play, \`Slider\` de posição e controles com \`Button\`.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof PlayerCard> = { render: () => <LiveExample code={code} /> };
