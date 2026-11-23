import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { IslandTicker } from "../index";

const code = `const up = [
  61.2, 61.8, 61.5, 62.4, 62.1, 63.0, 62.6, 63.4, 63.1, 63.9, 63.6, 64.1, 63.8, 64.3,
  64.0, 64.6,
];
const down = [3.4, 3.38, 3.41, 3.36, 3.31, 3.33, 3.28, 3.25, 3.27, 3.22, 3.2, 3.18];

function Demo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 16,
      }}
    >
      <IslandTicker
        symbol="BTC"
        name="Bitcoin"
        price="$64.077"
        change="+$641,40"
        changePct={1.01}
        data={up}
        updated="há 2 min"
      />
      <IslandTicker
        symbol="ETH"
        name="Ethereum"
        price="$3.180"
        change="−$41,10"
        changePct={-1.27}
        data={down}
        updated="agora"
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof IslandTicker> = {
  title: "Ilhas/IslandTicker",
  component: IslandTicker,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Cotação ao vivo com preço, variação e minigráfico. O tom segue o sinal da variação: verde para alta, vermelho para queda.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof IslandTicker> = { render: () => <LiveExample code={code} /> };
