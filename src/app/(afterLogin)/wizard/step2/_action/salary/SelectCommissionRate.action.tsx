'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import RoundedTab from '@/app/_component/tab/RoundedTab';

const COMMISSION_TAB_DATA = [
  { id: '20', displayName: '20%' },
  { id: '30', displayName: '30%' },
  { id: '40', displayName: '40%' },
  { id: 'custom', displayName: '직접 입력' },
];

export default function SelectCommissionRateAction() {
  const { wizCommissionRate, wizIsCustomCommission, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizCommissionRate: state.step2.wizCommissionRate ?? 20,
      wizIsCustomCommission: state.step2.wizIsCustomCommission ?? false,
      setStep2: state.setStep2,
    })),
  );

  const selectedTabId = wizIsCustomCommission ? 'custom' : String(wizCommissionRate);

  const handleTabChange = (val: string) => {
    if (val === 'custom') {
      setStep2({ wizIsCustomCommission: true });
    } else {
      setStep2({
        wizCommissionRate: Number(val),
        wizIsCustomCommission: false,
      });
    }
  };

  const handleCustomRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > 100) num = 100;
    setStep2({ wizCommissionRate: num });
  };

  return (
    <div className="space-y-2">
      <RoundedTab
        data={COMMISSION_TAB_DATA}
        selectedData={selectedTabId}
        onChangeTab={handleTabChange}
      />

      {wizIsCustomCommission && (
        <div className="relative mt-2">
          <input
            type="text"
            value={wizCommissionRate === 0 ? '' : wizCommissionRate.toString()}
            onChange={handleCustomRateChange}
            placeholder="0"
          />
          <span className="text-text-side absolute top-1/2 right-4 -translate-y-1/2 text-xs font-extrabold">
            %
          </span>
        </div>
      )}
    </div>
  );
}
