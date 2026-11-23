import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Select } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState("pt");
  return (
    <div style={{ maxWidth: 320 }}>
      <Select
        label="Idioma"
        value={value}
        onChange={setValue}
        hint="Usado nas legendas."
        options={[
          { value: "pt", label: "Português" },
          { value: "en", label: "Inglês" },
          { value: "es", label: "Espanhol" },
        ]}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Select> = {
  title: "Formulários/Select",
  component: Select,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Select nativo estilizado: bom em celular e acessível de graça. Rótulo, dica e chevron.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Select> = { render: () => <LiveExample code={code} /> };
