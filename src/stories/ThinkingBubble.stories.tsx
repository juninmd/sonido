import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { ThinkingBubble } from "../index";

const code = `function Demo() {
  const [long, setLong] = useState(false);
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 24 }}
    >
      <ThinkingBubble
        long={long}
        transcript="Qual é a previsão para amanhã em Franca?"
        tool="weather.forecast"
        steps={[
          { id: 1, label: "Entender o pedido", status: "done" },
          { id: 2, label: "Buscar a previsão", status: "active" },
          { id: 3, label: "Responder em voz", status: "pending" },
        ]}
      />
      <div style={{ display: "grid", gap: 14 }}>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}
        >
          <BreathingDots />
          <OrbitSpinner />
        </div>
        <Switch checked={long} onChange={setLong} label="Demorando (órbita)" />
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof ThinkingBubble> = {
  title: "Assistente/ThinkingBubble",
  component: ThinkingBubble,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Bolha de "pensando" do mika: vidro com uma mancha em gradiente, \`BreathingDots\` (ou \`OrbitSpinner\` quando demora), a fala ouvida, a ferramenta em uso e os passos (pendente, ativo, feito, erro). Os pontos param e continuam visíveis com reduced-motion.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof ThinkingBubble> = { render: () => <LiveExample code={code} /> };
