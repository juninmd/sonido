import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Alert } from "../index";

const code = `function Demo() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Alert title="Nova versão disponível" tone="info">
        Reinicie o app para atualizar para a 2.4.
      </Alert>
      <Alert tone="success" title="Biblioteca sincronizada" />
      <Alert tone="warning" title="Pouco espaço em disco">
        Restam 2 GB na unidade D:.
      </Alert>
      <Alert
        tone="danger"
        title="Não foi possível conectar à Steam"
        action={
          <Button size="sm" variant="secondary">
            Tentar de novo
          </Button>
        }
      >
        Verifique sua conexão.
      </Alert>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Mensagem em linha. \`danger\` usa \`role=alert\`; os outros, \`role=status\`. Diga o que aconteceu e como resolver; \`action\` para o próximo passo.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Alert> = { render: () => <LiveExample code={code} /> };
