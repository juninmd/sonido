import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Tray } from "../index";

const code = `const GB = 1024 ** 3;
const itens = [
  { id: "npm", label: "npm-cache", value: 7.8 * GB, color: "var(--sn-color-accent)" },
  { id: "rust", label: "target (rust)", value: 8.6 * GB, color: "var(--sn-color-accent-2)" },
  { id: "tmp", label: "Temp do Windows", value: 5.5 * GB, color: "var(--sn-color-aqua)" },
  { id: "iso", label: "ubuntu-24.04.iso", value: 6.1 * GB, color: "var(--sn-color-gold)" },
];

function Demo() {
  const [marcados, setMarcados] = useState(["rust"]);
  const alternar = (id, el, cor) => {
    if (marcados.includes(id)) setMarcados(marcados.filter((m) => m !== id));
    else {
      flyTo(el, "[data-sn-fly-target]", { color: cor });
      setMarcados([...marcados, id]);
    }
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "start" }}>
      <div style={{ display: "grid", gap: 8, flex: "1 1 260px" }}>
        {itens.map((it) => (
          <Button
            key={it.id}
            variant={marcados.includes(it.id) ? "primary" : "secondary"}
            size="sm"
            onClick={(e) => alternar(it.id, e.currentTarget, it.color)}
          >
            {marcados.includes(it.id) ? "Marcado" : "Marcar"} {it.label} · {formatBytes(it.value)}
          </Button>
        ))}
      </div>
      <div style={{ flex: "1 1 220px" }}>
        <Tray
          title="Vai sair do disco"
          items={itens.filter((it) => marcados.includes(it.id))}
          onRemove={(id) => setMarcados(marcados.filter((m) => m !== id))}
          onConfirm={() => setMarcados([])}
        />
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Tray> = {
  title: "Ações/Tray",
  component: Tray,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Bandeja que junta itens marcados em qualquer lugar da tela, mostra o total e confirma tudo com um botão. Combine com flyTo() para um cometa voar do clique até ela.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Tray> = { render: () => <LiveExample code={code} /> };
