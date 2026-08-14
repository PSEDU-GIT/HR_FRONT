'use client';

import { useState, useRef } from 'react';
import cx from 'classnames';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomTimePicker from '@/app/_component/time/CustomTimePicker';

function parseHHMM(timeStr: string) {
  if (!timeStr || !timeStr.includes(':')) { return { ampm:'오전', hour: 9, min: 0 };
  }
  const [hStr, mStr] = timeStr.split(':'); let h = parseInt(hStr, 10); const m = parseInt(mStr, 10); const ampm = h >= 12 ?'오후' : '오전';
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return { ampm, hour: h, min: m };
}

function formatTo24H(ampm: string, hour: number, min: number): string {
  let h24 = hour;
  if (ampm === '오후' && hour < 12) h24 += 12;
  if (ampm === '오전' && hour === 12) h24 = 0;
  const hFormatted = String(h24).padStart(2, '0');
  const mFormatted = String(min).padStart(2, '0');
  return `${hFormatted}:${mFormatted}`;
}

interface TimePickerWrapperProps {
  value: string;
  onChange: (time: string) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  direction?: 'up' | 'down';
  readMode?: boolean;
}

export default function TimePicker({
  value,
  onChange,
  placeholder = '시간 선택',
  className,
  buttonClassName,
  direction = 'down',
  readMode = false,
}: TimePickerWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultData = parseHHMM(value);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    if (isVisible) {
      setIsVisible(false);
    }
  };

  const handleTrackable = (ampm: '오전' | '오후' | string, h: number, m: number) => {
    const formatted = formatTo24H(ampm, h, m);
    if (formatted !== value) {
      onChange(formatted);
    }
  };

  return (
    <div ref={containerRef} className={cx('relative inline-block', className)} onBlur={handleBlur}>
      <button
        type="button"
        className={cx(
          'bg-background border-custom-slate-border text-text-main flex h-8.5 cursor-pointer items-center justify-between gap-1.5 rounded-xl border px-3 text-xs transition-all outline-none',
          'hover:border-custom-indigo-border/50 hover:bg-custom-slate-bg',
          isVisible && 'border-custom-indigo-border! bg-custom-indigo-bg/30!',
          buttonClassName,
          readMode && 'pointer-events-none',
        )}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <span className="font-mono font-bold">{value || placeholder}</span>
        {!readMode && (
          <ChevronDown
            className={cx(
              isVisible && 'rotate-180',
              'text-text-sub ml-auto shrink-0 transition-all duration-300 ease-in-out',
            )}
            size={14}
          />
        )}
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={cx(
              'absolute z-50',
              direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2',
            )}
            initial={{ opacity: 0, y: direction === 'up' ? '15%' : '-15%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === 'up' ? '5%' : '-5%' }}
            transition={{ duration: 0.2 }}
          >
            <CustomTimePicker defaultData={defaultData} onTrackable={handleTrackable} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
