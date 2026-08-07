import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.search;

  return handleApiProxy(req, {
    path: `/hr/contract/archive${searchParams}`,
    method: 'GET',
  });
}
