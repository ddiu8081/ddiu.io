import { Index, Show } from 'solid-js'

interface SocialsProps {
  data: {
    icon: string
    link: string
    text?: string
  }
}

const SocialItem = (props: SocialsProps) => {
  const { data } = props
  return (
    <a
      class="inline-flex px-3 py-2 mt-2 mr-2 rounded-md bg-gray-50 transition-colors decoration-none hover:bg-gray-100 dark:bg-gray-50/10 dark:hover:bg-gray-50/20"
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
    }, {
      text: 'Blog',
      link: 'https://notes.ljl.li',
      icon: 'i-ri-book-2-line',
    }, {
      text: '',
      link: 'https://www.instagram.com/dzpszied/',
      icon: 'i-ri-instagram-line',
    }, {
      text: '',
      link: 'https://www.behance.net/ddiu8081',
      icon: 'i-ri-behance-fill',
    }, {
      text: '',
      link: 'https://space.bilibili.com/541993',
      icon: 'i-ri-bilibili-fill',
    },
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
