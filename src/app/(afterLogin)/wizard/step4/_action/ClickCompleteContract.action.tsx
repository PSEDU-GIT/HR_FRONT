'use client';

import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';
import cx from 'classnames';

interface ClickCompleteContractActionProps {
  className?: string;
}

export default function ClickCompleteContractAction({
  className,
}: ClickCompleteContractActionProps) {
  const router = useRouter();

  const handleComplete = () => {
    alert('계약서 작성이 성공적으로 완료되었습니다.');
    router.push('/dashboard');
  };

  return (
    <button
      type="button"
      onClick={handleComplete}
      className={cx(
        'bg-custom-indigo hover:bg-custom-indigo-hover flex cursor-pointer items-center justify-center space-x-1.5 rounded-xl px-4 py-2 text-xs font-black text-white shadow-xs transition-all active:scale-95',
        className,
      )}
    >
      <Send size={14} />
      <span>계약서 작성 완료</span>
    </button>
  );
}
