import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Breadcrumb } from "../index";

const code = `function Demo() {
  return (
    <Breadcrumb
      items={[
        { label: "Início", href: "#" },
        { label: "Biblioteca", href: "#" },
        { label: "RPG", href: "#" },
        { label: "Hollow Knight" },
      ]}
    />
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Breadcrumb> = {
  title: "Navegação/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    sonido: { code },
    docs: {
      description: { component: `Trilha de navegação em \`<nav>\` com \`aria-current="page"\` no último item.` },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Breadcrumb> = { render: () => <LiveExample code={code} /> };
