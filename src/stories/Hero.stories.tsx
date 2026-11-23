import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Hero } from "../index";

const code = `function Demo() {
  const [kValue, setKValue] = useState(0);
  return (
    <Hero
      key={kValue}
      eyebrow="Continue de onde parou"
      title="Outer Wilds Echoes of the Eye"
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
    />
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
        component: `Destaque do topo da página: eyebrow, título com palavras que sobem em sequência, metadados, ações e um \`aside\` (capa ou anel). Sem \`backdrop\`, usa as cores de ambiente do tema.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Hero> = { render: () => <LiveExample code={code} /> };
