import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import preload from 'vite-plugin-preload'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    preload({
      debug: true,
      includeJs: true,
      includeCss: true
    })
  ],
  build: {
      // 1. Poprawia Lighthouse – przeglądarka preloaduje moduły JS wcześniej
      modulePreload: {        polyfill: true,
      },

      // 2. Dziel JS/CSS na małe chunki, a nie jeden wielki entry (duży zysk)
      cssCodeSplit: true,

      // 3. Zmniejsza bundle + przyspiesza parsing JS
      target: 'es2020',

      // 4. Lepsza kompresja outputu (zamiast domyślnego)
      minify: 'esbuild',

      // 5. Mniejsze sourcemapy lub ich brak w produkcji
      sourcemap: false,

      // 6. Optymalizuje preloading modułów i zależności
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },
})
