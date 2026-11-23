import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { PresenceOrb } from "../index";

const code = `const ST = [
  "idle",
  "listening",
  "thinking",
  "speaking",
  "confirming",
  "error",
  "offline",
  "muted",
];
function Demo() {
  const t0 = performance.now();
  const lvl = () => {
    const t = (performance.now() - t0) / 1000;
    return Math.abs(Math.sin(t * 5) * Math.sin(t * 1.7));
  };
  const [state, setState] = useState("speaking");
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 22 }}>
        {ST.map((x) => (
          <PresenceOrb
            key={x}
            state={x}
            level={lvl}
            showLabel={false}
            onClick={() => {
              setState(x);
            }}
          />
        ))}
      </div>
      <PresenceOrb state={state} level={lvl} size={56} />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof PresenceOrb> = {
  title: "Assistente/PresenceOrb",
  component: PresenceOrb,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `O orbe de presença do mika: um único indicador para o estado do assistente. Ouvindo = anel que cresce com o nível do microfone; pensando = arco girando; falando = barras pela voz; confirmando/erro = anel que respira; offline = tracejado; mudo = ícone. \`level\` pode ser uma função lida a cada quadro: vai direto para \`--lvl\`, sem re-render.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof PresenceOrb> = { render: () => <LiveExample code={code} /> };
