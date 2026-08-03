import { Suspense } from 'react';
import ReadContractStatsAction from '@/app/(afterLogin)/dashboard/_action/ReadContractStats.action';
import DashboardStatsSkeleton from '@/app/(afterLogin)/dashboard/_component/DashboardStatsSkeleton';
import DashboardRenewalContractsArea from './_area/DashboardRenewalContracts.area';
import DashboardActivityTimelineArea from './_area/DashboardActivityTimeline.area';
import DashboardSuspense from './_suspense/DashboardSuspense';

export default function DashboardPage() {
  return (
    <DashboardSuspense>
      <div className="w-full space-y-6 pt-4">
        <section className="w-full">
          <div className="border-custom-slate-border overflow-hidden rounded-2xl border bg-background">
            <Suspense fallback={<DashboardStatsSkeleton />}>
              <ReadContractStatsAction />
            </Suspense>
          </div>
        </section>

        <section className="w-full">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <DashboardRenewalContractsArea />
            </div>
            <div className="lg:col-span-1">
              <DashboardActivityTimelineArea />
            </div>
          </div>
        </section>
      </div>
    </DashboardSuspense>
  );
}
