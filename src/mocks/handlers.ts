import { http, HttpResponse } from 'msw';
import { type Instructor } from '../app/(afterLogin)/wizard/(standard)/step1/_model/Instructor.model';

const MOCK_INSTRUCTORS: Instructor[] = [
  {
    staffId: 92817291,
    name: '김태희',
    phone: '010-4829-1928',
    subject: '영어',
    birth: '1990-03-15',
    address: '서울특별시 강남구 테헤란로 123',
  },
  {
    staffId: 10283719,
    name: '박서준',
    phone: '010-8273-0192',
    subject: '수학',
    birth: '1988-12-16',
    address: '서울특별시 서초구 반포대로 456',
  },
  {
    staffId: 83921029,
    name: '이지은',
    phone: '010-1234-5678',
    subject: '국어',
    birth: '1993-05-16',
    address: '서울특별시 마포구 독막로 789',
  },
  {
    staffId: 58291028,
    name: '이민호',
    phone: '010-9876-5432',
    subject: '과학',
    birth: '1987-06-22',
    address: '서울특별시 송파구 올림픽로 321',
  },
];

export const handlers = [
  http.get('/api/instructors', () => {
    return HttpResponse.json(MOCK_INSTRUCTORS);
  }),
];


