import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const pages = ['projects', 'experience', 'skills', 'certifications']

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(['home', ...pages].map(page => [
        page,
        fileURLToPath(new URL(page === 'home' ? './index.html' : `./${page}/index.html`, import.meta.url)),
      ])),
    },
  },
})
