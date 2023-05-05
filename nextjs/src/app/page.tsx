'use client'

import { FormEvent, Key, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import useSWRSubscription from 'swr/subscription'
import ClientHttp, { fetcher } from '@/http/http'
import { Chat, Message } from '@prisma/client'
import { PlusIcon } from './components/icons/Plus'
import { MessageIcon } from './components/icons/Message'
import { ArrowRightIcon } from './components/icons/ArrowRight'

type ChatWithFirstMessage = Chat & {
  messages: [Message]
}

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const chatIdParam = searchParams.get('id')
  const [chatId, setChatId] = useState<string | null>(chatIdParam)
  const [messageId, setMessageId] = useState<string | null>(null)
  const { data: chats, mutate: mutateChats } = useSWR<ChatWithFirstMessage[]>(
    'chats',
    fetcher,
    {
      fallbackData: [],
      revalidateOnFocus: false,
    }
  )
  const { data: messages, mutate: mutateMessages } = useSWR<Message[]>(
    chatId ? `chats/${chatId}/messages` : null,
    fetcher,
    {
      fallbackData: [],
      revalidateOnFocus: false,
    }
  )
  // server-sent event is when a web page automatically gets updates from a server
  const { data: messageLoading, error: errorMessageLoading } =
    useSWRSubscription(
      messageId ? `/api/messages/${messageId}/events` : null,
      (path: string, { next }) => {
        console.log('init event source')
        const eventSource = new EventSource(path)
        eventSource.onmessage = (event) => {
          console.log('data: ', event)
          const newMessage = JSON.parse(event.data)
          next(null, newMessage.content)
        }
        eventSource.onerror = (event: any) => {
          console.log('error: ', event)
          eventSource.close()
          next(event.data, null)
        }
        eventSource.addEventListener('end', (event) => {
          console.log('end: ', event)
          eventSource.close()
          const newMessage = JSON.parse(event.data)
          mutateMessages((messages) => [...messages!, newMessage], false)
          next(null, null)
        })
        return () => {
          console.log('close event source')
          eventSource.close()
        }
      }
    )

  useEffect(() => {
    setChatId(chatIdParam)
  }, [chatIdParam])

  // useEffect(() => {
  //   const txtarea = document.querySelector(
  //     '#message-input'
  //   ) as HTMLTextAreaElement
  //   txtarea.addEventListener('keydown', (event) => {
  //     if (event.key === 'Enter' && !event.shiftKey) {
  //       event.preventDefault()
  //     }
  //   })
  //   txtarea.addEventListener('keyup', (event) => {
  //     if (event.key === 'Enter' && !event.shiftKey) {
  //       const form = document.querySelector('#form') as HTMLFormElement
  //       const submitButton = form.querySelector('button') as HTMLButtonElement
  //       form.requestSubmit(submitButton)
  //       return
  //     }
  //     if (txtarea.scrollHeight >= 200) {
  //       txtarea.style.overflowY = 'scroll'
  //     } else {
  //       txtarea.style.overflowY = 'hidden'
  //       txtarea.style.height = 'auto'
  //       txtarea.style.height = txtarea.scrollHeight + 'px'
  //     }
  //   })
  // }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const txtarea = event.currentTarget.querySelector(
      'textarea'
    ) as HTMLTextAreaElement
    const message = txtarea?.value
    if (!chatId) {
      const newChat: ChatWithFirstMessage = await ClientHttp.post('chats', {
        message,
      })
      mutateChats([newChat, ...chats!], false)
      setChatId(newChat.id)
      setMessageId(newChat.messages[0].id)
    } else {
      const newMessage: Message = await ClientHttp.post(
        `chats/${chatId}/messages`,
        { message }
      )
      mutateMessages([...messages!, newMessage], false)
      setMessageId(newMessage.id)
    }
    txtarea.value = ''
  }

  return (
    <section className="flex w-full h-full">
      <aside className="flex p-2 flex-col bg-black min-w-[260px] max-w-[260px] h-screen text-text">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="p-3 mb-2 border border-white/20 rounded-md hover:bg-text/5 flex items-center justify-start gap-x-2"
        >
          <PlusIcon className="w-5 h-5" /> New Chat
        </button>
        <ul className="overflow-y-scroll flex flex-col overflow-x-hidden">
          {chats!.map(
            (chat: ChatWithFirstMessage, index: Key | null | undefined) => (
              <li
                key={index}
                onClick={() => router.push(`/?id=${chat.id}`)}
                className="group p-3 relative overflow-x-hidden gap-x-3 hover:bg-[#343541] hover:brightness-110 rounded-md w-full text-text mr-2 hover:cursor-pointer flex items-center whitespace-nowrap"
              >
                <i className="absolute right-0 bg-gradient-to-r from-transparent via-black to-black group-hover:via-[#343541] group-hover:to-[#343541] w-[50px] h-full " />
                <MessageIcon className="max-w-[20px] min-w-[20px] h-5" />
                {chat.messages[0].content}
              </li>
            )
          )}
        </ul>
      </aside>
      <main className="flex flex-1 relative bg-[#343541]">
        <ul className="h-screen overflow-y-scroll w-full text-text-variant">
          {messages!.map((message, index) => (
            <div
              key={index}
              className={`${
                message.is_from_bot ? 'bg-[#444654]' : 'bg-[#343541]'
              } w-full border-b border-b-[#24252b]/50`}
            >
              <li className="w-full flex items-start gap-x-4 py-6 max-w-[768px] min-w-[768px] mx-auto">
                {!message.is_from_bot ? (
                  <img
                    src="https://github.com/stardusteight-d4c.png"
                    className="w-[30px] h-[30px] rounded-md object-cover"
                  />
                ) : (
                  <img
                    src="openai.jpg"
                    className="w-[30px] h-[30px] rounded-md object-cover"
                  />
                )}

                <span className="block -mt-[3px] capitalize">
                  {message.content}
                </span>
              </li>
            </div>
          ))}
          {messageLoading && <li>{messageLoading}</li>}
          {errorMessageLoading && <li>{errorMessageLoading}</li>}
          <li className="max-h-[192px] min-h-[192px] w-full bg-[#34373f]"></li>
        </ul>
        <div className="absolute bottom-0 inset-x-0">
          <form id="form" onSubmit={onSubmit} className="relative w-full">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[55px]">
              <div className="relative">
                <textarea
                  id="message-input"
                  placeholder="Send a message"
                  className="outline-none box-border py-[12px] pl-[16px] pr-[35px] h-[50px] border border-[#303039] max-w-[768px] min-w-[768px] max-h-[218px] bg-[#40414f] text-white placeholder:text-[#8e8ea0] resize-none rounded-md"
                />
                <button
                  type="submit"
                  className="absolute text-[#89899b] hover:bg-black rounded-md transition-all p-1 right-2 top-1/2 -translate-y-1/2"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </section>
  )
}
