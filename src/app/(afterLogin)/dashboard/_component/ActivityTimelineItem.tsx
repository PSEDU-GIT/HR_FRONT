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
        <span className="text-text-main text-xs font-bold leading-tight">{time}</span>
        {date && <span className="text-text-side mt-0.5 text-[10px] font-semibold leading-tight">{date}</span>}
      </div>

      <div className="relative z-10 flex w-5 shrink-0 items-center justify-center">
        <div className="border-custom-indigo-side bg-background h-3.5 w-3.5 rounded-full border-2" />
      </div>

      <div className="text-text-sub flex-1 pl-3 font-medium leading-normal">
        <span>{item.content}</span>
      </div>
    </div>
  );
}
