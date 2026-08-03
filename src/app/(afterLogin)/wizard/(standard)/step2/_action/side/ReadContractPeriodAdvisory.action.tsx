'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import {
  calcPeriodDays,
  calcPeriodLabel,
} from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import AdvisoryModalCard from '@/app/(afterLogin)/wizard/(standard)/step2/_component/AdvisoryModalCard';
import cx from 'classnames';

export default function ReadContractPeriodAdvisoryAction() {
  const { wizStartDate, wizEndDate, highlightedAdvisoryKey, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizStartDate: state.step2.wizStartDate,
      wizEndDate: state.step2.wizEndDate,
      highlightedAdvisoryKey: state.step2.highlightedAdvisoryKey,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const periodDays = calcPeriodDays(wizStartDate, wizEndDate);
  const periodLabel = calcPeriodLabel(wizStartDate, wizEndDate);
  const isUnderOneYear = periodDays > 0 && periodDays < 365;

  return (
    <div className="space-y-3">
      <div className="border-custom-slate-border-side dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 rounded-2xl border p-4 transition-all">
        <div className="text-text-title dark:text-slate-100 text-xs font-extrabold">
          [자문] 기간제 근로계약 유효성 가이드
        </div>
        <p className="text-text-sub dark:text-slate-300 text-xs leading-relaxed font-medium">
          기간제법 제4조에 의거, 2년을 초과하여 기간제 근로자(강사)로 사용하는 경우 무기계약
          근로자(정규직)로 간주되어 퇴사 통보 시 해고예고 및 부당해고 구제신청 리스크가 발생합니다.
          총 계약 합산 기간이 2년을 넘지 않도록 세심히 관리하십시오.
        </p>
        {periodDays > 0 && (
          <div className="border-custom-slate-border dark:border-slate-800 mt-2 flex flex-wrap gap-2 border-t pt-2">
            <span
              className={cx(
                'inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold',
                periodDays >= 365
                  ? 'border-custom-emerald-border bg-custom-emerald-bg dark:bg-emerald-950/40 text-custom-emerald dark:text-emerald-300'
                  : 'border-custom-yellow-border bg-custom-yellow-bg dark:bg-amber-950/40 text-custom-yellow dark:text-amber-300',
              )}
            >
              계약기간 {periodLabel}{' '}
              <span className="text-text-side dark:text-slate-400 font-medium">({periodDays}일)</span> ·{' '}
              {periodDays >= 365 ? '퇴직금 의무 있음' : '퇴직금 없음'}
            </span>
          </div>
        )}
      </div>

      {isUnderOneYear && (
        <AdvisoryModalCard
          layoutId="advisory-card-underOneYear"
          title="[주의] 퇴직금 회피 의혹 주의"
          isHighlighted={highlightedAdvisoryKey === 'underOneYear'}
          onClose={() => setHighlightAdvisory(null)}
          theme="yellow"
        >
          <p>
            계약기간을 <strong className="underline">1년 미만</strong>으로 설정하면 퇴직금 지급
            의무가 없습니다.
          </p>
          <p className="font-extrabold">단, 1년 미만 계약을 반복 갱신하는 경우:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              퇴직금 회피 목적으로 간주되어{' '}
              <strong className="underline">퇴직금 지급 의무가 발생</strong>할 수 있습니다.
            </li>
            <li>
              2년 초과 시 기간의 정함이 없는 계약{' '}
              <strong className="underline">(무기계약)으로 전환</strong>
              됩니다.
            </li>
          </ul>
        </AdvisoryModalCard>
      )}
    </div>
  );
}
