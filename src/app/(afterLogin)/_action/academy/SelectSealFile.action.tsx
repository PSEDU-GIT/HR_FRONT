'use client';

import { useRef } from 'react';
import { useAcademySealStore } from '@/app/(afterLogin)/_state/useAcademySealStore';

export default function SelectSealFileAction() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setSelectedFile = useAcademySealStore((state) => state.setSelectedFile);
  const setPreviewUrl = useAcademySealStore((state) => state.setPreviewUrl);
  const setErrorMessage = useAcademySealStore((state) => state.setErrorMessage);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('이미지 파일(PNG, JPG 등)만 업로드할 수 있습니다.');
      return;
    }

    setErrorMessage('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="text-text-side flex items-center justify-between text-[11px]">
        <span>권장 형식: PNG (투명 배경), JPG (최대 5MB)</span>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-custom-indigo cursor-pointer font-bold hover:underline"
        >
          파일 찾아보기
        </button>
      </div>
    </div>
  );
}
