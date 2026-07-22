'use client';

import ClickRecontractAction from '@/app/(afterLogin)/dashboard/_action/ClickRecontract.action';

interface RenewalItem {
  id: string;
  name: string;
  contractTitle: string;
  expireDate: string;
  status: 'expired' | 'expiring';
  statusLabel: string;
}

const RENEWAL_LIST: RenewalItem[] = [
  {
    id: '1',
    name: '이지은',
    contractTitle: '이지은 강사 표준 근로계약서',
    expireDate: '2026-02-28',
    status: 'expired',
    statusLabel: '만료 완료',
  },
  {
    id: '2',
    name: '김철수',
    contractTitle: '김철수 강사 시급 근로계약서',
    expireDate: '2026-03-15',
    status: 'expiring',
    statusLabel: '만료 임박',
  },
  {
    id: '3',
    name: '최수민',
    contractTitle: '최수민 강사 비율제 근로계약서',
    expireDate: '2026-03-31',
    status: 'expiring',
    statusLabel: '만료 임박',
  },
];

export default function ReadRenewalContractsAction() {
  return (
    <div className="border-custom-slate-border-side space-y-4 rounded-3xl border bg-white p-6">
      <div>
        <h3 className="text-13 text-text-title font-bold">갱신 필요 계약서 목록</h3>
      </div>
      <div className="border-custom-slate-border-side overflow-hidden rounded-2xl border bg-white">
        <table className="w-full border-collapse text-left text-xs">
          <thead className="bg-slate-50">
            <tr className="border-custom-slate-border-side text-text-sub border-b text-[11px] font-bold">
              <th className="px-4 py-3">서명 대상자</th>
              <th className="px-4 py-3">계약 문서 명칭</th>
              <th className="px-4 py-3">만료일자</th>
              <th className="px-4 py-3">만료 현황</th>
              <th className="px-4 py-3 text-right">갱신 관리</th>
            </tr>
          </thead>
          <tbody className="divide-custom-slate-border-side divide-y">
            {RENEWAL_LIST.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="text-text-title px-4 py-3 font-bold">{item.name}</td>
                <td className="text-text-main px-4 py-3 font-medium">{item.contractTitle}</td>
                <td className="text-text-side px-4 py-3 font-mono">{item.expireDate}</td>
                <td className="px-4 py-3">
                  {item.status === 'expired' ? (
                    <span className="inline-flex items-center rounded-lg border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-extrabold text-rose-600">
                      {item.statusLabel}
                    </span>
                  ) : (
                    <span className="bg-custom-yellow-bg border-custom-yellow-border text-custom-yellow inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-extrabold">
                      {item.statusLabel}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <ClickRecontractAction instructorName={item.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
