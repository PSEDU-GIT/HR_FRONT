import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function POST(req: NextRequest) {
  return handleApiProxy(req, {
    path: '/hr/academy/seal-image',
    method: 'POST',
  });
}
