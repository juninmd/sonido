import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { CountUp } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState(1248);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
      <div
        style={{ font: "800 46px/1 var(--sn-font-display)", letterSpacing: "-0.03em" }}
      >
        <CountUp value={value} />
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          setValue(Math.round(Math.random() * 5000));
        }}
      >
        Sortear
      </Button>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof CountUp> = {
  title: "Dados/CountUp",
  component: CountUp,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Número que anima até o valor com easeOutExpo; instantâneo com reduced-motion. Formata com Intl (pt-BR por padrão).`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof CountUp> = { render: () => <LiveExample code={code} /> };
