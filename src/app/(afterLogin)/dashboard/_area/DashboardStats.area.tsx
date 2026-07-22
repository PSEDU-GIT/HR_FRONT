'use client';

import ReadContractStatsAction from '@/app/(afterLogin)/dashboard/_action/ReadContractStats.action';

export default function DashboardStatsArea() {
  return (
    <section className="w-full">
      <ReadContractStatsAction />
    </section>
  );
}
