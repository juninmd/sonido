import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "Sonido",
    brandUrl: "https://github.com/juninmd/sonido",
    colorPrimary: "#ff3d6e",
    colorSecondary: "#7c5cff",
    appBg: "#0a0b12",
    appContentBg: "#12141f",
    appPreviewBg: "#0a0b12",
    appBorderColor: "rgba(255,255,255,0.08)",
    barBg: "#12141f",
    textColor: "#f1f2f8",
    fontBase: '"Inter", system-ui, sans-serif',
    fontCode: '"JetBrains Mono", ui-monospace, monospace',
  }),
  sidebar: { showRoots: true },
});
