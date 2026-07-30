'use client';

import { useContractArchiveState } from '@/app/(afterLogin)/cabinet/_state/getContractArchive.state';

export default function ReadCabinetTableCountAction() {
  const { count } = useContractArchiveState();

  return (
    <span className="bg-custom-indigo-bg border-custom-indigo-border text-custom-indigo rounded-full border px-2 py-0.5 text-[10px] font-extrabold">
      {count}건
    </span>
  );
}
