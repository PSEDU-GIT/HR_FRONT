'use client';

import { useWizardStore } from '@/app/(afterLogin)/wizard/store';

export default function ReadSelectedInstructorProfileAction() {
  const step1 = useWizardStore((state) => state.step1);

  return (
    <div className="border-custom-slate-border bg-custom-slate-bg/40 col-span-2 grid grid-cols-2 gap-4 rounded-2xl border p-4">
      <div>
        <span className="text-text-side mb-1 block text-[10px] font-bold">강사 이름</span>
        <span className="text-text-main text-xs font-bold font-extrabold">
          {step1.instructorName || '-'}
        </span>
      </div>
      <div>
        <span className="text-text-side mb-1 block text-[10px] font-bold">연락처</span>
        <span className="text-text-main text-xs font-bold font-extrabold">
          {step1.instructorPhone || '-'}
        </span>
      </div>
      <div>
        <span className="text-text-side mb-1 block text-[10px] font-bold">담당 과목</span>
        <span className="text-text-main text-xs font-bold font-extrabold">
          {step1.instructorSubject || '-'}
        </span>
      </div>
      <div>
        <span className="text-text-side mb-1 block text-[10px] font-bold">생년월일</span>
        <span className="text-text-main text-xs font-bold font-extrabold">
          {step1.instructorBirth || '-'}
        </span>
      </div>
      <div className="col-span-2">
        <span className="text-text-side mb-1 block text-[10px] font-bold">주소</span>
        <span className="text-text-main text-xs font-bold font-extrabold">
          {step1.instructorAddress || '-'}
        </span>
      </div>
    </div>
  );
}
