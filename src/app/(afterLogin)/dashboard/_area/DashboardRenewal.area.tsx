'use client';

import ReadRenewalContractsAction from '@/app/(afterLogin)/dashboard/_action/ReadRenewalContracts.action';
import ReadContractTimelineAction from '@/app/(afterLogin)/dashboard/_action/ReadContractTimeline.action';

export default function DashboardRenewalArea() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ReadRenewalContractsAction />
        </div>
        <div className="lg:col-span-1">
          <ReadContractTimelineAction />
        </div>
      </div>
    </section>
  );
}
