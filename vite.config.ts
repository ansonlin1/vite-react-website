import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification and tree shaking
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          forms: ["react-helmet-async"],
        },
      },
    },
    // Source maps for production debugging
    sourcemap: true,
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  // Development server optimization
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
  // Preview server for production builds
  preview: {
    port: 4173,
    host: true,
  },
});
