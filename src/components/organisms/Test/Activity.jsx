import React from "react";
import { FaClock } from "react-icons/fa";
import PressedContainer from "../../atoms/PressedContainer"; // adjust path
import PrimaryButton from "../../atoms/Buttons/PrimaryButton"; // adjust path

const ActivityList = ({ activities, onView }) => {
  return (
    <PressedContainer className="p-6 bg-[var(--accent-light)] border-[var(--primary)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <FaClock className="text-[var(--primary)] text-lg" />
        <h2 className="text-[var(--primary)] font-semibold text-lg">Recent Activity</h2>
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((a, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 p-3 rounded-xl border bg-white/50 hover:bg-[var(--secondary)]/20 transition-all duration-200"
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl text-(--accent-light) bg-[var(--primary)]/80 flex-shrink-0">
              <FaClock />
            </div>

            {/* Activity Text */}
            <p className="text-sm text-[var(--text-primary)] flex-1">{a}</p>

            {/* Optional View Button */}
            {onView && (
              <PrimaryButton
                title="View"
                onClick={() => onView(a)}
                className="px-2 py-1 text-xs min-w-[65px] max-w-[90px] h-[30px] hover:bg-[var(--primary)] hover:text-[var(--accent-light)]"
                variant="outline"
              />
            )}
          </div>
        ))}
      </div>
    </PressedContainer>
  );
};

export default ActivityList;
