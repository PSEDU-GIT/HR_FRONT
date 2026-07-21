'use client';

import { useShallow } from 'zustand/react/shallow';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { getInstructors } from '@/app/(afterLogin)/wizard/step1/_lib/getInstructors';
import Select, { type SelectDataTypes } from '@/app/_component/select/Select';

export default function SelectExistingInstructorAction() {
  const { step1, setStep1 } = useWizardStore(
    useShallow((state) => ({ step1: state.step1, setStep1: state.setStep1 })),
  );

  const { data: instructors } = useSuspenseQuery({
    queryKey: ['instructors'],
    queryFn: getInstructors,
  });

  const selectDataList: SelectDataTypes[] = [
    { id: '', displayName: '-- 강사를 선택하세요 --' },
    ...instructors.map((ins) => ({
      id: ins.code,
      displayName: `${ins.name} (${ins.subject} / ${ins.phone})`,
    })),
  ];

  const selectedInstructor = instructors.find(
    (ins) => ins.name === step1.instructorName && ins.phone === step1.instructorPhone,
  );

  const currentSelectValue: SelectDataTypes = selectedInstructor
    ? {
        id: selectedInstructor.code,
        displayName: `${selectedInstructor.name} (${selectedInstructor.subject} / ${selectedInstructor.phone})`,
      }
    : { id: '', displayName: '-- 강사를 선택하세요 --' };

  const handleSelectChange = (item: SelectDataTypes) => {
    const code = item.id as string;
    const instructor = instructors.find((ins) => ins.code === code);

    if (instructor) {
      setStep1({
        instructorName: instructor.name,
        instructorPhone: instructor.phone,
        instructorSubject: instructor.subject,
        instructorBirth: instructor.birth,
        instructorAddress: instructor.address,
      });
    } else {
      setStep1({
        instructorName: '',
        instructorPhone: '',
        instructorSubject: '',
        instructorBirth: '',
        instructorAddress: '',
      });
    }
  };

  return (
    <Select
      data={selectDataList}
      selectData={currentSelectValue}
      onChangeAction={handleSelectChange}
      className="w-full"
      buttonClassName="!border-custom-slate-border !p-[10px_16px] !text-sm !font-bold hover:bg-custom-slate-bg/50"
    />
  );
}
