import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import netlify from '@astrojs/netlify/edge-functions'

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS(),
  ],
  output: 'server',
  adapter: netlify(),
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
    }
  }
})
