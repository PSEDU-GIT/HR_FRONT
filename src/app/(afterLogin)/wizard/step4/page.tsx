import Step4ContractPreviewArea from './_area/Step4ContractPreview.area';
import Step4HeaderActionArea from './_area/Step4HeaderAction.area';

export default function WizardStep4Page() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <Step4HeaderActionArea />
      <div className="relative flex-1">
        <Step4ContractPreviewArea />
      </div>
    </div>
  );
}
