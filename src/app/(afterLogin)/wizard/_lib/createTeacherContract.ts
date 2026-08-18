export interface SchedulePayload {
  dayOfWeek: string;
  isEnabled: boolean;
  startTime: string;
  endTime: string;
  breakMinutes: number;
}

export interface TeacherContractPayload {
  staffId?: number | null;
  pendingStaffName?: string;
  pendingStaffPhone?: string;
  pendingStaffSubject?: string;
  pendingStaffBirthDate?: string;
  pendingStaffAddress?: string;
  payType: 'FIXED' | 'RATIO' | 'HOURLY' | string;
  basePay: number;
  ratioPercent: number;
  hourlyRate: number;
  weeklyWorkHours: number;
  weeklyHolidayDay?: string;
  specialTerms: string[];
  schedule: SchedulePayload[];
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

export const createTeacherContract = async (payload: TeacherContractPayload) => {
  const res = await fetch('/api/hr/contract/teacher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || errorJson.message || '계약서 생성에 실패했습니다.');
  }

  return await res.json();
};
