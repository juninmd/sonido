import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Select } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState("pt");
  const [status, setStatus] = useState("playing");
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 320 }}>
      <Select
        label="Idioma"
        value={value}
        onChange={setValue}
        hint="Usado nas legendas."
        options={[
          { value: "pt", label: "Português" },
          { value: "en", label: "Inglês" },
          { value: "es", label: "Espanhol" },
          { value: "ja", label: "Japonês (em breve)", disabled: true },
        ]}
      />
      <Select
        compact
        hideLabel
        label="Status de Hollow Knight"
        value={status}
        onChange={setStatus}
        options={[
          { value: "backlog", label: "Na fila" },
          { value: "playing", label: "Jogando" },
          { value: "done", label: "Zerado" },
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
        component: `Select nativo estilizado: bom em celular e acessível de graça. Rótulo, dica e chevron. \`compact\` + \`hideLabel\` dão a versão em linha, com o rótulo só para leitores de tela. Opção com \`disabled\` aparece mas não pode ser escolhida.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Select> = { render: () => <LiveExample code={code} /> };
