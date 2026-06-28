import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    tsconfigPaths: true,
  },
  optimizeDeps: {
    include: ["recharts", "react-is", "xlsx", "jspdf", "jspdf-autotable"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          charts: ["recharts"],
          pdf: ["jspdf", "jspdf-autotable"],
          excel: ["xlsx"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname)],
    },
  },
});