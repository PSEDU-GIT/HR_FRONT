import SummaryContractPreviewArea from './_area/SummaryContractPreview.area';
import SummaryHeaderActionArea from './_area/SummaryHeaderAction.area';

export default function SummaryPreviewPage() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <SummaryHeaderActionArea />
      <div className="relative flex-1">
        <SummaryContractPreviewArea />
      </div>
    </div>
  );
}
