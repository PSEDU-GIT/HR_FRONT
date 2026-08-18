'use client';

import { useState, useRef, useEffect } from 'react';
import ProfilePopoverArea from '@/app/(afterLogin)/_area/ProfilePopover.area';
import { User } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import cx from 'classnames';

export default function ClickProfileAction() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cx(
          'border-custom-slate-border text-text-side flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-transparent transition-all',
          'hover:border-custom-indigo-border hover:bg-custom-indigo-bg hover:text-custom-indigo',
          isOpen &&
            'border-custom-indigo-border bg-custom-indigo-bg text-custom-indigo ring-2 ring-indigo-500/20',
        )}
        title="내 계정 설정"
        aria-label="내 계정 설정"
        aria-expanded={isOpen}
      >
        <User className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && <ProfilePopoverArea />}
      </AnimatePresence>
    </div>
  );
}
