import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma'
import { withAuth } from '../../../helpers'

export const GET = withAuth(
  async (
    _request: NextRequest,
    email,
    { params }: { params: { chatId: string } }
  ) => {
    try {
      const chat = await prisma.chat.findUniqueOrThrow({
        where: {
          id: params.chatId!,
        },
      })
      if (chat.user_email !== email) {
        return NextResponse.json({ error: 'Not Found.' }, { status: 404 })
      }
      const messages = await prisma.message.findMany({
        where: {
          chat_id: params.chatId,
        },
        orderBy: { created_at: 'asc' },
      })
      return NextResponse.json(messages)
    } catch (err) {
      console.error(err)
      return NextResponse.json(err)
    }
  }
)

export const POST = withAuth(
  async (
    request: NextRequest,
    email,
    { params }: { params: { chatId: string } }
  ) => {
    try {
      const chat = await prisma.chat.findUniqueOrThrow({
        where: {
          id: params.chatId!,
        },
      })
      if (chat.user_email !== email) {
        return NextResponse.json({ error: 'Not Found' }, { status: 404 })
      }
      const body = await request.json()
      const messageCreated = await prisma.message.create({
        data: {
          content: body.message,
          chat_id: chat.id,
        },
      })
      return NextResponse.json(messageCreated)
    } catch (err) {
      console.error(err)
      return NextResponse.json(err)
    }
  }
)
