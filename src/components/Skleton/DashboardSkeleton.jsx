import PressedContainer from "../atoms/PressedContainer";
import ActivitySkeleton from "./ActivitySkeleton";
import CalendarWidgetSkeleton from "./CalendarWidgetSkeleton";
import NotificationsSkeleton from "./NotificationsSkeleton";
import ProfileHeaderSkeleton from "./ProfileHeaderSkleton";
import StatsCardsSkeleton from "./StatsCardsSkeleton";
import TableSkeleton from "./TableSkeleton";
import TeamListSkeleton from "./TeamListSkeleton";

const DashboardSkeleton = () => {
  return (
    <div className="h-full w-full p-8 bg-[var(--accent-light)] overflow-auto space-y-10">
      {/* Profile */}
      <ProfileHeaderSkeleton />

      {/* Stats */}
      <StatsCardsSkeleton />

      {/* Bugs */}
      <section className="space-y-4">
        <div className="h-6 w-40 bg-gray-300 rounded animate-pulse" />
        <TableSkeleton rows={5} />
      </section>

      {/* Projects */}
      <section className="space-y-4">
        <div className="h-6 w-48 bg-gray-300 rounded animate-pulse" />
        <TableSkeleton rows={5} />
      </section>

      {/* Teams */}
      <TeamListSkeleton />

      {/* Bottom widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <PressedContainer className="h-[260px] animate-pulse bg-gray-200" />
          <PressedContainer className="h-[260px] animate-pulse bg-gray-200" /> */}
          <CalendarWidgetSkeleton />
          <NotificationsSkeleton />
        </div>
        <ActivitySkeleton />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
