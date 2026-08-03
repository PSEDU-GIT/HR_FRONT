'use client';

import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';
import { useContractArchiveState } from '@/app/(afterLogin)/cabinet/_state/getContractArchive.state';
import PaginationFooter from '@/app/_component/table/PaginationFooter';

export default function ReadCabinetTableFooterAction() {
  const { page, take, setPage, setTake } = useCabinetStore(
    useShallow((state) => ({
      page: state.page,
      take: state.take,
      setPage: state.setPage,
      setTake: state.setTake,
    })),
  );

  const { paging } = useContractArchiveState();

  return (
    <PaginationFooter
      page={page}
      take={take}
      totalCount={paging?.totalCount ?? 0}
      hasNext={paging?.hasNext}
      onPageChange={setPage}
      onTakeChange={setTake}
    />
  );
}

