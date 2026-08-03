'use client';

import SummaryInstructorInfoCardAction from '../_action/SummaryInstructorInfoCard.action';
import SummaryPeriodCardAction from '../_action/SummaryPeriodCard.action';
import SummaryScheduleCardAction from '../_action/SummaryScheduleCard.action';
import SummarySalaryCardAction from '../_action/SummarySalaryCard.action';
import SummaryAllowanceCardAction from '../_action/SummaryAllowanceCard.action';
import SummarySpecialTermsCardAction from '../_action/SummarySpecialTermsCard.action';

export default function StepSummaryArea() {
  return (
    <div className="flex-1 space-y-5 pb-12">
      <SummaryInstructorInfoCardAction />
      <SummaryPeriodCardAction />
      <SummaryScheduleCardAction />
      <SummarySalaryCardAction />
      <SummaryAllowanceCardAction />
      <SummarySpecialTermsCardAction />
    </div>
  );
}
