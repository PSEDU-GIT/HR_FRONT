import 'next-auth';

export type AcademyTypes = {
  academy_id: string;
  academy_name: string;
  group_auth_id: number;
  employ_status: string;
  position: string;
  isDirector: boolean;
  director_name: string;
};

declare module 'next-auth' {
  interface Session {
    id: string;
    name: string;
    email: string;

    accessToken: string;
    accessTokenExpires: number;

    refreshToken: string;
    refreshTokenExpires: number;

    academies: AcademyTypes[];

    isNewUser?: boolean;
    temp?: {
      name: string;
      email: string;
      token: string;
    };

    isNotSocialLogin?: boolean;
  }

  interface User {
    id: string;
    name: string;
    email: string;

    accessToken: string;
    accessTokenExpires: number;

    refreshToken: string;
    refreshTokenExpires: number;

    academies: {
      academy_id: string;
      academy_name: string;
      position: string;
      isDirector: boolean;
      director_name: string;
    }[];

    isNotSocialLogin?: boolean;
  }
}
