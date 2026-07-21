'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import RoundTab from '@/app/_component/tab/RoundTab';

const modeTabData = [
  { id: 'existing', displayName: '기존 등록 강사 선택' },
  { id: 'new', displayName: '신규 강사 정보 입력' },
];

export default function SelectInstructorModeAction() {
  const { step1, setStep1 } = useWizardStore(
    useShallow((state) => ({ step1: state.step1, setStep1: state.setStep1 })),
  );

  const handleModeChange = (isNew: boolean) => {
    setStep1({
      isNewInstructor: isNew,
      instructorName: '',
      instructorPhone: '',
      instructorSubject: '',
      instructorBirth: '',
      instructorAddress: '',
    });
  };

  return (
    <RoundTab
      data={modeTabData}
      selectedData={step1.isNewInstructor ? 'new' : 'existing'}
      onChangeTab={(id) => handleModeChange(id === 'new')}
      containerClassName="col-span-2 mb-1"
    />
  );
}
