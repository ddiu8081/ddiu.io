import { Index } from 'solid-js'
import ProjectItem from './ProjectItem'

export default () => {
  const projectLists = [
    {
      name: 'ghost-theme-Moegi',
      desc: 'An elegant & fresh ghost theme',
      link: 'https://github.com/moegi-design/ghost-theme-Moegi',
      icon: 'i-twemoji-newspaper',
    }, {
      name: 'bus-vis',
      desc: 'City bus visualizations of China',
      link: 'https://bus.ljl.li/',
      icon: 'i-twemoji-oncoming-bus',
    }, {
      name: 'oreooo',
      desc: 'An oreo generater',
      link: 'https://ljl.li/oreooo',
      icon: 'i-twemoji-cookie',
    }, {
      name: 'placeholder-image',
      desc: 'Generate placeholder images by simply adding params',
      link: 'https://ph.ljl.li/',
      icon: 'i-twemoji-ice',
    }, {
      name: 'Tin',
      desc: 'Mathematical arts driven by t, i and anything',
      link: 'https://tin.ddiu.me/',
      icon: 'i-twemoji-eight-spoked-asterisk',
    },
  ]
  return (
    <>
      <h2>Projects</h2>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Index each={projectLists}>
          {item => (
            <ProjectItem data={item()} />
          )}
        </Index>
      </div>
    </>
  )
}