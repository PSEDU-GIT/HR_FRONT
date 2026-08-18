'use client';

import { useState, useRef, useEffect } from 'react';
import { useAcademyPartyInfoState } from '@/app/(afterLogin)/_state/getAcademyPartyInfo.state';
import AcademyInfoPopoverArea from '@/app/(afterLogin)/_area/AcademyInfoPopover.area';
import { Building2, ChevronDown, Loader2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import cx from 'classnames';

export default function ClickAcademyAction() {
  const { academyInfo, isLoading } = useAcademyPartyInfoState();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Do not close popover if clicking inside portaled modal
      if (target?.closest?.('[data-portal-modal]')) {
        return;
      }
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const academyName = academyInfo?.name || '학원 정보';

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cx(
          'border-custom-slate-border text-text-side flex cursor-pointer items-center justify-center gap-1.5 rounded-full border bg-transparent px-3 py-1 text-xs font-bold transition-all',
          'hover:border-custom-indigo-border hover:bg-custom-indigo-bg hover:text-custom-indigo',
          isOpen &&
            'border-custom-indigo-border bg-custom-indigo-bg text-custom-indigo ring-2 ring-indigo-500/20',
        )}
        title="학원 정보 확인"
        aria-expanded={isOpen}
      >
        {isLoading ? (
          <span className="flex items-center gap-1.5">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>로딩 중...</span>
          </span>
        ) : (
          <>
            <Building2 className="h-3.5 w-3.5 shrink-0" />
            <span className="max-w-[140px] truncate">{academyName}</span>
            <ChevronDown
              className={cx('h-3 w-3 transition-transform duration-200', isOpen && 'rotate-180')}
            />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && <AcademyInfoPopoverArea />}
      </AnimatePresence>
    </div>
  );
}
