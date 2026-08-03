import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return handleApiProxy(req, {
    path: `/hr/contract/teacher/${id}`,
    method: 'PATCH',
  });
}
