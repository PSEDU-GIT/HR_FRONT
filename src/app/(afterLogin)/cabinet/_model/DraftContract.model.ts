import { ContractType } from './ContractArchive.model';

export interface DraftContractItem {
  id: number;
  contractType: ContractType;
  counterpartyName: string | null;
  counterpartyPhone: string | null;
  updatedAt: string;
  createdByStaffId: number;
  createdByName: string;
}
