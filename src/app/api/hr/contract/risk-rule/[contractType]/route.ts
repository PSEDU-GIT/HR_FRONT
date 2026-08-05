import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ contractType: string }> },
) {
  const { contractType } = await params;
  return handleApiProxy(req, {
    path: `/hr/contract/risk-rule/${contractType}`,
    method: 'GET',
  });
}
