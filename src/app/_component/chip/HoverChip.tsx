'use client';

import { ReactNode } from 'react';
import cx from 'classnames';

interface HoverChipProps {
  theme?: 'indigo' | 'indigo2' | 'rose' | 'emerald' | 'default' | 'yellow' | 'yellow2' | string;
  shape?: 'circle' | 'square';
  icon: ReactNode;
}

export default function HoverChip({ icon, theme = 'default', shape = 'circle' }: HoverChipProps) {
  return (
    <span
      className={cx(
        'text-text-side group flex cursor-pointer items-center justify-center p-2 transition-colors',
        shape === 'circle' && 'rounded-full',
        shape === 'square' && 'rounded-lg',
        theme === 'default' && 'hover:bg-slate-100',
        theme === 'indigo' && 'hover:bg-indigo-50 hover:text-custom-indigo',
        theme === 'rose' && 'hover:bg-rose-50 hover:text-rose-600',
        theme === 'emerald' && 'hover:bg-emerald-50 hover:text-emerald-600',
      )}
    >
      {icon}
    </span>
  );
}
