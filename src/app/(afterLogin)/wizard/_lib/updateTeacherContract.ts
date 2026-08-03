import { SchedulePayload } from './createTeacherContract';

export interface UpdateTeacherContractPayload {
  contractId: number;
  pendingStaffName?: string;
  pendingStaffPhone?: string;
  pendingStaffSubject?: string;
  pendingStaffBirthDate?: string;
  pendingStaffAddress?: string;
  pendingStaffGender?: string;
  payType: 'FIXED' | 'PERCENT' | 'HOURLY' | string;
  basePay: number;
  ratioPercent: number;
  hourlyRate: number;
  weeklyWorkHours: number;
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
  draftId?: number;
}

export const updateTeacherContract = async ({
  contractId,
  ...payload
}: UpdateTeacherContractPayload) => {
  const res = await fetch(`/api/hr/contract/teacher/${contractId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || errorJson.message || '계약서 수정에 실패했습니다.');
  }

  return await res.json();
};
