import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('token')?.value;

  if (request.nextUrl.pathname.startsWith('/panel') && !request.nextUrl.pathname.startsWith('/panel/login') && !authToken) {
    return NextResponse.redirect(new URL('/panel/login', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/panel/login')  && authToken) {
    return NextResponse.redirect(new URL('/panel', request.url))
  }
}






