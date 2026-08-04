import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  return handleApiProxy(req, {
    path: `/server/api/account/contract-signature/${token}`,
    method: 'GET',
    hasToken: false,
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  return handleApiProxy(req, {
    path: `/server/api/account/contract-signature/${token}`,
    method: 'POST',
    hasToken: false,
  });
}
