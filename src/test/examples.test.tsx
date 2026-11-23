import { render } from "@testing-library/react";
import * as React from "react";
import { transform } from "sucrase";
import { describe, expect, it, vi } from "vitest";
import * as Sonido from "..";

// Cada exemplo da documentação precisa montar sem erro (o mesmo código que vai para "Copiar código").
const stories = import.meta.glob<{ default: { parameters?: { sonido?: { code: string } } } }>(
  "../stories/*.stories.tsx",
  {
    eager: true,
  },
);

const pick = (o: object) => Object.entries(o).filter(([k]) => /^[A-Za-z_$][\w$]*$/.test(k) && k !== "default");
const Icon = () => null;
const scope = Object.fromEntries([["React", React], ...pick(React), ...pick(Sonido), ["Icon", Icon]]);

function mount(code: string) {
  let element: React.ReactElement | null = null;
  const js = transform(code, { transforms: ["jsx"], production: true }).code;
  const keys = [...Object.keys(scope), "render"];
  new Function(...keys, js)(...Object.values(scope), (el: React.ReactElement) => {
    element = el;
  });
  if (!element) throw new Error("o exemplo não chamou render()");
  return render(element);
}

describe("exemplos da documentação", () => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => null);
  const entries = Object.entries(stories);
  it("existe um exemplo para cada componente", () => {
    expect(entries.length).toBeGreaterThanOrEqual(67);
  });
  for (const [file, mod] of entries) {
    const code = mod.default.parameters?.sonido?.code;
    it(`${file.replace(/^.*\//, "").replace(".stories.tsx", "")} monta sem erro`, () => {
      expect(code).toBeTruthy();
      const { container } = mount(code as string);
      expect(container.childElementCount).toBeGreaterThan(0);
    });
  }
});
