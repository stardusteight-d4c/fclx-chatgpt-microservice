import { Loading } from './Loading'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function ChatMessage({
  content,
  is_from_bot,
  loading = false,
}: {
  content: string
  is_from_bot: boolean
  loading?: boolean
}) {
  const { data: session } = useSession()
  const background = is_from_bot ? 'bg-[#444654]' : 'bg-[#343541]'

  useEffect(() => {
    hljs.highlightAll()
  })

  return (
    <li className={`${background} w-full`}>
      <div className="w-full flex items-start gap-x-4 py-6 max-w-[768px] min-w-[768px] mx-auto">
        {!is_from_bot ? (
          <img
            src={session?.user?.image!}
            className="w-[30px] h-[30px] rounded-lg object-cover"
          />
        ) : (
          <img
            src="openai.png"
            className="w-[30px] h-[30px] rounded-lg object-cover"
          />
        )}
        {is_from_bot ? (
          <div
            className="relative block -mt-[4px] leading-7 tracking-wide capitaliz transition duration-100 ease-linear break-words"
            dangerouslySetInnerHTML={{
              __html: marked(content, { breaks: true }), //sanitize: true
            }}
          />
        ) : (
          <li className="relative block -mt-[4px] leading-7 tracking-wide capitaliz transition duration-100 ease-linear break-words">
            {content}
          </li>
        )}
      </div>
      {loading && (
        <div className="flex relative items-center justify-center pb-2">
          <Loading />
        </div>
      )}
    </li>
  )
}
