import { act, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  Accordion,
  Artwork,
  Avatar,
  Button,
  Carousel,
  EmptyState,
  FilterChips,
  Hero,
  heroProgress,
  NavRail,
  PageHeader,
  Select,
} from "..";

// Opções pedidas pelo nerd-watch: os padrões precisam manter o comportamento antigo.

describe("níveis de título", () => {
  it("PageHeader usa h2 por padrão e h1 com titleAs", () => {
    const { rerender } = render(<PageHeader title="Biblioteca" />);
    expect(screen.getByRole("heading", { level: 2, name: "Biblioteca" })).toBeInTheDocument();
    rerender(<PageHeader title="Biblioteca" titleAs="h1" />);
    expect(screen.getByRole("heading", { level: 1, name: "Biblioteca" })).toBeInTheDocument();
  });
  it("EmptyState usa parágrafo por padrão e heading com titleAs", () => {
    const { rerender } = render(<EmptyState title="Nada aqui" />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    rerender(<EmptyState title="Nada aqui" titleAs="h3" />);
    expect(screen.getByRole("heading", { level: 3, name: "Nada aqui" })).toBeInTheDocument();
  });
});

describe("Button com href", () => {
  it("vira link com as mesmas classes e repassa target, rel e download", () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(
      <Button ref={ref} href="/a.zip" target="_blank" rel="noopener" download variant="secondary">
        Baixar
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Baixar" });
    expect(link).toHaveAttribute("href", "/a.zip");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
    expect(link).toHaveAttribute("download");
    expect(link).toHaveClass("sn-button", "sn-button--secondary");
    expect(ref.current).toBe(link);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
  it("desabilitado ou carregando não navega nem chama onClick", () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <Button href="#x" disabled onClick={onClick}>
        Abrir
      </Button>,
    );
    let link = screen.getByRole("link", { name: "Abrir" });
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).not.toHaveAttribute("href");
    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
    rerender(
      <Button href="#x" loading onClick={onClick}>
        Abrir
      </Button>,
    );
    link = screen.getByRole("link", { name: /Abrir/ });
    expect(link).toHaveAttribute("aria-busy", "true");
    expect(link).not.toHaveAttribute("href");
    rerender(
      <Button href="#x" onClick={onClick}>
        Abrir
      </Button>,
    );
    fireEvent.click(screen.getByRole("link", { name: "Abrir" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("NavRail com href", () => {
  const groups = [
    {
      items: [
        { key: "home" as const, label: "Início", icon: null, href: "#inicio" },
        { key: "lib" as const, label: "Biblioteca", icon: null },
      ],
    },
  ];
  it("renderiza link, chama onChange e não bloqueia a navegação", () => {
    const onChange = vi.fn();
    render(<NavRail groups={groups} value="home" onChange={onChange} compact />);
    const link = screen.getByRole("link", { name: "Início" });
    expect(link).toHaveAttribute("href", "#inicio");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveAttribute("title", "Início");
    const notPrevented = fireEvent.click(link);
    expect(notPrevented).toBe(true);
    expect(onChange).toHaveBeenCalledWith("home");
    expect(screen.getByRole("button", { name: "Biblioteca" })).toBeInTheDocument();
  });
});

describe("ícones decorativos", () => {
  it("Carousel e FilterChips mostram o ícone sem mudar o nome acessível", () => {
    render(
      <>
        <Carousel title="Em alta" icon={<svg data-testid="ci" />}>
          <span />
        </Carousel>
        <FilterChips
          label="Tipo"
          value={null}
          onChange={() => {}}
          chips={[{ key: "tv", label: "Séries", icon: <svg data-testid="fi" /> }]}
        />
      </>,
    );
    expect(screen.getByRole("heading", { name: "Em alta" })).toContainElement(screen.getByTestId("ci"));
    expect(screen.getByRole("button", { name: "Séries" })).toContainElement(screen.getByTestId("fi"));
  });
});

describe("Select, Accordion e imagens", () => {
  it("Select respeita opção desabilitada", () => {
    render(
      <Select
        label="Qualidade"
        value="hd"
        onChange={() => {}}
        options={[
          { value: "hd", label: "HD" },
          { value: "4k", label: "4K", disabled: true },
        ]}
      />,
    );
    expect(screen.getByRole("option", { name: "4K" })).toBeDisabled();
    expect(screen.getByRole("option", { name: "HD" })).not.toBeDisabled();
  });
  it("Accordion avisa abrir e fechar com onToggle", () => {
    const onToggle = vi.fn();
    render(<Accordion onToggle={onToggle} items={[{ key: "a", title: "Elenco", content: "..." }]} />);
    const trigger = screen.getByRole("button", { name: "Elenco" });
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(onToggle.mock.calls).toEqual([
      ["a", true],
      ["a", false],
    ]);
  });
  it("Artwork e Avatar repassam referrerPolicy ao img", () => {
    render(
      <>
        <Artwork title="Duna" src="/d.jpg" referrerPolicy="no-referrer" />
        <Avatar name="Ana" src="/a.jpg" referrerPolicy="no-referrer" />
      </>,
    );
    expect(screen.getByRole("img", { name: "Duna" })).toHaveAttribute("referrerpolicy", "no-referrer");
    expect(screen.getByRole("img", { name: "Ana" })).toHaveAttribute("referrerpolicy", "no-referrer");
  });
});

describe("heroProgress", () => {
  it("vai de 0 a 1 enquanto o topo sobe até sobrar a faixa", () => {
    expect(heroProgress(100, 400, 132)).toBe(0);
    expect(heroProgress(0, 400, 132)).toBe(0);
    expect(heroProgress(-134, 400, 132)).toBe(0.5);
    expect(heroProgress(-268, 400, 132)).toBe(1);
    expect(heroProgress(-900, 400, 132)).toBe(1);
  });
  it("desconta a barra do app e absorve sticky subpixel", () => {
    expect(heroProgress(64, 400, 132, 64)).toBe(0);
    expect(heroProgress(64 - 268, 400, 132, 64)).toBe(1);
    expect(heroProgress(-267.7, 400, 132)).toBe(1);
  });
  it("não divide por zero nem propaga NaN", () => {
    expect(heroProgress(-50, 100, 132)).toBe(0);
    expect(heroProgress(-50, 132, 132)).toBe(0);
    expect(heroProgress(Number.NaN, 400, 132)).toBe(0);
  });
});

describe("Hero", () => {
  afterEach(() => vi.restoreAllMocks());
  it("renderiza poster ao lado do título e children sob os metadados", () => {
    render(
      <Hero title="Duna" meta={<span>2021</span>} poster={<span>capa</span>} actions={<Button>Assistir</Button>}>
        <p>Sinopse</p>
      </Hero>,
    );
    const body = screen.getByText("Sinopse");
    expect(screen.getByText("2021").compareDocumentPosition(body) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText("capa").closest(".sn-hero__lead")).toContainElement(screen.getByRole("heading"));
  });
  it("sem collapsible não fica sticky nem ouve scroll", () => {
    const add = vi.spyOn(window, "addEventListener");
    const { container } = render(<Hero title="Duna" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).not.toHaveClass("sn-hero--collapsible");
    expect(root.style.top).toBe("");
    expect(add.mock.calls.some(([type]) => type === "scroll")).toBe(false);
  });
  it("collapsible fixa o top, expõe o progresso e limpa ao desmontar", () => {
    let top = 64;
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(400);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(() => ({ top }) as DOMRect);
    const frames: FrameRequestCallback[] = [];
    const raf = vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => frames.push(cb));
    const scroll = () =>
      act(() => {
        window.dispatchEvent(new Event("scroll"));
        window.dispatchEvent(new Event("scroll"));
        for (const cb of frames.splice(0)) cb(0);
      });
    const remove = vi.spyOn(window, "removeEventListener");
    const { container, unmount } = render(
      <Hero title="Duna" collapsible collapsedHeight={100} stickyOffset={() => 64} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("sn-hero--collapsible");
    expect(root.style.top).toBe("-236px");
    expect(root.style.getPropertyValue("--sn-hero-p")).toBe("0");
    top = 64 - 150;
    scroll();
    expect(root.style.getPropertyValue("--sn-hero-p")).toBe("0.5");
    expect(root).not.toHaveClass("sn-hero--collapsed");
    top = 64 - 300;
    scroll();
    expect(root).toHaveClass("sn-hero--collapsed");
    expect(raf).toHaveBeenCalledTimes(2);
    unmount();
    expect(remove.mock.calls.map(([type]) => type)).toEqual(expect.arrayContaining(["scroll", "resize"]));
  });
});
