import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { RadialClock } from "../index";

const code = `const hist = [
  3, 2, 1, 1, 0, 1, 2, 4, 6, 5, 4, 4, 5, 6, 5, 6, 8, 10, 14, 16, 15, 12, 8, 5,
];
function Demo() {
  return (
    <RadialClock
      hist={hist}
      label="Ocorrências por hora"
      caption="Passe o mouse ou use as setas."
    />
  );
}

render(<Demo />);
`;

const meta: Meta<typeof RadialClock> = {
  title: "Dados/RadialClock",
  component: RadialClock,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Relógio radial de 24 h (franca-segura): raio pela raiz da área, noite em violeta, pico de 3 h em vermelho, hover e setas destacam a hora.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof RadialClock> = { render: () => <LiveExample code={code} /> };
