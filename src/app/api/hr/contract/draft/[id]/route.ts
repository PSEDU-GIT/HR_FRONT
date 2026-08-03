import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return handleApiProxy(req, {
    path: `/hr/contract/draft/${id}`,
    method: 'DELETE',
  });
}
