import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { IslandCall } from "../index";

const code = `function Demo() {
  const [state, setState] = useState("tocando");
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 380 }}>
      <IslandCall
        name="Daniel Brooks"
        subtitle="celular"
        onAccept={() => setState("atendida")}
        onDecline={() => setState("recusada")}
      />
      <IslandCall
        variant="joined"
        name="Ethan Cole"
        onAccept={() => setState("vídeo aberto")}
      />
      <span style={{ color: "var(--sn-color-text-dim)", fontSize: 13 }}>
        Chamada: {state}
      </span>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof IslandCall> = {
  title: "Ilhas/IslandCall",
  component: IslandCall,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Chamada recebida com recusar e atender (o botão de atender pulsa) ou o aviso \`joined\` de que alguém entrou na call.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof IslandCall> = { render: () => <LiveExample code={code} /> };
