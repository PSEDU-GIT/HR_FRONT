'use client';

import DatePicker from 'react-datepicker';
import CustomHeader from '../picker/CustomHeader';
import { formatWeekDay } from '../dateFunctions';
import { format } from 'date-fns';
import CustomMonthContent from '../picker/CustomMonthContent';
import { useState } from 'react';
import Tooltip from '@/app/_component/tooltip/Tooltip';

type Props = {
  selectedDate?: Date;
  onTrackable?: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
  highlightDates?: Array<{
    'react-datepicker__day--highlighted-blue'?: Date[];
    'react-datepicker__day--highlighted-red'?: Date[];
    'react-datepicker__day--highlighted-gray'?: Date[];
  }>;
  dateTooltipMap?: Record<string, string>;
  readonly?: boolean;
  disabled?: boolean;
  startDate?: Date;
  endDate?: Date;
  onTodayButton?: { show: boolean; onClose: () => void }; // 하단 오늘 선택 버튼 (표시 여부, 캘린더 닫기 함수)
  onClose?: () => void; // 월 선택 후 캘린더 닫기 (initialView === 'month' 일 때 사용)
  arrowAlign?: 'center' | 'right' | 'none'; // 화살표 위치 (기본: right)
  enableYearDropdown?: boolean; // 연도 클릭 시 연도 드롭다운 활성화
  enableMonthSwitch?: boolean; // 월 클릭 시 월달력 전환 활성화
  initialView?: 'day' | 'month'; // 캘린더 초기 뷰 (기본: 날짜, 'month': 월 선택 뷰)
  calendarClassName?: string;
  onHeaderTodayButton?: boolean;
};

const getHighlightClass = (date: Date, highlightDates: Props['highlightDates']) => {
  if (!highlightDates || highlightDates.length === 0) return '';

  const highlightData = highlightDates[0];
  const dateString = format(date, 'yyyy-MM-dd');

  const highlightTypes = [
    {
      key: 'react-datepicker__day--highlighted-blue',
      dates: highlightData['react-datepicker__day--highlighted-blue'],
    },
    {
      key: 'react-datepicker__day--highlighted-red',
      dates: highlightData['react-datepicker__day--highlighted-red'],
    },
    {
      key: 'react-datepicker__day--highlighted-gray',
      dates: highlightData['react-datepicker__day--highlighted-gray'],
    },
  ];

  for (const { key, dates } of highlightTypes) {
    if (dates?.some((d) => format(d, 'yyyy-MM-dd') === dateString)) {
      return key;
    }
  }

  return '';
};

const renderDayContent = (day: number, date: Date, dateTooltipMap?: Record<string, string>) => {
  const tooltip = dateTooltipMap?.[format(date, 'yyyy-MM-dd')];

  if (!tooltip) return day;

  return (
    <Tooltip
      content={tooltip}
      position="center"
      classname="relative -mt-1 max-w-50 text-center before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-[5px] before:border-transparent before:border-t-black"
      contentClassName="whitespace-normal break-keep line-clamp-2 leading-normal"
    >
      <span className="flex size-full items-center justify-center">{day}</span>
    </Tooltip>
  );
};

export default function CustomCalendar({
  selectedDate,
  onTrackable,
  onMonthChange,
  highlightDates = [],
  dateTooltipMap,
  readonly,
  startDate,
  endDate,
  disabled = false,
  arrowAlign = 'right',
  enableYearDropdown = false,
  enableMonthSwitch = false,
  initialView = 'day',
  onTodayButton,
  onClose,
  calendarClassName = '',
  onHeaderTodayButton,
}: Props) {
  const [isMonthView, setIsMonthView] = useState(initialView === 'month');

  return (
    <DatePicker
      inline
      selected={selectedDate}
      openToDate={selectedDate ?? new Date()}
      onChange={(date: Date | null) => onTrackable?.(date!)}
      onMonthChange={(date: Date | null) => onMonthChange?.(date!)}
      formatWeekDay={(dayName) => formatWeekDay(dayName)}
      renderCustomHeader={(props) => (
        <CustomHeader
          {...props}
          arrowAlign={arrowAlign}
          enableYearDropdown={enableYearDropdown}
          enableMonthSwitch={enableMonthSwitch}
          onTrackable={() => setIsMonthView((prev: boolean) => !prev)}
          onTodayButton={onHeaderTodayButton ? () => onTrackable?.(new Date()) : undefined}
        />
      )}
      dayClassName={(date) => getHighlightClass(date, highlightDates)}
      renderDayContents={(day, date) => renderDayContent(day, date, dateTooltipMap)}
      readOnly={readonly}
      className="min-h-65"
      minDate={startDate}
      maxDate={endDate}
      showMonthYearPicker={isMonthView}
      renderMonthContent={(month) => (
        <CustomMonthContent
          month={month}
          onTrackable={
            initialView !== 'month' ? () => setIsMonthView((prev: boolean) => !prev) : onClose
          }
        />
      )}
      disabled={disabled}
      calendarClassName={calendarClassName}
    >
      {onTodayButton?.show && (
        <button
          type="button"
          className="border-border text-primary w-full cursor-pointer border-t py-2 text-center font-bold"
          onClick={() => {
            onTrackable?.(new Date());
            onTodayButton?.onClose();
          }}
        >
          {initialView === 'day' ? '오늘 선택' : '이번달 선택'}
        </button>
      )}
    </DatePicker>
  );
}
