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
      className="placeholder:text-text-side h-12 w-full rounded-lg px-3.5 text-sm font-semibold"
    />
  );
}
