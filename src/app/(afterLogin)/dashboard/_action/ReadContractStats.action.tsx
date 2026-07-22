'use client';

interface StatItem {
  id: string;
  label: string;
  count: number;
  unit: string;
  description: string;
  badgeBg: string;
  badgeText: string;
}

const STATS: StatItem[] = [
  {
    id: 'pending',
    label: '서명대기',
    count: 3,
    unit: '건',
    description: '강사 서명이 필요한 계약서',
    badgeBg: 'bg-custom-yellow-bg border-custom-yellow-border text-custom-yellow',
    badgeText: '서명 요청 완료',
  },
  {
    id: 'expiring',
    label: '만료임박',
    count: 2,
    unit: '건',
    description: '30일 이내 만료 예정 계약',
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-600',
    badgeText: '갱신 필요',
  },
  {
    id: 'drafting',
    label: '작성중',
    count: 1,
    unit: '건',
    description: '작성 진행 중인 임시 저장 계약',
    badgeBg: 'bg-custom-indigo-bg border-custom-indigo-border text-custom-indigo',
    badgeText: '임시 저장',
  },
  {
    id: 'completed',
    label: '전체 체결',
    count: 28,
    unit: '건',
    description: '체결 완료되어 보관 중인 계약',
    badgeBg: 'bg-custom-emerald-bg border-custom-emerald-border text-custom-emerald',
    badgeText: '정상 보관',
  },
];

export default function ReadContractStatsAction() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.id}
          className="border-custom-slate-border-side space-y-3 rounded-3xl border bg-white p-5 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-text-sub text-xs font-bold">{stat.label}</span>
            <span
              className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-extrabold ${stat.badgeBg}`}
            >
              <span>{stat.badgeText}</span>
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-text-main text-2xl font-black">{stat.count}</span>
            <span className="text-text-side text-xs font-bold">{stat.unit}</span>
          </div>

          <p className="text-text-side text-[11px] font-medium">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}
