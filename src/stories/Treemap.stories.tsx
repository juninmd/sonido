import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Treemap } from "../index";

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
  return <Treemap data={disco} label="Uso do disco C:" height={300} />;
}

render(<Demo />);
`;

const meta: Meta<typeof Treemap> = {
  title: "Dados/Treemap",
  component: Treemap,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Mapa de blocos proporcional ao tamanho, vindo do faxina. Clique ou Enter abre a pasta, setas andam pelos vizinhos e Backspace volta. O layout é squarified, sem d3.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Treemap> = { render: () => <LiveExample code={code} /> };
