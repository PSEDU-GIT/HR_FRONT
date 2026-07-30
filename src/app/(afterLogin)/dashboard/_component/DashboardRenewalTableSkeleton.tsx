export default function DashboardRenewalTableSkeleton() {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <tr key={item} className="animate-pulse">
          <td colSpan={4} className="px-3 py-4">
            <div className="h-8 w-full rounded-lg bg-slate-100/70" />
          </td>
        </tr>
      ))}
    </>
  );
}
