'use client';

import { useState } from 'react';
import { useAcademyPartyInfoState } from '@/app/(afterLogin)/_state/getAcademyPartyInfo.state';
import AcademySealModalArea from '@/app/(afterLogin)/_area/AcademySealModal.area';
import { Stamp, Settings } from 'lucide-react';

export default function ReadAcademySealAction() {
  const { academyInfo } = useAcademyPartyInfoState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!academyInfo) return null;

  const hasSeal = !!academyInfo.sealImageUrl;

  return (
    <>
      <div className="border-custom-slate-border flex items-center justify-between border-t pt-2.5">
        <div className="text-text-side flex items-center gap-1.5 text-[11px]">
          <Stamp className="h-3.5 w-3.5" />
          <span>학원 직인/인장</span>
        </div>

        <div className="flex items-center gap-2">
          {hasSeal ? (
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              등록 완료
            </span>
          ) : (
            <span className="text-[11px] font-medium text-slate-400">미등록</span>
          )}

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="border-custom-slate-border text-text-side hover:border-custom-indigo-border hover:bg-custom-indigo-bg hover:text-custom-indigo flex cursor-pointer items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-bold transition-all"
          >
            <Settings className="h-3 w-3" />
            <span>관리</span>
          </button>
        </div>
      </div>

      <AcademySealModalArea
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
