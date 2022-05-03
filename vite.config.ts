import { resolve } from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import Unocss from 'unocss/vite'

import { presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import { presetTypography } from '@unocss/preset-typography'

export default defineConfig({
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  plugins: [
    solidPlugin(),
    Unocss({
      presets: [
        presetIcons(),
        presetAttributify(),
        presetUno(),
        presetTypography({
          cssExtend: {
            'a': {
              'text-decoration': 'none',
            },
          },
        }),
      ],
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
})