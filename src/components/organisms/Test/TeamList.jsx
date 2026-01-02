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
        Teams Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {team.map((m) => {
          const performance = getPerformanceStatus(m.teamProgress);

          return (
            <div
              key={m._id}
              className="border rounded-xl bg-white/50 hover:bg-[var(--secondary)]/20 transition-all p-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-[var(--primary)]">
                    {m.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Lead: {m.leadName}
                  </p>
                </div>

                <span className={`text-xs font-semibold ${performanceColors[performance]}`}>
                  {performance}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                <div>
                  <strong>{m.totalProjects}</strong> Projects
                </div>
                <div>
                  <strong>{m.completedProjects}</strong> Completed
                </div>
                <div>
                  <strong>{m.totalBugs}</strong> Bugs
                </div>
                <div>
                  <strong>{m.teamBugsInProgress}</strong> In Progress
                </div>
              </div>

              {/* Deadline */}
              <p className="text-xs mt-2">
                <strong>{m.nearestDeadline}</strong> Nearest Deadline
              </p>

              {/* Progress Bar */}
              <div className="w-full mt-2">
  {/* Progress Bar */}
  <div className="relative w-full h-3 bg-[var(--primary)]/20 rounded-full overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-700 ease-out"
      style={{
        width: `${Math.min(m.teamProgress, 100)}%`,
        background:
          m.teamProgress === 100
            ? "linear-gradient(90deg, #22c55e, #16a34a)" // ✅ Completed (Green)
            : m.teamProgress > 0
            ? "linear-gradient(90deg, #facc15, #f59e0b)" // 🟡 In Progress (Yellow)
            : "linear-gradient(90deg, #94a3b8, #64748b)", // ⚪ Planned (Gray)
      }}
    />
  </div>

  {/* Percentage Text */}
  <div className="flex justify-end mt-1">
    <span className="text-[11px] font-medium text-muted-foreground">
      {m.teamProgress}%
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
