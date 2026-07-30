import { NextRequest } from 'next/server';
import { handleApiProxy } from '@/app/_lib/handleApiProxy';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const take = searchParams.get('take') || '10';
  const keyword = searchParams.get('keyword') || '';

  const queryParams = new URLSearchParams({ page, take });
  if (keyword) {
    queryParams.set('keyword', keyword);
  }

  return handleApiProxy(req, {
    path: `/hr/dashboard/renewal-contracts?${queryParams.toString()}`,
    method: 'GET',
  });
}
