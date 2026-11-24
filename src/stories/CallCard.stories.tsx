import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { CallCard } from "../index";

const code = `function Demo() {
  const [state, setState] = useState("tocando");
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 400 }}>
      <CallCard
        name="Daniel Brooks"
        subtitle="Celular"
        onAccept={() => setState("atendida")}
        onDecline={() => setState("recusada")}
      />
      <CallCard variant="joined" name="Ethan Cole" onAccept={() => setState("vídeo aberto")} />
      <p style={{ margin: 0, color: "var(--sn-color-text-dim)" }}>Chamada: {state}</p>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof CallCard> = {
  title: "Widgets/CallCard",
  component: CallCard,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Chamada recebida com recusar (\`Button\` danger) e atender (\`Button\` primary), ou o aviso \`joined\` de que alguém entrou na call.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof CallCard> = { render: () => <LiveExample code={code} /> };
