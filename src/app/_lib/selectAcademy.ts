import { auth } from '@/app/auth';

export type SelectAcademyResponseTypes = {
  accessToken: string;
  refreshToken: string;

  staff: {
    id: number;
    name: string;
    email: string;
    loginId: string;
  };

  academies: {
    academy_id: string;
    academy_name: string;
    group_auth_id: number;
    employ_status: string;
    position: string;
    isDirector: boolean;
    director_name: string;
  }[];

  roles: {
    path: string;
    role: string;
  }[];

  loginStatus: string;
};

type Props = {
  academyId: string;
  accessToken?: string;
};

export const selectAcademy = async ({ academyId, accessToken }: Props) => {
  const payload = { academyId };
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://124.63.118.168:5001/server';

  let token = accessToken;
  if (!token) {
    const session = await auth();
    token = session?.accessToken;
  }

  const response = await fetch(`${apiBase}/api/auth/academy/select`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || '학원 선택 실패');
  }

  return (await response.json()).data as SelectAcademyResponseTypes;
};
