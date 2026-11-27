import { describe, expect, test } from "vitest";
import pkg from "../../package.json";

// Um mapa de `exports` sem `default` quebra consumidores que resolvem por `require` (tsx, Vitest em CJS,
// scripts de homologação). O app em Vite não sente, por isso o teste fixa o contrato publicado.
const exportsMap = pkg.exports as Record<string, string | Record<string, string>>;

describe("package exports", () => {
  test.each([".", "./tokens"])("%s has a default condition for CJS resolvers", (entry) => {
    const conditions = exportsMap[entry];
    expect(typeof conditions).toBe("object");
    expect(conditions).toMatchObject({ default: expect.any(String) });
  });

  test("the default condition points at the ESM bundle", () => {
    expect(exportsMap["."]).toMatchObject({ default: "./dist/index.js", import: "./dist/index.js" });
  });
});
