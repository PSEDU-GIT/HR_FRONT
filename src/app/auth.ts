import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { jwtDecode } from 'jwt-decode';
import { login } from '@/app/_lib/login';
import { socialLogin } from '@/app/_lib/socialLogin';
import { refreshToken } from '@/app/_lib/refreshToken';

const filterAcademies = (academies: any[]) => {
  if (!academies || !Array.isArray(academies)) return [];

  return academies.map((a) => ({
    academy_id: String(a.academy_id),
    academy_name: a.academy_name,
    position: a.position,
    isDirector: a.isDirector,
    director_name: a.director_name,
  }));
};

const keyMap: Record<string, string> = {
  academy_id: 'i',
  academy_name: 'n',
  position: 'p',
  isDirector: 'd',
  director_name: 'm',
};

const revKeyMap: Record<string, string> = {
  i: 'academy_id',
  n: 'academy_name',
  p: 'position',
  d: 'isDirector',
  m: 'director_name',
};

export const compressData = (data: any[]): string => {
  if (!data || !Array.isArray(data)) return '';
  try {
    const minified = data.map((item) => {
      const newItem: Record<string, any> = {};
      for (const key in item) {
        const mappedKey = keyMap[key] || key;
        newItem[mappedKey] = item[key];
      }
      return newItem;
    });
    const jsonStr = JSON.stringify(minified);
    return Buffer.from(jsonStr, 'utf-8').toString('base64');
  } catch (e) {
    console.error('Data compression failed:', e);
    return '';
  }
};

export const decompressData = (compressed: string): any[] => {
  if (!compressed) return [];
  try {
    const jsonStr = Buffer.from(compressed, 'base64').toString('utf-8');
    const minified = JSON.parse(jsonStr);
    if (!Array.isArray(minified)) return [];
    return minified.map((item) => {
      const newItem: Record<string, any> = {};
      for (const key in item) {
        const originalKey = revKeyMap[key] || key;
        newItem[originalKey] = item[key];
      }
      return newItem;
    });
  } catch (e) {
    console.error('Data decompression failed:', e);
    return [];
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-authjs.session-token'
          : 'authjs.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain:
          process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN
            ? process.env.COOKIE_DOMAIN
            : undefined,
      },
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        id: { label: 'id' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const { id, password } = credentials;
          const email = (id as string) || (credentials as any)?.email || '';
          const pwd = (password as string) || '';

          const data = await login({ email, password: pwd });

          const { exp: accessTokenExpires } = jwtDecode<{ exp: number }>(data.accessToken);
          const { exp: refreshTokenExpires } = jwtDecode<{ exp: number }>(data.refreshToken);

          return {
            id: String(data.staff.id || email),
            accessToken: data.accessToken,
            accessTokenExpires,
            refreshToken: data.refreshToken,
            refreshTokenExpires,
            name: data.staff.name,
            email: data.staff.email,
            academies: filterAcademies(data.academies),
          };
        } catch (error) {
          console.error('Credentials auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        // 구글 소셜 로그인일 경우
        if (account.provider === 'google') {
          try {
            const response = await socialLogin({ token: account?.id_token ?? '' });

            // 백엔드에서 신규 유저라고 판별한 경우 꼬리표 달기
            if (response.status === 'REGISTER_REQUIRED' || !response?.tokenInfo) {
              token.isNewUser = true;
              token.temp = {
                name: user.name ?? '',
                email: user.email ?? '',
                token: account.id_token ?? '',
              };

              token.accessToken = account.id_token;

              return token;
            } else {
              const { exp: accessTokenExpires } = jwtDecode<{ exp: number }>(
                response.tokenInfo.accessToken,
              );
              const { exp: refreshTokenExpires } = jwtDecode<{ exp: number }>(
                response.tokenInfo.refreshToken,
              );

              token.id = response.email ?? user.email ?? '';
              token.name = response.tokenInfo.staff.name;
              token.email = response.tokenInfo.staff.email;

              token.accessToken = response.tokenInfo.accessToken;
              token.accessTokenExpires = accessTokenExpires;
              token.refreshToken = response.tokenInfo.refreshToken;
              token.refreshTokenExpires = refreshTokenExpires;
              token.academies = compressData(filterAcademies(response.tokenInfo.academies));
            }
          } catch (error) {
            console.error('백엔드 서버로 소셜 토큰 전송 실패:', error);
          }
        }
        // 자체 이메일/비밀번호(Credentials) 로그인일 경우
        else if (account.provider === 'credentials') {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;

          token.accessToken = user.accessToken;
          token.accessTokenExpires = user.accessTokenExpires;
          token.refreshToken = user.refreshToken;
          token.refreshTokenExpires = user.refreshTokenExpires;
          token.academies = compressData(user.academies as any[]);
          token.isNotSocialLogin = true;
        }

        return token;
      }

      const now = Math.floor(Date.now() / 1000);

      // 액세스 토큰 만료 시 재발급 시도
      if (token.accessTokenExpires && now >= (token.accessTokenExpires as number)) {
        try {
          const response = await refreshToken(token.refreshToken as string);

          const { exp: accessTokenExpires } = jwtDecode<{ exp: number }>(response.accessToken);

          token.accessToken = response.accessToken;
          token.accessTokenExpires = accessTokenExpires;
        } catch (error) {
          console.error('백엔드 서버로 토큰 재발급 실패:', error);

          return null;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token.isNewUser) {
        session.temp = token.temp as {
          name: string;
          email: string;
          token: string;
        };
        session.isNewUser = true;

        return session;
      }

      session.id = token.id as string;
      session.name = token.name as string;
      session.email = token.email as string;
      session.accessToken = token.accessToken as string;
      session.accessTokenExpires = token.accessTokenExpires as number;
      session.refreshToken = token.refreshToken as string;
      session.refreshTokenExpires = token.refreshTokenExpires as number;
      session.academies =
        typeof token.academies === 'string'
          ? decompressData(token.academies)
          : (token.academies as typeof session.academies);

      session.isNotSocialLogin = (token?.isNotSocialLogin as boolean | null) ?? false;

      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
