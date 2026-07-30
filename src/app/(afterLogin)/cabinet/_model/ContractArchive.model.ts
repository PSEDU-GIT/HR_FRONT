export type ContractType = 'TEACHER' | 'FREELANCER' | 'GENERAL_STAFF';
export type ContractArchiveStatus = 'DRAFT' | 'SENT' | 'SIGNED' | 'DESTROYED';

export interface ContractArchiveItem {
  id: number;
  contractType: ContractType;
  status: ContractArchiveStatus;
  staffId: number | null;
  pendingStaffName: string | null;
  phone?: string | null;
  documentVersion: number;
  signatureImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
