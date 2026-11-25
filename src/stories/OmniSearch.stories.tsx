import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { OmniSearch } from "../index";

const code = `function Demo() {
  const words = { ps2: "plataforma", switch: "plataforma", zerado: "status", steam: "loja" };
  const [text, setText] = useState("");
  const [chips, setChips] = useState([{ key: "ps2", label: "PS2", kind: "plataforma", color: "var(--sn-color-info)" }]);
  const absorb = (value) => {
    const parts = value.split(" ");
    const done = parts.slice(0, -1).filter((w) => words[w.toLowerCase()]);
    if (done.length) {
      setChips((c) => [...c, ...done.map((w) => ({ key: w.toLowerCase(), label: w, kind: words[w.toLowerCase()] }))]);
    }
    setText(parts.filter((w, i) => i === parts.length - 1 || !words[w.toLowerCase()]).join(" "));
  };
  return (
    <div style={{ maxWidth: 560 }}>
      <OmniSearch
        label="Buscar e filtrar jogos"
        placeholder={chips.length ? "Refinar…" : "Busque ou filtre: “ps2 zerado”…"}
        hint="Plataforma, status ou loja viram filtros ao apertar espaço. Backspace no campo vazio desfaz o último."
        value={text}
        onChange={absorb}
        chips={chips}
        onRemoveChip={(chip, { retype }) => {
          setChips((c) => c.filter((x) => x.key !== chip.key));
          if (retype) setText(chip.label);
        }}
        onClear={() => {
          setChips([]);
          setText("");
        }}
        suggestionsTitle="Filtros rápidos · digite e aperte espaço"
        suggestions={Object.keys(words).filter((w) => !chips.some((c) => c.key === w))}
        onPickSuggestion={(w) => absorb(\`\${text} \${w} \`.trimStart())}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof OmniSearch> = {
  title: "Formulários/OmniSearch",
  component: OmniSearch,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Busca principal com filtros: o app decide quais palavras viram chips removíveis; Backspace no campo vazio desfaz o último, "/" foca, Esc limpa e as sugestões aparecem com o campo em foco.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof OmniSearch> = { render: () => <LiveExample code={code} /> };
