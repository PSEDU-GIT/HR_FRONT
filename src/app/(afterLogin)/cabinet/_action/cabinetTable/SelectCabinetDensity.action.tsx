'use client';

import { useShallow } from 'zustand/react/shallow';
import {
  useCabinetStore,
  type TableDensity,
} from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';
import RoundedTab from '@/app/_component/tab/RoundedTab';

const DENSITY_TABS = [
  { id: 'comfortable', displayName: '여유롭게' },
  { id: 'standard', displayName: '기본' },
  { id: 'compact', displayName: '조밀하게' },
];

export default function SelectCabinetDensityAction() {
  const { density, setDensity } = useCabinetStore(
    useShallow((state) => ({
      density: state.density,
      setDensity: state.setDensity,
    })),
  );

  return (
    <div className="hidden w-60 md:block">
      <RoundedTab
        data={DENSITY_TABS}
        selectedData={density}
        onChangeTab={(id) => setDensity(id as TableDensity)}
        className="!py-1 !text-[10px]"
        containerClassName="!p-0.5"
      />
    </div>
  );
}
