export type ContractType = 'TEACHER' | 'FREELANCER' | 'GENERAL_STAFF';
export type ContractArchiveStatus = 'DRAFT' | 'SENT' | 'SIGNED' | 'DESTROYED';

export interface ContractArchiveItem {
  id: number;
  contractType: ContractType;
  status: ContractArchiveStatus;
  staffId: number | null;
  pendingStaffName: string | null;
  counterpartyName?: string | null;
  counterpartyPhone?: string | null;
  phone?: string | null;
  documentVersion: number;
  signatureImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContractPaging {
  page: number;
  size: number;
  totalCount: number;
  hasNext: boolean;
}

export interface CounterpartyItem {
  staffId: number;
  name: string;
  phone: string;
}

export interface ContractArchiveResponse {
  contracts: ContractArchiveItem[];
  paging: ContractPaging;
  counterparties?: CounterpartyItem[];
}

