import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  // Using 'dist' for Netlify compatibility
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "3000",
    host: "0.0.0.0",
    strictPort: false,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  },
  optimizeDeps: {
    include: ['pdfjs-dist']
  },
  assetsInclude: ['**/*.worker.js']
});