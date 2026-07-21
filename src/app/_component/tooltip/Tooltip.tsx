'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type CSSProperties,
  type ReactNode,
} from 'react';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

type Props = {
  content: string;
  children: ReactNode;
  position?: 'left' | 'center' | 'right' | 'side-left' | 'side-right' | 'bottom';
  shortcut?: string;
  classname?: string;
  contentClassName?: string;
  bg?: 'black' | 'white';
};

const GAP = 16;

function getTooltipStyle(rect: DOMRect, position: Props['position']): CSSProperties {
  switch (position) {
    case 'right':
      return { top: rect.top, left: rect.left, transform: 'translateY(-100%)' };
    case 'center':
      return {
        top: rect.top,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, -100%)',
      };
    case 'left':
      return { top: rect.top, left: rect.right, transform: 'translate(-100%, -100%)' };
    case 'side-right':
      return {
        top: rect.top + rect.height / 2,
        left: rect.right + GAP,
        transform: 'translateY(-50%)',
      };
    case 'side-left':
      return {
        top: rect.top + rect.height / 2,
        left: rect.left - GAP,
        transform: 'translate(-100%, -50%)',
      };
    case 'bottom':
      return {
        top: rect.bottom + GAP,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, 0%)',
      };
    default:
      return {
        top: rect.top,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, -100%)',
      };
  }
}

export default function Tooltip({
  content,
  children,
  classname,
  contentClassName,
  position = 'center',
  shortcut,
  bg = 'black',
}: Props) {
  const [show, setShow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setStyle(getTooltipStyle(rect, position));
    }
    setShow(true);
  }, [position]);

  return (
    <AnimatePresence>
      <div
        ref={triggerRef}
        className="relative flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShow(false)}
      >
        {children}
        {isMounted &&
          show &&
          createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'fixed', ...style }}
              className={cx(
                'z-[100] rounded px-2 py-1 text-xs shadow-lg',
                bg === 'black' ? 'bg-black text-white' : 'bg-white text-black',
                classname,
              )}
            >
              <div className="flex min-w-0 gap-2">
                <span className={cx('min-w-0 flex-1', contentClassName)}>{content}</span>
                {shortcut && (
                  <span className="text-9 min-w-[17px] rounded-sm border px-1 text-center leading-normal text-white">
                    {shortcut}
                  </span>
                )}
              </div>
            </motion.div>,
            document.body,
          )}
      </div>
    </AnimatePresence>
  );
}
