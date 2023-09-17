import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ["Buffer", "Buffer"] })],
    },
  },
  plugins: [react()],
});
