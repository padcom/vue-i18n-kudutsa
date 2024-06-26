import { defineConfig } from 'vite'

import dts from 'vite-plugin-dts'

export default defineConfig ({
  plugins: [
    dts({ rollupTypes: true, logLevel: 'warn' }),
  ],
  build: {
    lib: {
      entry: 'index.ts',
      name: 'vite-plugin-vue-i18n',
      formats: ['es','umd'],
      fileName: 'index',
    },
    sourcemap: true,
    rollupOptions: {
      external: ['@intlify/unplugin-vue-i18n/vite'],
      output: {
        globals: {
          '@intlify/unplugin-vue-i18n/vite': 'intlifyUnpluginVueI18nVite',
        },
      },
    },
  },
})
