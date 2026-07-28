'use client';

import cx from 'classnames';

interface ToggleButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function ToggleButton({
  label,
  isSelected,
  onClick,
  className,
  disabled,
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx(
        'flex-1 rounded-xl border py-2 text-xs font-bold transition-all disabled:opacity-50',
        isSelected
          ? 'border-custom-indigo bg-custom-indigo/10 text-custom-indigo'
          : 'border-custom-slate-border text-text-side bg-white hover:bg-slate-50',
        className,
      )}
    >
      {label}
    </button>
  );
}
