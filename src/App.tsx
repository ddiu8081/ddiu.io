import type { Component } from 'solid-js'

import Hero from './components/Hero'
import Projects from './components/Projects'
import Footer from './components/Footer'

const App: Component = () => {
  const colorSchema  = window.matchMedia('(prefers-color-scheme: dark)')
    
  colorSchema.addEventListener('change', () => {
    if (colorSchema.matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  return (
    <main class="max-w-[65ch] px-7 py-[10vh] mx-auto prose prose-truegray xl:text-lg dark:prose-invert">
      <Hero />
      <Projects />
      <Footer />
    </main>
  )
}

export default App