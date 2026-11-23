import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Menu } from "../index";

const code = `function Demo() {
  const [lValue, setLValue] = useState("—");
  const it = (k, lb, i, sc, d) => ({
    key: k,
    label: lb,
    icon: i ? <Icon name="i" /> : null,
    shortcut: sc,
    danger: d,
    onSelect: () => {
      setLValue(lb);
    },
  });
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}
    >
      <Menu
        trigger="Ações"
        items={[
          it("fav", "Favoritar", "heart", "F"),
          it("tag", "Adicionar tag", "tag", "T"),
          it("share", "Compartilhar", "mail"),
          { key: "s", separator: true, label: "", onSelect: () => {} },
          it("del", "Remover da biblioteca", null, "Del", true),
        ]}
      />
      <span style={{ color: "var(--sn-color-text-dim)", fontSize: 13 }}>
        {"Escolhido: "}
        <b>{lValue}</b>
      </span>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Menu> = {
  title: "Navegação/Menu",
  component: Menu,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Menu suspenso acessível (botão + \`role=menu\`): setas, Home/End, Esc, Tab fecha, atalhos à direita e item \`danger\`. Usado pelo ThemeSwitcher.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Menu> = { render: () => <LiveExample code={code} /> };
