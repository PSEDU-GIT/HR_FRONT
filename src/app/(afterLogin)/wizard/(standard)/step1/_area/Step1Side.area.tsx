import NextStepBtn from '@/app/(afterLogin)/wizard/_component/NextStepBtn';
import PreviousContractHandler from '@/app/(afterLogin)/wizard/(standard)/step1/_handler/PreviousContract.handler';

export default function Step1SideArea() {
  return (
    <aside className="ml-6 w-[540px] shrink-0 space-y-4">
      <NextStepBtn />

      <PreviousContractHandler />

      <div className="border-custom-slate-border-side space-y-2.5 rounded-3xl border bg-white p-5">
        <h4 className="text-13 text-text-title font-bold">선택된 계약서 법적 지침</h4>
        <p className="text-text-sub text-xs leading-relaxed font-semibold">
          현재 선택된 계약 유형은{' '}
          <strong className="text-text-main font-black">강사근로계약서</strong>입니다.
        </p>
        <div className="border-custom-slate-border bg-custom-slate-bg/50 text-text-main space-y-2 rounded-2xl border p-3.5 text-xs">
          <p className="font-extrabold">주요 노무 체크포인트:</p>
          <ul className="text-text-sub list-disc space-y-1 pl-4 leading-relaxed font-semibold">
            <li>근로관계 성립 시 근로기준법상 주휴수당 및 연차휴가 지급 의무 검토가 필요합니다.</li>
            <li>
              향후 2단계에서 입력할 소정근로시간 및 급여 설정에 따라 자동으로 위험 항목을 탐지하여
              실시간 자문이 표시됩니다.
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
