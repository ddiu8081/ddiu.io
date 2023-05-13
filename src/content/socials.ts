// @unocss-include
interface SocialProps {
  icon: string
  link: string
  class: string
  text?: string
  slots?: string
}

const socialLinks: SocialProps[] = [
  {
    text: 'Github',
    link: 'https://github.com/ddiu8081',
    icon: 'i-carbon:logo-github',
    class: 'hover:border-gray-700 dark:hover:border-white hover:text-gray-700 dark:hover:text-white'
  },
  {
    text: '',
    link: 'https://twitter.com/ddiu8081',
    icon: 'i-carbon:logo-twitter',
    class: 'hover:border-[#00ACEE] hover:text-[#00ACEE]'
  },
  {
    text: '',
    link: 'https://mas.to/@ddiu8081',
    icon: 'i-ri:mastodon-fill',
    class: 'hover:border-[#3088d4] hover:text-[#3088d4]'
  },
  {
    text: '',
    link: 'https://figma.com/@ddiu8081',
    icon: 'i-carbon:logo-figma',
    class: 'hover:border-[#f7c104] hover:text-[#f7c104]'
  },
  {
    text: '',
    link: 'https://space.bilibili.com/541993',
    icon: 'i-ri:bilibili-line',
    class: 'hover:border-[#fb7299] hover:text-[#fb7299]',
    // slots: 'bili-state',
  },
]

export default socialLinks