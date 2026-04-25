import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      // More reliable hot-reload on some Windows/corporate file systems.
      usePolling: true,
      interval: 120,
    },
    hmr: {
      overlay: true,
    },
  },
})
