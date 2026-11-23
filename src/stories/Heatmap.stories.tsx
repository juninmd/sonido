import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Heatmap } from "../index";

const code = `const D = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const H = [];
for (let i = 0; i < 24; i++) H.push(String(i).padStart(2, "0"));
const data = D.map((_, d) =>
  H.map((_, h) => {
    const base = (h >= 18 && h <= 23 ? 6 : h >= 7 && h <= 9 ? 4 : 1) + (d >= 4 ? 3 : 0);
    return Math.max(0, Math.round(base + Math.sin(d * 3 + h) * 2));
  }),
);
function Demo() {
  return (
    <Heatmap
      data={data}
      rowLabels={D}
      colLabels={H}
      label="Ocorrências por dia e hora"
      format={(v) => v + " ocorrências"}
    />
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Heatmap> = {
  title: "Dados/Heatmap",
  component: Heatmap,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Mapa de calor (franca-segura): cinco faixas de uma matiz por quantis, para um dia extremo não achatar a escala; células entram em cascata.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Heatmap> = { render: () => <LiveExample code={code} /> };
