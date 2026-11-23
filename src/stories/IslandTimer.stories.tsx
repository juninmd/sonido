import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { IslandTimer } from "../index";

const code = `function Demo() {
  const [log, setLog] = useState("rodando");
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <IslandTimer
        duration={10}
        onDone={() => setLog("acabou!")}
        onCancel={() => setLog("cancelado")}
      />
      <IslandTimer duration={25 * 60} label="Foco" tone="accent" autoStart={false} />
      <span style={{ color: "var(--sn-color-text-dim)", fontSize: 13 }}>
        Primeiro timer: {log}
      </span>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof IslandTimer> = {
  title: "Ilhas/IslandTimer",
  component: IslandTimer,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Contagem regressiva com pausar e cancelar. O tempo usa \`role="timer"\` (sem anunciar cada segundo) e \`onDone\` dispara ao chegar em zero.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof IslandTimer> = { render: () => <LiveExample code={code} /> };
