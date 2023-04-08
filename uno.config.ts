import { defineConfig, presetUno } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetWebFonts({
      provider: 'none',
      fonts: {
        serif: 'Newsreader',
        grotesk: 'Space Grotesk',
      }
    }),
  ],
  shortcuts: [{
    'bg-base': 'bg-light-100 dark:bg-dark-800',
    'fg-base': 'text-dark dark:text-truegray-400',
    'fg-emphasis': 'text-dark dark:text-light',
    'text-emphasis': 'font-serif font-italic text-lg fg-emphasis', 
  }],
})
