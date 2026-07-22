'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface RiskItem {
  id: string;
  type: 'danger' | 'warning' | 'safe';
  title: string;
  description: string;
}

export default function ReadLegalRiskAnalysisAction() {
  const { customTerms, selectedTemplates } = useWizardStore(
    useShallow((state) => ({
      customTerms: state.step3.customTerms,
      selectedTemplates: state.step3.selectedTemplates,
    })),
  );

  const risks: RiskItem[] = [];

  // Analyze customTerms
  if (customTerms.includes('벌금') || customTerms.includes('공제')) {
    risks.push({
      id: 'penalty',
      type: 'danger',
      title: '위약 예정 금지 위반 위험 (벌금/공제 조항)',
      description:
        '근로기준법 제20조에 의거, 지각·결석 시 손해배상액이나 벌금을 미리 정하여 임금에서 공제하는 약정은 무효이며 형사처벌 대상이 됩니다.',
    });
  }

  if (customTerms.includes('퇴직금') && (customTerms.includes('포기') || customTerms.includes('요구하지'))) {
    risks.push({
      id: 'severance',
      type: 'danger',
      title: '퇴직금 포기 약정 무효 위험',
      description:
        '근로자퇴직급여 보장법상 퇴직 발생 전 사전 퇴직금 포기 합의는 무효이며, 퇴직 시 법정 퇴직금 청구권이 그대로 발생합니다.',
    });
  }

  if (customTerms.includes('무급') || (customTerms.includes('준비') && customTerms.includes('무급'))) {
    risks.push({
      id: 'unpaidTime',
      type: 'danger',
      title: '근로시간 산정 위반 (무급 준비/회의)',
      description:
        '근로기준법 제50조에 의거, 사업주의 지휘·감독 하에 이루어지는 수업 준비 및 회의 시간은 근로시간에 포함되어 유급 정산되어야 합니다.',
    });
  }

  if (
    customTerms.includes('10km') ||
    customTerms.includes('3년') ||
    customTerms.includes('5,000만') ||
    customTerms.includes('위약금')
  ) {
    risks.push({
      id: 'overCompete',
      type: 'warning',
      title: '과도한 경업금지 및 위약금 설정 주의',
      description:
        '과도한 지역(10km 이상)이나 기간(3년 이상), 과도한 위약금 설정은 직업선택의 자유를 침해하여 민법 제103조상 무효 판단을 받을 가능성이 높습니다.',
    });
  }

  // Template feedback
  if (selectedTemplates.includes('비밀유지 및 지식재산권 귀속')) {
    risks.push({
      id: 'ipSafe',
      type: 'safe',
      title: '저작권 및 비밀유지 조항 안전성 확인',
      description:
        '비밀유지 및 지식재산권 귀속 조항은 학원 표준 기준을 충족하여 법적으로 안전합니다.',
    });
  }

  if (selectedTemplates.includes('경업금지 및 고객 유인 금지') && !risks.some((r) => r.id === 'overCompete')) {
    risks.push({
      id: 'competeGuide',
      type: 'warning',
      title: '경업금지 약정 유효성 가이드',
      description:
        '경업금지 조항은 실무상 반경 3km 이내, 6개월 이내로 정하고 대가성이 인정될 때 유효성이 확보됩니다.',
    });
  }

  return (
    <div className="border-custom-slate-border space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
      <div className="border-custom-slate-border flex items-center justify-between border-b pb-3">
        <h4 className="text-text-main text-xs font-extrabold flex items-center gap-1.5">
          <ShieldAlert className="h-4 w-4 text-custom-indigo" />
          <span>실시간 계약 위험 검토</span>
        </h4>
        <span className="text-text-side text-[11px] font-bold">
          검토 결과 {risks.length}건
        </span>
      </div>

      <div className="space-y-3">
        {risks.length === 0 ? (
          <div className="border-custom-emerald-border bg-custom-emerald-bg/50 rounded-2xl border p-4 space-y-1.5">
            <h5 className="text-custom-emerald text-xs font-extrabold flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>특약 안전성 확인됨</span>
            </h5>
            <p className="text-text-sub text-[11px] leading-relaxed font-medium">
              현재 작성된 특약 사항에서 법적 독소 조항이 감지되지 않았습니다.
            </p>
          </div>
        ) : (
          risks.map((risk) => (
            <div
              key={risk.id}
              className={
                risk.type === 'danger'
                  ? 'border-rose-200 bg-rose-50/70 rounded-2xl border p-4 space-y-1.5'
                  : risk.type === 'warning'
                    ? 'border-custom-yellow-border bg-custom-yellow-bg/70 rounded-2xl border p-4 space-y-1.5'
                    : 'border-custom-emerald-border bg-custom-emerald-bg/70 rounded-2xl border p-4 space-y-1.5'
              }
            >
              <h5
                className={
                  risk.type === 'danger'
                    ? 'text-rose-800 text-xs font-extrabold flex items-center gap-1'
                    : risk.type === 'warning'
                      ? 'text-custom-yellow text-xs font-extrabold flex items-center gap-1'
                      : 'text-custom-emerald text-xs font-extrabold flex items-center gap-1'
                }
              >
                {risk.type === 'danger' && <AlertTriangle className="h-3.5 w-3.5 shrink-0" />}
                {risk.type === 'warning' && <AlertTriangle className="h-3.5 w-3.5 shrink-0" />}
                {risk.type === 'safe' && <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />}
                <span>{risk.title}</span>
              </h5>
              <p
                className={
                  risk.type === 'danger'
                    ? 'text-rose-700 text-[11px] leading-relaxed font-medium'
                    : risk.type === 'warning'
                      ? 'text-text-main text-[11px] leading-relaxed font-medium'
                      : 'text-custom-emerald text-[11px] leading-relaxed font-medium'
                }
              >
                {risk.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
