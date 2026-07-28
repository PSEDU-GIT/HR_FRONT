'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import ToggleButton from '@/app/_component/button/ToggleButton';

export default function SelectContractTypeAction() {
  const { step1, setStep1 } = useWizardStore(
    useShallow((state) => ({ step1: state.step1, setStep1: state.setStep1 })),
  );

  return (
    <div className="flex w-1/2 gap-2">
      <ToggleButton
        label="강사근로계약서"
        isSelected={step1.contractType === '강사근로계약서'}
        onClick={() => setStep1({ contractType: '강사근로계약서' })}
        className="!py-2.5 !text-sm"
      />
      {/* <ToggleButton
        label="강사용역계약서"
        isSelected={step1.contractType === '강사용역계약서'}
        onClick={() => setStep1({ contractType: '강사용역계약서' })}
        className="!py-2.5 !text-sm"
      /> */}
    </div>
  );
}
