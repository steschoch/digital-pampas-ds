import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// `vite dev`   → serves the showroom app (index.html → src/main.tsx) for local docs.
// `vite build` → builds the LIBRARY (src/index.ts → dist/) for publishing as
//                @digital-pampas/ds. The showroom is NOT part of the published package.
export default defineConfig({
  plugins: [react()],
  build: {
    // Don't dump the showroom's public/ assets (favicon, logos, showroom images)
    // into the published package. Fonts are shipped explicitly via `build:assets`.
    copyPublicDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'styles',
    },
    rollupOptions: {
      // Provided by the consuming app — never bundled into the DS.
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
    },
  },
})
