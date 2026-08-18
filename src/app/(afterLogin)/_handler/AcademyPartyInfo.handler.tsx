'use client';

import { useAcademyPartyInfoState } from '@/app/(afterLogin)/_state/getAcademyPartyInfo.state';
import ReadAcademyPartyDetailAction from '@/app/(afterLogin)/_action/academy/ReadAcademyPartyDetail.action';
import ReadAcademySealAction from '@/app/(afterLogin)/_action/academy/ReadAcademySeal.action';
import { Loader2 } from 'lucide-react';

export default function AcademyPartyInfoHandler() {
  const { academyInfo, isLoading } = useAcademyPartyInfoState();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-custom-indigo" />
      </div>
    );
  }

  if (!academyInfo) {
    return (
      <div className="py-6 text-center text-xs text-text-side">
        학원 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <ReadAcademyPartyDetailAction />
      <ReadAcademySealAction />
    </div>
  );
}
