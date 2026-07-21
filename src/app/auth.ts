import NextAuth from 'next-auth';

const revKeyMap: Record<string, string> = {
  i: 'academy_id',
  n: 'academy_name',
  p: 'position',
  d: 'isDirector',
  m: 'director_name',
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
        domain: process.env.NODE_ENV === 'production' ? '.hakon.co.kr' : undefined,
      },
    },
  },
  providers: [],

  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: async ({ session, token }) => {
      if (token.isNewUser) {
        session.temp = token.temp as any;
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
          : (token.academies as any);

      session.isNotSocialLogin = (token?.isNotSocialLogin as boolean | null) ?? false;

      return session;
    },
  },
});
