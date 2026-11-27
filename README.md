<div align="center">

<img src=".github/assets/hero.png" alt="Componentes do Sonido: céu animado do clima, alertas com cena, duelo de placar e balão de pensamento" width="100%" />

# Sonido

**O design system dos apps do juninmd, em React.**
Escuro por padrão, vidro sobre um fundo atmosférico, cor com função e movimento que responde ao toque.

[![npm](https://img.shields.io/npm/v/@juninmd/sonido?color=ff3d6e&label=npm)](https://www.npmjs.com/package/@juninmd/sonido)
[![CI](https://github.com/juninmd/sonido/actions/workflows/ci.yml/badge.svg)](https://github.com/juninmd/sonido/actions/workflows/ci.yml)
[![Docs](https://img.shields.io/badge/docs-ao%20vivo-7c5cff)](https://juninmd.github.io/sonido/)
[![semantic-release](https://img.shields.io/badge/semantic--release-conventional-3fe3d3)](https://github.com/semantic-release/semantic-release)
[![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-f5b73d)](LICENSE)

[**Documentação ao vivo**](https://juninmd.github.io/sonido/) · [Começar](#começar) · [Componentes](#componentes) · [Temas](#temas) · [Contribuir](#contribuir)

</div>

---

## Por que Sonido

|                             |                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| 🧩 **85 componentes**       | De botão a céu animado do clima, todos com tipos, teclado e ARIA.                                 |
| 🎨 **8 temas**              | Troque com um atributo: `data-theme="hueco-mundo"`. Tokens `--sn-*` em CSS e em JS.               |
| ✨ **Movimento com motivo** | Mola tátil, confete, cenas em canvas. Tudo desliga com `prefers-reduced-motion`.                  |
| ♿ **Acessível**            | Contraste AA nos 8 temas, auditado com axe. Alvos de 44px e foco visível.                         |
| 🧪 **Teste ao vivo**        | Cada página da documentação tem um editor: mude o código, veja o resultado, copie com os imports. |
| 📦 **Leve**                 | Sem dependências além do React. ESM, tree-shakeable, CSS em um arquivo.                           |

## Começar

```bash
npm install @juninmd/sonido
```

```tsx
import { Button, Card, CardTitle, ProgressBar, burst } from "@juninmd/sonido";
import "@juninmd/sonido/styles.css";

export function Licao() {
  return (
    <Card>
      <CardTitle>Lição 12</CardTitle>
      <ProgressBar value={0.6} label="Meta do dia" />
      <Button press onClick={(e) => burst(e.currentTarget)}>
        Concluir lição
      </Button>
    </Card>
  );
}
```

Coloque `class="sn-body"` no `<body>` para herdar fonte, cor e fundo do tema.

> 💡 Não sabe qual componente usar? Abra a [documentação](https://juninmd.github.io/sonido/), edite o exemplo e clique em **Copiar código**.

## Componentes

| Grupo           | Componentes                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Ações**       | Button, ConfirmButton, Tray                                                                                                                                                    |
| **Formulários** | Checkbox, FilterChips, OmniSearch, RadioGroup, Rating, SearchField, Select, Slider, Switch, TextField, ToggleCard                                                              |
| **Exibição**    | Avatar, Badge, Kbd, Tooltip                                                                                                                                                    |
| **Feedback**    | Alert, EmptyState, LiveBadge, SaveIndicator, ScanProgress, Skeleton, Spinner, Stamp, Toast                                                                                     |
| **Superfícies** | Accordion, AmbientBackdrop, Artwork, Bento, Card, Carousel, Dialog, Hero, PageHeader                                                                                           |
| **Navegação**   | Breadcrumb, CommandPalette, Dock, Menu, NavRail, Pagination, Stepper, SubTabs, Tabs                                                                                            |
| **Dados**       | BatteryMeter, BarChart, CountUp, DataTable, Duel, Heatmap, MeterCard, Odometer, ProgressBar, ProgressRing, RadialClock, Sparkline, Stat, StatTile, Sunburst, Timeline, Treemap |
| **Widgets**     | ActivityCard, AgendaRail, AlertCard, CallCard, DirectionsCard, HourlyForecast, PlayerCard, RouteMap, TimerCard, WeatherIcon, WeatherSky                                        |
| **Assistente**  | EmojiBurst, PresenceOrb, RadialMenu, SpeechBubble, ThinkingBubble                                                                                                              |
| **Movimento**   | BlackHole, Motion                                                                                                                                                              |
| **Temas**       | ThemeSwitcher                                                                                                                                                                  |

Os grupos são os mesmos da barra lateral da documentação.

### Tons

Componentes com a prop `tone` usam o mesmo vocabulário: `accent` (ação), `violet` (foco), `aqua` (progresso), `gold` (destaque), `success`, `warning`, `danger`, `info` e `neutral`. Cada componente aceita o subconjunto que faz sentido para ele. `ProgressBar` e `Sparkline` têm também `signature`, o gradiente de conquista.

### Utilitários

| Para quê    | Exportações                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------ |
| Cor         | `accentStyle(hue)` (cor por seção), `toneVar(tone)`, `hueFrom`, `initials`                       |
| Movimento   | `burst` (confete), `flyTo` (cometa até a bandeja), `easeOutCubic`, `countValue`, `useCanvasLoop` |
| Preferência | `useReducedMotion`, `useMotionPref`, `getMotionPref`, `setMotionPref`, `shouldAnimate`           |
| Layout      | `useSize`, `squarify`, `sizeTree`, `isRelated`                                                   |
| Formato     | `formatBytes`, `splitBytes`, `formatCount`, `formatAge`, `formatElapsed`, `baseName` (pt-BR)     |
| Classes     | `cx`                                                                                             |

## Cards de atividade

Algo em andamento (chamada, música, timer, gravação, rota, entrega) num card que segue o tema, com a cor do `tone` no ícone e nos valores.

```tsx
<CallCard name="Ana Lima" subtitle="Celular" onAccept={atender} onDecline={recusar} />
<TimerCard duration={25 * 60} label="Foco" onDone={tocar} />
<ActivityCard tone="gold" leading={<ActivityIcon><Bike /></ActivityIcon>} title="Pedalada" trailing={<span className="sn-activity__value">2,0 km</span>} />
```

## Temas

<img src=".github/assets/themes.png" alt="O mesmo card em seis temas: Sonido escuro, Sonido claro, Hueco Mundo, Canto, Drácula e Aurora" width="100%" />

| Tema                   | Ativar                                            |
| ---------------------- | ------------------------------------------------- |
| Sonido escuro (padrão) | nada, é o `:root`                                 |
| Sonido claro           | `data-theme="light"`                              |
| Hueco Mundo            | `data-theme="hueco-mundo"`                        |
| Canto · Canto claro    | `data-theme="canto"` · `data-theme="canto-claro"` |
| Drácula                | `data-theme="dracula"`                            |
| Glass                  | `data-theme="glass"`                              |
| Aurora                 | `data-theme="aurora"`                             |

```ts
document.documentElement.dataset.theme = "aurora";
// ou <ThemeSwitcher value={tema} onChange={setTema} /> com a lavada circular
```

Tokens em JS: `import { color, space, duration } from "@juninmd/sonido/tokens"`. Só as variáveis: `@juninmd/sonido/tokens.css`.

## De onde veio cada peça

Sonido junta o melhor dos apps do juninmd:

| Origem                                        | O que trouxe                                                                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| games-gallery                                 | Dock com ampliação, Hero, Card com tilt, AmbientBackdrop, ProgressRing, CountUp, Toast                                    |
| nerd-watch                                    | Tokens base, CommandPalette, Carousel, NavRail, BarChart, Artwork, confete                                                |
| canto-widget                                  | Tema Hueco Mundo e os 5 skins do canto, WeatherSky, AlertCard com 19 cenas, RouteMap, AgendaRail, Tabs, DataTable         |
| pobre-lingo                                   | Botão tátil, curva de mola, Rating e ProgressBar gamificados                                                              |
| mika                                          | PresenceOrb, ThinkingBubble, SpeechBubble, RadialMenu, EmojiBurst, PageHeader, StatTile, ToggleCard, SaveIndicator, Bento |
| ai-session-monitor                            | ThemeSwitcher, MeterCard                                                                                                  |
| franca-segura · eleicoes-radar · treta-aovivo | Heatmap, RadialClock, Odometer, Stamp, LiveBadge, Duel                                                                    |
| faxina                                        | Treemap, Sunburst, ScanProgress, BlackHole, Tray, formatadores pt-BR e o release com semantic-release e commitlint        |

## Desenvolvimento

```bash
npm install
npm run dev          # Storybook em http://localhost:6006
npm run check        # lint + tipos + auditoria do design system + testes
npm run build        # pacote em dist/
npm run build:docs   # site estático em storybook-static/
```

Os testes montam **todos os exemplos da documentação**, então o código que você copia da doc sempre funciona.

### Skills de auditoria

Em `.claude/skills/` há três skills para o Claude Code:

- **sonido-audit**: roda `npm run audit:ds`, lint, tipos e testes e corrige o que falhar.
- **sonido-a11y**: axe-core nos exemplos em todos os temas.
- **sonido-component**: passo a passo para criar ou portar um componente.

## Releases

Versões saem sozinhas a cada merge na `main`, pelo [semantic-release](https://github.com/semantic-release/semantic-release), a partir das mensagens de commit:

| Commit                        | Versão        |
| ----------------------------- | ------------- |
| `fix(button): foco no Safari` | patch `1.0.1` |
| `feat(toast): ação desfazer`  | minor `1.1.0` |
| `feat!: remove a prop tone`   | major `2.0.0` |

O commitlint valida as mensagens no `commit-msg` (husky) e no CI.

## Contribuir

1. Crie uma branch, faça commits semânticos e abra um PR.
2. O CI roda lint, tipos, auditoria, testes, build do pacote e da documentação.
3. No merge, a `main` publica no npm e atualiza a documentação.

## Licença

[MIT](LICENSE) © juninmd
