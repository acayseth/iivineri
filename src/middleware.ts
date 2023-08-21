import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next|icons|favicon.ico|sw.js|manifest.json).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl.clone();
  console.log('middleware =>', pathname);
  
  return NextResponse.next();
}
