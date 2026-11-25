import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { type Command, CommandPalette, defaultCommandFilter, OmniSearch, Select, TextField } from "..";

beforeAll(() => {
  // jsdom não implementa <dialog>.showModal.
  HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  };
});

const cmd = (id: string, label: string, run = vi.fn()): Command => ({ id, label, run });
const options = () => screen.queryAllByRole("option", { hidden: true }).map((o) => o.textContent);
const type = (q: string) => fireEvent.change(screen.getByRole("combobox", { hidden: true }), { target: { value: q } });

describe("CommandPalette", () => {
  it("filtro padrão ignora acentos e caixa", () => {
    expect(defaultCommandFilter(cmd("a", "Estatísticas"), "estatist")).toBe(true);
    expect(defaultCommandFilter(cmd("a", "Início"), "jogos")).toBe(false);
  });

  it("aceita filtro próprio e corta em `limit`", () => {
    const cmds = ["Alpha", "Beta", "Gamma", "Delta"].map((l) => cmd(l, l));
    render(<CommandPalette open onClose={() => {}} commands={cmds} filter={(c, q) => c.label.endsWith(q)} limit={2} />);
    expect(options()).toEqual(["Alpha", "Beta"]);
    type("ta");
    expect(options()).toEqual(["Beta", "Delta"]);
  });

  it("usa itens dinâmicos da função sem refiltrar e executa com Enter", () => {
    const run = vi.fn();
    const onClose = vi.fn();
    // O app casa "rpg" pelo gênero: o filtro por rótulo descartaria esse item.
    const commands = (q: string) => (q === "rpg" ? [cmd("g", "Elden Ring", run)] : []);
    render(<CommandPalette open onClose={onClose} commands={commands} emptyText={(q) => `Nada para ${q}`} />);
    type("xyz");
    expect(screen.getByText("Nada para xyz")).toBeInTheDocument();
    type("rpg");
    expect(options()).toEqual(["Elden Ring"]);
    fireEvent.keyDown(screen.getByRole("combobox", { hidden: true }), { key: "Enter" });
    expect(onClose).toHaveBeenCalledOnce();
    expect(run).toHaveBeenCalledOnce();
  });

  it("setas dão a volta na lista", () => {
    render(<CommandPalette open onClose={() => {}} commands={[cmd("a", "A"), cmd("b", "B")]} />);
    const box = screen.getByRole("combobox", { hidden: true });
    const selected = () => screen.getAllByRole("option", { hidden: true }).find((o) => o.ariaSelected === "true");
    fireEvent.keyDown(box, { key: "ArrowUp" });
    expect(selected()?.textContent).toBe("B");
    fireEvent.keyDown(box, { key: "ArrowDown" });
    expect(selected()?.textContent).toBe("A");
  });
});

describe("OmniSearch", () => {
  function Demo({ onClear = vi.fn() }) {
    const [text, setText] = useState("");
    const [chips, setChips] = useState([
      { key: "ps2", label: "PS2" },
      { key: "zerado", label: "zerado" },
    ]);
    return (
      <OmniSearch
        label="Buscar jogos"
        value={text}
        onChange={setText}
        chips={chips}
        onRemoveChip={(c, { retype }) => {
          setChips((all) => all.filter((x) => x.key !== c.key));
          if (retype) setText(c.label);
        }}
        onClear={onClear}
        suggestions={["steam"]}
        onPickSuggestion={(w) => setText(w)}
      />
    );
  }

  it("Backspace no campo vazio desfaz o último chip e devolve a palavra", () => {
    render(<Demo />);
    const input = screen.getByRole("searchbox", { name: "Buscar jogos" });
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(input).toHaveValue("zerado");
    expect(screen.queryByText("zerado", { selector: "li" })).toBeNull();
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(screen.getByText("PS2")).toBeInTheDocument();
  });

  it("remove chip pelo botão e limpa tudo", () => {
    const onClear = vi.fn();
    render(<Demo onClear={onClear} />);
    fireEvent.click(screen.getByRole("button", { name: "Remover filtro PS2" }));
    expect(screen.queryByText("PS2")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Limpar" }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("mostra sugestões com foco, Esc limpa o texto e '/' foca o campo", () => {
    render(<Demo />);
    const input = screen.getByRole("searchbox");
    fireEvent.keyDown(window, { key: "/" });
    expect(input).toHaveFocus();
    fireEvent.focus(input);
    fireEvent.click(screen.getByRole("button", { name: "steam" }));
    expect(input).toHaveValue("steam");
    fireEvent.keyDown(input, { key: "Escape" });
    expect(input).toHaveValue("");
  });
});

describe("campos compactos", () => {
  it("TextField e Select escondem o rótulo mas mantêm o nome acessível", () => {
    render(
      <>
        <TextField compact hideLabel label="Nova tag" />
        <Select compact hideLabel label="Status" value="a" onChange={() => {}} options={[{ value: "a", label: "A" }]} />
      </>,
    );
    const tag = screen.getByRole("textbox", { name: "Nova tag" });
    expect(tag.closest(".sn-field")).toHaveClass("sn-field--compact");
    expect(screen.getByText("Nova tag")).toHaveClass("sn-visually-hidden");
    expect(tag).not.toHaveAttribute("compact");
    expect(screen.getByRole("combobox", { name: "Status" }).closest(".sn-field")).toHaveClass("sn-field--compact");
  });
});
