'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';

type Preset = '1개월' | '3개월' | '6개월' | '1년' | '2년';

function addToDate(startDate: string, preset: Preset): string {
  if (!startDate) return '';
  const d = new Date(startDate);
  if (preset === '1개월') d.setMonth(d.getMonth() + 1);
  else if (preset === '3개월') d.setMonth(d.getMonth() + 3);
  else if (preset === '6개월') d.setMonth(d.getMonth() + 6);
  else if (preset === '1년') d.setFullYear(d.getFullYear() + 1);
  else if (preset === '2년') d.setFullYear(d.getFullYear() + 2);
  d.setDate(d.getDate() - 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const PRESETS: Preset[] = ['1개월', '3개월', '6개월', '1년', '2년'];

export default function SelectContractPresetAction() {
  const { wizStartDate, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizStartDate: state.step2.wizStartDate,
      setStep2: state.setStep2,
    })),
  );

  const handleApplyPreset = (preset: Preset) => {
    if (!wizStartDate) return;
    const newEnd = addToDate(wizStartDate, preset);
    setStep2({ wizEndDate: newEnd });
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-text-side mr-0.5 text-xs font-extrabold">빠른선택</span>
      {PRESETS.map((preset) => (
        <button
          key={preset}
          type="button"
          onClick={() => handleApplyPreset(preset)}
          className="text-custom-indigo hover:bg-custom-indigo-bg cursor-pointer rounded-lg px-2 py-1 text-xs font-black transition-all active:scale-95"
        >
          {preset}
        </button>
      ))}
    </div>
  );
}
