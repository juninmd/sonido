import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { AgendaRail } from "../index";

const code = `function Demo() {
  const [now, setNow] = useState(615);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <AgendaRail
        now={now}
        events={[
          { id: "1", start: 540, end: 570, title: "Daily", where: "Meet" },
          { id: "2", start: 600, end: 645, title: "Review do Sonido", where: "Sala 2" },
          { id: "g", start: 645, end: 720, title: "", kind: "free" },
          { id: "3", start: 720, end: 750, title: "Escrever previews", kind: "task" },
          { id: "4", start: 840, end: 900, title: "1:1 com o time", clash: true },
          { id: "5", start: 840, end: 870, title: "Dentista", clash: true },
        ]}
      />
      <Slider
        label="Hora (simulada)"
        value={now}
        onChange={setNow}
        min={480}
        max={960}
        step={5}
        format={hhmm}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof AgendaRail> = {
  title: "Widgets/AgendaRail",
  component: AgendaRail,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Linha do dia do canto-widget: reuniões, tarefas com horário e janelas livres num trilho; conflitos em vermelho; a linha do agora com ponto que bate; a reunião em andamento ganha halo e \`CountdownRing\`. \`NowLine\` e \`CountdownRing\` também são exportados.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof AgendaRail> = { render: () => <LiveExample code={code} /> };
