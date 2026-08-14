import { ReactNode } from 'react';

export interface StatItem {
  id: string;
  label: string;
  count: number;
  unit: string;
  description: string;
  icon: ReactNode;
}

interface Props {
  stat: StatItem;
  index: number;
  totalLength: number;
}

export default function DashboardStatCard({ stat, index, totalLength }: Props) {
  return (
    <div
      className={`border-custom-slate-border w-full p-6 md:w-1/2 lg:w-1/4 ${ index < totalLength - 1 ? 'border-b lg:border-r lg:border-b-0' : '' } ${index % 2 === 0 ? 'md:border-r' : ''} ${index >= 2 ? 'md:border-b-0' : 'md:border-b'}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-text-sub text-sm font-medium">{stat.label}</p>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-text-main text-2xl font-bold">{stat.count}</span>
              <span className="text-text-side text-xs font-semibold">{stat.unit}</span>
            </div>
            <p className="text-text-side mt-1.5 text-xs font-medium">{stat.description}</p>
          </div>
        </div>
        <div className="border-custom-slate-border text-text-side flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-transparent p-2.5">
          {stat.icon}
        </div>
      </div>
    </div>
  );
}
