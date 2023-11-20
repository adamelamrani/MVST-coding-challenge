/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "setupTest.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
