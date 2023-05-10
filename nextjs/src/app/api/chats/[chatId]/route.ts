import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../prisma/prisma'
import { withAuth } from '../../helpers'

export const PUT = withAuth(
  async (
    request: NextRequest,
    token,
    { params }: { params: { chatId: string } }
  ) => {
    const body = await request.json()

    const chat = await prisma.chat.findUniqueOrThrow({
      where: {
        id: params.chatId,
      },
    })

    try {
      const updatedChat = await prisma.chat.update({
        where: { id: chat.id },
        data: { chat_name: body.newChatName },
      })

      return NextResponse.json(updatedChat)
    } catch (err) {
      console.error(err)
      return NextResponse.json(err)
    }
  }
)
