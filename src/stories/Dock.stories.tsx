import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Dock } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState("home");
  return (
    <div style={{ paddingTop: 60 }}>
      <Dock
        position="inline"
        value={value}
        onChange={setValue}
        items={[
          { key: "home", label: "Início", icon: <Icon name="home" /> },
          { key: "lib", label: "Biblioteca", icon: <Icon name="grid" /> },
          { key: "fav", label: "Favoritos", icon: <Icon name="heart" />, count: 4 },
          {
            key: "deals",
            label: "Ofertas",
            icon: <Icon name="tag" />,
            count: 12,
            group: true,
          },
          { key: "stats", label: "Estatísticas", icon: <Icon name="chart" /> },
          { key: "prefs", label: "Ajustes", icon: <Icon name="gear" />, group: true },
        ]}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Dock> = {
  title: "Navegação/Dock",
  component: Dock,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Dock flutuante de navegação principal: ampliação sob o ponteiro, contadores, rótulo com tecla e atalhos 1–9. \`position="fixed"\` no app, \`inline\` em docs.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Dock> = { render: () => <LiveExample code={code} /> };
