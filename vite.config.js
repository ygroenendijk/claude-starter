import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: '/meld-je-aan/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})
