import PressedContainer from "../atoms/PressedContainer";

const ActivitySkeleton = () => {
  return (
    <PressedContainer className="p-6 bg-gray-200 animate-pulse h-full">
      <div className="h-5 w-32 bg-gray-300 rounded mb-4" />

      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="flex-1 h-4 bg-gray-300 rounded" />
        </div>
      ))}
    </PressedContainer>
  );
};

export default ActivitySkeleton;
