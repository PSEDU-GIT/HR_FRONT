import getQueryClient from '@/app/queryClient';
import { headers } from 'next/headers';
import { dehydrate, QueryFunction } from '@tanstack/react-query';

export interface PrefetchTask<TQueryFnData = any, TQueryKey extends readonly unknown[] = any> {
  queryKey: TQueryKey;
  queryFnFactory: (cookie: string) => QueryFunction<TQueryFnData, TQueryKey>;
}

export const getPrefetch = async (tasks: PrefetchTask[]) => {
  const queryClient = getQueryClient();

  const headersList = await headers();
  const cookie = headersList.get('cookie') || '';

  await Promise.all(
    tasks.map((task) =>
      queryClient.prefetchQuery({
        queryKey: task.queryKey,
        queryFn: task.queryFnFactory(cookie),
      }),
    ),
  );

  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
};
