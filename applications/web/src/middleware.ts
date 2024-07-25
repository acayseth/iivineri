import { NextRequest, NextResponse, userAgent } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import i18nJson from '@/../i18n.json'

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

  const handleI18nRouting = createIntlMiddleware({
    locales: i18nJson.locales,
    defaultLocale: i18nJson.defaultLocale,
    localePrefix: 'as-needed',
  })

  const response = handleI18nRouting(request)

  return response
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next|_next/static|public|images|icons|favicon.ico|_vercel|.*\\..*).*)',
  ],
}
