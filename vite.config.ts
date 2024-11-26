import path from "path";
import dts from "vite-plugin-dts";
import paths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: "jsend",
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: (format) => "index.".concat(format, ".", "js"),
    },
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: [
        "lit",
        "svelte",
        "vue",
        "react",
        "react-dom",
        "react/jsx-runtime",
      ],
      output: {
        globals: {
          lit: "lit",
          vue: "vue",
          react: "react",
          svelte: "svelte",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [react(), dts({ insertTypesEntry: true }), paths()],
});
