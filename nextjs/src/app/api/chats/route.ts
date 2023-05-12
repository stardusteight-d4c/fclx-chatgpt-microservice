import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../prisma/prisma'
import { withAuth } from '../helpers'

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const chatCreated = await prisma.chat.create({
      data: {
        user_email: body.user_email,
        chat_name: body.message,
        messages: {
          create: {
            content: body.message,
          },
        },
      },
      select: {
        id: true,
        chat_name: true,
        messages: true,
      },
    })
    return NextResponse.json(chatCreated)
  } catch (err) {
    console.error(err)
    return NextResponse.json(err)
  }
}

export const GET = withAuth(async (_request: NextRequest, email) => {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        user_email: email!,
      },
      select: {
        id: true,
        chat_name: true,
        messages: {
          orderBy: { created_at: 'asc' },
          take: 1,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return NextResponse.json(chats)
  } catch (err) {
    console.error(err)
    return NextResponse.json(err)
  }
})
