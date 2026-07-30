'use client';

import Link from 'next/link';

export default function ClickCreateNewContractAction() {
  return (
    <Link
      href="/wizard/step1"
      className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-indigo-700"
    >
      새 계약서 작성
    </Link>
  );
}
