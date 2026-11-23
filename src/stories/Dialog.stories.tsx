import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Dialog } from "../index";

const code = `function Demo() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Abrir modal
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          setOpen2(true);
        }}
      >
        Abrir drawer
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="Adicionar jogo"
        description="Escolha a pasta onde o jogo está instalado."
        footer={[
          <Button
            key={1}
            variant="ghost"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>,
          <Button
            key={2}
            onClick={() => {
              setOpen(false);
            }}
          >
            Adicionar
          </Button>,
        ]}
      />
      <Dialog
        variant="drawer"
        open={open2}
        onClose={() => {
          setOpen2(false);
        }}
        title="Detalhes"
        description="Painel lateral para informações extras."
      >
        <ProgressRing value={0.72} label="Progresso" size={96}>
          72%
        </ProgressRing>
      </Dialog>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Dialog> = {
  title: "Superfícies/Dialog",
  component: Dialog,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Diálogo sobre \`<dialog>\` nativo (foco preso, Esc e clique no fundo fecham). \`drawer\` desliza da direita para detalhes.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Dialog> = { render: () => <LiveExample code={code} /> };
