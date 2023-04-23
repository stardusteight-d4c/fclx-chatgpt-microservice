'use client'

import { fetcher } from '@/http/http'
import { Chat, Message } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Key, useState } from 'react'
import useSWR from 'swr'

type ChatWithFirstMessage = Chat & {
  messages: [Message]
}

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const chatIdParam = searchParams.get('id')
  // const [chatId, setChatId] = useState<string | null>(chatIdParam)
  const { data: chats } = useSWR<ChatWithFirstMessage[]>('chats', fetcher, {
    fallbackData: [],
  })

  const { data: messages } = useSWR<Message[]>(
    chatIdParam ? `chats/${chatIdParam}/messages` : null,
    fetcher,
    {
      fallbackData: [],
    }
  )

  return (
    <section className="flex gap-5">
      <aside className="flex flex-col">
        LATERAL
        <button type="button"></button>
        <ul>
          {chats!.map(
            (chat: ChatWithFirstMessage, index: Key | null | undefined) => (
              <li key={index} onClick={() => router.push(`/?id=${chat.id}`)}>
                {chat.messages[0].content}
              </li>
            )
          )}
        </ul>
      </aside>
      <main>
        CHAT
        <ul>
          {messages!.map((message, index) => (
            <li key={index}>{message.content}</li>
          ))}
        </ul>
        <form>
          <textarea placeholder="Digite sua pergunta"></textarea>
          <button type="submit">Enviar</button>
        </form>
      </main>
    </section>
  )
}
