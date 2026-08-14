'use client';

import { motion } from 'framer-motion';
import cx from 'classnames';

interface RoundedTabProps {
  data: {
    id: string;
    displayName: React.ReactNode;
    suffix?: React.ReactNode;
  }[];

  selectedData: string;
  onChangeTab?: (selectedData: string) => void;

  containerClassName?: string;
  className?: string;
  inverted?: boolean;
  activeTextClassName?: string;
  activeColor?: string;
}

export default function RoundedTab({
  data,
  selectedData,
  onChangeTab,
  containerClassName,
  className,
  inverted = false,
  activeTextClassName,
  activeColor,
}: RoundedTabProps) {
  const currentIndex = data.findIndex((s) => s.id === selectedData);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;

  const color = activeColor ?? '!text-custom-indigo';

  return (
    <div
      className={cx(
        'bg-custom-slate-bg border-custom-slate-border-side inline-block w-full rounded-2xl border p-1',
        inverted && '!bg-background border-border border',
        containerClassName,
      )}
    >
      <div className="relative flex items-center">
        {data.map((datum) => (
          <button
            key={datum.id}
            type="button"
            onClick={() => onChangeTab?.(datum.id)}
            className={cx(
              'text-text-sub z-10 flex w-full flex-1 cursor-pointer items-center justify-center gap-2 py-2 text-xs font-bold transition-all duration-200',
              className,
              datum.id === selectedData &&
                cx(inverted ? (activeTextClassName ?? '!text-white') : color),
            )}
          >
            {datum.displayName}
            {datum.suffix}
          </button>
        ))}
        <motion.div
          initial={false}
          animate={{
            left: `calc(${activeIndex} * (100% / ${data.length}))`,
            width: `calc(100% / ${data.length})`,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ left: 0 }}
          className={cx(
            'bg-background border-custom-slate-border absolute h-full rounded-xl border',
            inverted && 'bg-primary/15',
          )}
        />
      </div>
    </div>
  );
}
