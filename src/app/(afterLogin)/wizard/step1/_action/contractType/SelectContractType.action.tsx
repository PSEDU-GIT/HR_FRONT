'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import ContractTypeCard from '@/app/(afterLogin)/wizard/step1/_component/ContractTypeCard';

export default function SelectContractTypeAction() {
  const { step1, setStep1 } = useWizardStore(
    useShallow((state) => ({ step1: state.step1, setStep1: state.setStep1 })),
  );

  return (
    <div className="flex">
      <ContractTypeCard
        title="강사근로계약서"
        description="학원과 강사 간의 근로관계를 명확히 하는 계약서입니다. 법적 요건을 충족하는 표준 계약서 양식으로 작성됩니다."
        isActive={step1.contractType === '강사근로계약서'}
        onClick={() => setStep1({ contractType: '강사근로계약서' })}
      />
    </div>
  );
}
