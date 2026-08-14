'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import CustomDate from '@/app/_component/date/CustomDate';

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

export default function SelectContractPeriodDateAction() {
  const { wizStartDate, wizEndDate, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizStartDate: state.step2.wizStartDate,
      wizEndDate: state.step2.wizEndDate,
      setStep2: state.setStep2,
    })),
  );

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <CustomDate
          selectDate={wizStartDate}
          onChangeAction={(date) => {
            const newEnd = addToDate(date, '1년');
            setStep2({ wizStartDate: date, wizEndDate: newEnd });
          }}
          placeholder="계약 시작일"
          className="w-full"
          buttonClassName="h-10 !rounded-xl !border-custom-slate-border !px-3 bg-white focus:border-custom-indigo w-full text-xs font-bold text-slate-800 outline-none transition-all"
          hasReset={false}
        />
      </div>
      <span className="text-text-side text-xs font-bold">~</span>
      <div className="flex-1">
        <CustomDate
          selectDate={wizEndDate}
          onChangeAction={(date) => setStep2({ wizEndDate: date })}
          placeholder="계약 종료일"
          className="w-full"
          buttonClassName="h-10 !rounded-xl !border-custom-slate-border !px-3 bg-white focus:border-custom-indigo w-full text-xs font-bold text-slate-800 outline-none transition-all"
          hasReset={false}
        />
      </div>
    </div>
  );
}
