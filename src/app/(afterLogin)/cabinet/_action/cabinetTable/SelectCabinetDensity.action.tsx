'use client';

import cx from 'classnames';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';

export default function SelectCabinetDensityAction() {
  const { density, setDensity } = useCabinetStore(
    useShallow((state) => ({
      density: state.density,
      setDensity: state.setDensity,
    })),
  );

  return (
    <div className="border-custom-slate-border-side hidden items-center gap-1 rounded-full border bg-slate-100/60 p-1 md:flex">
      <button
        type="button"
        onClick={() => setDensity('comfortable')}
        className={cx(
          'cursor-pointer rounded-full px-3 py-1 text-[10px] font-bold transition-all',
          density === 'comfortable'
            ? 'bg-white text-text-title shadow-2xs'
            : 'text-text-side hover:text-text-title',
        )}
      >
        여유롭게
      </button>
      <button
        type="button"
        onClick={() => setDensity('standard')}
        className={cx(
          'cursor-pointer rounded-full px-3 py-1 text-[10px] font-bold transition-all',
          density === 'standard'
            ? 'bg-white text-text-title shadow-2xs'
            : 'text-text-side hover:text-text-title',
        )}
      >
        기본
      </button>
      <button
        type="button"
        onClick={() => setDensity('compact')}
        className={cx(
          'cursor-pointer rounded-full px-3 py-1 text-[10px] font-bold transition-all',
          density === 'compact'
            ? 'bg-white text-text-title shadow-2xs'
            : 'text-text-side hover:text-text-title',
        )}
      >
        조밀하게
      </button>
    </div>
  );
}
