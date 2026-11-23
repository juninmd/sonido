import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { AmbientBackdrop } from "../index";

const code = `function Demo() {
  const [cValue, setCValue] = useState(0);
  const P = [null, ["#3fe3d3", "#7c5cff"], ["#ff8a4c", "#f5b73d"]];
  return (
    <div
      style={{
        position: "relative",
        height: 180,
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid var(--sn-color-border)",
      }}
    >
      <AmbientBackdrop position="absolute" colors={P[cValue] || undefined} />
      <div style={{ position: "relative", padding: 24, display: "grid", gap: 12 }}>
        <div
          style={{
            font: "800 32px/1 var(--sn-font-display)",
            letterSpacing: "-0.02em",
          }}
        >
          {cValue === 0 ? "Cores do tema" : "Cores da capa"}
        </div>
        <div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setCValue((cValue + 1) % 3);
            }}
          >
            Trocar cores
          </Button>
        </div>
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof AmbientBackdrop> = {
  title: "Superfícies/AmbientBackdrop",
  component: AmbientBackdrop,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Fundo decorativo com duas manchas desfocadas e vinheta. Sem \`colors\`, usa \`--sn-amb-1/2\` do tema (violeta e coral no padrão; vermelho e osso no Hueco Mundo). Passe cores da capa em foco para tingir a página.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof AmbientBackdrop> = { render: () => <LiveExample code={code} /> };
