import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { ActivityCard } from "../index";

const code = `function Demo() {
  const [dnd, setDnd] = useState(true);
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <ActivityCard
        tone="success"
        leading={<ActivityIcon><Icon name="user" /></ActivityIcon>}
        title="Onix prata, BRA2E19"
        subtitle="Motorista chegando"
        trailing={<span className="sn-activity__value">3 min</span>}
      />
      <ActivityCard
        tone="violet"
        leading={<ActivityIcon><Icon name="moon" /></ActivityIcon>}
        title="Não perturbe"
        trailing={<Switch checked={dnd} onChange={setDnd} label={dnd ? "Ligado" : "Desligado"} />}
      />
      <ActivityCard
        tone="aqua"
        leading={<ActivityIcon><Icon name="chart" /></ActivityIcon>}
        title="Progresso da sprint"
        subtitle="Review de design"
        trailing={<ProgressRing value={0.75} size={48} thickness={5} label="Sprint 75%" />}
      />
      <ActivityCard
        tone="danger"
        leading={<ActivityIcon><Icon name="heart" /></ActivityIcon>}
        title="Bateria fraca"
        trailing={<BatteryMeter level={0.2} />}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof ActivityCard> = {
  title: "Widgets/ActivityCard",
  component: ActivityCard,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Base dos cards de atividade (o que antes era a família Island). Mostra algo em andamento com a superfície, a borda e o raio do \`Card\`, e segue o tema. O \`tone\` pinta o \`ActivityIcon\` e os valores (\`sn-activity__value\`). Use \`size="expanded"\` para ter corpo e \`live\` para anunciar mudanças. Prontos: \`CallCard\`, \`PlayerCard\`, \`TimerCard\` e \`DirectionsCard\`.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof ActivityCard> = { render: () => <LiveExample code={code} /> };
