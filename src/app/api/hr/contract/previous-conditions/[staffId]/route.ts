import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ staffId: string }> }
) {
  const { staffId } = await params;
  return handleApiProxy(req, {
    path: `/hr/contract/previous-conditions/${staffId}`,
    method: 'GET',
  });
}
