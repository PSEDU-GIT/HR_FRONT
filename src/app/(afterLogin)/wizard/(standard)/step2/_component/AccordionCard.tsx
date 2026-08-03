'use client';

import React from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import cx from 'classnames';

interface AccordionCardProps {
  title: string;
  summary?: React.ReactNode;
  hasWarning?: boolean;
  hasDanger?: boolean;
  isOpen: boolean;
  isDone?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function AccordionCard({
  title,
  summary,
  hasWarning,
  hasDanger,
  isOpen,
  isDone,
  onClick,
  children,
}: AccordionCardProps) {
  return (
    <div
      className={cx(
        'border-custom-slate-border dark:border-slate-800 rounded-2xl border transition-all duration-500',
        isOpen
          ? 'bg-white dark:bg-slate-900 shadow-sm'
          : 'bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/80',
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={cx(
          'flex w-full cursor-pointer items-center justify-between p-4 text-left transition-all',
          isOpen
            ? 'border-custom-slate-border-side dark:border-slate-800 bg-custom-slate-bg dark:bg-slate-800/50 rounded-t-2xl border-b'
            : 'hover:bg-custom-slate-bg dark:hover:bg-slate-800/50 bg-background dark:bg-slate-900 rounded-2xl border-transparent',
        )}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={cx(
              'h-2 w-2 rounded-full transition-colors',
              hasDanger
                ? 'bg-rose-500'
                : hasWarning
                  ? 'bg-custom-yellow'
                  : isDone
                    ? 'bg-custom-emerald'
                    : isOpen
                      ? 'bg-custom-indigo'
                      : 'bg-slate-300 dark:bg-slate-700',
            )}
          />
          <span className="text-text-title dark:text-slate-100 text-sm font-bold">{title}</span>
          {hasDanger && <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-600" />}
          {!hasDanger && hasWarning && (
            <AlertTriangle className="text-custom-yellow h-3.5 w-3.5 shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-3">
          {summary && <span className="text-text-side dark:text-slate-400 text-xs font-medium">{summary}</span>}
          {isOpen ? (
            <ChevronUp className="text-text-side dark:text-slate-400 h-4 w-4 shrink-0" />
          ) : (
            <ChevronDown className="text-text-side dark:text-slate-400 h-4 w-4 shrink-0" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="accordion-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="border-custom-slate-border dark:border-slate-800 bg-background dark:bg-slate-900 rounded-b-2xl border-t"
          >
            <div className="space-y-4 p-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
