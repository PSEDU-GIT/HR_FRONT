'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, ReactNode, useState } from 'react';
import cx from 'classnames';
import { Check, ChevronDown } from 'lucide-react';

export type SelectDataTypes = {
  displayName?: string;
  element?: ReactNode;
  id: string | number;
};

interface SelectProps {
  /**
   * select data
   * 1. text만 사용하는 경우 - displayName 만 사용
   * 2. 커스텀이 필요한 경우 - element 만 사용
   */
  data: SelectDataTypes[];

  selectData: SelectDataTypes;
  onChangeAction?: (sub: SelectDataTypes) => void;

  className?: string;
  buttonClassName?: string;
  itemClassName?: string;
  textClassName?: string;
  icon?: ReactNode;
  prefixIcon?: ReactNode;
  direction?: 'up' | 'down'; // 드롭다운 방향
  itemTextClassName?: string;

  readMode?: boolean;
  itemWidth?: number;
}

export default function Select({
  data,
  selectData,
  onChangeAction,
  className,
  buttonClassName,
  itemClassName,
  textClassName,
  icon,
  prefixIcon,
  readMode,
  itemWidth,
  direction = 'down',
  itemTextClassName,
}: SelectProps) {
  const [isVisible, setIsVisible] = useState(false);

  const onToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // 드롭다운 내부로 포커스가 이동한 경우 닫지 않음
    if (!onChangeAction && e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    if (isVisible) {
      setIsVisible(false);
    }
  };

  if (data.length === 0) return <Fragment />;

  return (
    <div className={cx('relative', className && className)} onBlur={handleBlur}>
      <button
        type="button"
        className={cx(
          'bg-background border-custom-slate-border text-text-main flex w-full cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition-all outline-none',
          'hover:border-primary-border/30 hover:bg-custom-slate-bg',
          isVisible && 'border-primary-border! bg-custom-slate-bg!',
          buttonClassName && buttonClassName,
          readMode && 'pointer-events-none',
        )}
        onClick={onToggle}
      >
        {prefixIcon && prefixIcon}
        {selectData.displayName && (
          <span className={cx('truncate text-left font-bold', textClassName)}>
            {selectData.displayName}
          </span>
        )}
        {selectData.element && selectData.element}
        {!readMode &&
          (icon ? (
            icon
          ) : (
            <ChevronDown
              className={cx(
                isVisible && 'rotate-180',
                'text-text-sub ml-auto shrink-0 transition-all duration-300 ease-in-out',
              )}
              size={14}
            />
          ))}
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={cx(
              'border-custom-slate bg-background absolute right-0 left-0 z-50 max-h-55 cursor-pointer space-y-0.5 overflow-y-auto rounded-xl border p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-none',
              direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2',
            )}
            initial={{ opacity: 0, y: direction === 'up' ? '15%' : '-15%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === 'up' ? '5%' : '-5%' }}
            transition={{ duration: 0.2 }}
            style={{ width: itemWidth }}
          >
            {data.map((datum, index) => (
              <button
                key={index}
                type="button"
                className={cx(
                  'letterSpacing-num w-full cursor-pointer rounded-lg px-3 py-2.5 transition-colors duration-200',
                  selectData.id === datum.id
                    ? 'text-primary bg-primary-bg flex items-center justify-between gap-0.5'
                    : 'text-text-main hover:text-primary hover:bg-custom-slate-bg flex items-center justify-between gap-0.5',
                  itemClassName && itemClassName,
                )}
                onClick={() => onChangeAction && onChangeAction(datum)}
              >
                {datum.displayName && (
                  <h5 className={cx('truncate text-left font-semibold', itemTextClassName)}>
                    {datum.displayName}
                  </h5>
                )}

                {datum.element && datum.element}

                {selectData.id === datum.id ? (
                  <Check size={14} className="shrink-0" />
                ) : (
                  datum.element && <div className="w-[14px] shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
