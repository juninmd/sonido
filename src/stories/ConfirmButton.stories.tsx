import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { ConfirmButton } from "../index";

const code = `function Demo() {
  const [solid, setSolid] = useState(0);
  const [inline, setInline] = useState(0);
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <ConfirmButton
          ask="Remover da biblioteca?"
          confirmLabel="Remover"
          onConfirm={() => setSolid(solid + 1)}
        >
          Remover jogo
        </ConfirmButton>
        <span style={{ color: "var(--sn-color-text-dim)", fontSize: 13 }}>
          {"Removidos: " + solid}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <ConfirmButton
          appearance="inline"
          ask="parar a sincronização?"
          confirmLabel="sim, parar"
          onConfirm={() => setInline(inline + 1)}
          style={{
            background: "var(--sn-color-surface-hover)",
            color: "var(--sn-color-text)",
            padding: "0 10px",
            borderRadius: 6,
            minHeight: 26,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          parar
        </ConfirmButton>
        <span style={{ color: "var(--sn-color-text-dim)", fontSize: 13 }}>
          {"Paradas: " + inline}
        </span>
      </div>
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
        component: `Ação destrutiva em dois passos, sem modal. Esc cancela, o foco vai para Cancelar e volta ao gatilho.

\`appearance="solid"\` (padrão) usa o \`Button\` do Sonido. \`appearance="inline"\` é o original do canto-widget: o gatilho não tem estilo próprio (o \`className\`/\`style\` do consumidor manda) e a pergunta vira uma caixa compacta com duas ações de texto.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof ConfirmButton> = { render: () => <LiveExample code={code} /> };
