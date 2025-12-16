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
    <PressedContainer className="w-full p-3 sm:p-6 bg-[var(--accent-light)] border-[var(--primary)]">
      <h2 className="text-[var(--primary)] font-semibold text-lg mb-4 sm:mb-6">
        My Team
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {team.map((m) => {
          const performance = getPerformanceStatus(m.progress);

          return (
            <div
              key={m.name}
              className="border rounded-xl bg-white/50 hover:bg-[var(--secondary)]/20 transition-all p-3 sm:p-4"
            >
              {/* Top Row (Mobile Clean Header) */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/80 text-(--accent-light) flex items-center justify-center font-bold text-sm">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div>
                    <p className="font-medium text-[var(--primary)] text-sm">
                      {m.name}
                    </p>
                    {m.role && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full shadow-sm ${roleColors[m.role]}`}
                      >
                        {m.role}
                      </span>
                    )}
                  </div>
                </div>

                <span
                  className={`text-xs font-semibold ${performanceColors[performance]}`}
                >
                  {performance}
                </span>
              </div>

              {/* Stats (Compact Mobile Grid) */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div>
                  <span className="font-semibold">{m.projectsAssigned || 0}</span>{" "}
                  Projects
                </div>
                <div>
                  <span className="font-semibold">{m.bugsAssigned || 0}</span>{" "}
                  Bugs
                </div>
                <div>
                  <span className="font-semibold">{m.completedTasks || 0}</span>{" "}
                  Done
                </div>
                <div>
                  <span className="font-semibold">{m.pendingTasks || 0}</span>{" "}
                  Pending
                </div>
              </div>

              {/* Deadline */}
              <p className="text-xs mt-2">
                <span className="font-semibold">{m.deadline || "-"}</span>{" "}
                Deadline
              </p>

              {/* Progress */}
              <div className="relative w-full h-3 bg-[var(--primary)]/20 rounded-full shadow-inner mt-2">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${m.progress}%`,
                    background:
                      "linear-gradient(90deg, var(--secondary), var(--secondary-hover))",
                  }}
                />
                <span className="absolute right-2 top-0 text-[10px] font-medium text-[var(--primary)]">
                  {m.progress}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </PressedContainer>
  );
};

export default TeamList;
