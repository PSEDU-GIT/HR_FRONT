'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import AdvisoryModalCard from '@/app/(afterLogin)/wizard/(standard)/step2/_component/AdvisoryModalCard';
import cx from 'classnames';

export default function ReadLegalAdvisorySub2Action() {
  const { wizDaysConfig, highlightedAdvisoryKey, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
      highlightedAdvisoryKey: state.step2.highlightedAdvisoryKey,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const weeklyHours = parseFloat(
    Object.values(wizDaysConfig)
      .reduce(
        (sum, conf) =>
          sum +
          (conf.enabled ? calculateDailyHours(conf.startTime, conf.endTime, conf.breakTime) : 0),
        0,
      )
      .toFixed(1),
  );

  const isUnder15Hours = weeklyHours < 15;

  return (
    <div className="space-y-3">
      <div className="border-custom-slate-border-side space-y-2 rounded-2xl border bg-white p-4 transition-all">
        <div className="text-text-title text-xs font-extrabold">
          [자문] 소정근로일정 특정의 가치
        </div>
        <p className="text-text-sub text-xs leading-relaxed font-medium">
          요일별 소정근로시간을 수치화하여 명확히 지정해 놓는 과정은 추후 강사와 근로일 증감 합의 및
          수당 계산 시 불필요한 마찰을 완전히 예방할 수 있는 훌륭한 실무입니다.
        </p>
        <p className="text-text-sub text-xs leading-relaxed font-medium">
          근로기준법 제55조에 따라 주당 소정근로시간이 15시간 이상인 경우 매주 1회 이상의
          유급주휴일을 보장하고 주휴수당을 가산하여 지급해야 합니다.
        </p>

        <div className="border-custom-slate-border mt-2 flex flex-wrap gap-2 border-t pt-2">
          <span
            className={cx(
              'inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold',
              isUnder15Hours
                ? 'border-custom-yellow-border bg-custom-yellow-bg text-custom-yellow'
                : 'border-custom-emerald-border bg-custom-emerald-bg text-custom-emerald',
            )}
          >
            주 소정근로시간 {weeklyHours}시간 · {isUnder15Hours ? '초단시간 근로' : '일반 근로'}
          </span>
        </div>
      </div>

      {isUnder15Hours && (
        <AdvisoryModalCard
          layoutId="advisory-card-under15Hours"
          title="[주의] 주휴수당 미지급 (초단시간 근로)"
          isHighlighted={highlightedAdvisoryKey === 'under15Hours'}
          onClose={() => setHighlightAdvisory(null)}
          theme="yellow"
        >
          <p>
            주당 소정근로시간이 15시간 미만(<strong>{weeklyHours}시간</strong>)으로, 법정 주휴수당
            및 퇴직금 지급 의무에서 제외됩니다.
          </p>
          <p className="font-extrabold">실무 유의사항:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              실제 근무시간이 주 15시간 이상으로 확인되는 경우 주휴수당 및 퇴직금 지급 의무가
              연동되어 발생할 수 있습니다.
            </li>
            <li>
              불필요한 쪼개기 계약 의혹이 발생하지 않도록 실제 근무 시간 및 출퇴근 기록을 투명하고
              정확하게 관리하십시오.
            </li>
          </ul>
        </AdvisoryModalCard>
      )}
    </div>
  );
}
