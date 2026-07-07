import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Showroom app build — used by Vercel to deploy the component catalogue.
// `vite build` (main config) builds the library for npm publish.
// This config builds the app (index.html → src/main.tsx) for the public showroom URL.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-showroom',
  },
})
