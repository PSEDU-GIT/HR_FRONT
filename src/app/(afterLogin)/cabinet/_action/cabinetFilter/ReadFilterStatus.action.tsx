'use client';

import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';
import RoundedTab from '@/app/_component/tab/RoundedTab';

const STATUS_TABS = [
  { id: 'all', displayName: '전체' },
  { id: 'completed', displayName: '체결완료' },
  { id: 'pending', displayName: '대기' },
];

export default function ReadFilterStatusAction() {
  const { statusFilter, setStatusFilter } = useCabinetStore(
    useShallow((state) => ({
      statusFilter: state.statusFilter,
      setStatusFilter: state.setStatusFilter,
    })),
  );

  return (
    <RoundedTab
      data={STATUS_TABS}
      selectedData={statusFilter}
      onChangeTab={(id) => setStatusFilter(id as 'all' | 'completed' | 'pending')}
      className="!text-[11px] !py-1.5"
    />
  );
}
