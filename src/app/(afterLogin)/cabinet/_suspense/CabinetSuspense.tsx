import { ReactNode } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';
import { getPrefetch } from '@/app/util/getPrefetch';
import {
  getContractArchiveServer,
  getContractArchiveQueryKey,
} from '@/app/(afterLogin)/cabinet/_lib/getContractArchive';

type Props = {
  children: ReactNode;
};

export default async function CabinetSuspense({ children }: Props) {
  const { dehydratedState } = await getPrefetch([
    {
      queryKey: [...getContractArchiveQueryKey, 1, 10, '', '', ''],
      queryFnFactory: getContractArchiveServer,
    },
  ]);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
}
