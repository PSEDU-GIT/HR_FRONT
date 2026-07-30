import { format, parseISO, isValid } from 'date-fns';
import { type ActivityTimelineItem as ActivityTimelineItemType } from '@/app/(afterLogin)/dashboard/_model/ActivityTimeline.model';

interface ActivityTimelineItemProps {
  item: ActivityTimelineItemType;
}

const getFormattedTime = (dateStr?: string) => {
  if (!dateStr) return '-';
  try {
    const formattedStr = dateStr.replace(' ', 'T');
    const parsed = parseISO(formattedStr);
    if (isValid(parsed)) {
      return format(parsed, 'HH:mm');
    }
  } catch (e) {
    // fallback
  }
  return dateStr;
};

export default function ActivityTimelineItem({ item }: ActivityTimelineItemProps) {
  return (
    <div className="relative flex min-h-[2.25rem] items-center text-sm">
      <div className="w-14 shrink-0 text-xs font-bold text-neutral-900 sm:text-sm">
        {getFormattedTime(item.occurredAt)}
      </div>

      <div className="relative z-10 flex w-6 shrink-0 items-center justify-center">
        <div className="h-3.5 w-3.5 rounded-full border-2 border-neutral-900 bg-white" />
      </div>

      <div className="flex-1 pl-3 leading-normal font-medium text-gray-600">
        <span>{item.content}</span>
      </div>
    </div>
  );
}
