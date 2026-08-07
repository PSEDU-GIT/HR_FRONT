export interface ContractScheduleItem {
  dayOfWeek: string;
  isEnabled: boolean;
  startTime: string;
  endTime: string;
  breakMinutes: number;
}

export interface ContractDetailResponse {
  id: number;
  academyId: string;
  staffId: number;
  pendingStaffName: string;
  pendingStaffPhone: string;
  pendingStaffSubject: string;
  pendingStaffBirthDate: string;
  pendingStaffAddress: string;
  contractType: string;
  status: string;
  templateVersion: number;
  payType: string;
  basePay: number;
  ratioPercent: number;
  hourlyRate: number;
  weeklyWorkHours: number;
  feeAmount: number;
  isWorkHourControlled: boolean;
  isSupervised: boolean;
  specialTerms: string[];
  schedule: ContractScheduleItem[];
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
