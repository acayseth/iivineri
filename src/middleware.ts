import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next|icons|favicon.ico|manifest.json).*)',
  ],
};

export default function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl.clone();
  console.log('middleware =>', pathname);
  
  return NextResponse.next();
}
