'use client';

import { Suspense } from 'react';
import SearchRenewalContractAction from '@/app/(afterLogin)/dashboard/_action/renewal/SearchRenewalContract.action';
import ClickCreateNewContractAction from '@/app/(afterLogin)/dashboard/_action/renewal/ClickCreateNewContract.action';
import ReadRenewalContractsAction from '@/app/(afterLogin)/dashboard/_action/ReadRenewalContracts.action';
import ReadRenewalContractsFooterAction from '@/app/(afterLogin)/dashboard/_action/renewal/ReadRenewalContractsFooter.action';
import ReadContractTimelineAction from '@/app/(afterLogin)/dashboard/_action/ReadContractTimeline.action';
import DashboardTimelineSkeleton from '@/app/(afterLogin)/dashboard/_component/DashboardTimelineSkeleton';
import DashboardRenewalTableSkeleton from '@/app/(afterLogin)/dashboard/_component/DashboardRenewalTableSkeleton';

export default function DashboardRenewalArea() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="border-custom-slate-border flex w-full flex-col gap-6 rounded-2xl border bg-white p-6 text-sm">
            <h3 className="font-bold text-neutral-900 text-base">갱신 필요 계약서</h3>

            <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2.5">
                <SearchRenewalContractAction />
              </div>
              <ClickCreateNewContractAction />
            </header>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 font-bold text-neutral-900">
                    <th className="px-3 py-3.5">서명 대상자</th>
                    <th className="px-3 py-3.5">계약일</th>
                    <th className="px-3 py-3.5">만료 잔여일</th>
                    <th className="px-3 py-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <Suspense fallback={<DashboardRenewalTableSkeleton />}>
                    <ReadRenewalContractsAction />
                  </Suspense>
                </tbody>
              </table>
            </div>

            <Suspense fallback={null}>
              <ReadRenewalContractsFooterAction />
            </Suspense>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border-custom-slate-border flex h-full max-h-[520px] w-full flex-col rounded-2xl border bg-white p-6 text-sm">
            <h3 className="mb-4 shrink-0 text-base font-bold text-neutral-900">
              계약 활동 타임라인
            </h3>
            <div className="flex-1 overflow-y-auto pr-1">
              <Suspense fallback={<DashboardTimelineSkeleton />}>
                <ReadContractTimelineAction />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
