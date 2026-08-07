'use client';

import { useShallow } from 'zustand/react/shallow';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { getInstructors } from '@/app/(afterLogin)/wizard/(standard)/step1/_lib/getInstructors';
import Select, { type SelectDataTypes } from '@/app/_component/select/Select';
import { formatPhoneNumber } from '@/app/_lib/formatPhoneNumber';

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
    ...instructors.map((ins) => {
      const phoneText = ins.phone ? ` (${formatPhoneNumber(ins.phone)})` : '';
      const historyBadge = ins.hasContractHistory ? ' [계약 이력 있음]' : '';
      return {
        id: String(ins.staffId),
        displayName: `${ins.name}${phoneText}${historyBadge}`,
      };
    }),
  ];

  const selectedInstructor = instructors.find((ins) => ins.staffId === step1.selectedStaffId);

  const currentSelectValue: SelectDataTypes = selectedInstructor
    ? {
        id: String(selectedInstructor.staffId),
        displayName: `${selectedInstructor.name}${selectedInstructor.phone ? ` (${formatPhoneNumber(selectedInstructor.phone)})` : ''}${selectedInstructor.hasContractHistory ? ' [계약 이력 있음]' : ''}`,
      }
    : { id: '', displayName: '-- 강사를 선택하세요 --' };

  const handleSelectChange = (item: SelectDataTypes) => {
    const staffId = Number(item.id);
    const instructor = instructors.find((ins) => ins.staffId === staffId);

    if (instructor) {
      setStep1({
        instructorName: instructor.name,
        instructorPhone: formatPhoneNumber(instructor.phone),
        instructorSubject: instructor.subject || '',
        instructorBirth: instructor.birthDate || instructor.birth || '',
        instructorAddress: instructor.address || '',
        hasContractHistory: instructor.hasContractHistory ?? false,
        selectedStaffId: instructor.staffId,
      });
    } else {
      setStep1({
        instructorName: '',
        instructorPhone: '',
        instructorSubject: '',
        instructorBirth: '',
        instructorAddress: '',
        hasContractHistory: false,
        selectedStaffId: undefined,
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
