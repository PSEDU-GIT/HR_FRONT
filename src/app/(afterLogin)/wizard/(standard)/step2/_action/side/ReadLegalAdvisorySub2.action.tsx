'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import AdvisoryModalCard from '@/app/(afterLogin)/wizard/(standard)/step2/_component/AdvisoryModalCard';
import { useContractRiskRulesState } from '@/app/(afterLogin)/wizard/(standard)/step3/_state/getContractRiskRules.state';
import cx from 'classnames';

export default function ReadLegalAdvisorySub2Action() {
  const { wizDaysConfig = {}, wizWeeklyHoliday, highlightedAdvisoryKey, setHighlightAdvisory } =
    useWizardStore(
      useShallow((state) => ({
        wizDaysConfig: state.step2.wizDaysConfig,
        wizWeeklyHoliday: state.step2.wizWeeklyHoliday,
        highlightedAdvisoryKey: state.step2.highlightedAdvisoryKey,
        setHighlightAdvisory: state.setHighlightAdvisory,
      })),
    );

  const { riskRules } = useContractRiskRulesState('TEACHER');
  const shortTimeRule = riskRules?.find((r) => r.ruleType === 'SHORT_TIME_WORKER_RISK');

  const weeklyHours = parseFloat(
    Object.values(wizDaysConfig || {})
      .reduce(
        (sum, conf) =>
          sum +
          (conf?.enabled ? calculateDailyHours(conf.startTime, conf.endTime, conf.breakTime) : 0),
        0,
      )
      .toFixed(1),
  );

  const isUnder15Hours = weeklyHours < 15;
  const hasNoWeeklyHoliday =
    !wizWeeklyHoliday || wizDaysConfig[wizWeeklyHoliday]?.enabled === true;

  const advisoryTitle = shortTimeRule?.advisoryTitle;
  const advisoryDescription = shortTimeRule?.advisoryDescriptionMarkdown;
  const warningMessage = shortTimeRule?.messageFail;

  return (
    <div className="space-y-3">
      {advisoryTitle && (
        <div className="border-custom-slate-border-side space-y-2 rounded-2xl border bg-white p-4 transition-all dark:border-slate-800 dark:bg-slate-900">
          <div className="text-text-title text-xs font-extrabold dark:text-slate-100">
            {advisoryTitle}
          </div>
          {advisoryDescription && (
            <p className="text-text-sub text-xs leading-relaxed font-medium whitespace-pre-line dark:text-slate-300">
              {advisoryDescription}
            </p>
          )}

          <div className="border-custom-slate-border mt-2 flex flex-wrap gap-2 border-t pt-2 dark:border-slate-800">
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
      )}

      {/* 주휴일 미지정 법정 위험 자문 카드 */}
      {hasNoWeeklyHoliday && (
        <AdvisoryModalCard
          layoutId="advisory-card-noWeeklyHoliday"
          title="[위험] 유급주휴일 미지정 (근로기준법 위반)"
          isHighlighted={highlightedAdvisoryKey === 'noWeeklyHoliday'}
          onClose={() => setHighlightAdvisory(null)}
          theme="danger"
        >
          <p className="leading-relaxed whitespace-pre-line font-medium text-xs">
            근로기준법 제55조(휴일)에 따라 1주일에 평균 1회 이상의 유급주휴일을 반드시 부여해야 합니다. OFF 상태인 휴무일 카드 중 하나를 클릭하여 유급주휴일로 지정해 주세요.
          </p>
        </AdvisoryModalCard>
      )}

      {isUnder15Hours && warningMessage && (
        <AdvisoryModalCard
          layoutId="advisory-card-under15Hours"
          title="[주의] 주휴수당 미지급 (초단시간 근로)"
          isHighlighted={highlightedAdvisoryKey === 'under15Hours'}
          onClose={() => setHighlightAdvisory(null)}
          theme="yellow"
        >
          <p className="leading-relaxed whitespace-pre-line">{warningMessage}</p>
        </AdvisoryModalCard>
      )}
    </div>
  );
}
