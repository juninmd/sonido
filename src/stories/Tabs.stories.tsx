import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Tabs } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState("lib");
  const [value2, setValue2] = useState("grid");
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Tabs
        label="Seções"
        value={value}
        onChange={setValue}
        items={[
          { key: "lib", label: "Biblioteca", badge: 248 },
          { key: "wish", label: "Desejos", badge: 12 },
          { key: "stats", label: "Estatísticas" },
        ]}
      />
      <Tabs
        label="Visualização"
        variant="pill"
        value={value2}
        onChange={setValue2}
        items={[
          { key: "grid", label: "Grade" },
          { key: "list", label: "Lista" },
          { key: "table", label: "Tabela" },
        ]}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Tabs> = {
  title: "Navegação/Tabs",
  component: Tabs,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Tablist WAI-ARIA com foco itinerante (setas, Home, End). \`underline\` para seções de página; \`pill\` para alternar visualização. O consumidor renderiza os painéis com \`id="<idPrefix>-panel-<key>"\`.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Tabs> = { render: () => <LiveExample code={code} /> };
