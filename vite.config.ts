import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Para GitHub Pages, el base debe ser el nombre de tu repositorio
// Si tu repo se llama "JamieFoxx", usa '/JamieFoxx/'
// Si está en la raíz del dominio, usa '/'
const repoName = process.env.VITE_REPO_NAME || 'JamieFoxx';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
  },
})
