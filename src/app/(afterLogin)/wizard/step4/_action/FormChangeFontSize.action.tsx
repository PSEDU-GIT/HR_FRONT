'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { Minus, Plus, Type } from 'lucide-react';
import cx from 'classnames';

export default function FormChangeFontSizeAction() {
  const { documentFontSize, setStep4 } = useWizardStore(
    useShallow((state) => ({
      documentFontSize: state.step4.documentFontSize || 12,
      setStep4: state.setStep4,
    })),
  );

  const handleDecrease = () => {
    if (documentFontSize > 10) {
      setStep4({ documentFontSize: documentFontSize - 1 });
    }
  };

  const handleIncrease = () => {
    if (documentFontSize < 16) {
      setStep4({ documentFontSize: documentFontSize + 1 });
    }
  };

  const setSize = (size: number) => {
    setStep4({ documentFontSize: size });
  };

  return (
    <div className="border-custom-slate-border flex items-center gap-2 rounded-xl border bg-white px-3 py-1.5 shadow-2xs">
      <div className="text-text-side flex items-center gap-1 text-[11px] font-bold">
        <Type className="h-3.5 w-3.5 text-custom-indigo" />
        <span>글자 크기</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={documentFontSize <= 10}
          className="hover:bg-custom-slate-bg disabled:opacity-30 flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all active:scale-90"
        >
          <Minus className="h-3 w-3" />
        </button>

        <span className="w-8 text-center text-xs font-black text-slate-800">
          {documentFontSize}px
        </span>

        <button
          type="button"
          onClick={handleIncrease}
          disabled={documentFontSize >= 16}
          className="hover:bg-custom-slate-bg disabled:opacity-30 flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all active:scale-90"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      <div className="border-slate-200 ml-1 flex items-center gap-1 border-l pl-2">
        {[11, 12, 13, 14].map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setSize(size)}
            className={cx(
              'h-6 rounded-md px-1.5 text-[10px] font-extrabold transition-all cursor-pointer',
              documentFontSize === size
                ? 'bg-custom-indigo text-white shadow-2xs'
                : 'text-slate-500 hover:bg-slate-100',
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
