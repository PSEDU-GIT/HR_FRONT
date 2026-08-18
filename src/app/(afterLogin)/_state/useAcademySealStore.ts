'use client';

import { create } from 'zustand';

interface AcademySealState {
  selectedFile: File | null;
  previewUrl: string | null;
  errorMessage: string;
  setSelectedFile: (file: File | null) => void;
  setPreviewUrl: (url: string | null) => void;
  setErrorMessage: (msg: string) => void;
  reset: () => void;
}

export const useAcademySealStore = create<AcademySealState>((set) => ({
  selectedFile: null,
  previewUrl: null,
  errorMessage: '',
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  setPreviewUrl: (previewUrl) => set({ previewUrl }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  reset: () => set({ selectedFile: null, previewUrl: null, errorMessage: '' }),
}));
