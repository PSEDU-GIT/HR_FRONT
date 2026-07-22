'use client';

import { useState } from 'react';
import { Printer, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import cx from 'classnames';
import ReadContractDocumentAction from '@/app/(afterLogin)/wizard/step4/_action/ReadContractDocument.action';

interface ClickPrintPreviewContractActionProps {
  className?: string;
}

export default function ClickPrintPreviewContractAction({
  className,
}: ClickPrintPreviewContractActionProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleActualPrint = () => {
    const targetEl = document.getElementById('printable-contract-document');
    if (!targetEl) return;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    const styleTags = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((style) => style.outerHTML)
      .join('\n');

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>근로계약서 인쇄</title>
          ${styleTags}
          <style>
            @page {
              size: A4;
              margin: 15mm;
            }
            .print-page-break {
              break-before: page !important;
              page-break-before: always !important;
            }
            body {
              margin: 0;
              padding: 0;
              background: white !important;
              font-family: sans-serif;
            }
            #printable-contract-document {
              max-height: none !important;
              overflow: visible !important;
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              width: 100% !important;
            }
          </style>
        </head>
        <body>
          ${targetEl.outerHTML}
        </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow?.focus();
    setTimeout(() => {
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 300);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpenModal(true)}
        className={cx(
          'border-custom-slate-border text-text-main hover:bg-custom-slate-bg active:scale-[0.98] flex cursor-pointer items-center gap-2 rounded-2xl border bg-white px-5 py-3.5 text-xs font-bold transition-all shadow-2xs',
          className,
        )}
      >
        <Eye className="h-4 w-4 text-slate-600" />
        <span>계약서 인쇄 미리보기</span>
      </button>

      <AnimatePresence>
        {isOpenModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpenModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="border-custom-slate-border relative flex h-full max-h-[90vh] w-full max-w-4xl flex-col rounded-3xl border bg-slate-100 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-custom-indigo">
                    <Eye className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">계약서 인쇄 미리보기</h3>
                    <p className="text-[11px] font-medium text-slate-500">
                      실제 A4 인쇄 규격 형태의 미리보기 화면입니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleActualPrint}
                    className="bg-custom-indigo hover:bg-custom-indigo-hover active:scale-95 flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black text-white transition-all shadow-xs"
                  >
                    <Printer className="h-4 w-4" />
                    <span>인쇄하기</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpenModal(false)}
                    className="hover:bg-custom-slate-bg flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-400 transition-all hover:text-slate-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Printed A4 Paper Preview */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 flex justify-center bg-slate-300/60">
                <div className="w-full max-w-[210mm] min-h-[297mm] bg-white p-8 md:p-14 shadow-2xl border border-slate-300 rounded-xs">
                  <ReadContractDocumentAction className="max-h-none border-none p-0 shadow-none overflow-visible bg-transparent rounded-none" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
