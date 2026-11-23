import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { RadialMenu } from "../index";

const code = `function Demo() {
  const [open, setOpen] = useState(true);
  const [lValue, setLValue] = useState("—");
  const it = (k, lb, i, t, a) => ({
    key: k,
    label: lb,
    icon: <Icon name="i" />,
    tone: t,
    active: a,
    onSelect: () => {
      setLValue(lb);
    },
  });
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <RadialMenu
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        radius={110}
        hub={
          <PresenceOrb
            state="idle"
            showLabel={false}
            size={52}
            onClick={() => {
              setOpen(!open);
            }}
          />
        }
        items={[
          it("chat", "Conversar", "mail", "info"),
          it("mic", "Microfone", "play", "success", true),
          it("fav", "Favoritos", "heart", "danger"),
          it("search", "Buscar", "search", "aqua"),
          it("stats", "Uso", "chart", "gold"),
          it("prefs", "Ajustes", "gear", "violet"),
        ]}
      />
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          fontSize: 13,
          color: "var(--sn-color-text-dim)",
        }}
      >
        {"Clique no orbe. Escolhido: "}
        <b>{lValue}</b>
      </span>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof RadialMenu> = {
  title: "Assistente/RadialMenu",
  component: RadialMenu,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Menu radial do mika (NeuralWheel): nós de vidro em círculo, linhas finas até o centro, entrada em mola girando e rótulo no hover/foco. Setas giram o foco, Enter escolhe, Esc ou clique fora fecha.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof RadialMenu> = { render: () => <LiveExample code={code} /> };
