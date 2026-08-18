import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/auth';

const API_BASE =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://xamfinity.n-e.kr';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ contractId: string }> },
) {
  try {
    const { contractId } = await params;
    const session = await auth();

    if (!session?.accessToken) {
      return NextResponse.json({ message: 'UNAUTHENTICATED' }, { status: 401 });
    }

    const backendRes = await fetch(`${API_BASE}/hr/contract/${contractId}/signature-image`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    });

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: '서명 이미지를 불러오지 못했습니다.' },
        { status: backendRes.status },
      );
    }

    const contentType = backendRes.headers.get('content-type') || 'image/png';
    const imageBuffer = await backendRes.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Signature image proxy error:', error);
    return NextResponse.json({ message: '서명 이미지 처리 오류' }, { status: 500 });
  }
}
