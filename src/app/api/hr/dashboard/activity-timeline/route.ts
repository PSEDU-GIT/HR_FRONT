import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const take = searchParams.get('take');
  const query = take ? `?take=${take}` : '';

  return handleApiProxy(req, {
    path: `/hr/dashboard/activity-timeline${query}`,
    method: 'GET',
  });
}
