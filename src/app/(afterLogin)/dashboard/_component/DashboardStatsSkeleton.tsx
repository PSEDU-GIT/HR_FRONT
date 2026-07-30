export default function DashboardStatsSkeleton() {
  return (
    <div className="flex w-full flex-wrap items-center animate-pulse lg:flex-nowrap">
      {[1, 2, 3, 4].map((item, index) => (
        <div
          key={item}
          className={`border-custom-slate-border w-full p-6 md:w-1/2 lg:w-1/4 ${
            index < 3 ? 'border-b lg:border-r lg:border-b-0' : ''
          } ${index % 2 === 0 ? 'md:border-r' : ''} ${
            index >= 2 ? 'md:border-b-0' : 'md:border-b'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-3">
              <div className="h-4 w-16 rounded bg-slate-200" />
              <div>
                <div className="h-8 w-12 rounded bg-slate-200" />
                <div className="mt-2.5 flex items-center gap-2">
                  <div className="h-3 w-20 rounded bg-slate-200/80" />
                  <div className="h-5 w-16 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
            <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
