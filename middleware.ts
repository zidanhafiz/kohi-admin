import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from './lib/auth'
 
export async function middleware(request: NextRequest) {
  const session = await getSession(); 
 
  if (session && !request.nextUrl.pathname.startsWith('/cashier')) {
    return NextResponse.redirect(new URL('/cashier', request.url))
  }
 
  if (!session && request.nextUrl.pathname.startsWith('/cashier')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}