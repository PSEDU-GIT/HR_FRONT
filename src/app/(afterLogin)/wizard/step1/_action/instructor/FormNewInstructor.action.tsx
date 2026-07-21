'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import CustomDate from '@/app/_component/date/CustomDate';

const formatPhoneNumber = (value: string): string => {
  const raw = value.replace(/[^0-9]/g, '');
  if (raw.length <= 3) return raw;
  if (raw.length <= 7) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
  return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
};

export default function FormNewInstructorAction() {
  const { step1, setStep1 } = useWizardStore(
    useShallow((state) => ({ step1: state.step1, setStep1: state.setStep1 })),
  );

  return (
    <>
      <div>
        <label className="text-text-main mb-1.5 block text-xs font-bold">
          강사 이름 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={step1.instructorName}
          onChange={(e) => setStep1({ instructorName: e.target.value })}
          placeholder="예: 홍길동"
          className="p-2.5 text-xs font-medium"
        />
      </div>
      <div>
        <label className="text-text-main mb-1.5 block text-xs font-bold">
          연락처 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={step1.instructorPhone}
          onChange={(e) => setStep1({ instructorPhone: formatPhoneNumber(e.target.value) })}
          placeholder="예: 010-1234-5678"
          maxLength={13}
          className="p-2.5 text-xs font-medium"
        />
      </div>
      <div>
        <label className="text-text-main mb-1.5 block text-xs font-bold">
          담당 과목 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={step1.instructorSubject}
          onChange={(e) => setStep1({ instructorSubject: e.target.value })}
          placeholder="예: 공통수학, 수학I"
          className="p-2.5 text-xs font-medium"
        />
      </div>
      <div>
        <label className="text-text-main mb-1.5 block text-xs font-bold">
          생년월일 <span className="text-red-500">*</span>
        </label>
        <CustomDate
          selectDate={step1.instructorBirth}
          onChangeAction={(date) => setStep1({ instructorBirth: date })}
          placeholder="연도. 월. 일."
          className="w-full"
          buttonClassName="h-[38px] !rounded-xl !border-custom-slate-border !px-2.5 !py-2.5 bg-background focus:border-custom-indigo w-full font-medium transition-all outline-none"
          hasReset={false}
        />
      </div>
      <div className="col-span-2">
        <label className="text-text-main mb-1.5 block text-xs font-bold">
          주소 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={step1.instructorAddress}
          onChange={(e) => setStep1({ instructorAddress: e.target.value })}
          placeholder="예: 서울시 강남구 대치동 123-45"
          className="p-2.5 text-xs font-medium"
        />
      </div>
    </>
  );
}
