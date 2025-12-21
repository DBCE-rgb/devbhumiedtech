import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
})
  
  return {
    // For GitHub Pages, the base path is set via VITE_BASE_PATH env variable
    // Falls back to '/' for local development or custom domain
    base: env.VITE_BASE_PATH || process.env.VITE_BASE_PATH || '/',
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
