'use client';

import { ShieldCheck, FileCheck, UserCheck } from 'lucide-react';
import CheckMembershipAction from '../_action/CheckMembership.action';

interface TokenHandlerAreaProps {
  token: string;
}

export default function TokenHandlerArea({ token }: TokenHandlerAreaProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 transition-colors dark:bg-slate-950">
      <div className="border-custom-slate-border-side w-full max-w-md space-y-6 rounded-3xl border bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-2 text-center">
          <div className="bg-custom-indigo-bg text-custom-indigo mx-auto flex h-12 w-12 items-center justify-center rounded-2xl dark:bg-slate-800">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-text-title text-lg font-black tracking-tight dark:text-slate-100">
            강사 계약 본인 확인
          </h1>
          <p className="text-text-sub text-xs leading-relaxed font-medium dark:text-slate-400">
            전자계약서 서명 및 본인 확인을 위해 이름과 휴대폰 번호를 입력해 주세요.
          </p>
        </div>

        <CheckMembershipAction token={token} />

        <div className="border-custom-slate-border border-t pt-4 text-center dark:border-slate-800">
          <p className="text-text-side text-[11px] font-medium dark:text-slate-500">
            입력하신 정보는 계약서 본인 대조 및 서명 용도로만 안전하게 활용됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
