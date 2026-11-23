import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { ToggleCard } from "../index";

const code = `function Demo() {
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  return (
    <Bento minItem={240}>
      <ToggleCard
        title="Voz"
        description="Responde falando com a voz escolhida."
        icon={<Icon name="play" />}
        checked={checked}
        onChange={setChecked}
        detail="tts: pt-BR-Francisca"
      />
      <ToggleCard
        title="Visão"
        description="Vê a tela quando você pede ajuda."
        icon={<Icon name="search" />}
        checked={checked2}
        onChange={setChecked2}
      />
      <ToggleCard
        title="Lembretes"
        description="Avisa da agenda 10 min antes."
        icon={<Icon name="star" />}
        checked={checked3}
        onChange={setChecked3}
      />
    </Bento>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof ToggleCard> = {
  title: "Formulários/ToggleCard",
  component: ToggleCard,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Cartão que liga/desliga um recurso inteiro (FeatureCard do mika). É um botão com \`aria-pressed\`; o ícone ganha o acento e o check se desenha.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof ToggleCard> = { render: () => <LiveExample code={code} /> };
