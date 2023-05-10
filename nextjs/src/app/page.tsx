'use client'

import { FormEvent, Key, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import useSWRSubscription from 'swr/subscription'
import ClientHttp, { fetcher } from '@/http/http'
import { Chat, Message } from '@prisma/client'
import { ChatError } from './components/chat/ChatError'
import { ChatMessage } from './components/chat/ChatMessage'
import { useSession, signIn, signOut } from 'next-auth/react'
import {
  EditIcon,
  TrashIcon,
  MessageIcon,
  ArrowRightIcon,
  PlusIcon,
  LoginIcon,
  CheckIcon,
  CloseIcon,
  LogoutIcon,
} from './components/icons'

type ChatWithFirstMessage = Chat & {
  messages: [Message]
}

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const chatIdParam = searchParams.get('id')
  const [chatId, setChatId] = useState<string | null>(chatIdParam)
  const [messageId, setMessageId] = useState<string | null>(null)
  const [activeEditItem, setActiveEditItem] = useState('')
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

  console.log('session', session)

  useEffect(() => {
    setChatId(chatIdParam)
  }, [chatIdParam])

  useEffect(() => {
    const txtarea = document.querySelector(
      '#message-input'
    ) as HTMLTextAreaElement
    txtarea.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
      }
    })
    txtarea.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        const form = document.querySelector('#form') as HTMLFormElement
        const submitButton = form.querySelector('button') as HTMLButtonElement
        form.requestSubmit(submitButton)
        return
      }
      if (txtarea.scrollHeight >= 200) {
        txtarea.style.overflowY = 'scroll'
      } else {
        txtarea.style.overflowY = 'hidden'
        txtarea.style.height = 'auto'
        txtarea.style.height = txtarea.scrollHeight + 'px'
      }
    })
  }, [])

  useEffect(() => {
    const chatContainer: HTMLElement | null =
      document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop =
        chatContainer.scrollHeight - chatContainer.clientHeight
    }
  }, [messageLoading])

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

  async function onEditChatName(chatId: string) {
    const chatNameInput = document.getElementById(
      'editChatName'
    ) as HTMLInputElement
    const body = {
      newChatName: chatNameInput.value,
    }
    await ClientHttp.put(`/chats/${chatId}`, body)
    mutateChats()
    setActiveEditItem('')
  }

  async function onDeleteChat(chatId: string) {
    await ClientHttp.delete(`/chats/${chatId}`)
    router.push('/')
    location.reload()
  }

  function handleIcons(
    isSelected: boolean,
    isEditing: boolean,
    chatId: string
  ) {
    if (isSelected && !isEditing) {
      return (
        <ul>
          <li
            onClick={() => {
              if (activeEditItem === '') {
                setActiveEditItem(chatId)
              } else {
                setActiveEditItem('')
              }
            }}
          >
            <EditIcon className="w-5 h-5 absolute right-[34px] bottom-[14px] hover:brightness-125" />
          </li>
          <li onClick={() => onDeleteChat(chatId)}>
            <TrashIcon className="w-5 h-5 absolute right-[8px] bottom-[14px] hover:brightness-125" />
          </li>
        </ul>
      )
    } else if (isSelected && isEditing) {
      return (
        <ul>
          <li onClick={() => onEditChatName(chatId)}>
            <CheckIcon className="w-5 h-5 absolute right-[34px] bottom-[14px] hover:brightness-125" />
          </li>
          <li onClick={() => setActiveEditItem('')}>
            <CloseIcon className="w-5 h-5 absolute right-[8px] bottom-[14px] hover:brightness-125" />
          </li>
        </ul>
      )
    }
  }

  return (
    <section className="flex relative w-full overflow-x-hidden max-w-[100vw] h-full">
      <i className="bg-black min-w-[260px] max-w-[260px] min-h-scree max-h-screen -z-10" />
      <aside className="fixed left-0 flex p-2 flex-col bg-black min-w-[260px] max-w-[260px] h-screen text-text">
        <button
          type="button"
          onClick={() => {
            router.push('/')
            setChatId(null)
            setMessageId(null)
          }}
          className="p-3 mb-2 border border-white/20 rounded-md hover:bg-text/5 flex items-center justify-start gap-x-2"
        >
          <PlusIcon className="w-5 h-5" /> New Chat
        </button>
        <ul className="scrollHiddenCSO scrollHiddenIEF flex flex-col overflow-x-hidden h-full">
          {chats!.map(
            (chat: ChatWithFirstMessage, index: Key | null | undefined) => {
              const isSelected = chat.id === chatIdParam
              const isEditing = chat.id === activeEditItem
              return (
                <li
                  key={index}
                  onClick={() => {
                    !isSelected && router.push(`/?id=${chat.id}`)
                  }}
                  className={`${
                    isSelected ? 'bg-[#343541]/90' : 'hover:bg-[#343541]/40'
                  } group py-3 px-2 relative overflow-x-hidden gap-x-2 rounded-md w-full text-text mr-2 hover:cursor-pointer flex items-center whitespace-nowrap`}
                >
                  <i
                    className={`${
                      isSelected
                        ? 'via-[#343541] to-[#343541] w-[115px]'
                        : 'via-black to-black group-hover:via-[#27292f] group-hover:to-[#27292f] w-[50px]'
                    } absolute right-0 bg-gradient-to-r from-transparent h-full`}
                  />
                  <MessageIcon className="max-w-[20px] min-w-[20px] h-5" />
                  {chat.id === activeEditItem ? (
                    <input
                      id="editChatName"
                      type="text"
                      defaultValue={chat.chat_name}
                      className="bg-transparent outline-none max-w-[148px] w-full border border-blue-600 z-[200]"
                    />
                  ) : (
                    <p className="border border-transparent">
                      {chat.chat_name}
                    </p>
                  )}
                  {handleIcons(isSelected, isEditing, chat.id)}
                </li>
              )
            }
          )}
          <div className="mt-auto border-t border-t-gray pt-2">
            <li className="group cursor-pointer p-3 relative overflow-x-hidden gap-x-3 hover:bg-[#343541]/90 rounded-md w-full text-text mr-2 flex items-center whitespace-nowrap">
              <img
                referrerPolicy="no-referrer"
                src={session ? session?.user?.image! : 'user-placeholder.png'}
                className="w-[30px] h-[30px] rounded-lg object-cover"
              />
              <span className="w-[140px] truncate">
                {session ? session?.user?.name : 'Unnamed'}
              </span>
              {session ? (
                <button onClick={() => signOut()}>
                  <LogoutIcon className="w-5 h-5 ml-auto cursor-pointer" />
                </button>
              ) : (
                <button onClick={() => signIn()}>
                  <LoginIcon className="w-5 h-5 ml-auto cursor-pointer" />
                </button>
              )}
            </li>
          </div>
        </ul>
      </aside>
      <main className="flex w-full relative bg-[#343541]">
        <div
          id="chat-container"
          className="h-screen overflow-y-scroll w-full text-text-variant"
        >
          {messages === undefined || messages?.length === 0 ? (
            <>
              <div className="absolute flex flex-col items-center justify-center left-1/2 -translate-x-1/2 top-[40%] -translate-y-1/2">
                <div className="honeycomb">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <h2 className="text-4xl font-bold mt-8">ChatGPT</h2>
                <span className="text-xl text-[#c5c5d2] text-center opacity-70 font-medium mt-2">
                  Want to expand your knowledge? Chat with ChatGPT!
                </span>
              </div>
            </>
          ) : (
            <ul>
              {messages!.map((message, index) => (
                <ChatMessage
                  key={index}
                  content={message.content}
                  is_from_bot={message.is_from_bot}
                />
              ))}
              {messageLoading && (
                <ChatMessage
                  content={messageLoading}
                  is_from_bot={true}
                  loading={true}
                />
              )}
              {errorMessageLoading && (
                <ChatError>{errorMessageLoading}</ChatError>
              )}
              <li className="max-h-[192px] min-h-[192px] w-full bg-[#34373f]"></li>
            </ul>
          )}
        </div>

        <div className="absolute bottom-0 w-full z-0">
          <i className="absolute bottom-0 max-h-[192px] pointer-events-none min-h-[192px] w-full bg-gradient-to-t from-[#34373f] via-[#34373f] to-transparent" />
          <form id="form" onSubmit={onSubmit} className="relative w-full">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[55px]">
              <div className="relative w-full">
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
              <span className="absolute -bottom-6 text-[#c5c5d2] text-xs whitespace-nowrap">
                Free Research Preview. ChatGPT may produce inaccurate
                information about people, places, or facts.{' '}
                <a
                  href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
                  target="_blank"
                  className="cursor-pointer underline"
                >
                  ChatGPT May 3 Version
                </a>
              </span>
            </div>
          </form>
        </div>
      </main>
    </section>
  )
}
