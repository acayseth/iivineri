import { NextRequest, NextResponse, userAgent } from 'next/server'

export default async function middleware(request: NextRequest) {
  const { isBot } = userAgent(request)
  const { pathname, href, search } = request.nextUrl.clone()
  const isRoot: boolean = !new URL(href).pathname.split('/').filter(Boolean)[0]

  console.log(
    `[${process.env.NODE_ENV}] middleware => `,
    decodeURI(pathname),
    JSON.stringify({
      isRoot,
      isBot,
      search: decodeURI(search),
    }),
  )

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next|_next/static|public|images|icons|favicon.ico|_vercel|.*\\..*).*)',
  ],
}
