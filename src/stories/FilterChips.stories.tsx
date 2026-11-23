import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { FilterChips } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState("pc");
  return (
    <FilterChips
      label="Plataforma"
      value={value}
      onChange={setValue}
      allLabel="Todos"
      allCount={248}
      chips={[
        { key: "pc", label: "PC", count: 131 },
        { key: "ps", label: "PlayStation", count: 64 },
        { key: "sw", label: "Switch", count: 38 },
        { key: "retro", label: "Retrô", count: 15 },
      ]}
    />
  );
}

render(<Demo />);
`;

const meta: Meta<typeof FilterChips> = {
  title: "Formulários/FilterChips",
  component: FilterChips,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Grupo de filtro de seleção única com \`aria-pressed\`. Clicar no chip ativo volta a \`null\` (todos). Use \`allLabel\` para o chip "Todos".`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof FilterChips> = { render: () => <LiveExample code={code} /> };
