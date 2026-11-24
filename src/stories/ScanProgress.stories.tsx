import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { ScanProgress } from "../index";

const code = `const pastas = ["C:\\\\Users\\\\ana\\\\AppData\\\\npm-cache", "C:\\\\Program Files\\\\Steam\\\\shadercache", "C:\\\\Windows\\\\WinSxS"];

function Demo() {
  const [state, setState] = useState("running");
  const [count, setCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (state === "done" || state === "cancelled") return;
    const id = setInterval(() => {
      setCount((c) => c + 180 + Math.random() * 260);
      setElapsed((e) => e + 0.1);
    }, 100);
    const stop = state === "stopping" ? setTimeout(() => setState("cancelled"), 900) : null;
    return () => {
      clearInterval(id);
      if (stop) clearTimeout(stop);
    };
  }, [state]);
  return (
    <div style={{ maxWidth: 480 }}>
      <ScanProgress
        count={count}
        elapsed={elapsed}
        current={pastas[Math.floor(elapsed) % 3] + "\\\\arquivo-" + Math.floor(count)}
        state={state}
        onCancel={() => setState("stopping")}
        onRestart={() => {
          setCount(0);
          setElapsed(0);
          setState("running");
        }}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof ScanProgress> = {
  title: "Feedback/ScanProgress",
  component: ScanProgress,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Números ao vivo de uma tarefa longa: itens, ritmo e tempo, com o item atual. O estado stopping cobre o intervalo entre cancelar e a parada real.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof ScanProgress> = { render: () => <LiveExample code={code} /> };
