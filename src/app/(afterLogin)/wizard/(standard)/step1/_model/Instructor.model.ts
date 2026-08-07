export interface Instructor {
  staffId: number;
  name: string;
  phone: string;
  subject?: string;
  birthDate?: string | null;
  birth?: string;
  address?: string | null;
  hasContractHistory?: boolean;
}
