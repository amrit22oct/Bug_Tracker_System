import React from "react";
import PressedContainer from "../../atoms/PressedContainer";
import { getCalendarDays } from "../../../utils/GetCalenderDays.jsx";

const CalendarWidget = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Example important dates
  const importantDates = [
    { day: 5, label: "Meeting", color: "var(--secondary)" },
    { day: 12, label: "Deadline", color: "var(--accent)" },
    { day: 18, label: "Review", color: "#fbbf24" },
    { day: 22, label: "Launch", color: "#e5533d" },
  ];

  const days = getCalendarDays(year, month);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <PressedContainer className="p-6 bg-[var(--accent-light)] border-[var(--primary)]">
      {/* Header */}
      <h2 className="text-[var(--primary)] font-semibold text-lg mb-4">Calendar</h2>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-[var(--text-primary)] mb-1">
        {weekDays.map((wd) => (
          <div key={wd}>{wd}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {days.map((day, i) => {
          const isToday = day === today.getDate();
          const important = importantDates.find((d) => d.day === day);

          return (
            <div
              key={i}
              className={`
                relative
                p-2 rounded-lg transition-all duration-200
                ${isToday ? "bg-[var(--secondary)] text-white shadow-md" : "bg-white text-[var(--text-primary)] hover:bg-[var(--secondary)]/20"}
              `}
            >
              {day || ""}
              {important && (
                <span
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: important.color }}
                  title={important.label}
                />
              )}
            </div>
          );
        })}
      </div>
    </PressedContainer>
  );
};

export default CalendarWidget;
