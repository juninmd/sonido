import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { MeterCard } from "../index";

const code = `function Demo() {
  const logo = (t) => <b style={{ fontSize: 11 }}>{t}</b>;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
        gap: 14,
      }}
    >
      <MeterCard
        index={0}
        title="Claude"
        logo={logo("C")}
        pct={42}
        rows={[
          { key: "5h", label: "Sessão (5h)", pct: 42, renew: "renova em 3h" },
          { key: "w", label: "Semana", pct: 28, renew: "seg" },
        ]}
        note="Tudo tranquilo"
      />
      <MeterCard
        index={1}
        title="Codex"
        logo={logo("X")}
        pct={81}
        rows={[
          {
            key: "5h",
            label: "Sessão (5h)",
            pct: 81,
            renew: "renova em 40 min",
            soon: true,
          },
          { key: "w", label: "Semana", pct: 55 },
        ]}
        note="Perto do limite"
      />
      <MeterCard
        index={2}
        title="Gemini"
        logo={logo("G")}
        pct={96}
        rows={[
          {
            key: "d",
            label: "Diário",
            pct: 96,
            renew: "renova em 12 min",
            soon: true,
            detail: "48 de 50 pedidos",
          },
        ]}
        note="Limite quase esgotado"
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof MeterCard> = {
  title: "Dados/MeterCard",
  component: MeterCard,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Cartão de cota e consumo do ai-session-monitor: anel que se desenha, barras por janela, selo de renovação com brilho que percorre (e respira quando \`soon\`), ponto que pulsa no crítico e entrada em cascata por \`index\`. 75% vira aviso, 90% crítico.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof MeterCard> = { render: () => <LiveExample code={code} /> };
