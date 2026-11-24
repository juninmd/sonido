import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { BlackHole } from "../index";

const code = `function Demo() {
  const [freed, setFreed] = useState(0);
  const engolir = () => {
    setFreed(null);
    setTimeout(() => setFreed(18.4 * 1024 ** 3), 1800);
  };
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
      <BlackHole freed={freed} />
      <Button variant="primary" size="sm" onClick={engolir} disabled={freed === null}>
        Engolir 18,4 GB
      </Button>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof BlackHole> = {
  title: "Movimento/BlackHole",
  component: BlackHole,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Buraco negro em canvas para ações destrutivas: gira rápido enquanto apaga (freed = null) e conta até o total no fim. Respeita a preferência de movimento.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof BlackHole> = { render: () => <LiveExample code={code} /> };
