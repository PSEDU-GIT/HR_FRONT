import StepSummaryArea from './_area/StepSummary.area';
import StepSummarySideArea from './_area/StepSummarySide.area';

export default function WizardSummaryPage() {
  return (
    <div className="flex items-start">
      <StepSummaryArea />
      <StepSummarySideArea />
    </div>
  );
}
