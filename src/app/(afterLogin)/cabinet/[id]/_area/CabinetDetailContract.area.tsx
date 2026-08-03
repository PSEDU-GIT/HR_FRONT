'use client';

import ReadCabinetDetailContractAction from '../_action/ReadCabinetDetailContract.action';

export default function CabinetDetailContractArea() {
  return (
    <div className="relative h-full lg:col-span-2">
      <div className="absolute inset-0 overflow-y-auto rounded-2xl border border-slate-200">
        <ReadCabinetDetailContractAction />
      </div>
    </div>
  );
}
