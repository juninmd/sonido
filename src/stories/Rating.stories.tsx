import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Rating } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState(4);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 28 }}>
      <Rating value={value} onChange={setValue} label="Sua nota" size={26} />
      <Rating value={3.6} label="Média da comunidade" />
      <span style={{ color: "var(--sn-color-text-dim)", fontSize: 13 }}>
        {"Sua nota: " + value}
      </span>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Rating> = {
  title: "Formulários/Rating",
  component: Rating,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Estrelas em gold (gold = avaliação). Sem \`onChange\` mostra frações; com \`onChange\` vira radiogroup com setas.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Rating> = { render: () => <LiveExample code={code} /> };
