import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ contractId: string }> },
) {
  const { contractId } = await params;
  return handleApiProxy(req, {
    path: `/hr/contract/${contractId}/event-log`,
    method: 'GET',
  });
}
