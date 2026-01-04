import PressedContainer from "../atoms/PressedContainer";

const ProfileHeaderSkeleton = () => {
  return (
    <PressedContainer className="relative p-4 sm:p-6 bg-(--accent-light)">
      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
        {/* Avatar */}
        <div className="w-[100px] h-[100px] rounded-full bg-gray-300 animate-pulse flex-shrink-0" />

        {/* Text */}
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="h-7 w-48 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-56 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>

      {/* 🔘 Action Buttons Skeleton */}
      <div className="mt-4 md:mt-0 md:absolute md:top-4 md:right-4 flex gap-2 md:gap-3 justify-center md:justify-end">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="h-8 md:h-10 w-24 md:w-28 rounded-md bg-gray-300 animate-pulse"
          />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4 md:mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-2xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    </PressedContainer>
  );
};

export default ProfileHeaderSkeleton;
