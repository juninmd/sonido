import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { ToastProvider } from "../index";

const code = `function Inner() {
  const t = useToast();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <Button
        onClick={() => {
          t({ title: "Jogo adicionado", description: "Hades está na sua biblioteca." });
        }}
      >
        Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          t({ title: "Salvo", tone: "success" });
        }}
      >
        Sucesso
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          t({
            title: "Falha ao sincronizar",
            description: "Sem conexão com a Steam.",
            tone: "danger",
            action: { label: "Tentar", onClick: () => {} },
          });
        }}
      >
        Erro
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          t({
            title: "Movimento detectado",
            description: "Câmera da sala gravou um clipe.",
            tone: "danger",
            media: (
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #7c5cff, #ff3d6e)" }} />
            ),
          });
        }}
      >
        Com mídia
      </Button>
    </div>
  );
}
function Demo() {
  return (
    <ToastProvider>
      <Inner />
    </ToastProvider>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof ToastProvider> = {
  title: "Feedback/Toast",
  component: ToastProvider,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `\`ToastProvider\` uma vez no app e \`useToast()\` para disparar. Até 4 na pilha, somem em 4,5s (uma barra esvazia no rodapé e pausa no hover/foco, como no mika), com tom, descrição e ação opcionais. Anunciados por \`aria-live\`.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof ToastProvider> = { render: () => <LiveExample code={code} /> };
