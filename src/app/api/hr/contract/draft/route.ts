import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function GET(req: NextRequest) {
  return handleApiProxy(req, {
    path: '/hr/contract/draft',
    method: 'GET',
  });
}
