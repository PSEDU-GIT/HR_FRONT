export const formatWeekDay = (dayName: string) => {
  const dayMap: { [key: string]: string } = {
    Sunday: '일',
    Monday: '월',
    Tuesday: '화',
    Wednesday: '수',
    Thursday: '목',
    Friday: '금',
    Saturday: '토',
  };
  return dayMap[dayName] || dayName;
};

export const getDayClassName = (date: Date) => {
  const day = date.getDay(); // 0: 일요일, 6: 토요일

  if (day === 0) {
    return 'text-red-500';
  } else if (day === 6) {
    return 'text-blue-500';
  }
  return 'text-gray-900';
};
