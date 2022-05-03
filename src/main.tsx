import { render } from 'solid-js/web'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import './main.css'
import './assets/font.css'

import App from './App'

render(() => <App />, document.getElementById('root') as HTMLElement)