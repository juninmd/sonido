import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { SpeechBubble } from "../index";

const code = `const FULL =
  "Amanhã faz 27° com sol pela manhã e pancadas de chuva depois das 17h. Leve o guarda-chuva!";
function Demo() {
  const [nValue, setNValue] = useState(0);
  React.useEffect(() => {
    const t = setInterval(() => {
      setNValue((v) => (v >= FULL.length ? v : v + 6));
    }, 140);
    return () => {
      clearInterval(t);
    };
  }, []);
  const done = nValue >= FULL.length;
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <SpeechBubble
        speaker="Mika"
        text={FULL.slice(0, nValue) || "…"}
        streaming={!done}
        tail="left"
        accent="var(--sn-color-aqua)"
        footer={
          done ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setNValue(0);
              }}
            >
              Repetir
            </Button>
          ) : null
        }
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <SpeechBubble text="Ponta à direita" tail="right" />
        <SpeechBubble
          text="Ponta embaixo"
          tail="bottom"
          accent="var(--sn-color-gold)"
        />
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof SpeechBubble> = {
  title: "Assistente/SpeechBubble",
  component: SpeechBubble,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Balão de fala do mika: vidro, ponta para qualquer lado, filete superior em gradiente na cor da emoção e streaming em que só o trecho novo aparece em fade, sem o texto pular.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof SpeechBubble> = { render: () => <LiveExample code={code} /> };
