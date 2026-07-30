'use client';

import { Suspense } from 'react';
import ReadContractStatsAction from '@/app/(afterLogin)/dashboard/_action/ReadContractStats.action';
import DashboardStatsSkeleton from '@/app/(afterLogin)/dashboard/_component/DashboardStatsSkeleton';

export default function DashboardStatsArea() {
  return (
    <section className="w-full">
      <div className="border-custom-slate-border overflow-hidden rounded-2xl border bg-white">
        <Suspense fallback={<DashboardStatsSkeleton />}>
          <ReadContractStatsAction />
        </Suspense>
      </div>
    </section>
  );
}
