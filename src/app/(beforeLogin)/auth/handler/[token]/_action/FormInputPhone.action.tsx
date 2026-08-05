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
      className="placeholder:text-text-side h-12 w-full rounded-lg px-3.5 text-sm font-semibold"
    />
  );
}
