import { fileURLToPath } from 'node:url'

import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      vue(),
      tailwindcss(),
    ],

    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)