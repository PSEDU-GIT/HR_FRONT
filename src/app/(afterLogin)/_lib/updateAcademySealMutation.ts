import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAcademyPartyInfoQueryKey } from '@/app/(afterLogin)/_lib/getAcademyPartyInfo';

export const uploadSealImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('targetType', 'ACADEMY_SEAL');

  const uploadRes = await fetch('/api/server/file-upload', {
    method: 'POST',
    body: formData,
  });

  if (!uploadRes.ok) {
    const errorJson = await uploadRes.json().catch(() => ({}));
    throw new Error(errorJson.message || '인장 이미지 파일 업로드에 실패했습니다.');
  }

  const uploadJson = await uploadRes.json();
  const fileUrl = uploadJson?.data?.cdnUrl;

  if (!fileUrl) {
    throw new Error('업로드된 이미지 CDN URL을 확인할 수 없습니다.');
  }

  const registerRes = await fetch('/api/hr/academy/seal-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sealImageUrl: fileUrl,
    }),
  });

  if (!registerRes.ok) {
    const errorJson = await registerRes.json().catch(() => ({}));
    throw new Error(errorJson.message || '인장 등록/변경 요청에 실패했습니다.');
  }

  return fileUrl;
};

export const useUpdateAcademySealMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadSealImage(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getAcademyPartyInfoQueryKey });
    },
  });
};
