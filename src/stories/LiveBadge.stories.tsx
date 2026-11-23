import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { LiveBadge } from "../index";

const code = `function Demo() {
  const [live, setLive] = useState(true);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18 }}>
      <LiveBadge live={live} />
      <span
        style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}
      >
        Ana falando
        <Equalizer active={live} color="var(--sn-color-aqua)" />
      </span>
      <span
        style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}
      >
        Bruno
        <Equalizer active={live} color="var(--sn-color-accent-2)" />
      </span>
      <Switch checked={live} onChange={setLive} label="Transmitindo" />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof LiveBadge> = {
  title: "Feedback/LiveBadge",
  component: LiveBadge,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Selo AO VIVO com ponto de tally e \`Equalizer\`, a onda de fala de 4 barras (treta-aovivo). Corrigido: com reduced-motion as barras ficam visíveis.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof LiveBadge> = { render: () => <LiveExample code={code} /> };
