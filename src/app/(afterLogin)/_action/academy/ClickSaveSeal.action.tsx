'use client';

import { useShallow } from 'zustand/react/shallow';
import { useAcademySealStore } from '@/app/(afterLogin)/_state/useAcademySealStore';
import { useAcademyPartyInfoState } from '@/app/(afterLogin)/_state/getAcademyPartyInfo.state';
import { useUpdateAcademySealMutation } from '@/app/(afterLogin)/_lib/updateAcademySealMutation';
import { Upload, Loader2 } from 'lucide-react';

type Props = {
  onClose: () => void;
};

export default function ClickSaveSealAction({ onClose }: Props) {
  const { academyInfo } = useAcademyPartyInfoState();
  const { selectedFile, reset, setErrorMessage } = useAcademySealStore(
    useShallow((state) => ({
      selectedFile: state.selectedFile,
      reset: state.reset,
      setErrorMessage: state.setErrorMessage,
    })),
  );

  const { mutate: uploadSeal, isPending } = useUpdateAcademySealMutation();
  const currentSeal = academyInfo?.sealImageUrl;

  const handleSave = () => {
    if (!selectedFile) return;

    uploadSeal(selectedFile, {
      onSuccess: () => {
        reset();
        onClose();
      },
      onError: (err: any) => {
        setErrorMessage(err.message || '인장 이미지 업로드에 실패했습니다.');
      },
    });
  };

  const handleCancelSelection = () => {
    reset();
  };

  const handleTriggerFileInput = () => {
    const fileInput = document.querySelector<HTMLInputElement>(
      'input[type="file"][accept*="image"]',
    );
    fileInput?.click();
  };

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  return (
    <div className="border-custom-slate-border flex items-center justify-end gap-2 border-t pt-4">
      {selectedFile ? (
        <>
          <button
            type="button"
            onClick={handleCancelSelection}
            disabled={isPending}
            className="border-custom-slate-border text-text-side cursor-pointer rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            선택 취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="bg-custom-indigo hover:bg-custom-indigo-hover flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm transition-all disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>저장 중...</span>
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5" />
                <span>저장하기</span>
              </>
            )}
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={handleCloseModal}
            className="border-custom-slate-border text-text-side cursor-pointer rounded-xl border px-4 py-2 text-xs font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={handleTriggerFileInput}
            className="bg-custom-indigo hover:bg-custom-indigo-hover flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm transition-all"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>{currentSeal ? '직인 이미지 변경' : '직인 이미지 등록'}</span>
          </button>
        </>
      )}
    </div>
  );
}
