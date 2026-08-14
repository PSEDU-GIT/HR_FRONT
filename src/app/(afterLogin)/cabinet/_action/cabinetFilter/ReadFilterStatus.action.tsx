'use client';

import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore, CabinetStatusFilter } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';
import RoundedTab from '@/app/_component/tab/RoundedTab';

const STATUS_TABS = [
  { id: 'all', displayName: '전체' },
  { id: 'completed', displayName: '체결완료' },
  { id: 'sent', displayName: '서명대기' },
  { id: 'draft', displayName: '임시저장' },
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
      onChangeTab={(id) => setStatusFilter(id as CabinetStatusFilter)}
      className="!text-11 !py-1.5"
    />
  );
}
