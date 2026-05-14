import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function localApiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      const apiRoutes = new Map([
        ['/api/chat', './api/chat.js'],
        ['/api/leads', './api/leads.js'],
      ])

      server.middlewares.use(async (req, res, next) => {
        const routePath = req.url?.split('?')[0]
        const modulePath = routePath ? apiRoutes.get(routePath) : undefined

        if (!modulePath) {
          next()
          return
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        const { default: handler } = await import(modulePath)
        handler(req, res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  process.env.GEMINI_API_KEY ||= env.GEMINI_API_KEY
  process.env.GEMINI_MODEL ||= env.GEMINI_MODEL
  process.env.LEAD_WEBHOOK_URL ||= env.LEAD_WEBHOOK_URL

  return {
    plugins: [react(), localApiPlugin()],
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
  }
})
