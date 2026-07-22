'use client';

import { useRouter } from 'next/navigation';
import cx from 'classnames';

interface ClickRecontractActionProps {
  className?: string;
  instructorName?: string;
}

export default function ClickRecontractAction({
  className,
}: ClickRecontractActionProps) {
  const router = useRouter();

  const handleRecontract = () => {
    router.push('/wizard/step1');
  };

  return (
    <button
      type="button"
      onClick={handleRecontract}
      className={cx(
        'bg-custom-indigo hover:bg-custom-indigo-hover active:scale-95 inline-flex cursor-pointer items-center justify-center rounded-xl px-3.5 py-1.5 text-[10px] font-bold text-white transition-all',
        className,
      )}
    >
      <span>재계약하기</span>
    </button>
  );
}
