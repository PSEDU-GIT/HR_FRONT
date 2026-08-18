'use client';

import { useAcademyPartyInfoState } from '@/app/(afterLogin)/_state/getAcademyPartyInfo.state';
import { useAcademySealStore } from '@/app/(afterLogin)/_state/useAcademySealStore';
import { generateSquareSeal, generateCircleSeal } from '@/app/(afterLogin)/_util/generateSealImage';
import { Square, Circle } from 'lucide-react';

export default function ClickSealToolbarAction() {
  const { academyInfo } = useAcademyPartyInfoState();
  const setSelectedFile = useAcademySealStore((state) => state.setSelectedFile);
  const setPreviewUrl = useAcademySealStore((state) => state.setPreviewUrl);

  const academyName = academyInfo?.name || '학원';

  const handleGenerateSquare = async () => {
    const file = await generateSquareSeal(academyName);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleGenerateCircle = async () => {
    const file = await generateCircleSeal(academyName);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="flex items-center justify-end gap-1.5 pt-3 pb-1">
      <button
        type="button"
        onClick={handleGenerateSquare}
        className="border-custom-slate-border text-text-side hover:border-custom-indigo-border hover:bg-custom-indigo-bg hover:text-custom-indigo flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-bold transition-all active:scale-95"
        title="네모 형태 직인 자동생성"
      >
        <Square className="h-3 w-3 text-rose-500" />
        <span>네모 인장</span>
      </button>

      <button
        type="button"
        onClick={handleGenerateCircle}
        className="border-custom-slate-border text-text-side hover:border-custom-indigo-border hover:bg-custom-indigo-bg hover:text-custom-indigo flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-bold transition-all active:scale-95"
        title="동그라미 형태 직인 자동생성"
      >
        <Circle className="h-3 w-3 text-rose-500" />
        <span>동그라미 인장</span>
      </button>
    </div>
  );
}
