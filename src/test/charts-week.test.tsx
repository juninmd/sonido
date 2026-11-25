import { fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  axisTicks,
  localIsoDate,
  niceMax,
  parseLocalDate,
  rovingIndex,
  SegmentedBar,
  StackedColumns,
  segmentLayout,
  seriesTone,
  stackedLayout,
  WeekStrip,
  weekDays,
} from "..";

describe("geometria das colunas empilhadas", () => {
  it("niceMax arredonda para 1, 2 ou 5 × 10ⁿ", () => {
    expect([0, 1, 3, 11, 25, 70, 101].map(niceMax)).toEqual([1, 1, 5, 20, 50, 100, 200]);
  });
  it("axisTicks mantém o meio do eixo inteiro para contagens", () => {
    expect(axisTicks(0)).toEqual([0, 1]);
    expect(axisTicks(2)).toEqual([0, 1, 2]);
    expect(axisTicks(3)).toEqual([0, 2, 4]);
    expect(axisTicks(7)).toEqual([0, 4, 8]);
    expect(axisTicks(11)).toEqual([0, 10, 20]);
  });
  it("empilha só valores positivos, arredonda o topo e marca a coluna mais alta", () => {
    const l = stackedLayout([
      [4, 1],
      [0, 0],
      [3, -2],
      [5, 0],
    ]);
    expect(l.max).toBe(6);
    expect(l.columns[0]?.segments).toEqual([
      { series: 0, value: 4, cap: false },
      { series: 1, value: 1, cap: true },
    ]);
    expect(l.columns[1]?.segments).toEqual([]);
    expect(l.columns[2]?.total).toBe(3);
    // Empate entre 5 e 5: a primeira coluna leva o rótulo.
    expect(l.peak).toBe(0);
  });
  it("sem dados não marca pico e o eixo vai até 1", () => {
    expect(stackedLayout([[0, Number.NaN]])).toMatchObject({ peak: -1, max: 1 });
    expect(stackedLayout([])).toMatchObject({ peak: -1, columns: [] });
  });
});

describe("geometria da barra segmentada", () => {
  it("tira segmentos zerados mas preserva o índice original (tom estável)", () => {
    const b = segmentLayout([50, 0, 45, 5]);
    expect(b.map((x) => x.index)).toEqual([0, 2, 3]);
    expect(b.map((x) => x.percent)).toEqual(["50%", "45%", "5%"]);
    expect(b.map((x) => x.fits)).toEqual([true, true, false]);
  });
  it("todo vazio ou inválido não desenha nada", () => {
    expect(segmentLayout([])).toEqual([]);
    expect(segmentLayout([0, -3, Number.NaN])).toEqual([]);
  });
  it("seriesTone cicla pela ordem padrão e respeita o tom explícito", () => {
    expect(seriesTone(0)).toBe("accent");
    expect(seriesTone(8)).toBe("accent");
    expect(seriesTone(1, "danger")).toBe("danger");
  });
});

describe("dias da faixa", () => {
  it("lê AAAA-MM-DD como data local, sem desvio de fuso", () => {
    expect(localIsoDate(parseLocalDate("2026-03-01"))).toBe("2026-03-01");
  });
  it("atravessa o fim do mês e marca hoje e as contagens", () => {
    const d = weekDays("2026-02-27", 4, { "2026-03-01": 3, "2026-02-28": -1 }, "2026-02-28");
    expect(d.map((x) => x.iso)).toEqual(["2026-02-27", "2026-02-28", "2026-03-01", "2026-03-02"]);
    expect(d.map((x) => x.count)).toEqual([0, 0, 3, 0]);
    expect(d.map((x) => x.isToday)).toEqual([false, true, false, false]);
  });
  it("quantidade inválida devolve lista vazia", () => {
    expect(weekDays("2026-01-01", -2)).toEqual([]);
  });
  it("rovingIndex circula com setas e salta com Home/End", () => {
    expect(rovingIndex("ArrowRight", 6, 7)).toBe(0);
    expect(rovingIndex("ArrowLeft", 0, 7)).toBe(6);
    expect(rovingIndex("End", 2, 7)).toBe(6);
    expect(rovingIndex("Enter", 2, 7)).toBeNull();
    expect(rovingIndex("Home", 0, 0)).toBeNull();
  });
});

describe("StackedColumns", () => {
  it("expõe os números numa tabela com uma coluna por série e o total", () => {
    render(
      <StackedColumns
        label="Títulos por mês"
        series={[{ label: "Concluídos" }, { label: "Revisões" }]}
        data={[
          { label: "Jan", values: [4, 1] },
          { label: "Fev", values: [2] },
        ]}
      />,
    );
    const table = screen.getByRole("table", { name: "Títulos por mês" });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .map((h) => h.textContent),
    ).toEqual(["Categoria", "Concluídos", "Revisões", "Total"]);
    const fev = within(table).getByRole("row", { name: /Fev/ });
    expect(
      within(fev)
        .getAllByRole("cell")
        .map((c) => c.textContent),
    ).toEqual(["2", "0", "2"]);
    expect(screen.getByRole("list", { name: "Legenda" })).toBeInTheDocument();
  });
});

describe("SegmentedBar", () => {
  it("mostra percentual só nos blocos largos e legenda sem os zerados", () => {
    const { container } = render(
      <SegmentedBar
        label="Biblioteca"
        segments={[
          { label: "Filmes", value: 90 },
          { label: "Séries", value: 0 },
          { label: "Curtas", value: 10 },
        ]}
      />,
    );
    expect([...container.querySelectorAll(".sn-segbar__pct")].map((n) => n.textContent)).toEqual(["90%"]);
    const legend = screen.getByRole("list", { name: "Legenda" });
    expect(
      within(legend)
        .getAllByRole("listitem")
        .map((li) => li.textContent),
    ).toEqual(["Filmes", "Curtas"]);
    expect(screen.getByRole("row", { name: /Curtas/ })).toHaveTextContent("10%");
  });
});

describe("WeekStrip", () => {
  function Demo({ onChange = () => {} }: { onChange?: (d: string | null) => void }) {
    const [v, setV] = useState<string | null>(null);
    return (
      <WeekStrip
        label="Próximos dias"
        today="2026-11-25"
        value={v}
        counts={{ "2026-11-27": 4 }}
        onChange={(d) => {
          setV(d);
          onChange(d);
        }}
      />
    );
  }
  it("alterna o dia com aria-pressed e desfaz no segundo clique", () => {
    const onChange = vi.fn();
    render(<Demo onChange={onChange} />);
    const group = screen.getByRole("group", { name: "Próximos dias" });
    const days = within(group).getAllByRole("button");
    expect(days).toHaveLength(7);
    expect(days[0]).toHaveAttribute("aria-current", "date");
    expect(days[0]).toHaveTextContent("hoje");
    expect(days[2]).toHaveAccessibleName(/27.*: 4$/);
    fireEvent.click(days[2] as HTMLElement);
    expect(days[2]).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(days[2] as HTMLElement);
    expect(onChange.mock.calls).toEqual([["2026-11-27"], [null]]);
  });
  it("tem uma única parada de Tab e move o foco com as setas sem escolher", () => {
    const onChange = vi.fn();
    render(<Demo onChange={onChange} />);
    const days = screen.getAllByRole("button");
    expect(days.filter((d) => d.tabIndex === 0)).toEqual([days[0]]);
    (days[0] as HTMLElement).focus();
    fireEvent.keyDown(days[0] as HTMLElement, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(days[6]);
    expect(days[6]).toHaveAttribute("tabindex", "0");
    fireEvent.keyDown(days[6] as HTMLElement, { key: "Home" });
    expect(document.activeElement).toBe(days[0]);
    expect(onChange).not.toHaveBeenCalled();
  });
});
