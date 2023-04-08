import {
  defineConfig,
  presetUno,
  presetWebFonts,
  presetTypography,
} from 'unocss'

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
    presetTypography({
      cssExtend: {
        'h1': {
          'font-size': '1.6em',
        },
        'h2': {
          'font-size': '1.4em',
          'margin': '1.4em 0 0.5em',
        },
        'h3': {
          'font-size': '1.25em',
          'margin': '1.2em 0 0.5em',
        },
        'h5, h6': {
          margin: '1em 0 0.5em',
        },
      },
    }),
  ],
  shortcuts: [{
    'bg-base': 'bg-light-100 dark:bg-dark-800',
    'fg-base': 'text-neutral-500 dark:text-neutral-400',
    'fg-emphasis': 'text-dark dark:text-light',
    'border-base': 'border-light-800 dark:border-dark-100',
    'text-emphasis': 'font-serif font-italic text-lg fg-emphasis', 
  }],
})
