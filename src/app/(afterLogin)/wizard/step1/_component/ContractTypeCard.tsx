'use client';

import cx from 'classnames';

interface ContractTypeCardProps {
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export default function ContractTypeCard({
  title,
  description,
  isActive,
  onClick,
}: ContractTypeCardProps) {
  return (
    <div className="w-1/2">
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        className={cx(
          'flex cursor-pointer flex-col gap-1.5 rounded-2xl border p-4.5 transition-all select-none',
          isActive
            ? 'border-custom-indigo-border bg-custom-indigo-bg/30'
            : 'border-custom-slate-border hover:bg-custom-slate-bg/40 bg-white',
        )}
      >
        <h4
          className={cx(
            'text-sm font-black transition-colors',
            isActive ? 'text-custom-indigo' : 'text-text-main',
          )}
        >
          {title}
        </h4>
        <p
          className={cx(
            'text-xs leading-relaxed font-semibold transition-colors',
            isActive ? 'text-custom-indigo-side' : 'text-text-sub',
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
