import DashboardStatsArea from './_area/DashboardStats.area';
import DashboardRenewalArea from './_area/DashboardRenewal.area';

export default function DashboardPage() {
  return (
    <div className="w-full space-y-6 pt-4">
      <DashboardStatsArea />
      <DashboardRenewalArea />
    </div>
  );
}
