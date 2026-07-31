'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import RoundedTab from '@/app/_component/tab/RoundedTab';

const TAB_DATA = [
  { id: '5days', displayName: '주 5일' },
  { id: '3days', displayName: '주 3일' },
  { id: 'custom', displayName: '직접 지정' },
];

export default function SelectWorkDaysPresetAction() {
  const { wizWorkDaysType, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizWorkDaysType: state.step2.wizWorkDaysType,
      setStep2: state.setStep2,
    })),
  );

  return (
    <>
      <RoundedTab
        data={TAB_DATA}
        selectedData={wizWorkDaysType}
        onChangeTab={(val) => setStep2({ wizWorkDaysType: val as '5days' | '3days' | 'custom' })}
      />
      {wizWorkDaysType !== 'custom' && (
        <p className="text-text-side mt-1 text-xs font-semibold">
          {wizWorkDaysType === '5days'
            ? '월~금 5일 근무로 설정됩니다'
            : '월·수·금 3일 근무로 설정됩니다'}
        </p>
      )}
      {wizWorkDaysType === 'custom' && (
        <p className="text-text-side mt-1 text-xs font-semibold">
          적용 후 요일 카드에서 ON/OFF로 개별 설정할 수 있습니다
        </p>
      )}
    </>
  );
}
