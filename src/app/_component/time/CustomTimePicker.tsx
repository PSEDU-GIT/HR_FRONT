'use client';

import { useEffect, useState } from 'react';
import cx from 'classnames';

interface CustomChipProps {
  displayName: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

function CustomChip({
  displayName,
  isSelected = false,
  isDisabled = false,
  onClick,
}: CustomChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={cx(
        'cursor-pointer rounded-xl px-2 py-2 text-xs transition-all',
        isSelected
          ? 'bg-custom-indigo-bg text-custom-indigo hover:bg-custom-indigo-bg font-black'
          : 'text-text-sub hover:bg-custom-slate-bg font-bold',
        isDisabled && 'cursor-not-allowed opacity-30 hover:bg-transparent',
      )}
    >
      <h5 className="font-bold">{displayName}</h5>
    </button>
  );
}

export interface CustomTimePickerProps {
  defaultData?: {
    ampm: '오전' | '오후' | string | null;
    hour: number | null;
    min: number | null;
  };
  minTime?: {
    ampm: '오전' | '오후' | string;
    hour: number;
    min: number;
  };
  onTrackable?: (ampm: '오전' | '오후' | string, hour: number, min: number) => void;
}

export default function CustomTimePicker({
  defaultData,
  minTime,
  onTrackable,
}: CustomTimePickerProps) {
  const [amPm, setAmPm] = useState<'오전' | '오후' | string | null>(defaultData?.ampm ?? null);
  const [hour, setHour] = useState<number | null>(defaultData?.hour ?? null);
  const [min, setMin] = useState<number | null>(defaultData?.min ?? null);

  const [prevDefaultData, setPrevDefaultData] = useState(defaultData);
  if (defaultData !== prevDefaultData) {
    setPrevDefaultData(defaultData);
    setAmPm(defaultData?.ampm ?? null);
    setHour(defaultData?.hour ?? null);
    setMin(defaultData?.min ?? null);
  }

  const getHourData = (checkAmPm: string | null) => {
    return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((datum) => {
      const hourNum = Number(datum);
      const to24Hour = (h: number) => (h === 12 ? 0 : h);
      const isDisabled =
        !checkAmPm || !minTime
          ? false
          : checkAmPm === '오전' && minTime.ampm === '오후'
            ? true
            : checkAmPm === minTime.ampm && to24Hour(hourNum) < to24Hour(minTime.hour);

      return { value: datum, isDisabled };
    });
  };

  const getMinData = (checkAmPm: string | null, checkHour: number | null) => {
    return ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map((datum) => {
      const minNum = Number(datum);
      const to24Hour = (h: number) => (h === 12 ? 0 : h);
      const isDisabled =
        !checkAmPm || !checkHour || !minTime
          ? false
          : checkAmPm === '오전' && minTime.ampm === '오후'
            ? true
            : checkAmPm === minTime.ampm && to24Hour(checkHour) < to24Hour(minTime.hour)
              ? true
              : checkAmPm === minTime.ampm &&
                to24Hour(checkHour) === to24Hour(minTime.hour) &&
                minNum < minTime.min;

      return { value: datum, isDisabled };
    });
  };

  const amPmData = ['오전', '오후'].map((datum) => ({
    value: datum,
    isDisabled: !minTime ? false : datum === '오전' && minTime.ampm === '오후',
  }));

  const hourData = getHourData(amPm);
  const minData = getMinData(amPm, hour);

  const onAmPmClick = (selectedAmPm: string) => () => {
    setAmPm(selectedAmPm);

    const newHourData = getHourData(selectedAmPm);
    if (hour && newHourData.find((datum) => Number(datum.value) === hour)?.isDisabled) {
      const firstValid = newHourData.find((datum) => !datum.isDisabled);
      setHour(firstValid ? Number(firstValid.value) : null);
      setMin(null);
    }
  };

  const onHourClick = (selectedHour: number) => () => {
    setHour(selectedHour);

    const newMinData = getMinData(amPm, selectedHour);
    if (min && newMinData.find((datum) => Number(datum.value) === min)?.isDisabled) {
      const firstValid = newMinData.find((datum) => !datum.isDisabled);
      setMin(firstValid ? Number(firstValid.value) : null);
    }
  };

  useEffect(() => {
    if (amPm !== null && hour !== null && min !== null) {
      onTrackable?.(amPm, hour, min);
    }
  }, [amPm, hour, min, onTrackable]);

  return (
    <div className="bg-background border-custom-slate-border z-10 flex w-max rounded-2xl border p-1 shadow-sm">
      <div className="border-custom-slate-border/50 flex min-w-12.5 flex-col gap-1 border-r p-1">
        {amPmData.map((datum) => (
          <CustomChip
            key={datum.value}
            displayName={datum.value}
            onClick={onAmPmClick(datum.value)}
            isSelected={datum.value === amPm}
            isDisabled={datum.isDisabled}
          />
        ))}
      </div>
      <div className="border-custom-slate-border/50 flex max-h-55 min-w-12.5 shrink-0 scrollbar-thin flex-col gap-1 overflow-y-auto border-r p-1 pr-1.5">
        {hourData.map((datum) => (
          <CustomChip
            key={datum.value}
            displayName={`${datum.value}시`}
            onClick={onHourClick(Number(datum.value))}
            isSelected={Number(datum.value) === hour}
            isDisabled={datum.isDisabled}
          />
        ))}
      </div>
      <div className="border-custom-slate-border/50 flex max-h-55 min-w-12.5 shrink-0 scrollbar-thin flex-col gap-1 overflow-y-auto p-1 pr-1.5">
        {minData.map((datum) => (
          <CustomChip
            key={datum.value}
            displayName={`${datum.value}분`}
            onClick={() => setMin(Number(datum.value))}
            isSelected={Number(datum.value) === min}
            isDisabled={datum.isDisabled}
          />
        ))}
      </div>
    </div>
  );
}
