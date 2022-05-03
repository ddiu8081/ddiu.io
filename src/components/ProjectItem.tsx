interface Props {
  data: {
    name: string
    desc: string
    link: string
    icon: string
  }
}

export default (props: Props) => {
  const { data } = props
  return (
    <a
      class="p-4 rounded-md bg-gray-50 transition-colors decoration-none hover:bg-gray-100 dark:bg-gray-50/10 dark:hover:bg-gray-50/20"
      href={data.link}
      target="_blank"
    >
      <div class="flex h-full items-center justify-center">
        <div flex-1>
          <div font-semibold>{data.name}</div>
          <div op-50 font-normal text-sm>{data.desc}</div>
        </div>
        <div ml-4 text-4xl op-75>
          <div class={data.icon} />
        </div>
      </div>
    </a>
  )
}
