import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase warning threshold (kilobytes) if you just want to silence the warning
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split large vendor bundles and isolate Firebase into its own chunk
        manualChunks(id) {
          if (
            id.includes("node_modules/firebase") ||
            id.includes("@firebase")
          ) {
            return "firebase";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
  },
});
