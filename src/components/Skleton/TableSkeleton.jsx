import React from "react";

const TableSkeleton = ({ rows = 10 }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-gray-200">
        {["Project", "Manager", "Deadline", "Progress", "Status", "Actions"].map(
          (_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-300 rounded animate-pulse"
            />
          )
        )}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-6 gap-4 px-4 py-3 border-b last:border-b-0"
        >
          {/* Project name */}
          <div className="h-4 bg-gray-200 rounded animate-pulse" />

          {/* Manager */}
          <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-3/4" />

          {/* Deadline */}
          <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-2/3" />

          {/* Progress */}
          <div className="flex items-center gap-2 justify-center">
            <div className="w-[120px] h-4 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Status */}
          <div className="flex justify-center">
            <div className="w-16 h-5 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Actions */}
          <div className="flex justify-center">
            <div className="w-[65px] h-[30px] bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
