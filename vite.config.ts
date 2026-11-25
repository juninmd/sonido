/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: { index: "src/index.ts", tokens: "src/tokens/index.ts" },
      formats: ["es"],
      cssFileName: "sonido",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "react-dom/client"],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // Only raw CSS imports (token/contrast tests) are processed; styles stay off.
    css: { include: [/\.css\?raw$/] },
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
