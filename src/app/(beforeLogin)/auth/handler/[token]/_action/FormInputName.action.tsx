'use client';

import { useShallow } from 'zustand/react/shallow';
import { useTokenHandlerStore } from '../_state/useTokenHandlerStore';

interface FormInputNameActionProps {
  disabled?: boolean;
}

export default function FormInputNameAction({ disabled }: FormInputNameActionProps) {
  const { name, setName } = useTokenHandlerStore(
    useShallow((state) => ({
      name: state.name,
      setName: state.setName,
    })),
  );

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="이름 입력"
      disabled={disabled}
      className="border-custom-slate-border text-text-title placeholder:text-text-side focus:border-custom-indigo h-12 w-full rounded-lg border bg-white px-3.5 text-sm font-semibold focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
    />
  );
}
