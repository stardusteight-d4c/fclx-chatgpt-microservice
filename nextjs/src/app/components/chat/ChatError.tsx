import Image from 'next/legacy/image'

export function ChatError({ children }: { children: any }) {
  return (
    <li className="w-full">
      <div className="md:max-w-2xl lg:max-w-xl xl:max-w-3xl py-6 m-auto flex flex-row items-start space-x-4">
        <Image src="/openai.png" width={30} height={30} alt="" />
        <div className="relative w-[calc(100%-115px)] flex flex-col gap-1">
          <span className="text-[#f56262] block -mt-[4px] leading-7 tracking-wide capitalize">Ops! Ocorreu um erro: {children}</span>
        </div>
      </div>
    </li>
  )
}
