'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { formatPhoneNumber } from '@/app/util/formatPhoneNumber.util';
import CustomDate from '@/app/_component/date/CustomDate';
import SummaryCardComponent from '../_component/SummaryCard.component';
import SummaryKeyValueListComponent from '../_component/SummaryKeyValueList.component';

export default function SummaryInstructorInfoCardAction() {
  const { step1, setStep1 } = useWizardStore(
    useShallow((state) => ({
      step1: state.step1,
      setStep1: state.setStep1,
    })),
  );

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    ...step1,
    instructorPhone: formatPhoneNumber(step1.instructorPhone),
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      setStep1({
        ...draft,
        instructorPhone: formatPhoneNumber(draft.instructorPhone),
      });
      setIsEditing(false);
    } else {
      setDraft({
        ...step1,
        instructorPhone: formatPhoneNumber(step1.instructorPhone),
      });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setDraft({
      ...step1,
      instructorPhone: formatPhoneNumber(step1.instructorPhone),
    });
    setIsEditing(false);
  };

  return (
    <SummaryCardComponent
      title="강사 기본 정보"
      isEditing={isEditing}
      onToggleEdit={handleToggleEdit}
      onCancelEdit={handleCancelEdit}
    >
      {isEditing ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1">
            <label className="text-text-side text-xs font-bold">강사 성명</label>
            <input
              type="text"
              value={draft.instructorName || ''}
              onChange={(e) => setDraft((prev) => ({ ...prev, instructorName: e.target.value }))}
              placeholder="강사 성명 입력"
            />
          </div>
          <div className="space-y-1">
            <label className="text-text-side text-xs font-bold">연락처</label>
            <input
              type="text"
              value={formatPhoneNumber(draft.instructorPhone) || ''}
              maxLength={13}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  instructorPhone: formatPhoneNumber(e.target.value),
                }))
              }
              placeholder="010-1234-5678"
            />
          </div>
          <div className="space-y-1">
            <label className="text-text-side text-xs font-bold">담당 과목</label>
            <input
              type="text"
              value={draft.instructorSubject || ''}
              onChange={(e) => setDraft((prev) => ({ ...prev, instructorSubject: e.target.value }))}
              placeholder="담당 과목 (예: 수학)"
            />
          </div>
          <div className="space-y-1">
            <label className="text-text-side text-xs font-bold">생년월일</label>
            <CustomDate
              selectDate={draft.instructorBirth}
              onChangeAction={(date) =>
                setDraft((prev) => ({ ...prev, instructorBirth: date }))
              }
              placeholder="연도. 월. 일."
              className="w-full"
              buttonClassName="h-10 !rounded-xl !border-custom-slate-border !px-3 bg-white focus:border-custom-indigo w-full text-xs font-bold text-slate-800 outline-none transition-all"
              hasReset={false}
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-text-side text-xs font-bold">주소</label>
            <input
              type="text"
              value={draft.instructorAddress || ''}
              onChange={(e) => setDraft((prev) => ({ ...prev, instructorAddress: e.target.value }))}
              placeholder="주소 입력"
            />
          </div>
        </div>
      ) : (
        <SummaryKeyValueListComponent
          columns={3}
          items={[
            { label: '강사 성명', value: step1.instructorName },
            { label: '연락처', value: formatPhoneNumber(step1.instructorPhone) },
            { label: '담당 과목', value: step1.instructorSubject },
            { label: '생년월일', value: step1.instructorBirth },
            { label: '주소', value: step1.instructorAddress, colSpan: 2 },
          ]}
        />
      )}
    </SummaryCardComponent>
  );
}
