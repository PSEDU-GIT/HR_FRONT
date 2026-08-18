'use client';

import { useShallow } from 'zustand/react/shallow';
import { useAcademySealStore } from '@/app/(afterLogin)/_state/useAcademySealStore';
import { useAcademyPartyInfoState } from '@/app/(afterLogin)/_state/getAcademyPartyInfo.state';
import { Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function ReadSealPreviewAction() {
  const { academyInfo } = useAcademyPartyInfoState();

  const { previewUrl, selectedFile, errorMessage } = useAcademySealStore(
    useShallow((state) => ({
      previewUrl: state.previewUrl,
      selectedFile: state.selectedFile,
      errorMessage: state.errorMessage,
    })),
  );

  const currentSeal = academyInfo?.sealImageUrl;
  const displayImage = previewUrl || currentSeal;

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-400">
          {errorMessage}
        </div>
      )}

      <div className="border-custom-slate-border flex flex-col items-center justify-center rounded-2xl border border-dashed bg-slate-50/50 p-6 dark:bg-slate-900/30">
        {displayImage ? (
          <div className="relative flex flex-col items-center">
            <div className="border-custom-slate-border flex h-32 w-32 items-center justify-center rounded-2xl border bg-white p-2 shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayImage}
                alt="학원 직인"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {selectedFile ? (
              <span className="text-custom-indigo mt-2.5 inline-flex items-center gap-1 text-xs font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />새 파일 선택됨 ({selectedFile.name})
              </span>
            ) : (
              <span className="text-text-side mt-2 text-[11px] font-medium">현재 등록된 직인</span>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <ImageIcon className="h-8 w-8" />
            </div>
            <p className="text-text-main mt-3 text-xs font-bold">등록된 직인이 없습니다.</p>
            <p className="text-text-side mt-1 text-[11px]">배경이 투명한 PNG 파일을 권장합니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
