import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { RadioGroup } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState("m");
  const [value2, setValue2] = useState("pro");
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
        gap: 16,
      }}
    >
      <RadioGroup
        label="Dificuldade"
        value={value}
        onChange={setValue}
        options={[
          { value: "f", label: "Fácil" },
          { value: "m", label: "Normal" },
          { value: "d", label: "Difícil", description: "Sem checkpoints" },
        ]}
      />
      <RadioGroup
        label="Plano"
        variant="cards"
        value={value2}
        onChange={setValue2}
        options={[
          { value: "free", label: "Grátis", description: "1 perfil" },
          { value: "pro", label: "Pro", description: "Perfis ilimitados" },
        ]}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof RadioGroup> = {
  title: "Formulários/RadioGroup",
  component: RadioGroup,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Grupo de opções em \`list\` ou \`cards\`, com navegação por setas (roving tabindex).`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof RadioGroup> = { render: () => <LiveExample code={code} /> };
