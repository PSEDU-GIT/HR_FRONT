export interface Instructor {
  staffId: number;
  name: string;
  phone: string;
  gender?: 'MALE' | 'FEMALE' | null;
  subject?: string;
  birthDate?: string | null;
  birth?: string;
  address?: string | null;
  hasContractHistory?: boolean;
}
