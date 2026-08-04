import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from './fetchWithAuth';

type ProxyOptions = {
  path: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  addBody?: Record<string, any>;
  statusCode?: number;
  hasToken?: boolean;
};

export async function handleApiProxy(req: NextRequest, options: ProxyOptions) {
  try {
    const { path, method = 'POST', addBody = {}, statusCode = 200, hasToken = true } = options;

    let fetchOptions: RequestInit = {
      method,
    };

    if (method !== 'GET') {
      const contentLength = req.headers.get('content-length');
      const hasBody = contentLength && parseInt(contentLength) > 0;

      if (hasBody) {
        const rawBody = await req.json();
        const body = JSON.stringify({ ...rawBody, ...addBody });

        fetchOptions = {
          ...fetchOptions,
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      }
    }

    const response = await fetchWithAuth(path, fetchOptions, hasToken);

    return NextResponse.json(
      { success: true, data: response.data, message: response.message },
      { status: statusCode }
    );
  } catch (error) {
    if ((error as Error).message === 'UNAUTHENTICATED') {
      return NextResponse.json(
        {
          success: false,
          error: '토큰이 만료되었습니다.',
          data: (error as any).data,
        },
        { status: 401 }
      );
    }

    if ((error as any).data?.code >= 400 && (error as any).data?.code < 500) {
      const errorDetail =
        (error as any).data?.message ||
        (error as any).data?.error ||
        (error as Error).message;
      return NextResponse.json(
        { success: false, error: errorDetail, message: errorDetail, data: (error as any).data },
        { status: (error as any).data?.code }
      );
    }
    console.error(`🔴 Error in handleApiProxy(${options.path})`, error);
    const serverDetail =
      (error as any).data?.message ||
      (error as any).data?.error ||
      (error as Error).message ||
      '서버 처리 중 오류가 발생했습니다.';
    return NextResponse.json(
      { success: false, error: serverDetail, message: serverDetail, data: (error as any).data },
      { status: 500 }
    );
  }
}
