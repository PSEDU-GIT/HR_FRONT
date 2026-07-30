import { format, parseISO, isValid } from 'date-fns';
import { type ActivityTimelineItem as ActivityTimelineItemType } from '@/app/(afterLogin)/dashboard/_model/ActivityTimeline.model';

interface ActivityTimelineItemProps {
  item: ActivityTimelineItemType;
}

const parseDateInfo = (dateStr?: string) => {
  if (!dateStr) return { date: '', time: '-' };
  try {
    const formattedStr = dateStr.replace(' ', 'T');
    const parsed = parseISO(formattedStr);
    if (isValid(parsed)) {
      return {
        date: format(parsed, 'MM.dd'),
        time: format(parsed, 'HH:mm'),
      };
    }
  } catch (e) {
    // fallback
  }
  return { date: '', time: dateStr };
};

export default function ActivityTimelineItem({ item }: ActivityTimelineItemProps) {
  const { date, time } = parseDateInfo(item.occurredAt);

  return (
    <div className="relative flex min-h-[2.5rem] items-center text-sm">
      <div className="flex w-14 shrink-0 flex-col items-end pr-2 text-right">
        <span className="text-xs font-bold text-neutral-900 leading-tight">{time}</span>
        {date && <span className="text-[10px] font-semibold text-gray-400 leading-tight mt-0.5">{date}</span>}
      </div>

      <div className="relative z-10 flex w-5 shrink-0 items-center justify-center">
        <div className="h-3.5 w-3.5 rounded-full border-2 border-neutral-900 bg-white" />
      </div>

      <div className="flex-1 pl-3 leading-normal font-medium text-gray-600">
        <span>{item.content}</span>
      </div>
    </div>
  );
}
