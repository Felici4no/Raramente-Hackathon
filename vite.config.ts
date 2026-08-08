import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Same-origin proxy so the browser never hits raras.org directly (it
      // does not send permissive CORS headers). Mirrored in production by
      // api/raras/[...path].js as a Vercel serverless function.
      '/api/raras': {
        target: 'https://raras.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/raras/, '/api'),
      },
    },
  },
})
