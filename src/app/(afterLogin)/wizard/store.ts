import { create } from 'zustand';

interface Step1State {
  instructorName: string;
  instructorPhone: string;
  instructorSubject: string;
  instructorBirth: string;
  instructorAddress: string;
  contractType: string;
  isNewInstructor: boolean;
}

export type DaysConfig = {
  [key: string]: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    breakTime: string;
  };
};

export type SalaryType = 'monthly' | 'commission' | 'hourly';

export interface Step2State {
  wizSubStep: 1 | 2 | 3 | 4;
  maxUnlockedSubStep: 1 | 2 | 3;

  wizStartDate: string;
  wizEndDate: string;
  wizProbation: string;

  wizWorkDaysType: '5days' | '3days' | 'custom';
  wizScheduleApplied: boolean;
  wizDaysConfig: DaysConfig;
  selectedBatchDays: string[];
  batchStartTime: string;
  batchEndTime: string;
  batchBreakTime: string;
  editingDay: string | null;

  wizSalaryType: SalaryType;
  wizSalaryApplied: boolean;
  wizSalaryDone: boolean;
  wizSalaryAmount: number;
  wizHourlyRate: number;
  wizCommissionRate: number;
  wizMinGuaranteeAmount: number;
  wizIsCustomCommission: boolean;
  wizSalarySubStep: 1 | 2 | 3 | 4 | 5 | 6;
  maxUnlockedSalarySubStep: 1 | 2 | 3 | 4 | 5 | 6;
  wizHasTaxFree: boolean;
  wizNonTaxFood: number;
  wizHasCarAllowance: boolean;
  wizNonTaxCar: number;
  wizPayDay: string;
  wizHasExtraAllowance: boolean;
  wizOvertimeAllowance: number;
  wizPositionAllowance: number;
  wizOtherAllowance: number;
  wizOtherAllowanceName: string;
  wizHasNonCompete: boolean;
  wizNonCompetePeriod: string;
  wizNonCompeteRange: string;
  wizNonCompeteAmount: number;

  highlightedAdvisoryKey: string | null;
}

interface Step3State {
  selectedTemplates: string[];
  customTerms: string;
}

interface Step4State {
  recipientPhone: string;
}

interface WizardState {
  step1: Step1State;
  step2: Step2State;
  step3: Step3State;
  step4: Step4State;

  setStep1: (data: Partial<Step1State>) => void;
  setStep2: (data: Partial<Step2State> | ((prev: Step2State) => Partial<Step2State>)) => void;
  setStep3: (data: Partial<Step3State>) => void;
  setStep4: (data: Partial<Step4State>) => void;
  setHighlightAdvisory: (key: string | null) => void;
  reset: () => void;
}

const initialStep1: Step1State = {
  instructorName: '',
  instructorPhone: '',
  instructorSubject: '',
  instructorBirth: '',
  instructorAddress: '',
  contractType: '강사근로계약서',
  isNewInstructor: false,
};

const initialDaysConfig: DaysConfig = {
  월요일: { enabled: true, startTime: '09:00', endTime: '18:00', breakTime: '1시간' },
  화요일: { enabled: true, startTime: '09:00', endTime: '18:00', breakTime: '1시간' },
  수요일: { enabled: true, startTime: '09:00', endTime: '18:00', breakTime: '1시간' },
  목요일: { enabled: true, startTime: '09:00', endTime: '18:00', breakTime: '1시간' },
  금요일: { enabled: true, startTime: '09:00', endTime: '18:00', breakTime: '1시간' },
  토요일: { enabled: false, startTime: '09:00', endTime: '18:00', breakTime: '1시간' },
  일요일: { enabled: false, startTime: '09:00', endTime: '18:00', breakTime: '1시간' },
};

const initialStep2: Step2State = {
  wizSubStep: 1,
  maxUnlockedSubStep: 1,

  wizStartDate: '2026-07-20',
  wizEndDate: '2027-07-19',
  wizProbation: '3개월',

  wizWorkDaysType: '5days',
  wizScheduleApplied: false,
  wizDaysConfig: initialDaysConfig,
  selectedBatchDays: ['월요일', '화요일', '수요일', '목요일', '금요일'],
  batchStartTime: '09:00',
  batchEndTime: '18:00',
  batchBreakTime: '1시간',
  editingDay: null,

  wizSalaryType: 'monthly',
  wizSalaryApplied: true,
  wizSalaryDone: false,
  wizSalaryAmount: 2500000,
  wizHourlyRate: 10320,
  wizCommissionRate: 20,
  wizMinGuaranteeAmount: 1883297,
  wizIsCustomCommission: false,
  wizSalarySubStep: 1,
  maxUnlockedSalarySubStep: 1,
  wizHasTaxFree: true,
  wizNonTaxFood: 200000,
  wizHasCarAllowance: false,
  wizNonTaxCar: 0,
  wizPayDay: '10일',
  wizHasExtraAllowance: false,
  wizOvertimeAllowance: 0,
  wizPositionAllowance: 0,
  wizOtherAllowance: 0,
  wizOtherAllowanceName: '',
  wizHasNonCompete: false,
  wizNonCompetePeriod: '6개월',
  wizNonCompeteRange: '반경 3km',
  wizNonCompeteAmount: 240000,

  highlightedAdvisoryKey: null,
};

const initialStep3: Step3State = {
  selectedTemplates: ['비밀유지 및 지식재산권 귀속', '경업금지 및 고객 유인 금지'],
  customTerms: '',
};

const initialStep4: Step4State = {
  recipientPhone: '010-8273-0192',
};

export const useWizardStore = create<WizardState>((set) => ({
  step1: initialStep1,
  step2: initialStep2,
  step3: initialStep3,
  step4: initialStep4,

  setStep1: (data) =>
    set((state) => ({
      step1: { ...state.step1, ...data },
    })),

  setStep2: (data) =>
    set((state) => ({
      step2: {
        ...state.step2,
        ...(typeof data === 'function' ? data(state.step2) : data),
      },
    })),

  setStep3: (data) =>
    set((state) => ({
      step3: { ...state.step3, ...data },
    })),

  setStep4: (data) =>
    set((state) => ({
      step4: { ...state.step4, ...data },
    })),

  setHighlightAdvisory: (key) => {
    set((state) => ({
      step2: { ...state.step2, highlightedAdvisoryKey: key },
    }));
  },

  reset: () =>
    set({
      step1: initialStep1,
      step2: initialStep2,
      step3: initialStep3,
      step4: initialStep4,
    }),
}));
