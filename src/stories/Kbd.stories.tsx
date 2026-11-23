import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Kbd } from "../index";

const code = `function Demo() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        color: "var(--sn-color-text-dim)",
        fontSize: 14,
        gap: 6,
      }}
    >
      <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd>
      <span style={{ margin: "0 10px 0 4px" }}>abre a paleta</span>
      <Kbd>/</Kbd>
      <span style={{ margin: "0 10px 0 4px" }}>busca</span>
      <Kbd>1</Kbd>–<Kbd>9</Kbd>
      <span style={{ marginLeft: 4 }}>dock</span>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Kbd> = {
  title: "Exibição/Kbd",
  component: Kbd,
  parameters: {
    sonido: { code },
    docs: {
      description: { component: `Tecla de atalho em linha, com borda inferior mais grossa para parecer tecla física.` },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Kbd> = { render: () => <LiveExample code={code} /> };
