import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { DirectionsCard } from "../index";

const code = `const steps = [
  { maneuver: "right", distance: "312 m", street: "Rua Monsenhor Rosa" },
  { maneuver: "slight-left", distance: "1,2 km", street: "Av. Champagnat" },
  { maneuver: "straight", distance: "4 km", street: "Rod. Cândido Portinari" },
  { maneuver: "uturn", distance: "80 m", street: "Retorno" },
];

function Demo() {
  const [i, setI] = useState(0);
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <DirectionsCard {...steps[i]} arrival="12:08" remaining="6 min" />
      <div>
        <Button size="sm" variant="secondary" onClick={() => setI((i + 1) % steps.length)}>
          Próxima manobra
        </Button>
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof DirectionsCard> = {
  title: "Widgets/DirectionsCard",
  component: DirectionsCard,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Navegação passo a passo: seta da manobra no \`ActivityIcon\`, distância, rua e chegada. É anunciado por leitor de tela a cada manobra.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof DirectionsCard> = { render: () => <LiveExample code={code} /> };
