import PressedContainer from "../atoms/PressedContainer";

const NotificationsSkeleton = () => {
  return (
    <PressedContainer className="p-4 sm:p-6 bg-[var(--accent-light)]  w-full animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-5 w-5 bg-gray-300 rounded" />
        <div className="h-5 w-36 bg-gray-300 rounded" />
      </div>

      {/* Notification Items */}
      <div className="space-y-3 sm:space-y-4 max-h-[22rem] sm:max-h-96 overflow-y-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="
              flex flex-col sm:flex-row
              sm:items-center sm:justify-between
              gap-3 sm:gap-4
              p-3 rounded-xl 
              bg-gray-200
            "
          >
            {/* Left */}
            <div className="flex items-center gap-3 flex-1">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gray-300" />
              <div className="h-4 w-full max-w-[260px] bg-gray-300 rounded" />
            </div>

            {/* Button */}
            <div className="flex justify-end sm:justify-center">
              <div className="h-8 w-16 bg-gray-300 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </PressedContainer>
  );
};

export default NotificationsSkeleton;
