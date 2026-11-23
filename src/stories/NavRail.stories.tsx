import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { NavRail } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState("lib");
  const [compact, setCompact] = useState(false);
  const G = [
    {
      title: "Assistir",
      items: [
        { key: "home", label: "Início", icon: <Icon name="home" /> },
        { key: "lib", label: "Biblioteca", icon: <Icon name="grid" />, badge: 248 },
        { key: "fav", label: "Favoritos", icon: <Icon name="heart" /> },
      ],
    },
    {
      title: "Descobrir",
      items: [
        { key: "deals", label: "Ofertas", icon: <Icon name="tag" />, badge: 3 },
        { key: "stats", label: "Estatísticas", icon: <Icon name="chart" /> },
      ],
    },
    {
      title: "Conta",
      items: [{ key: "me", label: "Perfil", icon: <Icon name="user" /> }],
    },
  ];
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <NavRail
        groups={G}
        value={value}
        onChange={setValue}
        compact={compact}
        brand={compact ? "S" : "Sonido"}
      />
      <Switch checked={compact} onChange={setCompact} label="Compacto" />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof NavRail> = {
  title: "Navegação/NavRail",
  component: NavRail,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Menu lateral agrupado por intenção. O item ativo ganha barra em gradiente, fundo suave e brilho no ícone. \`compact\` deixa só ícones (88px).`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof NavRail> = { render: () => <LiveExample code={code} /> };
