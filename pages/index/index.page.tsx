import type { Component } from 'solid-js'

import Hero from './_components/Hero'
import Projects from './_components/Projects'
import Posts from './_components/Posts'
import Footer from './_components/Footer'

const documentProps = {
  title: 'Diu',
  description: 'Diu (ddiu8081), Developer.'
}

const Page: Component = () => {
  return (
    <main class="px-6 py-[8vh] max-w-[76ch] mx-auto xl:text-lg dark:prose-invert">
      <Hero />
      <Projects />
      <Posts />
      <Footer />
    </main>
  )
}

export { Page, documentProps }