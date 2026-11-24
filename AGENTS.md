# AGENTS.md

Guia para agentes (Claude Code, Codex, etc.) que trabalham no **Sonido**, o design system React do juninmd publicado como `@juninmd/sonido`.

## Comandos

| Objetivo                       | Comando                                          |
| ------------------------------ | ------------------------------------------------ |
| Instalar                       | `npm ci`                                         |
| Documentação local (Storybook) | `npm run dev`                                    |
| Tudo que o CI roda             | `npm run check` (lint, tipos, auditoria, testes) |
| Build do pacote                | `npm run build`                                  |
| Build da documentação          | `npm run build:docs`                             |

Rode `npm run check` antes de todo push.

## Estrutura

- `src/components/<Nome>/`: `<Nome>.tsx`, `<Nome>.css` e `index.ts`. Exporte em `src/index.ts` (ordem alfabética).
- `src/tokens/tokens.css`: tokens `--sn-*` dos 8 temas. `src/tokens/index.ts` espelha em JS.
- `src/stories/<Nome>.stories.tsx`: a constante `code` é o exemplo do editor ao vivo e do botão "Copiar código". Ela é montada pelos testes.
- `src/test/`: testes Vitest. `examples.test.tsx` monta todos os exemplos da documentação.
- `scripts/audit.mjs`: auditoria do design system (`npm run audit:ds`).
- `.claude/skills/`: skills `sonido-audit`, `sonido-a11y` e `sonido-component`.

## Regras

- **CSS:** classes com prefixo `sn-`. Cores, raios, espaços e durações vêm de tokens `--sn-*`. Sem Tailwind e sem CSS-in-JS.
- **Tokens:** todo token novo precisa de valor nos 8 temas: `dark`, `light`, `hueco-mundo`, `canto`, `canto-claro`, `dracula`, `glass` e `aurora`.
- **Movimento:**
  - animação só sob `prefers-reduced-motion: no-preference` ou usando `--sn-dur-*`;
  - canvas via `useCanvasLoop`.
- **Acessibilidade (WCAG 2.1 AA):**
  - contraste verificado com axe nos 8 temas;
  - `<button type="button">`;
  - alvos de 44px;
  - foco visível;
  - nada interativo dentro de interativo.
- **Tons:** a prop `tone` usa o vocabulário comum (`accent`, `violet`, `aqua`, `gold`, `success`, `warning`, `danger`, `info`, `neutral`). Nome novo fora dele precisa de motivo; renomear um valor antigo mantém o antigo como alias obsoleto.
- **Componentes:** cada componente novo precisa de história em `src/stories` com editor ao vivo. A auditoria falha sem ela.
- **Lint:** `biome-ignore` só com motivo concreto.
- **Testes:** nunca desative ou pule um teste para o CI passar.

## Commits e releases

- Commits semânticos (Conventional Commits), validados pelo commitlint no hook `commit-msg` e no CI.
- Cada tipo de commit gera um tipo de versão no merge em `main`:
  - `fix:` gera patch;
  - `feat:` gera minor;
  - `feat!:` ou `BREAKING CHANGE:` gera major.
- No merge em `main`, o semantic-release publica no npm (secret `NPM_TOKEN`). O workflow `docs.yml` publica a documentação no GitHub Pages.
- Nunca faça commit de segredos (`.env`, tokens).
