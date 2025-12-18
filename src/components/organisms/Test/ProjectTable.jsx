// ProjectsTable.jsx
import React from "react";
import { Table } from "../../molecules/Table";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";

const projectColumns = [
  { key: "name", label: "Project" },
  { key: "manager", label: "Manager", align: "center" },
  { key: "deadline", label: "Deadline", align: "center" },
  { key: "progress", label: "Progress", align: "center" },
  { key: "status", label: "Status", align: "center" },
  { key: "actions", label: "Actions", align: "center" },
];

const statusStyles = {
  completed: { bg: "var(--accent)", text: "var(--primary)" },
  "in progress": { bg: "var(--secondary-hover)", text: "var(--primary)" },
  active: { bg: "var(--primary)", text: "var(--accent-light)" },
  open: { bg: "#e5533d", text: "var(--primary)" },
  onhold: { bg: "#fbbf24", text: "var(--primary)" },
  "on hold": { bg: "#fbbf24", text: "var(--primary)" },
  delayed: { bg: "#f87171", text: "var(--primary)" },
  cancelled: { bg: "var(--background)", text: "var(--primary)" },
};

const ProjectsTable = ({ projects = [], onView }) => {
  return (
    <Table
      columns={projectColumns}
      data={projects}
      thColor="from-[var(--primary)] to-[var(--primary-hover)]"
      trHoverColor="hover:bg-[var(--secondary)]/20 hover:text-white"
      renderCell={(project, key) => {
        /* ================= MANAGER ================= */
        if (key === "manager") {
          const managerName =
            !project.manager || project.manager === "N/A" ? "Admin" : project.manager;
          return (
            <span className="text-sm text-[var(--text-primary)] font-medium">
              {managerName}
            </span>
          );
        }
        

        /* ================= PROGRESS ================= */
        if (key === "progress") {
          const progress = project.progress ?? 0;
          return (
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[120px] h-4 bg-[var(--primary)]/20 border rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "var(--secondary)",
                  }}
                />
              </div>
              <span className="ml-2 text-xs font-medium text-[var(--text-primary)]">
                {progress}%
              </span>
            </div>
          );
        }

        /* ================= STATUS ================= */
        if (key === "status") {
          const rawStatus = project.status || "Active";
          const statusKey = rawStatus.toLowerCase();
          const style =
            statusStyles[statusKey] || { bg: "#ccc", text: "#000" };

          return (
            <div className="flex items-center justify-center">
              <span
                className="px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
                style={{
                  backgroundColor: style.bg,
                  color: style.text,
                }}
              >
                {rawStatus}
              </span>
            </div>
          );
        }

        /* ================= DEADLINE ================= */
        if (key === "deadline") {
          if (!project.deadline) return "—";
          return (
            <span className="text-sm text-[var(--text-primary)] font-medium">
              {new Date(project.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          );
        }

        /* ================= ACTIONS ================= */
        if (key === "actions") {
          return (
            <div className="flex justify-center">
              <PrimaryButton
                title="View"
                handler={() => onView?.(project)}
                className="px-2 py-1 text-xs min-w-[65px] max-w-[90px] h-[30px] hover:bg-(--primary) hover:text-(--accent-light)"
                variant="outline"
              />
            </div>
          );
        }

        /* ================= DEFAULT ================= */
        return (
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {project[key] ?? "—"}
          </span>
        );
      }}
    />
  );
};

export default ProjectsTable;
