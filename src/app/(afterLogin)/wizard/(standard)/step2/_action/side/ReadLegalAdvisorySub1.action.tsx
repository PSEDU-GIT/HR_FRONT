'use client';

import ReadContractPeriodAdvisoryAction from './ReadContractPeriodAdvisory.action';
import ReadProbationAdvisoryAction from './ReadProbationAdvisory.action';

export default function ReadLegalAdvisorySub1Action() {
  return (
    <div className="space-y-4">
      <ReadContractPeriodAdvisoryAction />
      <ReadProbationAdvisoryAction />
    </div>
  );
}
