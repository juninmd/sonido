import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { TextField } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState("juninmd@");
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
        gap: 16,
      }}
    >
      <TextField
        label="Nome da coleção"
        placeholder="Ex.: Zerar em 2027"
        hint="Aparece no topo da biblioteca."
      />
      <TextField
        label="E-mail"
        icon={<Icon name="mail" />}
        value={value}
        onChange={(x) => {
          setValue(x.target.value);
        }}
        error={
          /^\\S+@\\S+\\.\\S+$/.test(value)
            ? undefined
            : "Digite um e-mail válido, como nome@site.com."
        }
      />
      <TextField multiline label="Anotações" placeholder="O que você achou do final?" />
      <TextField compact hideLabel label="Nova tag" placeholder="+ tag (Enter)" style={{ width: 144 }} />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof TextField> = {
  title: "Formulários/TextField",
  component: TextField,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Campo de texto (ou \`multiline\`) com rótulo visível, dica e erro. O erro marca \`aria-invalid\` e substitui a dica; o texto do erro diz como corrigir. \`compact\` + \`hideLabel\` dão a versão em linha (32px), com o rótulo só para leitores de tela.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof TextField> = { render: () => <LiveExample code={code} /> };
