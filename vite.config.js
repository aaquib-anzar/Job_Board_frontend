import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    historyApiFallback: true, // 👈 fallback to index.html for SPA routes
  },
})