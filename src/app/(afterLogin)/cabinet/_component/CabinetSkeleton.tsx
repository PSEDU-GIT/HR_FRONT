export default function CabinetSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start animate-pulse">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-28 rounded-md bg-slate-200" />
          <div className="h-6 w-36 rounded-full bg-slate-200" />
        </div>
        <div className="w-full overflow-hidden rounded-xl border border-slate-100 bg-white">
          <div className="h-10 w-full bg-slate-100/80" />
          <div className="space-y-3 p-4">
            <div className="h-10 w-full rounded-lg bg-slate-100/60" />
            <div className="h-10 w-full rounded-lg bg-slate-100/60" />
            <div className="h-10 w-full rounded-lg bg-slate-100/60" />
            <div className="h-10 w-full rounded-lg bg-slate-100/60" />
          </div>
        </div>
      </div>
      <div className="h-80 w-full shrink-0 rounded-2xl bg-slate-100/80 lg:w-80" />
    </div>
  );
}
