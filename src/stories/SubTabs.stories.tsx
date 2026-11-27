import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { SubTabs } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState("desejos");
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <SubTabs
        label="Seções da Steam"
        value={value}
        onChange={setValue}
        items={[
          { key: "loja", label: "Loja" },
          { key: "desejos", label: "Desejos", badge: 12 },
          { key: "jogos", label: "Jogos" },
          { key: "atualizacoes", label: "Atualizações", badge: 1, tone: "hot" },
        ]}
      />
      <SubTabs
        label="Densidade"
        dense
        value={value}
        onChange={setValue}
        items={[
          { key: "loja", label: "Loja" },
          { key: "desejos", label: "Desejos", badge: 12 },
          { key: "jogos", label: "Jogos" },
        ]}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof SubTabs> = {
  title: "Navegação/SubTabs",
  component: SubTabs,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Controle segmentado pequeno, do tamanho de uma linha, para as sub-abas de um painel (Status, GitHub, Steam). Porte do \`SubTabs\` do canto-widget: pílula compacta, contador, tom \`hot\` para novidade, \`dense\` para dividir a largura e \`iconsOnly\` para mostrar só o ícone até a seleção. Foco itinerante com setas, Home e End.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof SubTabs> = { render: () => <LiveExample code={code} /> };
