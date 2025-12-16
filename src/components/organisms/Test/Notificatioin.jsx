import React from "react";
import { FaBell, FaClock } from "react-icons/fa";
import PressedContainer from "../../atoms/PressedContainer";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";

const Notifications = ({ notifications, onView }) => {
  return (
    <PressedContainer className="p-4 sm:p-6 bg-[var(--accent-light)] border-[var(--primary)] w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <FaBell className="text-[var(--primary)] text-lg flex-shrink-0" />
        <h2 className="text-[var(--primary)] font-semibold text-lg">
          Notifications
        </h2>
      </div>

      {/* Notification List */}
      <div className="space-y-3 sm:space-y-4 max-h-[22rem] sm:max-h-96 overflow-y-auto">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="
              flex flex-col sm:flex-row
              sm:items-center sm:justify-between
              gap-3 sm:gap-4
              p-3 rounded-xl border
              bg-white/50 hover:bg-[var(--secondary)]/20
              transition-all duration-200
            "
          >
            {/* Left Section */}
            <div className="flex items-center gap-3 flex-1">
              {/* Icon */}
              <div className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-[var(--primary)]/80 text-[var(--accent-light)] flex-shrink-0">
                <FaClock />
              </div>

              {/* Text */}
              <p className="text-sm text-[var(--text-primary)] leading-snug">
                {n}
              </p>
            </div>

            {/* Button */}
            <div className="flex justify-end sm:justify-center">
              <PrimaryButton
                title="View"
                onClick={() => onView && onView(n)}
                variant="outline"
                className="
                  px-3 py-1 text-xs
                  min-w-[70px] h-[32px]
                  cursor-pointer
                  hover:bg-[var(--primary)]
                  hover:text-[var(--accent-light)]
                "
              />
            </div>
          </div>
        ))}
      </div>
    </PressedContainer>
  );
};

export default Notifications;
