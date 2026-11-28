import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { FilterChips } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState("pc");
  const [multi, setMulti] = useState(["rpg"]);
  return (
    <div style={{ display: "grid", gap: 12 }}>
    <FilterChips
      label="Plataforma"
      value={value}
      onChange={setValue}
      allLabel="Todos"
      allCount={248}
      chips={[
        { key: "pc", label: "PC", count: 131, icon: <Icon name="grid" /> },
        { key: "ps", label: "PlayStation", count: 64 },
        { key: "sw", label: "Switch", count: 38 },
        { key: "retro", label: "Retrô", count: 15 },
      ]}
    />
    <FilterChips
      multiple
      label="Gêneros"
      values={multi}
      onChangeValues={setMulti}
      allLabel="Todos"
      chips={[
        { key: "rpg", label: "RPG", count: 42 },
        { key: "acao", label: "Ação", count: 31 },
        { key: "puzzle", label: "Puzzle", count: 18 },
        { key: "indie", label: "Indie", count: 27 },
      ]}
    />
    </div>
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
        component: `Grupo de filtro com \`aria-pressed\`. No modo simples, clicar no chip ativo volta a \`null\` (todos); com \`multiple\`, cada chip liga/desliga sozinho e "Todos" limpa a seleção. Use \`allLabel\` para o chip "Todos"; cada chip aceita um \`icon\` decorativo.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof FilterChips> = { render: () => <LiveExample code={code} /> };
