'use client';

import { AnimatePresence, motion } from 'framer-motion';
import cx from 'classnames';
import { RefObject } from 'react';

type Props = {
  years: number[];
  currentYear: number;
  isOpen: boolean;
  activeRef: RefObject<HTMLButtonElement | null>;
  onSelect: (year: number) => void;
};

export default function YearPicker({ years, currentYear, isOpen, activeRef, onSelect }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="listbox"
          aria-label="연도 선택"
          initial={{ opacity: 0, y: '-10%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-5%' }}
          transition={{ duration: 0.15 }}
          className={cx(
            'border-custom-slate-border dark:border-slate-800 bg-white dark:bg-slate-900 mt-1.5 min-w-[80px] overflow-hidden rounded-xl border shadow-xl',
            'absolute top-full left-0 z-50',
          )}
        >
          <div className="flex max-h-56 [scrollbar-gutter:stable] flex-col gap-0.5 overflow-y-auto p-1 text-xs">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                role="option"
                aria-selected={y === currentYear}
                ref={y === currentYear ? activeRef : null}
                className={cx(
                  'w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-center font-bold transition-all duration-150',
                  y === currentYear
                    ? 'bg-custom-indigo text-white shadow-2xs'
                    : 'text-text-main hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                )}
                onClick={() => onSelect(y)}
              >
                {y}년
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
