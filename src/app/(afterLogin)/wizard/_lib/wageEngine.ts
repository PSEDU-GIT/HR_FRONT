export const LEGAL_STANDARDS = {
  RULESET_VERSION: '2026.01',
  YEAR: 2026,
  MIN_HOURLY_WAGE: 10320,
  MIN_MONTHLY_WAGE: 2156880, // 10,320원 * 209시간
  WEEKLY_HOLIDAY_THRESHOLD: 15,
  MAX_DAILY_HOURS: 8,
  MAX_WEEKLY_HOURS: 40,
  MAX_OVERTIME_HOURS: 12,
  MAX_TOTAL_WEEKLY: 52,
  STANDARD_WEEKLY_HOURS: 40,
  STANDARD_DAILY_HOURS: 8,
  OVERTIME_RATE: 1.5, // 5인 이상
  NIGHT_RATE: 0.5, // 5인 이상 (22시~06시)
  NO_PREMIUM_RATE: 1.0, // 5인 미만
  FIVE_EMPLOYEE_THRESHOLD: 5,
  WEEKS_PER_MONTH: 4.345, // 월 환산 상수 (4.345)
} as const;

export interface DailyScheduleInput {
  enabled: boolean;
  startTime: string;
  endTime: string;
  breakTime: string;
}

export function parseBreakMinutes(breakStr: string): number {
  if (breakStr === '30분') return 30;
  if (breakStr === '1시간') return 60;
  if (breakStr === '1.5시간') return 90;
  if (breakStr === '2시간') return 120;
  return 0;
}

export function calculateDailyTime(start: string, end: string, breakStr: string) {
  if (!start || !end) {
    return { grossMinutes: 0, actualHours: 0, standardHours: 0, overtimeHours: 0, nightHours: 0 };
  }
  const [sH, sM] = start.split(':').map(Number);
  const [eH, eM] = end.split(':').map(Number);
  let startMin = sH * 60 + sM;
  let endMin = eH * 60 + eM;
  if (endMin < startMin) endMin += 24 * 60; // 익일 종료

  const grossMinutes = endMin - startMin;
  const breakMinutes = parseBreakMinutes(breakStr);
  const actualMinutes = Math.max(0, grossMinutes - breakMinutes);
  const actualHours = Math.floor((actualMinutes / 60) * 100) / 100;

  // 일 소정 8시간 상한 분리
  const standardHours = Math.min(actualHours, LEGAL_STANDARDS.MAX_DAILY_HOURS);
  const overtimeHours = Math.max(0, actualHours - LEGAL_STANDARDS.MAX_DAILY_HOURS);

  // 야간 근로 (22:00 ~ 06:00) 겹침 산출
  let nightMinutes = 0;
  for (let m = startMin; m < endMin; m++) {
    const clockM = m % (24 * 60);
    if (clockM >= 22 * 60 || clockM < 6 * 60) {
      nightMinutes++;
    }
  }
  const nightHours = Math.floor((nightMinutes / 60) * 100) / 100;

  return { grossMinutes, actualHours, standardHours, overtimeHours, nightHours };
}

export interface BreakTimeViolation {
  day: string;
  actualHours: number;
  breakMinutes: number;
  requiredBreakMinutes: number;
  message: string;
}

/**
 * 근로기준법 제54조 휴게시간 법정 준수 여부 검사
 * - 실근로시간 8시간 이상 → 휴게시간 60분 미만 시 위반
 * - 실근로시간 4시간 이상 8시간 미만 → 휴게시간 30분 미만 시 위반
 */
export function checkBreakTimeViolations(
  wizDaysConfig?: Record<string, DailyScheduleInput | undefined>,
): BreakTimeViolation[] {
  const violations: BreakTimeViolation[] = [];
  if (!wizDaysConfig) return violations;

  Object.entries(wizDaysConfig).forEach(([day, conf]) => {
    if (!conf || !conf.enabled) return;
    const { grossMinutes } = calculateDailyTime(conf.startTime, conf.endTime, conf.breakTime);
    const breakMinutes = parseBreakMinutes(conf.breakTime);
    const actualMinutes = Math.max(0, grossMinutes - breakMinutes);
    const actualHours = Math.round((actualMinutes / 60) * 100) / 100;

    if (actualHours >= 8 && breakMinutes < 60) {
      violations.push({
        day,
        actualHours,
        breakMinutes,
        requiredBreakMinutes: 60,
        message: `${day} 실근로 ${actualHours}시간(8h 이상)에 대해 휴게시간이 ${breakMinutes}분으로 법정 기준(60분 이상)에 미달합니다.`,
      });
    } else if (actualHours >= 4 && actualHours < 8 && breakMinutes < 30) {
      violations.push({
        day,
        actualHours,
        breakMinutes,
        requiredBreakMinutes: 30,
        message: `${day} 실근로 ${actualHours}시간(4h 이상)에 대해 휴게시간이 ${breakMinutes}분으로 법정 기준(30분 이상)에 미달합니다.`,
      });
    }
  });

  return violations;
}

/**
 * 근무 시작/종료시간 및 현재 휴게시간에 따른 법정 최소 휴게시간 자동 계산 유틸
 * - 실근로시간(구속시간 - 휴게시간)이 8시간 이상이 되거나 구속시간 8.5시간 이상 시 -> 최소 1시간 (60분) 자동 세팅
 * - 실근로시간 4.5시간 이상 8시간 미만 시 -> 최소 30분 자동 세팅
 */
export function getAutoBreakTime(start: string, end: string, currentBreak?: string): string {
  if (!start || !end) return '30분';
  const [sH, sM] = start.split(':').map(Number);
  const [eH, eM] = end.split(':').map(Number);
  let startMin = sH * 60 + sM;
  let endMin = eH * 60 + eM;
  if (endMin < startMin) endMin += 24 * 60;
  const grossMinutes = endMin - startMin;
  const currBreakMin = parseBreakMinutes(currentBreak || '0분');

  // 구속시간이 8시간 초과 (8.5시간 이상, 예: 10:00~18:30 등) 인 경우만 1시간 필수
  if (grossMinutes > 480) {
    return currBreakMin >= 60 && currentBreak ? currentBreak : '1시간';
  }

  // 구속시간이 4.5시간 이상 8시간 이하 (14:00~22:00, 10:00~18:00 등 포함) 시 30분 세팅 (소정 7.5시간)
  if (grossMinutes >= 270) {
    return currBreakMin >= 30 && currentBreak ? currentBreak : '30분';
  }

  return currentBreak || '없음';
}

/**
 * 근무 스케줄 설정(wizDaysConfig)에 따른 주 소정시간, 주 연장시간, 주 야간시간 산출
 */
export function calculateScheduleHours(
  wizDaysConfig: Record<string, DailyScheduleInput | undefined>,
) {
  let weeklyHours = 0;
  let dailyOvertimeHoursSum = 0;
  let dailyStandardHoursSum = 0;
  let weeklyNightHours = 0;

  Object.values(wizDaysConfig || {}).forEach((conf) => {
    if (!conf || !conf.enabled) return;
    const { actualHours, standardHours, overtimeHours, nightHours } = calculateDailyTime(
      conf.startTime,
      conf.endTime,
      conf.breakTime,
    );
    weeklyHours += actualHours;
    dailyStandardHoursSum += standardHours;
    dailyOvertimeHoursSum += overtimeHours;
    weeklyNightHours += nightHours;
  });

  weeklyHours = Math.round(weeklyHours * 100) / 100;
  dailyOvertimeHoursSum = Math.round(dailyOvertimeHoursSum * 100) / 100;
  dailyStandardHoursSum = Math.round(dailyStandardHoursSum * 100) / 100;
  weeklyNightHours = Math.round(weeklyNightHours * 100) / 100;

  const weeklyExceedOvertime = Math.max(
    0,
    dailyStandardHoursSum - LEGAL_STANDARDS.STANDARD_WEEKLY_HOURS,
  );
  const weeklyOvertimeHours =
    Math.round((dailyOvertimeHoursSum + weeklyExceedOvertime) * 100) / 100;

  return {
    weeklyHours,
    weeklyOvertimeHours,
    weeklyNightHours,
  };
}

/**
 * 주휴시간 법정 산식 (주 소정근로시간이 15시간 이상일 때: min(주소정시간, 40) / 40 * 8)
 */
export function calculateWeeklyHolidayHours(weeklyHours: number): number {
  if (weeklyHours < LEGAL_STANDARDS.WEEKLY_HOLIDAY_THRESHOLD) return 0;
  const cappedHours = Math.min(weeklyHours, LEGAL_STANDARDS.MAX_WEEKLY_HOURS);
  return (cappedHours / 40) * 8;
}

/**
 * 월 기준 시간 계산 (근로기준법 제50조: 소정근로시간 주 40시간 상한 적용)
 */
export function calculateMonthlyHours(weeklyHours: number) {
  const cappedWeeklyHours = Math.min(weeklyHours, LEGAL_STANDARDS.MAX_WEEKLY_HOURS);
  const moExact = cappedWeeklyHours * LEGAL_STANDARDS.WEEKS_PER_MONTH; // 월 소정시간 정밀값
  const holidayHours = calculateWeeklyHolidayHours(cappedWeeklyHours); // 주휴시간
  const mhExact = holidayHours * LEGAL_STANDARDS.WEEKS_PER_MONTH; // 월 주휴시간 정밀값
  const TExact = moExact + mhExact; // 월 총 소정 기준시간 정밀값 (주 40시간 기준 208.5714h)
  const mo = Math.round(moExact);
  const mh = Math.round(mhExact);
  const T = Math.round(TExact);
  return { mo, mh, T, holidayHours, moExact, mhExact, TExact };
}

/**
 * 법정 최저 보장 금액 산출 (소정근로시간 + 주휴시간 기준 최저임금 가이드액 - 40h 시 2,152,344원 고정)
 */
export function calculateDynamicMinGuaranteeAmount(
  wizDaysConfig?: Record<string, DailyScheduleInput | undefined>,
): number {
  if (!wizDaysConfig) return LEGAL_STANDARDS.MIN_MONTHLY_WAGE;
  const { weeklyHours } = calculateScheduleHours(wizDaysConfig);
  const cappedWeeklyHours = Math.min(weeklyHours, LEGAL_STANDARDS.MAX_WEEKLY_HOURS);
  const weeklyHolidayHours = calculateWeeklyHolidayHours(cappedWeeklyHours);

  const moExact = cappedWeeklyHours * LEGAL_STANDARDS.WEEKS_PER_MONTH;
  const mhExact = weeklyHolidayHours * LEGAL_STANDARDS.WEEKS_PER_MONTH;

  // 1) 기본급 (10원 단위 올림: 40시간 시 1,793,620원)
  const basePayMin = Math.ceil((moExact * LEGAL_STANDARDS.MIN_HOURLY_WAGE) / 10) * 10;

  // 2) 주휴수당 (원 단위 올림: 40시간 시 358,724원)
  const holidayPayMin = Math.ceil(mhExact * LEGAL_STANDARDS.MIN_HOURLY_WAGE);

  // 주 40시간 기준 1,793,620원 + 358,724원 = 2,152,344원 정확히 산출
  return basePayMin + holidayPayMin;
}

export interface WageEngineInput {
  salaryType: 'monthly' | 'hourly' | 'commission';
  salaryAmount: number; // 월급 입력액
  hourlyRate: number; // 시급 입력액
  commissionRate: number; // 비율제 %
  minGuaranteeAmount: number; // 최소보장액
  mealAllowance: number; // 비과세 식대
  positionAllowance: number; // 직책수당
  overtimeAllowance: number; // 고정연장수당
  otherAllowance: number; // 기타수당
  nonCompeteAmount: number; // 경업금지대가
  weeklyHours: number;
  weeklyOvertimeHours?: number;
  weeklyNightHours?: number;
  employeeCount?: number; // 상시근로자수 (5인 이상 여부)
}

export interface WageEngineResult {
  baseSalary: number;
  weeklyHolidayPay: number;
  mealAllowance: number;
  positionAllowance: number; // 직책수당
  overtimeAllowance: number;
  otherAllowance: number;
  nonCompeteAmount: number;
  totalMonthlyPay: number;
  ordinaryHourlyRate: number; // 통상시급
  comparedHourlyRate: number; // 최저임금 비교시급
  isMinWagePassed: boolean;
  mo: number;
  mh: number;
  moExact: number;
  mhExact: number;
  T: number;
  TExact: number;
  holidayHours: number;
  breakdown: {
    formulaBase: string;
    formulaHolidayPay: string;
    legalBasis: string[];
  };
}

/**
 * 임금 역산 및 순산 분할 엔진 (학온 엑셀 엔진 산식 100% 일치)
 */
export function calculateWageEngine(input: WageEngineInput): WageEngineResult {
  const {
    salaryType,
    salaryAmount,
    hourlyRate,
    commissionRate,
    minGuaranteeAmount,
    mealAllowance = 0,
    positionAllowance = 0,
    overtimeAllowance = 0,
    otherAllowance = 0,
    nonCompeteAmount = 0,
    weeklyHours = 0,
    weeklyOvertimeHours = 0,
    weeklyNightHours = 0,
    employeeCount = 5,
  } = input;

  const { mo, mh, T, holidayHours, moExact, mhExact, TExact } = calculateMonthlyHours(weeklyHours);
  const isFiveOrMore = employeeCount >= 5;
  const overtimeRate = isFiveOrMore ? 1.5 : 1.0;
  const nightRate = isFiveOrMore ? 0.5 : 0.0;

  // 계수 산출 (포괄 연장/야간 가산 수렴 정밀값)
  const kotExact = weeklyOvertimeHours * overtimeRate * LEGAL_STANDARDS.WEEKS_PER_MONTH;
  const kniExact = weeklyNightHours * nightRate * LEGAL_STANDARDS.WEEKS_PER_MONTH;

  let totalMonthlyPay = 0;
  let baseSalary = 0;
  let weeklyHolidayPay = 0;
  let calcOvertimeAllowance = overtimeAllowance;
  let ordinaryHourlyRate = 0;
  let comparedHourlyRate = 0;

  if (salaryType === 'hourly') {
    const rate = hourlyRate || LEGAL_STANDARDS.MIN_HOURLY_WAGE;
    ordinaryHourlyRate = rate;
    if (overtimeAllowance > 0) {
      calcOvertimeAllowance = overtimeAllowance;
    } else if (kotExact > 0) {
      calcOvertimeAllowance = Math.round(rate * kotExact);
    }
    baseSalary = Math.round(rate * moExact);
    weeklyHolidayPay = Math.round(rate * mhExact);
    totalMonthlyPay =
      baseSalary +
      weeklyHolidayPay +
      calcOvertimeAllowance +
      mealAllowance +
      positionAllowance +
      otherAllowance;
    comparedHourlyRate = rate;
  } else {
    // 월급제 (monthly) 및 비율제 (commission) - 약정월급/최소보장월급 기준 기본급+주휴+식대+포괄연장수당 100% 유동 정밀 분할
    totalMonthlyPay = salaryType === 'commission' ? (minGuaranteeAmount || 0) : (salaryAmount || 0);

    const cappedWeeklyHours = Math.min(weeklyHours, LEGAL_STANDARDS.MAX_WEEKLY_HOURS);
    const weeklyHolidayHours = calculateWeeklyHolidayHours(cappedWeeklyHours);

    // 1) 통상시급 산출 (월 약정액 / 월 기준시간)
    comparedHourlyRate = TExact > 0 ? Math.round(totalMonthlyPay / TExact) : 0;
    ordinaryHourlyRate = comparedHourlyRate;

    // 2) 월 주휴수당 = 주휴시간(mhExact) * 통상시급 (1원 오차 없이 100% 일치)
    weeklyHolidayPay = Math.ceil(mhExact * ordinaryHourlyRate);

    // 3) 월 소정근로 기본급 = 월 약정액 - 주휴수당 - 비과세 식대
    const meal = mealAllowance;
    const remainingPool = Math.max(0, totalMonthlyPay - weeklyHolidayPay);
    baseSalary = Math.max(0, remainingPool - meal);

    // 3) 월 포괄 연장근로수당 = (주 연장시간 * 가산율 * 4.345) * 통상시급
    if (weeklyOvertimeHours > 0) {
      const isUnder5 = employeeCount < 5;
      const overtimeRateFinal = isUnder5 ? 1.0 : 1.5;
      const monthlyOvertimeHours = weeklyOvertimeHours * overtimeRateFinal * LEGAL_STANDARDS.WEEKS_PER_MONTH;
      calcOvertimeAllowance = Math.round(monthlyOvertimeHours * ordinaryHourlyRate);
    } else if (overtimeAllowance > 0) {
      calcOvertimeAllowance = overtimeAllowance;
    } else {
      calcOvertimeAllowance = 0;
    }
  }

  const isMinWagePassed = comparedHourlyRate >= LEGAL_STANDARDS.MIN_HOURLY_WAGE;

  return {
    baseSalary,
    weeklyHolidayPay,
    mealAllowance,
    positionAllowance,
    overtimeAllowance: calcOvertimeAllowance,
    otherAllowance,
    nonCompeteAmount,
    totalMonthlyPay,
    ordinaryHourlyRate,
    comparedHourlyRate,
    isMinWagePassed,
    mo,
    mh,
    moExact,
    mhExact,
    T,
    TExact,
    holidayHours,
    breakdown: {
      formulaBase: `월 기본급 = 통상임금 풀 × (월소정시간 ${mo}h / 월기준시간 ${T}h) - 비과세/기타수당`,
      formulaHolidayPay: `주휴수당 = 통상임금 풀 × (월주휴시간 ${mh}h / 월기준시간 ${T}h)`,
      legalBasis: [
        '근로기준법 제50조 (근로시간 - 1일 8시간, 1주 40시간)',
        '근로기준법 제55조 (유급주휴일 - 주 15시간 이상 근로 시 8시간 비례 유급주휴)',
        '근로기준법 제56조 (연장·야간·휴일 가산임금 1.5배/0.5배)',
        '최저임금법 제6조 (2026년 최저시급 10,320원 준수)',
      ],
    },
  };
}

export interface NonCompeteInput {
  hasNonCompete?: boolean;
  calcType?: 'percent' | 'manual';
  percent?: number;
  manualAmount?: number;
  salaryType?: 'monthly' | 'hourly' | 'commission';
  salaryAmount?: number;
  hourlyRate?: number;
  minGuaranteeAmount?: number;
}

/**
 * 경업금지 보상수당 실효 산출금액 (비율 지정 vs 직접 금액 입력 반영)
 */
export function getEffectiveNonCompeteAmount(input: NonCompeteInput): number {
  if (!input.hasNonCompete) return 0;
  if (input.calcType === 'manual' && input.manualAmount && input.manualAmount > 0) {
    return input.manualAmount;
  }
  const percent = input.percent ?? 10;
  const base =
    input.salaryType === 'commission'
      ? input.minGuaranteeAmount || 0
      : input.salaryType === 'hourly'
        ? (input.hourlyRate || LEGAL_STANDARDS.MIN_HOURLY_WAGE) * 174
        : input.salaryAmount || 0;
  return Math.round(base * (percent / 100));
}
