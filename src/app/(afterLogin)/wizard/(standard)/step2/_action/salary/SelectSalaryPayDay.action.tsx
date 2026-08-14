'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import Select, { SelectDataTypes } from '@/app/_component/select/Select';

const PAY_DAY_OPTIONS: SelectDataTypes[] = Array.from({ length: 30 }, (_, i) => ({
  id: `${i + 1}일`,
  displayName: `${i + 1}일`,
})).concat([{ id: '말일', displayName: '말일' }]);

export default function SelectSalaryPayDayAction() {
  const { wizPayDay, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizPayDay: state.step2.wizPayDay,
      setStep2: state.setStep2,
    })),
  );

  const selectedItem = PAY_DAY_OPTIONS.find((opt) => opt.id === wizPayDay) || PAY_DAY_OPTIONS[9];

  return (
    <Select
      data={PAY_DAY_OPTIONS}
      selectData={selectedItem}
      onChangeAction={(selected) => setStep2({ wizPayDay: String(selected.id) })}
      buttonClassName="h-11 rounded-2xl"
    />
  );
}
