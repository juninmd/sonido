---

name: sonido-audit
description: Audita o design system Sonido (tokens, prefixo sn-, exports, histórias, botões sem type, cores cruas) e corrige o que falhar. Use antes de abrir PR ou quando pedirem "auditar o Sonido".
---

# Auditoria do Sonido

Rode na raiz do repositório e corrija na ordem:

1. `npm run audit:ds`
   - **Erros** quebram o CI: componente sem `index.ts`, não exportado em `src/index.ts`, sem história em `src/stories`, classe CSS sem prefixo `sn-`, `<button>` sem `type`.
   - **Avisos** pedem julgamento: cor crua (`#hex`) no CSS do componente deve virar token `--sn-*` quando representa uma função (texto, fundo, ação). Cores de dados fixas (ex.: escala de trânsito, céu do WeatherSky) podem ficar.
2. `npm run lint` (Biome). Use `biome-ignore` só com motivo concreto na mesma linha.
3. `npm run typecheck`.
4. `npm test`: inclui um teste que monta **todos** os exemplos da documentação. Se um exemplo quebrar, corrija o código em `src/stories/<Nome>.stories.tsx` (constante `code`), não o teste.
5. Contraste e ARIA: rode a skill `sonido-a11y`.

## Regras do design system

- Toda cor, raio, espaço e duração vem de `--sn-*` (`src/tokens/tokens.css`). Novos tokens precisam de valor nos 8 temas.
- Cor tem função: `accent` = ação, `accent-2` = foco/seleção, `aqua` = progresso, `gold` = destaque.
- Animação só dentro de `@media (prefers-reduced-motion: no-preference)` ou usando `--sn-dur-*` (zerados com reduced motion).
- Alvos de toque ≥ 44px; foco visível com `--sn-ring`.

Relate o resultado em uma tabela curta: verificação, status, o que foi corrigido.
