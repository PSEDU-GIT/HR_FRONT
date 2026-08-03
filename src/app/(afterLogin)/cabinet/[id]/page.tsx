import ClickBackToCabinetAction from './_action/ClickBackToCabinet.action';
import CabinetDetailContractArea from './_area/CabinetDetailContract.area';
import CabinetDetailTimelineArea from './_area/CabinetDetailTimeline.area';

export default function CabinetDetailPage() {
  return (
    <div className="flex h-full w-full flex-col space-y-5 pt-6">
      <ClickBackToCabinetAction />

      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
        <CabinetDetailContractArea />
        <CabinetDetailTimelineArea />
      </div>
    </div>
  );
}
