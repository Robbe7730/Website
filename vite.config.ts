import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
      target: 'esnext',
      // sourcemap: true,
      // manifest: true,
      // minify: false,
  },
  resolve: {
    alias: {
      "readable-stream": "vite-compatible-readable-stream",
    }
  }
})
