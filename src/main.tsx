import { render } from 'solid-js/web'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import './main.css'
import './assets/font.css'

import App from './App'

const colorSchema = window.matchMedia('(prefers-color-scheme: dark)')
const performDark = () => {
  if (colorSchema.matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
colorSchema.addEventListener('change', performDark)
performDark()

render(() => <App />, document.getElementById('root') as HTMLElement)
