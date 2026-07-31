'use client';

import ReadContractDocumentAction from '@/app/(afterLogin)/wizard/(standard)/step4/_action/ReadContractDocument.action';

export default function SummaryContractPreviewArea() {
  return (
    <div className="absolute inset-0 overflow-y-auto">
      <ReadContractDocumentAction />
    </div>
  );
}
