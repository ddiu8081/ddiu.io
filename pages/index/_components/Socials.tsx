import { Index, Show } from 'solid-js'

interface SocialProps {
  data: {
    icon: string
    link: string
    class: string
    text?: string
  }
}

const SocialItem = (props: SocialProps) => {
  const { data } = props
  return (
    <a
      class={`inline-flex px-3 py-2 mt-2 mr-2 rounded-md bg-gray-50 transition-colors decoration-none ${data.class} hover:text-white dark:bg-gray-50/10`}
      href={data.link}
      target="_blank"
    >
      <div text-xl>
        <div class={data.icon} />
      </div>
      <Show
        when={data.text}
      >
        <div text-sm ml-1>{ data.text }</div>
      </Show>
    </a>
  )
}

export default () => {
  const socialLists = [
    {
      text: 'Github',
      link: 'https://github.com/ddiu8081',
      icon: 'i-ri-github-fill',
      class: 'hover:bg-gray-700 dark:hover:bg-white dark:hover:text-gray-900'
    }, {
      text: 'Blog',
      link: 'https://notes.ljl.li',
      icon: 'i-ri-book-2-line',
      class: 'hover:bg-gray-700 dark:hover:bg-white dark:hover:text-gray-900'
    }, {
      text: '',
      link: 'https://twitter.com/ddiu8081',
      icon: 'i-fa-brands-twitter',
      class: 'hover:bg-[#00ACEE]'
    }, {
      text: '',
      link: 'https://mas.to/@ddiu8081',
      icon: 'i-fa-brands-mastodon',
      class: 'hover:bg-[#3088d4]'
    }, {
      text: '',
      link: 'https://www.instagram.com/dzpszied/',
      icon: 'i-fa-brands-instagram',
      class: 'hover:bg-gradient-to-r from-[#fd5949] to-[#d6249f]'
    }, {
      text: '',
      link: 'https://figma.com/@ddiu8081',
      icon: 'i-fa-brands-figma',
      class: 'hover:bg-[#f7c104]'
    }, {
      text: '',
      link: 'https://dribbble.com/ddiu8081',
      icon: 'i-fa-brands-dribbble',
      class: 'hover:bg-[#ea4c89] dark:hover:bg-[#ea4c89]'
    }, {
      text: '',
      link: 'https://space.bilibili.com/541993',
      icon: 'i-ri-bilibili-fill',
      class: 'hover:bg-[#fb7299]'
    }
  ]

  return (
    <div mt-4>
      <Index each={socialLists}>
        {item => (
          <SocialItem data={item()} />
        )}
      </Index>
    </div>
  )
}
