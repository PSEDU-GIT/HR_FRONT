export type EventActorType = 'SELF' | 'ADMIN' | string;

export type EventTypeEnum =
  | 'HR_AUTH_GRANTED'
  | 'HR_AUTH_REVOKED'
  | 'CONTRACT_CREATED'
  | 'CONSENT_CREATED'
  | 'CONTRACT_TEMPLATE_REGISTERED'
  | 'CONTRACT_SENT'
  | 'CONTRACT_LINK_INVALIDATED'
  | 'OTP_REQUESTED'
  | 'OTP_FAILED'
  | 'OTP_VERIFIED'
  | 'SIGNUP_VERIFIED'
  | 'CONTRACT_SIGNED'
  | 'CONTRACT_REVISED'
  | 'CONTRACT_DELETED'
  | 'FINANCIAL_INFO_REGISTERED'
  | 'FINANCIAL_INFO_VIEWED_FULL'
  | string;

export interface ContractEventLogItem {
  id: number;
  eventType: EventTypeEnum;
  actorType: EventActorType;
  actorStaffId: number | null;
  payload: Record<string, any> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

export type ContractEventLogResponse = ContractEventLogItem[];
