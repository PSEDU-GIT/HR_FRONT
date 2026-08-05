'use client';

import { useTokenHandlerStore } from '../../_state/useTokenHandlerStore';

export default function ClickResetSignatureAction() {
  const setSignatureImage = useTokenHandlerStore((state: any) => state.setSignatureImage);

  const handleClick = () => {
    setSignatureImage(null);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-text-side hover:text-text-main text-xs font-medium underline cursor-pointer dark:text-slate-400"
    >
      초기화
    </button>
  );
}
