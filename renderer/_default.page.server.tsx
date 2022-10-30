import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { generateHydrationScript, renderToString } from 'solid-js/web'

import { PageContext } from './types'

const passToClient = ['pageProps', 'documentProps']

const render = (pageContext: PageContext) => {
  const { Page, pageProps } = pageContext

  const pageHtml = renderToString(() => <Page {...pageProps} />)

  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Diu'
  const description = (documentProps && documentProps.description) || 'Diu (ddiu8081), Developer.'

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="author" content="Diu" />
        <meta property="og:title" content="Diu" />
        <meta property="og:image" content="https://ddiu.io/avatar.png" />
        <meta property="description" content="${description}" />
        <meta property="og:description" content="${description}" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@ddiu8081" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://ddiu.io/" />
        <link rel="icon" href="/favicon.ico" />
        <title>${title}</title>
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`
}

export { render, passToClient }
