import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/auth';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. 정적 파일 및 API/에셋 예외 처리
  const isFileRequest = /\.(.*)$/.test(pathname);
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || isFileRequest) {
    return NextResponse.next();
  }

  const session = await auth();
  const now = Math.floor(Date.now() / 1000);

  const isLoggedIn =
    !!session?.accessToken && !(session?.refreshTokenExpires && now >= session.refreshTokenExpires);

  // 2. /login 페이지 접근 처리
  if (pathname === '/login') {
    if (isLoggedIn) {
      // 이미 로그인되어 있으면 메인(/)으로 리다이렉트
      return NextResponse.redirect(new URL('/', request.url));
    }
    // 로그인 안 되어 있으면 로그인 페이지 노출
    return NextResponse.next();
  }

  // 3. 비로그인 상태로 보호된 페이지 접근 시 hakon.co.kr로 리다이렉트
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('https://hakon.co.kr'));
  }

  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|assets).*)'],
};
