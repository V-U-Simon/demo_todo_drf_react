import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// указывает, что импорты относительно этого пути должны рассматриваться как абсолютные
const aliases = {
  src: path.resolve(__dirname, "src/"),
  // src: "/src",
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases,
  },
  server: {
    watch: { usePolling: true }, // for hot reloading
    host: true,
    strictPort: true,
    port: 5173, // This is the port which we will use in docker
  },
});
