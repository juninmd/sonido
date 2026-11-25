import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { CommandPalette } from "../index";

const code = `function Demo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("nada ainda");
  const cmd = (id, label, group, i, hint) => ({
    id: id,
    label: label,
    group: group,
    icon: <Icon name="i" />,
    hint: hint,
    run: () => {
      setLast(label);
    },
  });
  const C = [
    cmd("home", "Ir para Início", "Navegar", "home", "1"),
    cmd("lib", "Abrir Biblioteca", "Navegar", "grid", "2"),
    cmd("stats", "Ver Estatísticas", "Navegar", "chart", "3"),
    cmd("add", "Adicionar jogo", "Ações", "plus"),
    cmd("theme", "Alternar tema", "Ações", "moon"),
    cmd("prefs", "Preferências", "Conta", "gear"),
  ];
  const games = ["Hollow Knight", "Hades", "Celeste", "Outer Wilds", "Elden Ring", "Hi-Fi Rush"];
  // Itens dinâmicos: a função recebe a busca e devolve a lista já filtrada (aqui, até 3 jogos).
  const commands = (q) => {
    const fixed = C.filter((c) => defaultCommandFilter(c, q));
    if (!q.trim()) return fixed;
    const found = games
      .filter((g) => foldText(g).includes(foldText(q.trim())))
      .slice(0, 3)
      .map((g) => cmd(\`game:\${g}\`, g, "Jogos", "game"));
    return [...fixed, ...found];
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        iconStart={<Icon name="search" />}
      >
        Abrir paleta
      </Button>
      <span style={{ color: "var(--sn-color-text-dim)", fontSize: 13 }}>
        {"ou "}
        <Kbd>Ctrl</Kbd> <Kbd>K</Kbd>
        {" · último: "}
        <b style={{ color: "var(--sn-color-text)" }}>{last}</b>
      </span>
      <CommandPalette
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        commands={commands}
        limit={8}
        emptyText={(q) => \`Nada encontrado para “\${q}”.\`}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof CommandPalette> = {
  title: "Navegação/CommandPalette",
  component: CommandPalette,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Paleta de comandos (Ctrl/⌘+K) sobre \`<dialog>\`: busca que ignora acentos, grupos, ↑↓ e Enter, combobox + listbox com \`aria-activedescendant\`. Para itens dinâmicos passe \`commands\` como função da busca; \`filter\` troca o filtro padrão e \`limit\` corta os resultados.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof CommandPalette> = { render: () => <LiveExample code={code} /> };
