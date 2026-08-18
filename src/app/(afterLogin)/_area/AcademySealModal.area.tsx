'use client';

import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ClickSealToolbarAction from '@/app/(afterLogin)/_action/academy/ClickSealToolbar.action';
import ReadSealPreviewAction from '@/app/(afterLogin)/_action/academy/ReadSealPreview.action';
import SelectSealFileAction from '@/app/(afterLogin)/_action/academy/SelectSealFile.action';
import ClickSaveSealAction from '@/app/(afterLogin)/_action/academy/ClickSaveSeal.action';
import { Stamp, X } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AcademySealModalArea({ isOpen, onClose }: Props) {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          data-portal-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="border-custom-slate-border bg-background relative z-10 w-full max-w-md overflow-hidden rounded-3xl border p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="border-custom-slate-border flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="bg-custom-indigo-bg text-custom-indigo flex h-8 w-8 items-center justify-center rounded-xl">
                  <Stamp className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-text-title text-sm font-bold">학원 직인/인장 관리</h3>
                  <p className="text-text-side text-[11px]">
                    전자계약서 체결 시 날인될 직인 이미지입니다.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-text-side hover:text-text-main cursor-pointer rounded-lg p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ClickSealToolbarAction />

            <div className="my-3 space-y-4">
              <ReadSealPreviewAction />
              <SelectSealFileAction />
            </div>

            <ClickSaveSealAction onClose={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
