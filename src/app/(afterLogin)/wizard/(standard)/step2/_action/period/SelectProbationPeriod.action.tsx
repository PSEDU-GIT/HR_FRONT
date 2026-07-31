'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import RoundedTab from '@/app/_component/tab/RoundedTab';

const PROBATION_TAB_DATA = [
  { id: '없음', displayName: '없음' },
  { id: '1개월', displayName: '1개월' },
  { id: '2개월', displayName: '2개월' },
  { id: '3개월', displayName: '3개월' },
  { id: '6개월', displayName: '6개월' },
];

export default function SelectProbationPeriodAction() {
  const { wizProbation, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizProbation: state.step2.wizProbation,
      setStep2: state.setStep2,
    })),
  );

  return (
    <RoundedTab
      data={PROBATION_TAB_DATA}
      selectedData={wizProbation}
      onChangeTab={(val) => setStep2({ wizProbation: val })}
    />
  );
}
