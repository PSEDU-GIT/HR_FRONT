import { type Instructor } from '@/app/(afterLogin)/wizard/(standard)/step1/_model/Instructor.model';

export const getInstructors = async (): Promise<Instructor[]> => {
  try {
    const res = await fetch('/api/hr/contract/existing-teachers', { cache: 'no-store' });

    if (!res.ok) {
      return [];
    }
    const json = await res.json();
    if (Array.isArray(json?.data)) {
      return json.data
        .filter((item: any) => item.phone && item.phone.trim() !== '')
        .map((item: any) => ({
          staffId: Number(item.staffId),
          name: item.name,
          phone: item.phone,
          gender: item.gender ?? null,
          birthDate: item.birthDate ?? item.birth ?? null,
          address: item.address ?? null,
          hasContractHistory: item.hasContractHistory ?? false,
        }));
    }
    return [];
  } catch (error) {
    console.error('getInstructors fetch error:', error);
    return [];
  }
};
