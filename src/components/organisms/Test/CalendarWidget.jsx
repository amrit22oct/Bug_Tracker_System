import React, { useState } from "react";
import PressedContainer from "../../atoms/PressedContainer";
import { getCalendarDays } from "../../../utils/GetCalenderDays.jsx";

const CalendarWidget = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const importantDates = [
    { day: 5, label: "Meeting", color: "var(--secondary)" },
    { day: 10, label: "Upcoming Task", color: "#60a5fa" },
    { day: 14, label: "Due Date", color: "var(--accent)" },
    { day: 20, label: "Review", color: "#fbbf24" },
    { day: 26, label: "Launch", color: "#e5533d" },
  ];

  const days = getCalendarDays(year, month);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const upcoming = importantDates.filter(
    (d) => d.day >= today.getDate() || month !== today.getMonth()
  );

  const changeMonth = (offset) => {
    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDay(null);
  };

  return (
    <PressedContainer className="p-4 sm:p-6 bg-[var(--accent-light)] border-[var(--primary)] w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[var(--primary)] font-semibold text-lg">
          Calendar
        </h2>

        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => changeMonth(-1)}
            className="font-bold cursor-pointer px-2"
          >
            ‹
          </button>

          <span className="font-medium text-[var(--text-primary)]">
            {monthName} {year}
          </span>

          <button
            onClick={() => changeMonth(1)}
            className="font-bold cursor-pointer px-2"
          >
            ›
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-xs font-medium text-[var(--text-primary)] mb-2">
        {weekDays.map((wd) => (
          <div key={wd}>{wd}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((day, i) => {
          const isToday = day === today.getDate() && month === today.getMonth();
          const isSelected = day === selectedDay;
          const events = importantDates.filter((d) => d.day === day);

          return (
            <button
              key={i}
              onClick={() => day && setSelectedDay(day)}
              className={`
                relative flex flex-col items-center justify-center
                h-10 sm:h-11 rounded-lg
                text-xs sm:text-sm
                transition-all cursor-pointer
                ${
                  isSelected
                    ? "bg-[var(--primary)] text-[var(--accent-light)]"
                    : isToday
                    ? "bg-[var(--secondary)] text-white font-semibold shadow-md"
                    : "bg-white hover:bg-[var(--primary)] hover:text-[var(--accent-light)]"
                }
              `}
            >
              {day || ""}

              {/* Event dots */}
              {events.length > 0 && (
                <div className="flex gap-1 absolute bottom-1">
                  {events.map((e, idx) => (
                    <span
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: e.color }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Events */}
      {selectedDay && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-[var(--primary)] mb-2">
            Events on {monthName} {selectedDay}
          </h4>

          <div className="space-y-2">
            {importantDates
              .filter((d) => d.day === selectedDay)
              .map((event, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs bg-[var(--primary)] text-[var(--accent-light)] p-2 rounded-lg cursor-pointer"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                  {event.label}
                </div>
              ))}

            {!importantDates.some((d) => d.day === selectedDay) && (
              <p className="text-xs text-[var(--text-primary)]">
                No events scheduled
              </p>
            )}
          </div>
        </div>
      )}

      {/* Upcoming */}
      <div className="mt-5">
        <h4 className="text-sm font-semibold text-[var(--primary)] mb-2">
          Upcoming
        </h4>

        <div className="flex flex-col gap-2 text-xs">
          {upcoming.slice(0, 3).map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: e.color }}
              />
              <span>
                {monthName} {e.day} — {e.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PressedContainer>
  );
};

export default CalendarWidget;
