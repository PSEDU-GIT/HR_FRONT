'use client';

import cx from 'classnames';
import { type ContractEventLogItem } from '@/app/(afterLogin)/cabinet/_model/ContractEventLog.model';

const EVENT_TYPE_MAP: Record<string, { label: string; color: string }> = {
  CONTRACT_CREATED: { label: '계약서 생성', color: 'text-slate-800' },
  CONTRACT_SENT: { label: '서명 링크 발송', color: 'text-slate-800' },
  CONTRACT_LINK_INVALIDATED: { label: '서명 링크 만료', color: 'text-custom-indigo' },
  OTP_REQUESTED: { label: '본인확인 OTP 요청', color: 'text-slate-800' },
  OTP_FAILED: { label: '본인확인 OTP 실패', color: 'text-custom-danger' },
  OTP_VERIFIED: { label: '본인확인 OTP 인증 완료', color: 'text-slate-800' },
  SIGNUP_VERIFIED: { label: '가입 인증 완료', color: 'text-slate-800' },
  CONTRACT_SIGNED: { label: '전자서명 완료', color: 'text-custom-indigo' },
  CONTRACT_REVISED: { label: '계약서 수정 완료', color: 'text-custom-indigo' },
  CONTRACT_COMPLETED: { label: '계약 체결 완료', color: 'text-custom-indigo' },
  CONTRACT_DELETED: { label: '계약서 삭제', color: 'text-custom-danger' },
  FINANCIAL_INFO_REGISTERED: { label: '정산 정보 등록', color: 'text-slate-800' },
  FINANCIAL_INFO_VIEWED_FULL: { label: '정산 정보 전체 조회', color: 'text-slate-800' },
  HR_AUTH_GRANTED: { label: 'HR 권한 부여', color: 'text-custom-indigo' },
  HR_AUTH_REVOKED: { label: 'HR 권한 회수', color: 'text-custom-orange' },
  CONSENT_CREATED: { label: '동의서 작성', color: 'text-slate-800' },
  CONTRACT_TEMPLATE_REGISTERED: { label: '템플릿 등록', color: 'text-slate-800' },
};

const ACTOR_TYPE_MAP: Record<string, string> = {
  ADMIN: '관리자',
  SELF: '당사자',
};

const CONTRACT_TYPE_MAP: Record<string, string> = {
  TEACHER: '강사 근로계약서',
  FREELANCER: '프리랜서 계약서',
  GENERAL_STAFF: '일반 직원 근로계약서',
};

const PAYLOAD_LABEL_MAP: Record<string, (val: any) => string> = {
  contractType: (val) => CONTRACT_TYPE_MAP[val] || val,
  invalidatedCount: (val) => `만료된 링크 ${val}건`,
  reason: (val) => `사유: ${val}`,
};

const formatPayload = (payload: Record<string, any> | null): string => {
  if (!payload || Object.keys(payload).length === 0) return '';

  const parts = Object.entries(payload).map(([key, val]) => {
    if (PAYLOAD_LABEL_MAP[key]) {
      return PAYLOAD_LABEL_MAP[key](val);
    }
    if (typeof val === 'object') return '';
    return `${key}: ${val}`;
  });

  return parts.filter(Boolean).join(', '); }; interface CabinetDetailTimelineItemProps { item: ContractEventLogItem; isLast?: boolean; } export default function CabinetDetailTimelineItemComponent({ item, isLast, }: CabinetDetailTimelineItemProps) { const { eventType, actorType, actorStaffId, payload, ipAddress, userAgent, createdAt } = item; const actorLabel = ACTOR_TYPE_MAP[actorType] || actorType ||'사용자';
  const actorDisplay = actorStaffId ? `${actorLabel} (${actorStaffId})` : actorLabel;

  const eventConfig = EVENT_TYPE_MAP[eventType] || {
    label: eventType,
    color: isLast ? 'text-custom-indigo' : 'text-slate-800',
  };

  const isCompletedEvent =
    eventType === 'CONTRACT_SIGNED' ||
    eventType === 'CONTRACT_COMPLETED' ||
    eventType === 'CONTRACT_LINK_INVALIDATED' ||
    isLast;

  const payloadText = formatPayload(payload);

  return (
    <div
      className={cx(
        'border-l-2 pl-3.5 text-11',
        isCompletedEvent ? 'border-custom-indigo' : 'border-slate-300',
      )}
    >
      <span
        className={cx(
          'block font-mono text-[9px]',
          isCompletedEvent ? 'text-custom-indigo' : 'text-slate-400',
        )}
      >
        {createdAt}
      </span>

      <p className={cx('font-bold', eventConfig.color)}>
        {actorDisplay} · {eventConfig.label}
      </p>

      {payloadText && (
        <p className="mt-0.5 line-clamp-2 font-medium leading-relaxed text-slate-500">
          {payloadText}
        </p>
      )}

      {ipAddress && (
        <span className="mt-0.5 block font-mono text-[9px] text-slate-400">
          IP: {ipAddress} {userAgent ? `(${userAgent})` : ''}
        </span>
      )}
    </div>
  );
}
