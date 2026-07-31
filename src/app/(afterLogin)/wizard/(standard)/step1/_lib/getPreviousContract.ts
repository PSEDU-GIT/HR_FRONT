export interface ScheduleItem {
  dayOfWeek: string;
  isEnabled: boolean;
  startTime: string;
  endTime: string;
  breakMinutes: number;
}

export interface PreviousContractResponse {
  id: number;
  academyId: string;
  staffId: number;
  pendingStaffName: string;
  pendingStaffPhone: string;
  pendingStaffSubject: string;
  pendingStaffBirthDate: string;
  pendingStaffAddress: string;
  pendingStaffGender: string;
  contractType: string;
  status: string;
  templateVersion: number;
  payType: 'FIXED' | 'PERCENT' | 'HOURLY' | string;
  basePay: number;
  ratioPercent: number;
  hourlyRate: number;
  weeklyWorkHours: number;
  feeAmount: number;
  isWorkHourControlled: boolean;
  isSupervised: boolean;
  specialTerms: string[];
  schedule: ScheduleItem[];
  contractStartDate: string;
  contractEndDate: string;
  probationPeriodMonths: number;
  minGuaranteedAmount: number;
  paymentDay: number;
  nonTaxableMealAllowance: number;
  nonTaxableCarAllowance: number;
  nonCompeteAgreed: boolean;
  nonCompetePeriodMonths: number;
  nonCompeteRadiusKm: number;
  nonCompeteCompensationAmount: number;
  additionalAllowanceEnabled: boolean;
  overtimeAllowance: number;
  positionAllowance: number;
  otherAllowance: number;
  otherAllowanceLabel: string;
}

export const getPreviousContract = async (
  staffId?: number
): Promise<PreviousContractResponse | null> => {
  if (!staffId) return null;
  try {
    const res = await fetch(`/api/hr/contract/previous-conditions/${staffId}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return null;
    }
    const json = await res.json();
    return json?.data || json || null;
  } catch (error) {
    console.error('getPreviousContract error:', error);
    return null;
  }
};
