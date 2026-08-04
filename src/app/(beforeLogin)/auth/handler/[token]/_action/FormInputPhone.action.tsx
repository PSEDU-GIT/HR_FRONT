'use client';

import { useShallow } from 'zustand/react/shallow';
import { formatPhoneNumber } from '@/app/util/formatPhoneNumber.util';
import { useTokenHandlerStore } from '../_state/useTokenHandlerStore';

interface FormInputPhoneActionProps {
  disabled?: boolean;
}

export default function FormInputPhoneAction({ disabled }: FormInputPhoneActionProps) {
  const { phone, setPhone } = useTokenHandlerStore(
    useShallow((state) => ({
      phone: state.phone,
      setPhone: state.setPhone,
    })),
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  return (
    <input
      type="tel"
      inputMode="numeric"
      value={phone}
      onChange={handlePhoneChange}
      placeholder="010-0000-0000"
      maxLength={13}
      disabled={disabled}
      className="border-custom-slate-border text-text-title placeholder:text-text-side focus:border-custom-indigo h-12 w-full rounded-lg border bg-white px-3.5 text-sm font-semibold focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
    />
  );
}
