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
  theme?: 'yellow' | 'emerald' | 'default';
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
    theme === 'yellow'
      ? 'border-custom-yellow-border bg-custom-yellow-bg text-custom-yellow'
      : theme === 'emerald'
        ? 'border-custom-emerald-border bg-custom-emerald-bg text-custom-emerald'
        : 'bg-background text-text-main border-none';

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
