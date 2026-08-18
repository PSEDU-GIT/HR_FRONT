import { type AcademyPartyInfo } from '@/app/(afterLogin)/_model/AcademyPartyInfo.model';

export const getAcademyPartyInfoQueryKey = ['academyPartyInfo'];

export const getAcademyPartyInfo = async (): Promise<AcademyPartyInfo | null> => {
  try {
    const res = await fetch('/api/hr/academy/party-info', {
      cache: 'no-store',
    });
    if (!res.ok) {
      return null;
    }
    const json = await res.json();
    if (json?.data) {
      return json.data as AcademyPartyInfo;
    }
    return json as AcademyPartyInfo;
  } catch (error) {
    console.error('getAcademyPartyInfo fetch error:', error);
    return null;
  }
};
