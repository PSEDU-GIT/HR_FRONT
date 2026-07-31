export interface Instructor {
  staffId: number;
  name: string;
  phone: string;
  gender?: 'MALE' | 'FEMALE' | null;
  subject?: string;
  birth?: string;
  address?: string;
  hasContractHistory?: boolean;
}
