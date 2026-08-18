import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/auth';

const API_BASE = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://xamfinity.n-e.kr';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const formData = await req.formData();

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}/server/api/file-upload`, {
      method: 'POST',
      body: formData,
      headers,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('file-upload proxy error:', error);
    return NextResponse.json(
      { success: false, message: '파일 업로드에 실패했습니다.' },
      { status: 500 },
    );
  }
}
