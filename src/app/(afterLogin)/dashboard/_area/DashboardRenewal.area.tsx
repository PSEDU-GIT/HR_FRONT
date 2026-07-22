'use client';

import ReadRenewalContractsAction from '@/app/(afterLogin)/dashboard/_action/ReadRenewalContracts.action';

export default function DashboardRenewalArea() {
  return (
    <section className="w-full">
      <ReadRenewalContractsAction />
    </section>
  );
}
