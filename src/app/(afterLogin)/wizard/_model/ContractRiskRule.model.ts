export type RiskRuleType =
  | 'MIN_WAGE'
  | 'WORKER_STATUS_FREELANCER'
  | 'TOXIC_CLAUSE'
  | 'FIXED_TERM_2YEAR_LIMIT'
  | 'PROBATION_PERIOD_VALIDITY'
  | 'COMPREHENSIVE_WAGE_VALIDITY'
  | 'NON_COMPETE_ALLOWANCE_DEDUCTION'
  | 'SEVERANCE_PAY_AVOIDANCE_RISK'
  | 'SHORT_TIME_WORKER_RISK'
  | 'WEEKLY_OVERTIME_LIMIT'
  | 'WEEKLY_HOUR_CAP_VIOLATION'
  | 'BREAK_TIME_MINIMUM_VIOLATION'
  | 'GENERAL_LABOR_ADVISORY'
  | 'NON_TAXABLE_MEAL_ALLOWANCE_GUIDE'
  | (string & {});

export type RiskSeverity = 'GUIDE' | 'PASS' | 'WARNING' | 'DANGER' | (string & {});

export interface RiskRuleGetDto {
  ruleType: RiskRuleType;
  ruleKey: string | null;
  effectiveFrom: string;
  ruleValueJson: Record<string, any> | null;
  targetKeywords: string[];
  severity: RiskSeverity;
  legalBasis: string | null;
  messagePass: string | null;
  messageFail: string | null;
  advisoryTitle: string | null;
  advisoryDescriptionMarkdown: string | null;
  recommendation: string | null;
  matchPattern: string | null;
  matchPatternFlags: string | null;
}

export interface RiskCheckResultItem {
  ruleType: RiskRuleType;
  passed: boolean;
  severity: RiskSeverity;
  detail: string;
}

export interface RiskCheckApiResponse<T = RiskCheckResultItem[]> {
  data: T;
  message: string;
  code: number;
}
