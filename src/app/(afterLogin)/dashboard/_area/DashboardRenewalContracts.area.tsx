'use client';

import { Suspense } from 'react';
import SearchRenewalContractAction from '@/app/(afterLogin)/dashboard/_action/renewal/SearchRenewalContract.action';
import ReadRenewalContractsAction from '@/app/(afterLogin)/dashboard/_action/ReadRenewalContracts.action';
import ReadRenewalContractsFooterAction from '@/app/(afterLogin)/dashboard/_action/renewal/ReadRenewalContractsFooter.action';
import DashboardRenewalTableSkeleton from '@/app/(afterLogin)/dashboard/_component/DashboardRenewalTableSkeleton';
import Table from '@/app/_component/table/Table';

export default function DashboardRenewalContractsArea() {
  return (
    <div className="border-custom-slate-border flex w-full flex-col gap-6 rounded-2xl border bg-background p-6 text-sm">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-bold text-text-title">갱신 필요 계약서</h3>
        <div className="flex items-center gap-2.5">
          <SearchRenewalContractAction />
        </div>
      </header>

      <Table footer={<ReadRenewalContractsFooterAction />}>
        <thead>
          <tr className="border-custom-slate-border border-b font-bold text-text-title">
            <th className="px-3 py-3.5">서명 대상자</th>
            <th className="px-3 py-3.5">계약일</th>
            <th className="px-3 py-3.5">만료 잔여일</th>
            <th className="px-3 py-3.5 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-custom-slate-border divide-y">
          <Suspense fallback={<DashboardRenewalTableSkeleton />}>
            <ReadRenewalContractsAction />
          </Suspense>
        </tbody>
      </Table>
    </div>
  );
}


