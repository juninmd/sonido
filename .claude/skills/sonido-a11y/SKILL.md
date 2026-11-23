---

name: sonido-a11y
description: Revisão de acessibilidade WCAG 2.1 AA dos componentes Sonido nos 8 temas, com axe-core no Storybook. Use ao criar ou mudar componente, cor ou tema.
---

# Revisão de acessibilidade do Sonido

1. `npm run build:docs` e sirva `storybook-static` (ex.: `npx http-server storybook-static -p 6006`).
2. Para cada história `*--exemplo` (lista em `storybook-static/index.json`) e cada tema
   (`dark`, `light`, `hueco-mundo`, `canto`, `canto-claro`, `dracula`, `glass`, `aurora`),
   abra `iframe.html?id=<id>&globals=theme:<tema>` com Playwright em `reducedMotion: "reduce"` e rode axe-core
   com as tags `wcag2a`, `wcag2aa`, `wcag21aa`.
3. Corrija na fonte, nesta ordem de preferência:
   - **Contraste**: ajuste o token do tema (`src/tokens/tokens.css`), não o componente. Texto sobre selo sólido claro usa `--sn-color-on-tint`.
   - **ARIA**: `aria-controls` só aponta para ids que existem; regiões roláveis recebem `tabIndex={0}` e rótulo; nada interativo dentro de interativo.
   - **Teclado**: listas com foco itinerante (setas, Home, End), Esc fecha camadas, foco volta ao gatilho.
4. Rode de novo até zero violações e registre no PR o que mudou.

O addon `@storybook/addon-a11y` também mostra as violações no painel "Accessibility" do Storybook (`npm run dev`).
