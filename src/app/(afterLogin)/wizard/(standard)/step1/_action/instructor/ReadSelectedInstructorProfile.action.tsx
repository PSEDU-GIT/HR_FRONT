'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { formatPhoneNumber } from '@/app/_lib/formatPhoneNumber';
import CustomDate from '@/app/_component/date/CustomDate';

export default function ReadSelectedInstructorProfileAction() {
  const { step1, setStep1 } = useWizardStore(
    useShallow((state) => ({ step1: state.step1, setStep1: state.setStep1 })),
  );

  const isInstructorSelected = !!step1.instructorName;

  return (
    <div className="border-custom-slate-border dark:border-slate-800 bg-custom-slate-bg/40 dark:bg-slate-800/40 col-span-2 grid grid-cols-2 items-center gap-4 rounded-2xl border p-4">
      <div>
        <span className="text-text-side dark:text-slate-400 mb-1 block text-[10px] font-bold">
          강사 이름
        </span>
        <span className="text-text-main dark:text-slate-200 text-xs font-bold">
          {step1.instructorName || '-'}
        </span>
      </div>
      <div>
        <span className="text-text-side dark:text-slate-400 mb-1 block text-[10px] font-bold">
          연락처
        </span>
        <span className="text-text-main dark:text-slate-200 text-xs font-bold">
          {formatPhoneNumber(step1.instructorPhone) || '-'}
        </span>
      </div>
      <div>
        <span className="text-text-side dark:text-slate-400 mb-1 block text-[10px] font-bold">
          담당 과목 {isInstructorSelected && <span className="text-red-500">*</span>}
        </span>
        {isInstructorSelected ? (
          <input
            type="text"
            value={step1.instructorSubject}
            onChange={(e) => setStep1({ instructorSubject: e.target.value })}
            placeholder="예: 공통수학, 수학I"
            className="border-custom-slate-border dark:border-slate-700 focus:border-custom-indigo w-full rounded-xl border bg-white dark:bg-slate-900 text-text-main dark:text-slate-100 px-3 py-2 text-xs font-medium transition-all outline-none"
          />
        ) : (
          <span className="text-text-main dark:text-slate-200 text-xs font-bold">
            {step1.instructorSubject || '-'}
          </span>
        )}
      </div>
      <div>
        <span className="text-text-side dark:text-slate-400 mb-1 block text-[10px] font-bold">
          생년월일 {isInstructorSelected && <span className="text-red-500">*</span>}
        </span>
        {isInstructorSelected ? (
          <CustomDate
            selectDate={step1.instructorBirth}
            onChangeAction={(date) => setStep1({ instructorBirth: date })}
            placeholder="연도. 월. 일."
            className="w-full"
            buttonClassName="h-[36px] !rounded-xl !border-custom-slate-border dark:!border-slate-700 !px-3 !py-2 bg-white dark:bg-slate-900 focus:border-custom-indigo w-full text-xs font-medium transition-all outline-none"
            hasReset={false}
          />
        ) : (
          <span className="text-text-main dark:text-slate-200 text-xs font-bold">
            {step1.instructorBirth || '-'}
          </span>
        )}
      </div>
      <div className="col-span-2">
        <span className="text-text-side dark:text-slate-400 mb-1 block text-[10px] font-bold">
          주소 {isInstructorSelected && <span className="text-red-500">*</span>}
        </span>
        {isInstructorSelected ? (
          <input
            type="text"
            value={step1.instructorAddress}
            onChange={(e) => setStep1({ instructorAddress: e.target.value })}
            placeholder="예: 서울시 강남구 대치동 123-45"
            className="border-custom-slate-border dark:border-slate-700 focus:border-custom-indigo w-full rounded-xl border bg-white dark:bg-slate-900 text-text-main dark:text-slate-100 px-3 py-2 text-xs font-medium transition-all outline-none"
          />
        ) : (
          <span className="text-text-main dark:text-slate-200 text-xs font-bold">
            {step1.instructorAddress || '-'}
          </span>
        )}
      </div>
    </div>
  );
}
