import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import "../index";

const code = `function Demo() {
  const { pref, setPref, animate } = useMotionPref();
  const [n, setN] = useState(0);
  const contar = () => {
    const t0 = performance.now();
    const passo = (agora) => {
      const v = countValue(0, 48213, agora - t0, animate ? 1400 : 0);
      setN(v);
      if (v < 48213) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
      <RadioGroup
        label="Movimento"
        value={pref}
        onChange={setPref}
        options={Object.entries(MOTION_PREF_LABELS).map(([value, label]) => ({ value, label }))}
      />
      <div style={{ font: "800 40px/1 var(--sn-font-display)", fontVariantNumeric: "tabular-nums" }}>
        {Math.round(n).toLocaleString("pt-BR")}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button size="sm" onClick={contar}>Contar com easeOutCubic</Button>
        <span style={{ color: "var(--sn-color-text-dim)", fontSize: 13 }}>{animate ? "Animando" : "Sem animação"}</span>
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta = {
  title: "Movimento/useMotionPref",
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Preferência de movimento salva no navegador e compartilhada entre componentes: Sistema segue o reduced-motion, Sempre força animação, Nunca desliga. BlackHole e flyTo já obedecem. Inclui easeOutCubic e countValue para contagens.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj = { render: () => <LiveExample code={code} /> };
