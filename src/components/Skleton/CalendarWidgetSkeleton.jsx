import PressedContainer from "../atoms/PressedContainer";

const CalendarWidgetSkeleton = () => {
  return (
    <PressedContainer className="p-4 sm:p-6 bg-[var(--accent-light)] border-[var(--primary)] w-full animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-24 bg-gray-300 rounded" />
        <div className="flex items-center gap-4">
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 w-28 bg-gray-300 rounded" />
          <div className="h-4 w-4 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-3 bg-gray-200 rounded" />
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="h-10 sm:h-11 rounded-lg bg-gray-200" />
        ))}
      </div>

      {/* Selected Day Events */}
      <div className="mt-4 space-y-2">
        <div className="h-4 w-40 bg-gray-300 rounded" />
        <div className="h-8 w-full bg-gray-200 rounded-lg" />
        <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
      </div>

      {/* Upcoming */}
      <div className="mt-5 space-y-2">
        <div className="h-4 w-24 bg-gray-300 rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </PressedContainer>
  );
};

export default CalendarWidgetSkeleton;
