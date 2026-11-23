import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { SearchField } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState("");
  return (
    <div style={{ maxWidth: 420 }}>
      <SearchField
        value={value}
        onChange={setValue}
        label="Buscar na biblioteca"
        placeholder="Buscar jogos, filmes, palavras…"
        shortcutHint
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof SearchField> = {
  title: "Formulários/SearchField",
  component: SearchField,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Campo de busca com rótulo oculto obrigatório. Esc limpa, ↓ chama \`onArrowDown\` para mover o foco à lista; o consumidor liga o atalho global \`/\`.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof SearchField> = { render: () => <LiveExample code={code} /> };
