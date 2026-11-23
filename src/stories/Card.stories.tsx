import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Card } from "../index";

const code = `function Demo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
        gap: 16,
      }}
    >
      <Card tilt>
        <CardHeader>
          <CardTitle>Hollow Knight</CardTitle>
          <Badge tone="aqua" dot>
            Jogando
          </Badge>
        </CardHeader>
        <CardBody>32h jogadas · 87% das conquistas</CardBody>
        <ProgressBar value={0.87} label="Conquistas" size="sm" />
        <CardFooter>
          <Button size="sm" iconStart={<Icon name="play" />}>
            Continuar
          </Button>
        </CardFooter>
      </Card>
      <Card surface="solid" interactive>
        <CardHeader>
          <CardTitle>Lição 12</CardTitle>
          <Badge tone="gold">+20 XP</Badge>
        </CardHeader>
        <CardBody>Passado simples · 15 exercícios</CardBody>
        <CardFooter>
          <Button size="sm" variant="secondary">
            Revisar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Card> = {
  title: "Superfícies/Card",
  component: Card,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Contêiner de conteúdo em vidro (\`glass\`) ou sólido. \`interactive\` eleva no hover; \`tilt\` adiciona inclinação 3D e spotlight (só com mouse e sem reduced-motion). Partes: CardHeader, CardTitle, CardBody, CardFooter.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Card> = { render: () => <LiveExample code={code} /> };
