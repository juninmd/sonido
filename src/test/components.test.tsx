import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  Artwork,
  accentStyle,
  Badge,
  Button,
  Card,
  Checkbox,
  ConfirmButton,
  DataTable,
  Dialog,
  FilterChips,
  hueFrom,
  initials,
  NavRail,
  PageHeader,
  SubTabs,
  Switch,
  Tabs,
  ToastProvider,
  useToast,
} from "..";

describe("Button", () => {
  it("dispara onClick e anuncia carregamento", () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Salvar</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Salvar" }));
    expect(onClick).toHaveBeenCalledOnce();
    rerender(
      <Button loading onClick={onClick}>
        Salvar
      </Button>,
    );
    const btn = screen.getByRole("button", { name: /Salvar/ });
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn).toBeDisabled();
  });

  it("o contorno compacto mantém a variante e o tamanho", () => {
    render(
      <Button appearance="outline" size="xs" variant="primary">
        Abrir terminal
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Abrir terminal" });
    expect(btn).toHaveClass("sn-button--outline", "sn-button--xs", "sn-button--primary");
    expect(btn).not.toHaveAttribute("appearance");
  });
});

describe("Tabs", () => {
  function Demo() {
    const [v, setV] = useState<"a" | "b" | "c">("a");
    return (
      <Tabs
        label="Seções"
        value={v}
        onChange={setV}
        items={[
          { key: "a", label: "Início" },
          { key: "b", label: "Biblioteca" },
          { key: "c", label: "Ajustes" },
        ]}
      />
    );
  }
  it("segue o padrão WAI-ARIA com setas, Home e End", () => {
    render(<Demo />);
    const first = screen.getByRole("tab", { name: "Início" });
    expect(first).toHaveAttribute("aria-selected", "true");
    expect(first).not.toHaveAttribute("aria-controls");
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Biblioteca" })).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(first, { key: "End" });
    expect(screen.getByRole("tab", { name: "Ajustes" })).toHaveAttribute("tabindex", "0");
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Início" })).toHaveAttribute("aria-selected", "true");
  });
});

describe("Switch e Checkbox", () => {
  it("Switch expõe role switch e aria-checked", () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} label="Alertas" />);
    const sw = screen.getByRole("switch", { name: "Alertas" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    fireEvent.click(sw);
    expect(onChange).toHaveBeenCalledWith(true);
  });
  it("Checkbox aceita estado indeterminado", () => {
    render(<Checkbox checked={false} indeterminate onChange={() => {}} label="Todos" />);
    expect((screen.getByRole("checkbox", { name: "Todos" }) as HTMLInputElement).indeterminate).toBe(true);
  });
});

describe("ConfirmButton", () => {
  it("pede confirmação antes de agir e cancela com Esc", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmButton ask="Remover?" confirmLabel="Remover" onConfirm={onConfirm}>
        Remover jogo
      </ConfirmButton>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Remover jogo" }));
    expect(onConfirm).not.toHaveBeenCalled();
    fireEvent.keyDown(screen.getByRole("group"), { key: "Escape" });
    expect(screen.getByRole("button", { name: "Remover jogo" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remover jogo" }));
    fireEvent.click(screen.getByRole("button", { name: "Remover" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("a variante inline mantém o gatilho do consumidor e as duas ações de texto", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmButton
        appearance="inline"
        ask="parar a sincronização?"
        confirmLabel="sim, parar"
        cancelLabel="cancelar"
        onConfirm={onConfirm}
        className="meu-gatilho"
      >
        parar
      </ConfirmButton>,
    );
    const trigger = screen.getByRole("button", { name: "parar" });
    expect(trigger).toHaveClass("sn-confirm__trigger", "meu-gatilho");
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("button", { name: "sim, parar" }));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "parar" })).toHaveFocus();
  });

  it("a variante inline fecha a pergunta quando o gatilho desabilita", () => {
    const { rerender } = render(
      <ConfirmButton appearance="inline" ask="parar?" confirmLabel="sim, parar" onConfirm={() => {}}>
        parar
      </ConfirmButton>,
    );
    fireEvent.click(screen.getByRole("button", { name: "parar" }));
    expect(screen.getByRole("group")).toBeInTheDocument();
    rerender(
      <ConfirmButton appearance="inline" ask="parar?" confirmLabel="sim, parar" onConfirm={() => {}} disabled>
        parar
      </ConfirmButton>,
    );
    expect(screen.queryByRole("group")).toBeNull();
    expect(screen.getByRole("button", { name: "parar" })).toBeDisabled();
  });
});

describe("SubTabs", () => {
  function Demo({ iconsOnly = false }: { iconsOnly?: boolean }) {
    const [value, setValue] = useState<"loja" | "desejos" | "jogos">("desejos");
    return (
      <SubTabs
        label="Seções da Steam"
        iconsOnly={iconsOnly}
        value={value}
        onChange={setValue}
        items={[
          { key: "loja", label: "Loja", icon: <span aria-hidden>L</span> },
          { key: "desejos", label: "Desejos", icon: <span aria-hidden>D</span>, badge: 12 },
          { key: "jogos", label: "Jogos", icon: <span aria-hidden>J</span> },
        ]}
      />
    );
  }

  it("segue o WAI-ARIA com setas, Home e End", () => {
    render(<Demo />);
    const selected = screen.getByRole("tab", { name: "Desejos" });
    expect(selected).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Loja" })).toHaveAttribute("tabindex", "-1");
    fireEvent.keyDown(selected, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Jogos" })).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(screen.getByRole("tab", { name: "Jogos" }), { key: "Home" });
    expect(screen.getByRole("tab", { name: "Loja" })).toHaveAttribute("aria-selected", "true");
  });

  it("o contador fica fora do nome acessível", () => {
    render(<Demo />);
    expect(screen.getByRole("tab", { name: "Desejos" })).toBeInTheDocument();
  });

  it("iconsOnly esconde o rótulo só até a seleção", () => {
    render(<Demo iconsOnly />);
    const loja = screen.getByRole("tab", { name: "Loja" });
    expect(loja.querySelector(".sn-visually-hidden")).not.toBeNull();
    expect(screen.getByRole("tab", { name: "Desejos" }).querySelector(".sn-visually-hidden")).toBeNull();
  });
});

describe("Toast", () => {
  it("anuncia o toast numa região aria-live", () => {
    function Trigger() {
      const toast = useToast();
      return <Button onClick={() => toast({ title: "Salvo", tone: "success" })}>Disparar</Button>;
    }
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Disparar" }));
    });
    expect(screen.getByText("Salvo")).toBeInTheDocument();
  });
  it("useToast fora do provider explica o erro", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    function Lost() {
      useToast();
      return null;
    }
    expect(() => render(<Lost />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });
});

describe("utilitários", () => {
  it("hueFrom é estável e fica entre 0 e 359", () => {
    expect(hueFrom("Hades")).toBe(hueFrom("Hades"));
    for (const t of ["", "a", "Hollow Knight", "Outer Wilds"]) {
      expect(hueFrom(t)).toBeGreaterThanOrEqual(0);
      expect(hueFrom(t)).toBeLessThan(360);
    }
  });
  it("initials pega até duas palavras", () => {
    expect(initials("Antonio Junior Silva")).toBe("AJ");
    expect(initials("  ana ")).toBe("A");
  });
  it("accentStyle recolore accent, gradiente e anel", () => {
    const s = accentStyle(190) as Record<string, string>;
    expect(s["--sn-color-accent"]).toBe("hsl(190 85% 62%)");
    expect(s["--sn-color-accent-2"]).toContain("hsl(230");
    expect(s["--sn-gradient"]).toMatch(/^linear-gradient/);
  });
  it("Badge live mostra o ponto pulsante", () => {
    const { container } = render(
      <Badge tone="accent" live>
        Ao vivo
      </Badge>,
    );
    expect(screen.getByText("Ao vivo")).toBeInTheDocument();
    expect(container.querySelector(".sn-badge__dot")).toHaveAttribute("data-live", "true");
  });

  it("Badge count usa o contador compacto", () => {
    render(<Badge appearance="count">12</Badge>);
    expect(screen.getByText("12")).toHaveClass("sn-badge--count");
  });
});

describe("PageHeader", () => {
  it("a variante accent adiciona a lavada e mantém o rótulo da seção", () => {
    const { container } = render(<PageHeader accent title="Visão geral" description="Resumo" />);
    expect(screen.getByRole("region", { name: "Visão geral" })).toHaveClass("sn-pagehead", "sn-pagehead--accent");
    expect(container.querySelector(".sn-pagehead__title")).toHaveTextContent("Visão geral");
  });

  it("sem accent fica na superfície padrão", () => {
    const { container } = render(<PageHeader title="Simples" />);
    expect(container.querySelector(".sn-pagehead")).not.toHaveClass("sn-pagehead--accent");
  });
});

describe("Toast com mídia", () => {
  it("renderiza a mídia à esquerda do texto", () => {
    function Trigger() {
      const toast = useToast();
      return <Button onClick={() => toast({ title: "Clipe", media: <img alt="" src="data:," /> })}>Disparar</Button>;
    }
    const { container } = render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    act(() => fireEvent.click(screen.getByRole("button", { name: "Disparar" })));
    expect(container.querySelector(".sn-toast__media img")).not.toBeNull();
  });
});

describe("DataTable extras", () => {
  type Row = { id: string; name: string };
  const columns = [{ key: "name", label: "Nome", render: (r: Row) => r.name }];

  it("aplica rowProps por linha", () => {
    render(
      <DataTable
        label="Itens"
        rows={[{ id: "1", name: "A" }]}
        rowKey={(r) => r.id}
        columns={columns}
        rowProps={(r) => ({ "aria-selected": true, className: `row-${r.id}` })}
      />,
    );
    const row = screen.getByRole("row", { name: "A" });
    expect(row).toHaveAttribute("aria-selected", "true");
    expect(row).toHaveClass("row-1");
  });

  it("mostra o slot vazio quando não há linhas", () => {
    render(<DataTable label="Vazia" rows={[] as Row[]} rowKey={(r) => r.id} columns={columns} empty="Nada aqui" />);
    expect(screen.getByText("Nada aqui")).toBeInTheDocument();
  });
});

describe("FilterChips", () => {
  it("modo simples alterna o chip", () => {
    function Demo() {
      const [v, setV] = useState<"a" | "b" | null>("a");
      return (
        <FilterChips
          label="Filtro"
          value={v}
          onChange={setV}
          chips={[
            { key: "a", label: "A" },
            { key: "b", label: "B" },
          ]}
        />
      );
    }
    render(<Demo />);
    fireEvent.click(screen.getByRole("button", { name: "B" }));
    expect(screen.getByRole("button", { name: "B" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "B" }));
    expect(screen.getByRole("button", { name: "B" })).toHaveAttribute("aria-pressed", "false");
  });

  it("modo múltiplo acumula e 'todos' limpa", () => {
    function Demo() {
      const [v, setV] = useState<("a" | "b")[]>(["a"]);
      return (
        <FilterChips
          multiple
          label="Filtro"
          values={v}
          onChangeValues={setV}
          allLabel="Todos"
          chips={[
            { key: "a", label: "A" },
            { key: "b", label: "B" },
          ]}
        />
      );
    }
    render(<Demo />);
    fireEvent.click(screen.getByRole("button", { name: "B" }));
    expect(screen.getByRole("button", { name: "A" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "B" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Todos" }));
    expect(screen.getByRole("button", { name: "A" })).toHaveAttribute("aria-pressed", "false");
  });
});

describe("Artwork fallback", () => {
  it("troca para a próxima imagem quando a atual falha", () => {
    const { container } = render(
      <Artwork title="Capa" src="https://a.invalid/1.png" fallbackSrc="https://a.invalid/2.png" />,
    );
    const img = container.querySelector("img");
    expect(img?.getAttribute("src")).toBe("https://a.invalid/1.png");
    if (img) fireEvent.error(img);
    expect(container.querySelector("img")?.getAttribute("src")).toBe("https://a.invalid/2.png");
  });
});

describe("Card como", () => {
  it("troca a tag da superfície", () => {
    const { container } = render(<Card as="section">Conteúdo</Card>);
    expect(container.querySelector("section.sn-card")).not.toBeNull();
  });
});

describe("Dialog trigger e portal", () => {
  it("o gatilho abre e anuncia o estado", () => {
    render(<Dialog trigger={(p) => <Button {...p}>Abrir</Button>} title="Oi" />);
    const btn = screen.getByRole("button", { name: "Abrir" });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("portal monta o dialog no body", () => {
    const { container } = render(<Dialog defaultOpen portal title="Portal" />);
    expect(container.querySelector("dialog")).toBeNull();
    expect(document.body.querySelector("dialog")).not.toBeNull();
  });
});

describe("NavRail grupos", () => {
  it("grupo recolhível esconde e mostra os itens", () => {
    render(
      <NavRail
        label="Menu"
        value="a"
        onChange={() => {}}
        groups={[
          {
            title: "Grupo",
            collapsible: true,
            items: [{ key: "a", label: "A", icon: <span aria-hidden>•</span> }],
          },
        ]}
      />,
    );
    const toggle = screen.getByRole("button", { name: "Grupo" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("button", { name: "A" })).toBeNull();
    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: "A" })).toBeInTheDocument();
  });
});
