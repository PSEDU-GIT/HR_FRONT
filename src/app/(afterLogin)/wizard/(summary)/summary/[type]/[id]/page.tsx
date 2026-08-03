import LoadProvider from './_provider/Load.provider';
import StepSummaryArea from './_area/StepSummary.area';
import StepSummarySideArea from './_area/StepSummarySide.area';

export default function WizardSummaryDynamicPage() {
  return (
    <LoadProvider>
      <div className="flex items-start">
        <StepSummaryArea />
        <StepSummarySideArea />
      </div>
    </LoadProvider>
  );
}
