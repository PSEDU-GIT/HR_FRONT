import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function GET(req: NextRequest) {
  return handleApiProxy(req, {
    path: `/hr/dashboard/summary`,
    method: 'GET',
  });
}
