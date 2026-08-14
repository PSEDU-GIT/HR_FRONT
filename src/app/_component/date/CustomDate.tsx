'use client';

import CustomCalendar from './calendar/CustomCalendar';
import cx from 'classnames';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parse } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';

interface CustomDateProps {
  /** 스타일 옵션 */
  className?: string;
  buttonClassName?: string;

  /** 날짜 선택 옵션 */
  selectDate: string;
  onChangeAction: (date: string) => void;

  stateDate?: Date;
  endDate?: Date;

  /** 초기화 버튼 표시 여부 */
  hasReset?: boolean;
  /** 캘린더 표시 위치 옵션 */
  view?: 'top' | 'bottom';
  viewLayer?: 'right' | 'left';
  /** 하단 오늘 선택 버튼 표시 여부 */
  todayButton?: boolean;
  arrowAlign?: 'center' | 'right' | 'none';
  /** 연도 선택 버튼 표시 여부 */
  hasSelectYear?: boolean;
  /** 월 선택 버튼 표시 여부 */
  hasSelectMonth?: boolean;

  hasCalendarIcon?: boolean;
  placeholder?: string;
}

export default function CustomDate({
  className,
  buttonClassName,
  selectDate,
  onChangeAction,
  stateDate,
  endDate,
  hasReset = true,
  view = 'bottom',
  viewLayer = 'left',
  todayButton = false,
  arrowAlign = 'right' as const,
  hasSelectYear = true,
  hasSelectMonth = true,
  hasCalendarIcon = true,
  placeholder = '',
}: CustomDateProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const onToggle = () => {
    setIsVisible(!isVisible);
  };

  const onLocalChangeAction = (date: Date) => {
    onChangeAction(format(date, 'yyyy-MM-dd'));
  };

  const onReset: MouseEventHandler = (event) => {
    event.stopPropagation();

    onChangeAction('');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className={cx('relative inline-flex flex-col', className && className)}>
      <div
        onClick={onToggle}
        className={cx(
          'border-custom-slate-border bg-background flex min-h-8.5 min-w-9.5 cursor-pointer items-center justify-between gap-2.5 rounded-lg border px-2 py-1.5 text-xs transition-all',
          buttonClassName,
          isVisible && 'border-custom-indigo-border! bg-custom-indigo-bg/30! dark:border-custom-indigo-border!',
        )}
      >
        {selectDate ? (
          <span className="text-text-title font-semibold">{selectDate}</span>
        ) : placeholder ? (
          <span className="text-text-side font-bold">{placeholder}</span>
        ) : null}
        {hasCalendarIcon && (
          <CalendarIcon size={16} className="text-text-side shrink-0" strokeWidth={2} />
        )}
        {selectDate && hasReset && (
          <button
            type="button"
            title="초기화"
            className="text-text-side absolute right-2 cursor-pointer"
            onClick={onReset}
          >
            <X size={16} />
          </button>
        )}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            className={cx(
              'absolute z-50',
              view === 'bottom' ? 'top-full mt-1.5' : 'bottom-full mb-1.5',
              viewLayer === 'left' ? 'left-0' : 'right-0',
            )}
            initial={{ opacity: 0, y: view === 'bottom' ? '-15%' : '15%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: view === 'bottom' ? '-5%' : '5%' }}
            transition={{ duration: 0.2 }}
          >
            <CustomCalendar
              selectedDate={
                selectDate === '' ? new Date() : parse(selectDate, 'yyyy-MM-dd', new Date())
              }
              onTrackable={onLocalChangeAction}
              startDate={stateDate}
              endDate={endDate}
              arrowAlign={arrowAlign}
              enableYearDropdown={hasSelectYear}
              enableMonthSwitch={hasSelectMonth}
              onTodayButton={todayButton ? { show: true, onClose: onToggle } : undefined}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
