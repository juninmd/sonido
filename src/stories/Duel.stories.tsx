import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Duel } from "../index";

const code = `function Demo() {
  const [aValue, setAValue] = useState(12);
  const [bValue, setBValue] = useState(9);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Duel
        a={{
          id: "a",
          name: "Ana Lima",
          score: aValue,
          detail: "2 mentiras · 5 acertos",
        }}
        b={{
          id: "b",
          name: "Bruno Reis",
          score: bValue,
          detail: "4 mentiras · 3 acertos",
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setAValue(aValue + 3);
          }}
        >
          +3 Ana
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setBValue(bValue + 3);
          }}
        >
          +3 Bruno
        </Button>
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Duel> = {
  title: "Dados/Duel",
  component: Duel,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Placar de duelo (treta-aovivo/eleicoes-radar): VS, coroa que cai e balança sobre o líder, anel dourado que brilha e rótulo "vencendo" anunciado por aria-live.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Duel> = { render: () => <LiveExample code={code} /> };
