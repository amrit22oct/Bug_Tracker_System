import PressedContainer from "../atoms/PressedContainer";

const TeamListSkeleton = () => {
  return (
    <PressedContainer className="p-6 bg-[var(--accent-light)]">
      <div className="h-6 w-48 bg-gray-300 rounded animate-pulse mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-gray-200 animate-pulse space-y-3"
          >
            <div className="flex justify-between">
              <div className="h-4 w-32 bg-gray-300 rounded" />
              <div className="h-4 w-20 bg-gray-300 rounded" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="h-3 bg-gray-300 rounded" />
              <div className="h-3 bg-gray-300 rounded" />
              <div className="h-3 bg-gray-300 rounded" />
              <div className="h-3 bg-gray-300 rounded" />
            </div>

            <div className="h-3 w-32 bg-gray-300 rounded" />
            <div className="h-3 w-full bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </PressedContainer>
  );
};

export default TeamListSkeleton;
