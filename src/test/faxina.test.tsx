import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  baseName,
  countValue,
  easeOutCubic,
  formatAge,
  formatBytes,
  formatCount,
  formatElapsed,
  getMotionPref,
  isRelated,
  ScanProgress,
  Sunburst,
  setMotionPref,
  shouldAnimate,
  sizeTree,
  splitBytes,
  squarify,
  Tray,
  Treemap,
} from "..";

describe("formatadores", () => {
  it("formata bytes sem virar 1.024 KB", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(1536)).toBe("1,5 KB");
    expect(formatBytes(0.5)).toBe("1 B");
    expect(formatBytes(1023.99 * 1024)).toBe("1 MB");
    expect(splitBytes(13.3 * 1024 ** 3)).toEqual(["13,3", "GB"]);
  });
  it("formata contagem, idade, tempo e nome", () => {
    expect(formatCount(950)).toBe("950");
    expect(formatCount(1240)).toBe("1,2 mil");
    expect(formatCount(999_950)).toBe("1 mi");
    const now = Date.now();
    expect(formatAge(now - 3 * 86400000, now)).toBe("há 3 dias");
    expect(formatAge(now - 30000, now)).toBe("agora");
    expect(formatAge(null)).toBe("—");
    expect(formatElapsed(65)).toBe("1:05");
    expect(formatElapsed(3725)).toBe("1:02:05");
    expect(baseName("C:\\Users\\ana\\a.iso")).toBe("a.iso");
    expect(baseName("/home/ana/")).toBe("ana");
  });
  it("easeOutCubic e countValue", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(2)).toBe(1);
    expect(countValue(0, 100, 500, 1000)).toBeCloseTo(87.5);
    expect(countValue(0, 100, 0, 0)).toBe(100);
  });
});

describe("árvore e squarify", () => {
  const tree = {
    name: "C:",
    children: [
      { name: "a", value: 6 },
      { name: "b", children: [{ name: "c", value: 4 }] },
    ],
  };
  it("soma, ordena e liga caminhos", () => {
    const s = sizeTree(tree);
    expect(s.value).toBe(10);
    expect(s.children.map((c) => c.name)).toEqual(["a", "b"]);
    expect(s.children[1].children[0].path).toBe("C:/b/c");
    expect(isRelated("C:/b", "C:/b/c")).toBe(true);
    expect(isRelated("C:/a", "C:/b")).toBe(false);
  });
  it("cobre a área inteira", () => {
    const r = squarify([6, 4, 2, 1], (v) => v, 0, 0, 200, 100);
    expect(r).toHaveLength(4);
    expect(r.reduce((a, c) => a + c.w * c.h, 0)).toBeCloseTo(20000);
  });
});

describe("useMotionPref", () => {
  it("salva e respeita a preferência", () => {
    setMotionPref("never");
    expect(getMotionPref()).toBe("never");
    expect(shouldAnimate()).toBe(false);
    setMotionPref("always");
    expect(shouldAnimate()).toBe(true);
    setMotionPref("system");
  });
});

const disco = {
  name: "C:",
  children: [
    {
      name: "Users",
      children: [
        { name: "Fotos", value: 20 },
        { name: "Downloads", value: 10 },
      ],
    },
    { name: "pagefile.sys", value: 5 },
  ],
};

describe("Treemap", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "ResizeObserver",
      class {
        cb: ResizeObserverCallback;
        constructor(cb: ResizeObserverCallback) {
          this.cb = cb;
        }
        observe() {
          this.cb([{ contentRect: { width: 400, height: 300 } } as ResizeObserverEntry], this as never);
        }
        unobserve() {}
        disconnect() {}
      },
    );
  });
  afterEach(() => vi.unstubAllGlobals());
  it("abre pasta e volta pelo caminho", () => {
    render(<Treemap data={disco} label="Disco" formatValue={(v) => `${v} u`} />);
    fireEvent.click(screen.getByRole("button", { name: /Users, 30 u/ }));
    expect(screen.getByRole("button", { name: "Users · 30 u" })).toHaveAttribute("aria-current", "location");
    fireEvent.click(screen.getByRole("button", { name: "C: · 35 u" }));
    expect(screen.getByRole("button", { name: "C: · 35 u" })).toHaveAttribute("aria-current", "location");
  });
});

describe("Sunburst", () => {
  it("entra no anel e volta pelo centro", () => {
    render(<Sunburst data={disco} label="Anéis" formatValue={(v) => `${v} u`} />);
    fireEvent.click(screen.getByRole("button", { name: "Users, 30 u" }));
    const back = screen.getByRole("button", { name: "Voltar para C:" });
    fireEvent.click(back);
    expect(screen.getByRole("button", { name: "C:" })).toBeDisabled();
  });
});

describe("ScanProgress", () => {
  it("mostra números e troca o botão pelo estado", () => {
    const { rerender } = render(<ScanProgress count={1240} elapsed={65} state="running" onCancel={() => {}} />);
    expect(screen.getByText("1,2 mil")).toBeInTheDocument();
    expect(screen.getByText("1:05")).toBeInTheDocument();
    rerender(<ScanProgress count={1240} elapsed={65} state="cancelled" onRestart={() => {}} />);
    expect(screen.getByRole("button", { name: "Analisar de novo" })).toBeInTheDocument();
  });
});

describe("Tray", () => {
  it("soma, remove e confirma", () => {
    let removed = "";
    let confirmed = false;
    const items = [
      { id: "a", label: "npm-cache", value: 1024 },
      { id: "b", label: "Temp", value: 1024 },
    ];
    const { rerender } = render(
      <Tray
        items={items}
        onRemove={(id) => {
          removed = id;
        }}
        onConfirm={() => {
          confirmed = true;
        }}
      />,
    );
    expect(screen.getByText("2 KB")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Tirar Temp" }));
    expect(removed).toBe("b");
    act(() => fireEvent.click(screen.getByRole("button", { name: "Confirmar 2 itens" })));
    expect(confirmed).toBe(true);
    rerender(<Tray items={[]} onConfirm={() => {}} />);
    expect(screen.getByRole("button", { name: /Confirmar/ })).toBeDisabled();
  });
});
