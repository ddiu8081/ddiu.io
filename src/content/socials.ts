// @unocss-include
interface SocialProps {
  icon: string
  title: string
  link: string
  class: string
  showTitle?: boolean
  slots?: string
}

const socialLinks: SocialProps[] = [
  {
    title: 'Github',
    link: 'https://github.com/ddiu8081',
    icon: 'i-carbon:logo-github',
    showTitle: true,
    class: 'hover:border-gray-700 dark:hover:border-white hover:text-gray-700 dark:hover:text-white'
  },
  {
    title: 'X',
    link: 'https://twitter.com/ddiu8081',
    icon: 'i-carbon:logo-x',
    class: 'hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'
  },
  {
    title: '',
    link: 'https://mas.to/@ddiu8081',
    icon: 'i-ri:mastodon-fill',
    class: 'hover:border-[#3088d4] hover:text-[#3088d4]'
  },
  {
    title: '',
    link: 'https://figma.com/@ddiu8081',
    icon: 'i-carbon:logo-figma',
    class: 'hover:border-[#f7c104] hover:text-[#f7c104]'
  },
  {
    title: '',
    link: 'https://space.bilibili.com/541993',
    icon: 'i-ri:bilibili-line',
    class: 'hover:border-[#fb7299] hover:text-[#fb7299]',
  },
]

export default socialLinks