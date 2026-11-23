import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Avatar } from "../index";

const code = `function Demo() {
  const n = [
    "Ana Lima",
    "Bruno Reis",
    "Carla Souza",
    "Diego Alves",
    "Eva Martins",
    "Fábio Nunes",
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
      <Avatar name="Antonio Junior" size={56} status="online" ring />
      <Avatar name="Ana Lima" status="away" />
      <Avatar name="Bruno Reis" status="busy" />
      <AvatarGroup max={4}>
        {n.map((x) => (
          <Avatar key={x} name={x} />
        ))}
      </AvatarGroup>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Avatar> = {
  title: "Exibição/Avatar",
  component: Avatar,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Foto ou iniciais com cor estável derivada do nome, status e anel. \`AvatarGroup\` empilha e mostra +N.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Avatar> = { render: () => <LiveExample code={code} /> };
