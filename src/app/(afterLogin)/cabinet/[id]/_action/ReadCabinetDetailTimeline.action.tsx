'use client';

import { useParams } from 'next/navigation';
import { useContractEventLogState } from '@/app/(afterLogin)/cabinet/_state/getContractEventLog.state';
import CabinetDetailTimelineItemComponent from '../_component/CabinetDetailTimelineItem.component';

export default function ReadCabinetDetailTimelineAction() {
  const params = useParams<{ id: string }>();
  const contractId = Number(params?.id) || 1;

  const { eventLogs, isLoading, isError } = useContractEventLogState(contractId);

  if (isLoading) {
    return (
      <div className="p-4 text-xs font-semibold text-slate-400">
        타임라인 데이터를 불러오는 중...
      </div>
    );
  }

  if (isError || !eventLogs || eventLogs.length === 0) {
    return (
      <div className="p-4 text-xs font-semibold text-slate-400">
        등록된 타임라인 이벤트 로그가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {eventLogs.map((log, idx) => (
        <CabinetDetailTimelineItemComponent
          key={log.id || idx}
          item={log}
          isLast={idx === eventLogs.length - 1}
        />
      ))}
    </div>
  );
}
