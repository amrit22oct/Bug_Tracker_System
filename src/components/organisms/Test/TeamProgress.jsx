import React from "react";
import PressedContainer from "../../atoms/PressedContainer";

const roleColors = {
  "Frontend Developer": "bg-[var(--secondary)] text-[var(--primary)]",
  "Backend Developer": "bg-[var(--accent-light)] text-[var(--text-primary)]",
  "API Engineer": "bg-[var(--accent)] text-[var(--primary)]",
  "QA Engineer": "bg-[var(--secondary-hover)] text-[var(--primary)]",
};

const performanceColors = {
  Excellent: "text-green-600",
  Good: "text-yellow-600",
  Average: "text-orange-500",
  "Needs Improvement": "text-red-500",
};

const TeamList = ({ team }) => {
  const getPerformanceStatus = (progress) => {
    if (progress >= 80) return "Excellent";
    if (progress >= 60) return "Good";
    if (progress >= 40) return "Average";
    return "Needs Improvement";
  };

  return (
    <PressedContainer className="p-6 bg-[var(--accent-light)] border-[var(--primary)]">
      <h2 className="text-[var(--primary)] font-semibold text-lg mb-6 flex items-center gap-2">
        My Team
      </h2>

      <div className="space-y-4">
        {team.map((m) => {
          const performance = getPerformanceStatus(m.progress);

          return (
            <div
              key={m.name}
              className="group flex items-center gap-4 p-4 rounded-xl border  rounded-xl bg-white/50 hover:bg-[var(--secondary)]/20 transition-all duration-200"
            >
              {/* Avatar */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--primary)]/80 text-(--accent-light) flex items-center justify-center font-bold text-sm">
                {m.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div className="flex-1">
                {/* Name & Role */}
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <span className="font-medium text-[var(--primary)]">{m.name}</span>
                    {m.role && (
                      <span
                        className={`ml-2 text-xs px-2 py-0.5 rounded-full inline-block shadow-sm ${
                          roleColors[m.role] || "bg-gray-200 text-black"
                        }`}
                      >
                        {m.role}
                      </span>
                    )}
                  </div>

                  {/* Performance */}
                  <span className={`text-xs font-semibold ${performanceColors[performance]}`}>
                    {performance}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-4 bg-[var(--primary)]/20 rounded-full shadow-inner">
                  <div
                    className="h-4 rounded-full transition-all duration-700 ease-in-out"
                    style={{
                      width: `${m.progress}%`,
                      background: "linear-gradient(90deg, var(--secondary), var(--secondary-hover))",
                    }}
                  />
                  <span className="absolute right-2 top-0 text-xs font-medium text-[var(--primary)]">
                    {m.progress}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PressedContainer>
  );
};

export default TeamList;
