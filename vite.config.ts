import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import ssr from 'vite-plugin-ssr/plugin'
import Unocss from 'unocss/vite'

import { presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import { presetTypography } from '@unocss/preset-typography'

export default defineConfig({
  plugins: [
    solidPlugin({
      ssr: true,
    }),
    Unocss({
      presets: [
        presetIcons(),
        presetAttributify(),
        presetUno({
          dark: 'media'
        }),
        presetTypography({
          cssExtend: {
            'a': {
              'text-decoration': 'none',
            },
          },
        }),
      ],
    }),
    ssr({
      prerender: true,
    }),
  ],
  build: {
    target: 'esnext',
  },
})