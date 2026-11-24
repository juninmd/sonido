import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { TimerCard } from "../index";

const code = `function Demo() {
  const [log, setLog] = useState("rodando");
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 400 }}>
      <TimerCard duration={10} onDone={() => setLog("acabou!")} onStop={() => setLog("parado")} />
      <TimerCard duration={25 * 60} label="Foco" tone="accent" autoStart={false} />
      <TimerCard label="Gravando tela" startAt={51} onStop={() => {}} />
      <TimerCard wave startAt={89} onStop={() => {}} />
      <TimerCard wave label="Nota de voz" tone="aqua" />
      <p style={{ margin: 0, color: "var(--sn-color-text-dim)" }}>Primeiro timer: {log}</p>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof TimerCard> = {
  title: "Widgets/TimerCard",
  component: TimerCard,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Timer, pomodoro, cronômetro ou gravação no mesmo card. Com \`duration\` conta para trás; sem ela conta o tempo decorrido. \`wave\` troca o rótulo por uma onda de áudio ao vivo (passe uma função para ler o nível do microfone). Substitui \`IslandTimer\` e \`IslandRecording\`.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof TimerCard> = { render: () => <LiveExample code={code} /> };
