'use client';

import { Clock, AlertTriangle, FileEdit, CheckCircle2 } from 'lucide-react';
import { useDashboardSummaryState } from '@/app/(afterLogin)/dashboard/_state/getDashboardSummary.state';
import DashboardStatCard, { type StatItem } from '@/app/(afterLogin)/dashboard/_component/DashboardStatCard';

export default function ReadContractStatsAction() {
  const { summary } = useDashboardSummaryState();

  const STATS: StatItem[] = [
    {
      id: 'pending',
      label: '서명대기',
      count: summary?.pendingSignatureCount ?? 0,
      unit: '건',
      description: '강사 서명 필요',
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: 'expiring',
      label: '만료임박',
      count: summary?.expiringCount ?? 0,
      unit: '건',
      description: '30일 이내 만료',
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      id: 'drafting',
      label: '작성중',
      count: summary?.draftCount ?? 0,
      unit: '건',
      description: '임시 저장 계약',
      icon: <FileEdit className="h-4 w-4" />,
    },
    {
      id: 'completed',
      label: '전체 체결',
      count: summary?.totalSignedCount ?? 0,
      unit: '건',
      description: '보관 중인 계약',
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex w-full flex-wrap items-center lg:flex-nowrap">
      {STATS.map((stat, index) => (
        <DashboardStatCard key={stat.id} stat={stat} index={index} totalLength={STATS.length} />
      ))}
    </div>
  );
}

