import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Hero } from "../index";

const code = `function Demo() {
  const [kValue, setKValue] = useState(0);
  const [collapsible, setCollapsible] = useState(false);
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Switch checked={collapsible} onChange={setCollapsible} label="Recolher ao rolar" />
    <Hero
      key={kValue}
      collapsible={collapsible}
      title="Outer Wilds Echoes of the Eye"
      poster={<Artwork title="Outer Wilds" />}
      meta={[
        <span key={1}>
          <b>24h</b>
          {" jogadas"}
        </span>,
        <span key={2}>Aventura · 2019</span>,
        <Rating key={3} value={4.5} label="Nota" size={16} />,
      ]}
      actions={[
        <Button key={1} press size="lg" iconStart={<Icon name="play" />}>
          Continuar
        </Button>,
        <Button
          key={2}
          variant="secondary"
          size="lg"
          onClick={() => {
            setKValue(kValue + 1);
          }}
        >
          Rever animação
        </Button>,
      ]}
      aside={
        <ProgressRing value={0.68} size={140} thickness={10} label="Progresso">
          68%
        </ProgressRing>
      }
    >
      Um laço temporal de 22 minutos e um sistema solar inteiro para entender.
    </Hero>
      {collapsible && <div style={{ height: 900 }} />}
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Hero> = {
  title: "Superfícies/Hero",
  component: Hero,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Destaque do topo da página: manchete em largura total com palavras que sobem em sequência, metadados, ações e um \`aside\` (capa ou anel). Sem \`backdrop\`, usa as cores de ambiente do tema. \`poster\` fica ao lado do título e \`children\` sob os metadados (ex.: sinopse). \`collapsible\` deixa o hero sticky e encolhendo com o scroll até sobrar uma faixa de \`collapsedHeight\` px (padrão 132), com o progresso em \`--sn-hero-p\`, a classe \`sn-hero--collapsed\` no fim e \`stickyOffset\` para descontar a barra do app; com movimento reduzido, só fica sticky.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Hero> = { render: () => <LiveExample code={code} /> };
