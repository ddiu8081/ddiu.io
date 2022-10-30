import { hydrate, render as render_ } from 'solid-js/web'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router'
import type { PageContext } from './types'

import 'uno.css'
import '@unocss/reset/tailwind.css'
import '../assets/main.css'
import '../assets/font.css'

let dispose: () => void

const render = async (pageContext: PageContextBuiltInClient & PageContext) => {
  const content = document.getElementById('root')
  const { Page, pageProps } = pageContext

  if (dispose) dispose()

  if (pageContext.isHydration) {
    dispose = hydrate(
      () => <Page {...pageProps} />,
      content!,
    )
  } else {
    render_(
      () => <Page {...pageProps} />,
      content!,
    )
  }
}

export { render }