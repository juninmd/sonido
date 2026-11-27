import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  accentStyle,
  Badge,
  Button,
  Checkbox,
  ConfirmButton,
  hueFrom,
  initials,
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
