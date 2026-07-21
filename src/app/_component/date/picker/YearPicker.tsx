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
          initial={{ opacity: 0, y: '-15%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-5%' }}
          transition={{ duration: 0.2 }}
          className={cx(
            'border-custom-slate-border dark:border-custom-slate-border-hover bg-background mt-1.5 min-w-11 overflow-hidden rounded-md border',
            'absolute top-full left-0 z-50 shadow-lg',
          )}
        >
          <div className="flex max-h-40 [scrollbar-gutter:stable] flex-col gap-1 overflow-y-auto p-1">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                role="option"
                aria-selected={y === currentYear}
                ref={y === currentYear ? activeRef : null}
                className={cx(
                  'hover:bg-primary-bg text-text-sub w-full cursor-pointer rounded-lg px-2 py-1 text-center font-medium',
                  'transition-colors duration-200',
                  y === currentYear && 'bg-primary-border text-white',
                )}
                onClick={() => onSelect(y)}
              >
                {y}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
