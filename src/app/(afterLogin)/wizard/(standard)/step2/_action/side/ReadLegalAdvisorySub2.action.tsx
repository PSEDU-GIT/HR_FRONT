'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calculateScheduleHours, checkBreakTimeViolations } from '@/app/(afterLogin)/wizard/_lib/wageEngine';
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

  const { weeklyHours, weeklyOvertimeHours } = calculateScheduleHours(wizDaysConfig);
  const breakViolations = checkBreakTimeViolations(wizDaysConfig);
  const hasBreakViolation = breakViolations.length > 0;

  const isUnder15Hours = weeklyHours < 15;
  const hasNoWeeklyHoliday =
    !wizWeeklyHoliday || wizDaysConfig[wizWeeklyHoliday]?.enabled === true;

  const advisoryTitle = shortTimeRule?.advisoryTitle;
  const advisoryDescription = shortTimeRule?.advisoryDescriptionMarkdown;
  const warningMessage = shortTimeRule?.messageFail;

  return (
    <div className="space-y-3">
      {advisoryTitle && (
        <div className="border-custom-slate-border-side bg-background space-y-2 rounded-2xl border p-4 transition-all">
          <div className="text-text-title text-xs font-extrabold">
            {advisoryTitle}
          </div>
          {advisoryDescription && (
            <p className="text-text-sub text-xs leading-relaxed font-medium whitespace-pre-line">
              {advisoryDescription}
            </p>
          )}

          <div className="border-custom-slate-border mt-2 flex flex-wrap gap-2 border-t pt-2">
            <span
              className={cx(
                'inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-11 font-semibold',
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

      {/* 연장근로 발생 자문 카드 */}
      {weeklyOvertimeHours > 0 && (
        <AdvisoryModalCard
          layoutId="advisory-card-overtimeHours"
          title={`[안내] 주 연장근로 ${weeklyOvertimeHours}시간 발생 (연장근로수당 적용)`}
          isHighlighted={highlightedAdvisoryKey === 'overtimeHours'}
          onClose={() => setHighlightAdvisory(null)}
          theme="default"
        >
          <p className="leading-relaxed whitespace-pre-line text-xs font-medium">
            1일 8시간 또는 1주 40시간을 초과한 근무시간(주 {weeklyOvertimeHours}시간)은 법정 연장근로에 해당합니다.
            급여 및 수당 설정 시 연장근로수당(포괄연장)으로 자동 반영됩니다.
          </p>
        </AdvisoryModalCard>
      )}

      {/* 법정 휴게시간 미달 위험 자문 카드 */}
      {hasBreakViolation && (
        <AdvisoryModalCard
          layoutId="advisory-card-invalidBreakTime"
          title="[위험] 법정 휴게시간 미달 (근로기준법 위반)"
          isHighlighted={highlightedAdvisoryKey === 'invalidBreakTime'}
          onClose={() => setHighlightAdvisory(null)}
          theme="danger"
        >
          <div className="space-y-1.5 text-xs font-medium leading-relaxed">
            <p className="whitespace-pre-line">
              근로기준법 제54조(휴게)에 따라 근로시간이 4시간인 경우에는 30분 이상, 8시간인 경우에는 1시간 이상의 휴게시간을 근로시간 도중에 부여해야 합니다. 위반 시 2년 이하의 징역 또는 2천만원 이하의 벌금 대상이 됩니다.
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4">
              {breakViolations.map((v, i) => (
                <li key={i}>{v.message}</li>
              ))}
            </ul>
          </div>
        </AdvisoryModalCard>
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
