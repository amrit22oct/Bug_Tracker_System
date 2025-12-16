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
    <div className="flex justify-center w-full px-4 sm:px-6">
      <PressedContainer className="w-full max-w-4xl p-4 sm:p-6 bg-[var(--accent-light)] border-[var(--primary)]">
        <h2 className="text-[var(--primary)] font-semibold text-lg mb-4 sm:mb-6 flex items-center gap-2 justify-center sm:justify-start">
          My Team
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {team.map((m) => {
            const performance = getPerformanceStatus(m.progress);

            return (
              <div
                key={m.name}
                className="group flex flex-col items-center sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border bg-white/50 hover:bg-[var(--secondary)]/20 transition-all duration-200 w-full"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--primary)]/80 text-(--accent-light) flex items-center justify-center font-bold text-base">
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div className="flex-1 w-full flex flex-col items-center sm:items-start">
                  {/* Name & Role */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1 sm:gap-0 w-full text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1">
                      <span className="font-medium text-[var(--primary)] text-sm sm:text-base">{m.name}</span>
                      {m.role && (
                        <span
                          className={`ml-0 sm:ml-2 text-[10px] sm:text-xs px-2 py-0.5 rounded-full inline-block shadow-sm ${
                            roleColors[m.role] || "bg-gray-200 text-black"
                          }`}
                        >
                          {m.role}
                        </span>
                      )}
                    </div>

                    {/* Performance */}
                    <span className={`text-xs sm:text-sm font-semibold ${performanceColors[performance]}`}>
                      {performance}
                    </span>
                  </div>

                  {/* Detailed Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full text-center sm:text-left mt-2 text-xs sm:text-sm">
                    <div>
                      <span className="font-semibold">{m.projectsAssigned || 0}</span> Projects
                    </div>
                    <div>
                      <span className="font-semibold">{m.bugsAssigned || 0}</span> Bugs
                    </div>
                    <div>
                      <span className="font-semibold">{m.completedTasks || 0}</span> Completed
                    </div>
                    <div>
                      <span className="font-semibold">{m.pendingTasks || 0}</span> Pending
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-semibold">{m.deadline || "-"}</span> Deadline
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative w-full h-3 sm:h-4 bg-[var(--primary)]/20 rounded-full shadow-inner mt-2">
                    <div
                      className="h-3 sm:h-4 rounded-full transition-all duration-700 ease-in-out"
                      style={{
                        width: `${m.progress}%`,
                        background: "linear-gradient(90deg, var(--secondary), var(--secondary-hover))",
                      }}
                    />
                    <span className="absolute right-2 top-0 text-[10px] sm:text-xs font-medium text-[var(--primary)]">
                      {m.progress}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PressedContainer>
    </div>
  );
};

export default TeamList;
