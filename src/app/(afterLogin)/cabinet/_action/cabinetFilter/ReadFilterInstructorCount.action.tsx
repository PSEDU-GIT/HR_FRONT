'use client';

import { useContractArchiveState } from '@/app/(afterLogin)/cabinet/_state/getContractArchive.state';

export default function ReadFilterInstructorCountAction() {
  const { totalInstructorCount } = useContractArchiveState();

  return <span className="text-text-side text-11 font-bold">총 {totalInstructorCount}명</span>;
}
