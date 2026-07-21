import { type Instructor } from '@/app/(afterLogin)/wizard/step1/_model/Instructor.model';

export const getInstructors = async (): Promise<Instructor[]> => {
  const res = await fetch('/api/instructors');
  if (!res.ok) {
    throw new Error('Failed to fetch instructors');
  }
  return res.json();
};
