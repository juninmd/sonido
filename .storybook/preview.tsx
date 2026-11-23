import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import { themes } from "storybook/theming";
import { SONIDO_THEMES } from "../src";
import { LiveDocsPage } from "./live";

const withTheme: Decorator = (Story, ctx) => {
  const theme = ctx.globals.theme as string;
  useEffect(() => {
    document.body.classList.add("sn-body");
    const root = document.documentElement;
    if (!theme || theme === "dark") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme]);
  return <Story />;
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Tema do Sonido",
      toolbar: {
        title: "Tema",
        icon: "paintbrush",
        items: SONIDO_THEMES.map((t) => ({ value: t.id, title: t.label })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "dark" },
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    a11y: { test: "error" },
    docs: { page: LiveDocsPage, codePanel: true, theme: themes.dark },
    options: {
      storySort: {
        order: [
          "Começar",
          "Ações",
          "Formulários",
          "Exibição",
          "Feedback",
          "Superfícies",
          "Navegação",
          "Dados",
          "Widgets",
          "Ilhas",
          "Assistente",
          "Movimento",
          "Temas",
        ],
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
