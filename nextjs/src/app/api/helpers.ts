import { NextRequest, NextResponse } from 'next/server'

type Config = { params: any }

type RouteHandler = (
  req: NextRequest,
  email: string | null,
  config: Config
) => Promise<NextResponse | Response> | NextResponse | Response

export function withAuth(routeHandler: RouteHandler) {
  return async (req: NextRequest, config: Config) => {
    const email = req.headers.get('authorization')
    const isLoggedIn = email !== 'not logged in'
    if (!isLoggedIn) {
      return NextResponse.json(
        { error: 'Not authenticated, the user must be logged in.' },
        {
          status: 401,
        }
      )
    }
    return routeHandler(req, email, config)
  }
}
