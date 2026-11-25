import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Accordion } from "../index";

const code = `function Demo() {
  const [last, setLast] = useState("a aberta");
  return (
    <div style={{ display: "grid", gap: 12 }}>
    <Accordion
      defaultOpen={["a"]}
      onToggle={(key, open) => {
        setLast(key + (open ? " aberta" : " fechada"));
      }}
      items={[
        {
          key: "a",
          title: "Como sincronizo a Steam?",
          content: "Em Ajustes, conecte sua conta e escolha as bibliotecas.",
        },
        {
          key: "b",
          title: "Posso usar offline?",
          content: "Sim. A biblioteca fica em cache e sincroniza ao voltar.",
        },
        {
          key: "c",
          title: "Quais temas existem?",
          content:
            "Oito: Sonido escuro e claro, Hueco Mundo, Canto, Canto claro, Drácula, Glass e Aurora.",
        },
      ]}
    />
    <span aria-live="polite">Última: {last}</span>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Accordion> = {
  title: "Superfícies/Accordion",
  component: Accordion,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Seções que abrem com \`grid-template-rows\` 0fr→1fr, sem medir altura. \`multiple\` permite várias abertas; \`onToggle(key, open)\` avisa cada clique.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Accordion> = { render: () => <LiveExample code={code} /> };
