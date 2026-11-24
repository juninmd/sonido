import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Sunburst } from "../index";

const code = `const GB = 1024 ** 3;
const disco = {
  name: "C:",
  children: [
    {
      name: "Users",
      children: [
        { name: "Downloads", children: [{ name: "iso", value: 18 * GB }, { name: "vídeos", value: 9.4 * GB }] },
        { name: "AppData", children: [{ name: "npm-cache", value: 7.8 * GB }, { name: "Temp", value: 5.5 * GB }] },
        { name: "Projetos", children: [{ name: "node_modules", value: 14.2 * GB }, { name: "target", value: 8.6 * GB }] },
        { name: "Fotos", value: 22 * GB },
      ],
    },
    { name: "Windows", children: [{ name: "WinSxS", value: 11 * GB }, { name: "System32", value: 6 * GB }] },
    { name: "Program Files", children: [{ name: "Steam", value: 48 * GB }, { name: "Adobe", value: 9 * GB }] },
    { name: "pagefile.sys", value: 16 * GB },
  ],
};

function Demo() {
  return <Sunburst data={disco} label="Anéis do disco C:" size={320} />;
}

render(<Demo />);
`;

const meta: Meta<typeof Sunburst> = {
  title: "Dados/Sunburst",
  component: Sunburst,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Anéis hierárquicos, vindo do faxina. Clique num anel para entrar e no centro para voltar; o centro mostra o anel sob o mouse.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Sunburst> = { render: () => <LiveExample code={code} /> };
