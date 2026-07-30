export interface RenewalContractItem {
  hrDocumentId: number;
  signerName: string;
  signerPhone: string;
  contractStartDate: string;
  contractEndDate: string;
  remainingDays: number;
}

export interface RenewalPaging {
  page: number;
  size: number;
  totalCount: number;
  hasNext: boolean;
}

export interface RenewalContractsResponse {
  contracts: RenewalContractItem[];
  paging: RenewalPaging;
}
