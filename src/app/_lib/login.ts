export type LoginResponseTypes = {
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
  email: string;
  password: string;
};

export const login = async ({ email, password }: Props) => {
  const payload = { email, password };
  const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://xamfinity.n-e.kr';

  const response = await fetch(`${baseUrl}/server/api/auth/signIn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || '로그인 정보가 일치하지않습니다.');
  }

  return (await response.json()).data as LoginResponseTypes;
};
