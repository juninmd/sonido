import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Bento } from "../index";

const code = `function Demo() {
  const c = (t, w) => (
    <Card key={t} surface="solid" className={w ? "sn-bento__wide" : ""}>
      <CardTitle>{t}</CardTitle>
      <CardBody>{w ? "Ocupa duas colunas." : "Base de 220px."}</CardBody>
    </Card>
  );
  return (
    <Bento minItem={220}>
      {c("Agenda", true)}
      {c("Clima")}
      {c("Tarefas")}
      {c("Notas")}
      {c("Trânsito", true)}
    </Bento>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Bento> = {
  title: "Superfícies/Bento",
  component: Bento,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Grade bento do mika. \`auto\` usa flex que quebra (sem trilhas vazias quando sobra espaço); 1–3 colunas fixas também. Itens com \`.sn-bento__wide\` ocupam o dobro.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Bento> = { render: () => <LiveExample code={code} /> };
