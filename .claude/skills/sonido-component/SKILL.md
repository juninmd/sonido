---

name: sonido-component
description: Cria ou porta um componente para o Sonido seguindo as convenções (pasta, CSS sn-, tokens, export, história com editor ao vivo, teste). Use quando pedirem um componente novo na biblioteca.
---

# Novo componente no Sonido

1. **Pasta** `src/components/<Nome>/` com `<Nome>.tsx`, `<Nome>.css` e `index.ts` (`export * from "./<Nome>";`).
   - Props tipadas e documentadas com JSDoc (viram a tabela de props da documentação).
   - Classes `sn-<nome>`, `sn-<nome>__parte`, `sn-<nome>--variante`. Só tokens `--sn-*` para cor, espaço, raio e tempo.
   - Movimento atrás de `prefers-reduced-motion`; canvas via `useCanvasLoop`.
2. **Export** em `src/index.ts`, em ordem alfabética.
3. **História** `src/stories/<Nome>.stories.tsx` copiando o formato das outras:
   - constante `code` com um `function Demo()` em JSX e `render(<Demo />);` no fim; ele roda no editor ao vivo e é o que o botão "Copiar código" entrega (com os imports gerados).
   - `title: "<Grupo>/<Nome>"` usando um grupo existente; `parameters.docs.description.component` com 1 a 3 frases.
4. **Teste**: o teste de exemplos já monta o seu `code`. Para comportamento (teclado, estados), adicione casos em `src/test/components.test.tsx`.
5. Rode `npm run check` e a skill `sonido-audit`.
6. Commit semântico: `feat(<nome>): ...` gera versão minor; `fix:` gera patch; `feat!:` ou `BREAKING CHANGE:` gera major.
