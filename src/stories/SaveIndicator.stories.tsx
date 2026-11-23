import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { SaveIndicator } from "../index";

const code = `const ST = ["dirty", "saving", "saved", "error"];
function Demo() {
  const [value, setValue] = useState("saving");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
      <Tabs
        variant="pill"
        label="Estado"
        items={ST.map((x) => ({ key: x, label: x }))}
        value={value}
        onChange={setValue}
      />
      <SaveIndicator state={value} error="Sem conexão" hideAfter={60000} />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof SaveIndicator> = {
  title: "Feedback/SaveIndicator",
  component: SaveIndicator,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Estado do salvamento automático (mika): \`dirty\` pisca um ponto, \`saving\` gira, \`saved\` aparece com mola e some em 3s, \`error\` vira \`role=alert\` com a mensagem no title.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof SaveIndicator> = { render: () => <LiveExample code={code} /> };
