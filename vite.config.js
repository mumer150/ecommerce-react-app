import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',           // ensures correct base path for SPA
  build: {
    outDir: 'dist'     // default, just to be explicit
  }
})