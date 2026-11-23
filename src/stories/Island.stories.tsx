import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Island } from "../index";

const code = `const btc = [
  61.2, 61.8, 61.5, 62.4, 62.1, 63.0, 62.6, 63.4, 63.1, 63.9, 63.6, 64.1, 63.8, 64.3,
  64.0, 64.6,
];

function Demo() {
  const [dnd, setDnd] = useState(true);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 16,
        alignItems: "start",
      }}
    >
      <div style={{ display: "grid", gap: 16 }}>
        <IslandTicker
          symbol="BTC"
          name="Bitcoin"
          price="$64.077"
          change="+$641,40"
          changePct={1.01}
          data={btc}
          updated="há 2 min"
        />
        <IslandCall name="Daniel Brooks" subtitle="celular" />
        <IslandTimer duration={253} />
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        <IslandNav
          maneuver="right"
          distance="312 m"
          street="Rua Monsenhor Rosa"
          arrival="12:08"
          remaining="6 min"
        />
        <IslandMedia
          title="Midnight Drive"
          artist="Lumen Avenue"
          duration={215}
          defaultPosition={89}
          onCast={() => {}}
        />
        <Island
          tone="violet"
          leading={<Icon name="moon" />}
          title="Não perturbe"
          trailing={
            <Switch
              checked={dnd}
              onChange={setDnd}
              label={dnd ? "Ligado" : "Desligado"}
            />
          }
        />
        <IslandRecording />
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        <IslandWeather
          place="Franca, SP"
          temp={31}
          condition="cloudy"
          summary="Parcialmente nublado"
          high={33}
          low={22}
          hours={[
            { time: "Agora", condition: "clear", temp: 31 },
            { time: "13h", condition: "cloudy", temp: 32 },
            { time: "14h", condition: "cloudy", temp: 33 },
            { time: "15h", condition: "drizzle", temp: 32, rain: 0.3 },
            { time: "16h", condition: "storm", temp: 29, rain: 0.7 },
          ]}
        />
        <Island
          tone="success"
          leading={<Icon name="user" />}
          eyebrow="Motorista chegando"
          title="Onix prata · BRA2E19"
          trailing={<span className="sn-island__value sn-island__tone">3 min</span>}
        />
        <Island
          tone="success"
          leading={<Icon name="mail" />}
          eyebrow="Review de design"
          title="Progresso da sprint"
          trailing={
            <ProgressRing value={0.75} size={48} thickness={5} label="Sprint 75%">
                <span style={{ fontSize: 11, fontWeight: 700 }}>75%</span>
              </ProgressRing>
          }
        />
        <IslandCall variant="joined" name="Ana Lima" />
        <Island
          tone="danger"
          leading={<Icon name="heart" />}
          title="Bateria fraca"
          trailing={<BatteryMeter level={0.2} />}
        />
        <IslandRecording variant="wave" />
      </div>
      <div style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", gap: 12 }}>
        <IslandChip
          icon={<Icon name="star" />}
          value="6s"
          tone="gold"
          label="Café pronto em 6 segundos"
        />
        <IslandChip
          icon={<Icon name="play" />}
          value="45m"
          tone="success"
          label="Carregando, 45 minutos"
        />
        <IslandChip
          icon={<Icon name="search" />}
          value="46m"
          tone="info"
          label="Voo em 46 minutos"
        />
        <IslandChip
          icon={<Icon name="heart" />}
          value="86"
          tone="danger"
          label="Batimentos: 86"
        />
        <IslandChip
          icon={<Icon name="tag" />}
          value="22m"
          tone="violet"
          label="Entrega em 22 minutos"
        />
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Island> = {
  title: "Ilhas/Island",
  component: Island,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Ilha viva: pílula escura para atividades em andamento (chamada, timer, música, rota, entrega). É sempre escura em qualquer tema e herda a cor de destaque do tema. Use \`size\` (\`chip\`, \`pill\`, \`card\`), \`tone\`, e os slots \`leading\`, \`eyebrow\`, \`title\`, \`subtitle\` e \`trailing\`; \`live\` anuncia mudanças por leitor de tela. Esta página mostra a galeria completa.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Island> = { render: () => <LiveExample code={code} /> };
