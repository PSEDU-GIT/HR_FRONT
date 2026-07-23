'use client';

import { Clock, AlertTriangle, FileEdit, CheckCircle2 } from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  count: number;
  unit: string;
  description: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ReactNode;
}

const STATS: StatItem[] = [
  {
    id: 'pending',
    label: '서명대기',
    count: 3,
    unit: '건',
    description: '강사 서명 필요',
    badgeBg: 'bg-custom-yellow-bg border-custom-yellow-border text-custom-yellow',
    badgeText: '서명 요청 완료',
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: 'expiring',
    label: '만료임박',
    count: 2,
    unit: '건',
    description: '30일 이내 만료',
    badgeBg: 'bg-custom-rose-bg border-custom-rose-border text-custom-rose',
    badgeText: '갱신 필요',
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    id: 'drafting',
    label: '작성중',
    count: 1,
    unit: '건',
    description: '임시 저장 계약',
    badgeBg: 'bg-custom-indigo-bg border-custom-indigo-border text-custom-indigo',
    badgeText: '임시 저장',
    icon: <FileEdit className="h-4 w-4" />,
  },
  {
    id: 'completed',
    label: '전체 체결',
    count: 28,
    unit: '건',
    description: '보관 중인 계약',
    badgeBg: 'bg-custom-emerald-bg border-custom-emerald-border text-custom-emerald',
    badgeText: '정상 보관',
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
];

export default function ReadContractStatsAction() {
  return (
    <div className="border-custom-slate-border overflow-hidden rounded-2xl border bg-white">
      <div className="flex w-full flex-wrap items-center lg:flex-nowrap">
        {STATS.map((stat, index) => (
          <div
            key={stat.id}
            className={`border-custom-slate-border w-full p-6 md:w-1/2 lg:w-1/4 ${
              index < STATS.length - 1 ? 'border-b lg:border-r lg:border-b-0' : ''
            } ${index % 2 === 0 ? 'md:border-r' : ''} ${
              index >= 2 ? 'md:border-b-0' : 'md:border-b'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-text-sub text-sm font-medium">{stat.label}</p>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-text-main text-2xl font-bold">{stat.count}</span>
                    <span className="text-text-side text-xs font-semibold">{stat.unit}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <p className="text-text-side text-xs font-medium">{stat.description}</p>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${stat.badgeBg}`}
                    >
                      {stat.badgeText}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-custom-slate-border text-text-side flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-transparent p-2.5">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
