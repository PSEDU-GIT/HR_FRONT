'use client';

import { useAcademyPartyInfoState } from '@/app/(afterLogin)/_state/getAcademyPartyInfo.state';
import { User, Phone, MapPin, FileText, Users } from 'lucide-react';

export default function ReadAcademyPartyDetailAction() {
  const { academyInfo } = useAcademyPartyInfoState();

  if (!academyInfo) return null;

  return (
    <div>
      {/* Academy Header */}
      <div className="border-custom-slate-border border-b pb-3">
        <div className="flex items-center justify-between">
          <span className="bg-custom-indigo-bg text-custom-indigo inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold">
            학원 사업자 정보
          </span>
          <span className="text-text-side flex items-center gap-1 text-[11px] font-medium">
            <Users className="h-3 w-3" />
            재직 직원 {academyInfo.employedStaffCount}명
          </span>
        </div>
        <h3 className="text-text-title mt-2 text-sm font-black tracking-tight">
          {academyInfo.name}
        </h3>
      </div>

      {/* Academy Details */}
      <div className="space-y-2.5 pt-3 text-xs">
        <div className="flex items-start gap-2">
          <User className="text-text-side mt-0.5 h-3.5 w-3.5 shrink-0" />
          <div className="flex-1">
            <span className="text-text-side text-[11px]">대표자</span>
            <p className="text-text-main font-semibold">{academyInfo.representative}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <FileText className="text-text-side mt-0.5 h-3.5 w-3.5 shrink-0" />
          <div className="flex-1">
            <span className="text-text-side text-[11px]">사업자등록번호</span>
            <p className="text-text-main font-semibold">{academyInfo.businessNum}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Phone className="text-text-side mt-0.5 h-3.5 w-3.5 shrink-0" />
          <div className="flex-1">
            <span className="text-text-side text-[11px]">대표 연락처</span>
            <p className="text-text-main font-semibold">{academyInfo.tel}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="text-text-side mt-0.5 h-3.5 w-3.5 shrink-0" />
          <div className="flex-1">
            <span className="text-text-side text-[11px]">사업장 주소</span>
            <p className="text-text-main leading-snug font-medium">
              {academyInfo.address} {academyInfo.addressDetail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
