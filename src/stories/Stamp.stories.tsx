import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Stamp } from "../index";

const code = `function Demo() {
  const [kValue, setKValue] = useState(0);
  return (
    <div
      key={kValue}
      style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18 }}
    >
      <Stamp tone="true">Verdadeiro</Stamp>
      <Stamp tone="false">Falso</Stamp>
      <Stamp tone="misleading">Enganoso</Stamp>
      <Stamp tone="imprecise">Impreciso</Stamp>
      <Stamp tone="none">Sem evidência</Stamp>
      <Stamp tone="pending">Checando…</Stamp>
      <Stamp tone="winner">★ Eleito</Stamp>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          setKValue(kValue + 1);
        }}
      >
        Carimbar de novo
      </Button>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Stamp> = {
  title: "Feedback/Stamp",
  component: Stamp,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Carimbo de veredito (treta-aovivo) que bate ao aparecer, e selo de vencedor com brilho (eleicoes-radar).`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Stamp> = { render: () => <LiveExample code={code} /> };
