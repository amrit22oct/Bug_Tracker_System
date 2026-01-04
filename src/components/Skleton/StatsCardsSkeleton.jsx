import PressedContainer from "../atoms/PressedContainer";

const StatsCardsSkeleton = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <PressedContainer key={i} className="p-6 bg-gray-200 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="w-12 h-12 rounded-xl bg-gray-300" />
            <div className="w-16 h-3 bg-gray-300 rounded" />
          </div>

          <div className="mt-6 space-y-2">
            <div className="w-32 h-4 bg-gray-300 rounded" />
            <div className="w-20 h-8 bg-gray-300 rounded" />
          </div>
        </PressedContainer>
      ))}
    </section>
  );
};

export default StatsCardsSkeleton;
