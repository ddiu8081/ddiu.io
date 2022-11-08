import { Index } from 'solid-js'
import ProjectItem from './ProjectItem'

export default () => {
  const projectLists = [
    {
      name: 'Moegi Theme for VS Code',
      desc: 'An elegant theme for VS Code.',
      link: 'https://github.com/moegi-design/vscode-theme',
      icon: 'i-twemoji-cherry-blossom',
    }, {
      name: 'bilicli',
      desc: 'Bilibili-live danmu dashboard in your terminal.',
      link: 'https://github.com/ddiu8081/bilicli',
      icon: 'i-twemoji-control-knobs',
    }, {
      name: 'blive-message-listener',
      desc: 'Bilibili-live danmu listener with type.',
      link: 'https://github.com/ddiu8081/blive-message-listener',
      icon: 'i-twemoji-keyboard',
    }, {
      name: 'bus-vis',
      desc: 'City bus visualizations of China',
      link: 'https://bus.ljl.li/',
      icon: 'i-twemoji-oncoming-bus',
    }, {
      name: 'Tin',
      desc: 'Mathematical arts driven by t, i and anything',
      link: 'https://tin.ddiu.io/',
      icon: 'i-twemoji-eight-spoked-asterisk',
    }, {
      name: 'oreooo',
      desc: 'An oreo generater',
      link: 'https://oreo.ddiu.io/',
      icon: 'i-twemoji-cookie',
    }, {
      name: 'Fluent emoji maker',
      desc: 'Generate your own Fluent Emojis!',
      link: 'https://emoji.ddiu.io/',
      icon: 'i-twemoji-rolling-on-the-floor-laughing',
    }, {
      name: 'placeholder-image',
      desc: 'Generate placeholder images by simply adding params',
      link: 'https://ph.ljl.li/',
      icon: 'i-twemoji-ice',
    }, {
      name: 'Ghost theme Moegi',
      desc: 'An elegant & fresh ghost theme',
      link: 'https://github.com/moegi-design/ghost-theme-Moegi',
      icon: 'i-twemoji-newspaper',
    }, {
      name: 'Diu\'s Online Riddle',
      desc: 'An online puzzle game',
      link: 'https://riddle.ddiu.me/',
      icon: 'i-twemoji-exploding-head',
    },
  ]
  const openLink = () => {
    window.open('https://github.com/ddiu8081', '_blank')
  }
  return (
    <>
      <h2 class="flex items-center mt-14 mb-4 font-semibold text-3xl">
        <span flex-1 class="outfit">Projects</span>
        <div
          onClick={openLink}
          class="op-50 ml-2 hover:op-100 transition-opacity cursor-pointer" 
        >
          <div class="m-2 i-ri-arrow-right-up-line" ></div>
        </div>
      </h2>
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
