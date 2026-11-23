import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { AlertCard } from "../index";

const code = `const K = Object.keys(ALERT_PRESETS);
const T = {
  meeting: ["Daily em 2 min", "Google Meet · 10:00"],
  task: ["Tarefa concluída", "Revisar PR do Sonido"],
  ciFail: ["CI falhou", "juninmd/sonido · build"],
  conflict: ["Conflito no PR #42", "main mudou"],
  approved: ["PR aprovado", "Pode fazer merge"],
  mention: ["Você foi mencionado", "em #design"],
  status: ["Serviço instável", "API da Steam lenta"],
  morning: ["Bom dia!", "3 reuniões e 5 tarefas hoje"],
  rain: ["Chuva às 17h", "Leve o guarda-chuva"],
  flood: ["Alerta de alagamento", "Defesa Civil · Franca"],
  storm: ["Tempestade", "Raios e rajadas de 60 km/h"],
  snow: ["Neve", "Improvável, mas lindo"],
  cold: ["Frio intenso", "Mín de 4°"],
  heat: ["Calor extremo", "38° às 15h"],
  dry: ["Ar seco", "Umidade 18%"],
  wind: ["Ventania", "Rajadas de 70 km/h"],
  uv: ["UV extremo", "Índice 11"],
  smoke: ["Fumaça", "Qualidade do ar ruim"],
  fog: ["Neblina", "Visibilidade baixa na rodovia"],
};
function Demo() {
  const [kValue, setKValue] = useState("storm");
  const [checked, setChecked] = useState(true);
  const [nValue, setNValue] = useState(0);
  const p = ALERT_PRESETS[kValue];
  const tone = /ciFail|flood|storm|heat/.test(kValue)
    ? "danger"
    : /conflict|status|cold|wind|uv|dry|smoke/.test(kValue)
      ? "warn"
      : "accent";
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Select
          label="Tipo"
          value={kValue}
          onChange={(v) => {
            setKValue(v);
            setNValue(nValue + 1);
          }}
          options={K.map((x) => ({ value: x, label: T[x][0] }))}
        />
        <Switch checked={checked} onChange={setChecked} label="Grave" />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setNValue(nValue + 1);
          }}
        >
          Reenviar
        </Button>
      </div>
      <AlertCard
        key={kValue + nValue + checked}
        title={T[kValue][0]}
        meta="agora"
        scene={p.scene}
        enter={p.enter}
        sky={p.sky}
        tone={tone}
        severe={checked}
        icon={<Icon name="mail" />}
        actions={[
          <Button key={1} size="sm">
            Abrir
          </Button>,
          <Button key={2} size="sm" variant="ghost">
            Dispensar
          </Button>,
        ]}
      >
        {T[kValue][1]}
      </AlertCard>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 12,
        }}
      >
        {["meeting", "approved", "wind", "flood"].map((x, i) => {
          const q = ALERT_PRESETS[x];
          return (
            <AlertCard
              key={x}
              title={T[x][0]}
              meta={"10:0" + i}
              scene={q.scene}
              enter={q.enter}
              sky={q.sky}
              tone={x === "flood" ? "danger" : "accent"}
            >
              {T[x][1]}
            </AlertCard>
          );
        })}
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof AlertCard> = {
  title: "Widgets/AlertCard",
  component: AlertCard,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Notificação viva do canto-widget. Cada tipo tem entrada própria (drop, shake, gust, rise, frost, mist, glow) e cena em canvas atrás: calendário pulsando para reunião, ticks para tarefa, blocos para CI, ramos para conflito, faíscas para aprovação, bolhas para menção, batimento para status, raios de sol para o resumo da manhã e 11 cenas de clima (chuva, enchente, tempestade, neve, frio, calor, seca, vento, UV, fumaça, neblina). \`severe\` soma anel pulsante e vinheta de alarme. \`ALERT_PRESETS\` mapeia tipo para cena/entrada/céu.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof AlertCard> = { render: () => <LiveExample code={code} /> };
