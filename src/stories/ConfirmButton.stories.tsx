import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { ConfirmButton } from "../index";

const code = `function Demo() {
  const [dValue, setDValue] = useState(0);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <ConfirmButton
        ask="Remover da biblioteca?"
        confirmLabel="Remover"
        onConfirm={() => {
          setDValue(dValue + 1);
        }}
      >
        Remover jogo
      </ConfirmButton>
      <span style={{ color: "var(--sn-color-text-dim)", fontSize: 13 }}>
        {"Removidos: " + dValue}
      </span>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof ConfirmButton> = {
  title: "Ações/ConfirmButton",
  component: ConfirmButton,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Ação destrutiva em dois passos, sem modal. Esc cancela, o foco vai para Cancelar e volta ao gatilho.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof ConfirmButton> = { render: () => <LiveExample code={code} /> };
