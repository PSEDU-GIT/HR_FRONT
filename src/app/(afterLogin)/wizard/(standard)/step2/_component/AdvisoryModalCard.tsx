'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import cx from 'classnames';

interface AdvisoryModalCardProps {
  layoutId: string;
  isHighlighted: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  theme?: 'yellow' | 'emerald' | 'default' | 'danger';
  cardClassName?: string;
  modalClassName?: string;
  autoCloseDuration?: number;
}

export default function AdvisoryModalCard({
  layoutId,
  isHighlighted,
  onClose,
  title,
  children,
  theme = 'yellow',
  cardClassName,
  modalClassName,
  autoCloseDuration = 3000,
}: AdvisoryModalCardProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHighlighted) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isHighlighted, onClose, autoCloseDuration]);

  const themeCardClass =
    theme === 'danger'
      ? 'border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300'
      : theme === 'yellow'
        ? 'border-custom-yellow-border dark:border-amber-900 bg-custom-yellow-bg dark:bg-amber-950/50 text-custom-yellow dark:text-amber-300'
        : theme === 'emerald'
          ? 'border-custom-emerald-border dark:border-emerald-900 bg-custom-emerald-bg dark:bg-emerald-950/50 text-custom-emerald dark:text-emerald-300'
          : 'bg-white dark:bg-slate-900 text-text-main border border-custom-slate-border dark:border-slate-800';

  return (
    <>
      <motion.div
        layoutId={layoutId}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className={cx('space-y-2 rounded-2xl border p-4 text-xs', themeCardClass, cardClassName)}
      >
        <div className="flex items-center gap-1.5 text-xs font-extrabold">
          <span>{title}</span>
        </div>
        <div className="space-y-1 text-xs leading-relaxed font-medium">{children}</div>
      </motion.div>

      <AnimatePresence>
        {isHighlighted && (
          <motion.div
            key={`backdrop-${layoutId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-xs"
          >
            <motion.div
              key={`modal-${layoutId}`}
              layoutId={layoutId}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className={cx(
                'relative w-full max-w-xl space-y-4 rounded-3xl border-2 p-8 shadow-2xl',
                themeCardClass,
                modalClassName,
              )}
            >
              <div className="flex items-center justify-between text-xl font-black">
                <span>{title}</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer rounded-full p-1.5 transition-colors hover:bg-black/10"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-2 text-base leading-relaxed font-bold">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
