import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ contractId: string }> }
) {
  const { contractId } = await params;
  return handleApiProxy(req, {
    path: `/hr/contract/${contractId}/send-signature-link`,
    method: 'POST',
  });
}
