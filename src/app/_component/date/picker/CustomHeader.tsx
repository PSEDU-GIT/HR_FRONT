'use client';

import { format } from 'date-fns';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import cx from 'classnames';
import CalendarArrow from './CalendarArrow';
import YearDropdown from './YearPicker';

type Props = {
  enableYearDropdown?: boolean;
  enableMonthSwitch?: boolean;
  arrowAlign?: 'center' | 'right' | 'none';
  onTrackable?: () => void;
  onTodayButton?: () => void;
};

export default function CustomHeader({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  changeYear,
  enableYearDropdown,
  enableMonthSwitch,
  arrowAlign = 'right',
  onTrackable,
  onTodayButton,
}: ReactDatePickerCustomHeaderProps & Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [month, year] = format(date, 'M월 yyyy').split(' ');

  const years = useMemo(() => {
    const currentY = new Date().getFullYear();
    const start = 1950;
    const end = Math.max(Number(year) + 10, currentY + 10);
    const arr: number[] = [];
    for (let y = end; y >= start; y--) arr.push(y);
    return arr;
  }, [year]);

  const activeRef = useRef<HTMLButtonElement | null>(null);

  const onClickToday = () => {
    onTodayButton?.();
  };

  useEffect(() => {
    if (!isOpen) return;
    const el = activeRef.current;
    if (el) {
      el.scrollIntoView({ block: 'center' });
    }
  }, [isOpen, year]);

  return (
    <div className="flex items-center">
      <div
        className={cx(
          'flex w-full items-center bg-transparent py-2',
          arrowAlign === 'right' ? 'justify-between pr-2 pl-2' : 'justify-center',
        )}
      >
        {arrowAlign === 'center' && (
          <CalendarArrow
            direction="left"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="mr-2"
          />
        )}

        <div className={cx('flex items-center', arrowAlign === 'none' && 'ml-3')}>
          <span className="relative">
            <motion.button
              {...(enableYearDropdown && { whileTap: { scale: 0.9 } })}
              onClick={enableYearDropdown ? () => setIsOpen(!isOpen) : undefined}
              className={cx(
                enableYearDropdown && 'hover:bg-hover-icon cursor-pointer rounded px-2 py-1',
              )}
            >
              <p className="text-text-main text-sm font-bold">{year}년</p>
            </motion.button>
            {enableYearDropdown && (
              <YearDropdown
                years={years}
                currentYear={Number(year)}
                isOpen={isOpen}
                activeRef={activeRef}
                onSelect={(y) => {
                  changeYear(y);
                  setIsOpen(false);
                }}
              />
            )}
          </span>
          <motion.button
            type="button"
            className={cx(
              'px-2 py-1',
              enableMonthSwitch && 'hover:bg-hover-icon cursor-pointer rounded',
            )}
            {...(enableMonthSwitch && { whileTap: { scale: 0.9 } })}
            onClick={enableMonthSwitch ? onTrackable : undefined}
          >
            <p className="text-text-main text-right text-sm font-bold">{month}</p>
          </motion.button>
        </div>

        <div className="flex">
          {arrowAlign === 'right' && (
            <CalendarArrow
              direction="left"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            />
          )}
          {arrowAlign !== 'none' && (
            <CalendarArrow
              direction="right"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={cx(arrowAlign === 'center' && 'ml-2')}
            />
          )}
        </div>
      </div>
      {onTodayButton && (
        <button
          className="bg-custom-indigo-bg text-custom-indigo hover:bg-custom-indigo-bg/70 mr-2 ml-auto flex w-10 cursor-pointer items-center justify-center rounded-md py-1"
          onClick={onClickToday}
        >
          <p className="text-10 font-semibold">오늘</p>
        </button>
      )}
    </div>
  );
}
