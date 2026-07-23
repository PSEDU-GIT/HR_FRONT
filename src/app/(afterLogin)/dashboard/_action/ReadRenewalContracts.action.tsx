'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Edit3, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface RenewalItem {
  id: string;
  name: string;
  phone: string;
  startDate: string;
  expireDate: string;
  dDay: string;
  contractTitle: string;
  status: 'expired' | 'expiring';
  statusLabel: string;
}

const RENEWAL_LIST: RenewalItem[] = [
  {
    id: '1',
    name: '이지은',
    phone: '010-1234-5678',
    startDate: '2025-03-01',
    expireDate: '2026-02-28',
    dDay: '만료됨',
    contractTitle: '이지은 강사 표준 근로계약서',
    status: 'expired',
    statusLabel: '만료 완료',
  },
  {
    id: '2',
    name: '김철수',
    phone: '010-2345-6789',
    startDate: '2025-03-16',
    expireDate: '2026-03-15',
    dDay: 'D-15',
    contractTitle: '김철수 강사 시급 근로계약서',
    status: 'expiring',
    statusLabel: '만료 임박',
  },
  {
    id: '3',
    name: '최수민',
    phone: '010-3456-7890',
    startDate: '2025-04-01',
    expireDate: '2026-03-31',
    dDay: 'D-30',
    contractTitle: '최수민 강사 비율제 근로계약서',
    status: 'expiring',
    statusLabel: '만료 임박',
  },
];

export default function ReadRenewalContractsAction() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'expiring' | 'expired'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const counts = {
    all: RENEWAL_LIST.length,
    expiring: RENEWAL_LIST.filter((i) => i.status === 'expiring').length,
    expired: RENEWAL_LIST.filter((i) => i.status === 'expired').length,
  };

  const filteredList = RENEWAL_LIST.filter((item) => {
    const matchesTab = activeTab === 'all' || item.status === activeTab;
    const matchesSearch =
      item.name.includes(searchQuery) ||
      item.phone.includes(searchQuery) ||
      item.contractTitle.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const handleRecontract = () => {
    router.push('/wizard/step1');
  };

  return (
    <section className="border-custom-slate-border flex w-full flex-col gap-6 rounded-2xl border bg-white p-6 text-sm">
      <h3 className="font-bold text-neutral-900 text-base">갱신 필요 계약서</h3>

      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-full sm:w-64">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="강사명 또는 연락처 검색..."
              className="h-9 w-full rounded-lg border border-gray-200 bg-white pr-3 pl-9 text-sm text-neutral-900 transition-colors outline-none placeholder:text-gray-400 focus:border-gray-400"
            />
          </div>
        </div>
        <Link
          href="/wizard/step1"
          className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-indigo-700"
        >
          새 계약서 작성
        </Link>
      </header>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 font-bold text-neutral-900">
              <th className="px-3 py-3.5">서명 대상자</th>
              <th className="px-3 py-3.5">계약일</th>
              <th className="px-3 py-3.5">만료 잔여일</th>
              <th className="px-3 py-3.5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center font-medium text-gray-400">
                  검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              filteredList.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-gray-50/60">
                  <td className="px-3 py-4">
                    <span className="font-bold text-neutral-900">{item.name}</span>
                    <span className="ml-2 text-xs font-normal text-gray-500">({item.phone})</span>
                  </td>
                  <td className="px-3 py-4 font-semibold text-neutral-800">
                    {item.startDate} ~ {item.expireDate}
                  </td>
                  <td className="px-3 py-4">
                    {item.status === 'expired' ? (
                      <span className="inline-flex items-center justify-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-500 border border-rose-200">
                        {item.dDay}
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-600 border border-amber-200">
                        {item.dDay}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={handleRecontract}
                        title="재계약 작성"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2 text-sm font-medium text-gray-500">
        <div className="flex items-center gap-1.5">
          <span>Show</span>
          <select className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-bold text-neutral-900 outline-none">
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
          <span>per page</span>
        </div>

        <div className="flex items-center gap-3">
          <span>
            1-{filteredList.length} of {RENEWAL_LIST.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded text-gray-400 transition-colors hover:text-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50 text-xs font-bold text-indigo-600 border border-indigo-100">
              1
            </span>
            <button
              type="button"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded text-gray-400 transition-colors hover:text-gray-700"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
