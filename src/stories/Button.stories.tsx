import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Button } from "../index";

const code = `function Demo() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Button>Salvar</Button>
        <Button variant="secondary">Cancelar</Button>
        <Button variant="ghost">Ver mais</Button>
        <Button variant="danger">Excluir</Button>
        <Button variant="link">Detalhes</Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Button
          press
          size="lg"
          iconStart={<Icon name="star" />}
          onClick={(e) => {
            burst(e.currentTarget);
          }}
        >
          Concluir lição
        </Button>
        <Button size="sm" variant="secondary">
          Pequeno
        </Button>
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1500);
          }}
        >
          Sincronizar
        </Button>
        <Button size="icon" variant="secondary" aria-label="Favoritar">
          <Icon name="heart" />
        </Button>
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Button> = {
  title: "Ações/Button",
  component: Button,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Botão base para toda ação. Use um \`primary\` por área; \`press\` dá a sombra tátil para CTAs de jogo/lição; \`loading\` desabilita e anuncia \`aria-busy\`. Combine com \`burst()\` para celebrar uma conquista.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Button> = { render: () => <LiveExample code={code} /> };
