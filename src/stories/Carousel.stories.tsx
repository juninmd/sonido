import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Carousel } from "../index";

const code = `const T = [
  "Hades",
  "Celeste",
  "Inside",
  "Limbo",
  "Tunic",
  "Hollow Knight",
  "Cuphead",
  "Ori",
  "Fez",
  "Braid",
  "Journey",
  "Gris",
];
function Demo() {
  return (
    <Carousel
      title="Jogados recentemente"
      itemWidth={130}
      action={
        <Button variant="link" size="sm">
          Ver tudo
        </Button>
      }
    >
      {T.map((x) => (
        <Artwork key={x} title={x} />
      ))}
    </Carousel>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Carousel> = {
  title: "Superfícies/Carousel",
  component: Carousel,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Faixa horizontal com scroll-snap. As setas rolam uma página e desabilitam nas pontas; o título ganha a barra de acento em gradiente.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Carousel> = { render: () => <LiveExample code={code} /> };
