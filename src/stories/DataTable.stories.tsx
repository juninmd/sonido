import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { DataTable } from "../index";

const code = `const rows = [
  { id: "1", t: "Hades", h: 62, r: 4.9, s: "Zerado" },
  { id: "2", t: "Celeste", h: 18, r: 4.7, s: "Jogando" },
  { id: "3", t: "Outer Wilds", h: 24, r: 4.8, s: "Zerado" },
  { id: "4", t: "Disco Elysium", h: 41, r: 4.6, s: "Pausado" },
];
const tone = { Zerado: "success", Jogando: "aqua", Pausado: "warning" };
function Demo() {
  return (
    <DataTable
      label="Jogos"
      rows={rows}
      rowKey={(r) => r.id}
      columns={[
        { key: "t", label: "Título", render: (r) => r.t, sort: (r) => r.t },
        {
          key: "s",
          label: "Status",
          render: (r) => (
            <Badge tone={tone[r.s]} dot>
              {r.s}
            </Badge>
          ),
        },
        {
          key: "h",
          label: "Horas",
          align: "end",
          render: (r) => r.h + "h",
          sort: (r) => r.h,
        },
        {
          key: "r",
          label: "Nota",
          align: "end",
          render: (r) => r.r.toFixed(1),
          sort: (r) => r.r,
        },
      ]}
    />
  );
}

render(<Demo />);
`;

const meta: Meta<typeof DataTable> = {
  title: "Dados/DataTable",
  component: DataTable,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Tabela com cabeçalho fixo e ordenação por coluna (asc → desc → nenhuma), anunciada via \`aria-sort\`. Colunas declaram \`render\` e opcionalmente \`sort\`.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof DataTable> = { render: () => <LiveExample code={code} /> };
