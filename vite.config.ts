import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: true,
    watch: {
      include: ["src/**"],
      exclude: ["node_modules/**"],
    },
    rollupOptions: {
      input: {
        background: "src/main.ts", // Only building the main
      },
      output: {
        entryFileNames: "background.js", // Output file named background.js
      },
    },
  },
});
