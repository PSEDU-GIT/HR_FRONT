'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import TimePicker from '@/app/_component/time/TimePicker';
import Select, { SelectDataTypes } from '@/app/_component/select/Select';

const BREAK_OPTIONS = ['없음', '30분', '1시간', '1.5시간', '2시간'];
const BREAK_SELECT_DATA: SelectDataTypes[] = BREAK_OPTIONS.map((opt) => ({
  id: opt,
  displayName: opt,
}));

export default function FormBatchWorkTimeAction() {
  const { batchStartTime, batchEndTime, batchBreakTime, setStep2 } = useWizardStore(
    useShallow((state) => ({
      batchStartTime: state.step2.batchStartTime,
      batchEndTime: state.step2.batchEndTime,
      batchBreakTime: state.step2.batchBreakTime,
      setStep2: state.setStep2,
    })),
  );

  return (
    <div className="border-custom-slate-border bg-custom-slate-bg flex flex-wrap items-center gap-4 rounded-2xl border px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-text-side shrink-0 text-xs font-bold">근무시간</span>
        <div className="flex items-center gap-1.5">
          <TimePicker
            value={batchStartTime}
            onChange={(t) => setStep2({ batchStartTime: t })}
            buttonClassName="h-[34px]"
          />
          <span className="text-text-side font-mono text-xs font-bold">~</span>
          <TimePicker
            value={batchEndTime}
            onChange={(t) => setStep2({ batchEndTime: t })}
            buttonClassName="h-[34px]"
          />
        </div>
      </div>

      <div className="border-custom-slate-border h-4 w-px border-r" />

      <div className="flex items-center gap-2">
        <span className="text-text-side shrink-0 text-xs font-bold">휴게</span>
        <Select
          data={BREAK_SELECT_DATA}
          selectData={
            BREAK_SELECT_DATA.find((d) => d.id === batchBreakTime) || BREAK_SELECT_DATA[0]
          }
          onChangeAction={(sub) => setStep2({ batchBreakTime: String(sub.id) })}
          buttonClassName="h-[34px] px-3 py-0 text-xs font-bold"
        />
      </div>
    </div>
  );
}
