type Props = {
  month: number;
  onTrackable?: () => void;
};

export default function CustomMonthContent({ month, onTrackable }: Props) {
  return (
    <div
      className="flex h-full w-full items-center justify-center px-4 py-1.5"
      onClick={onTrackable}
    >
      <div className="flex items-baseline font-medium">
        <span className="text-sm">{month + 1}</span>
        <span>월</span>
      </div>
    </div>
  );
}
