// ProjectsTable.jsx
import React from "react";
import { Table } from "../../molecules/Table";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton"; // adjust path

const projectColumns = [
  { key: "name", label: "Project" },
  { key: "manager", label: "Manager", align: "center" },
  { key: "deadline", label: "Deadline", align: "center" },
  { key: "progress", label: "Progress", align: "center" },
  { key: "status", label: "Status", align: "center" },
  { key: "actions", label: "Actions", align: "center" }, // Actions column
];

const statusStyles = {
  completed: { bg: "var(--accent)", text: "var(--primary)" },
  "in progress": { bg: "var(--secondary-hover)", text: "var(--primary)" },
  active: { bg: "var(--primary)", text: "var(--accent-light)" },
  open: { bg: "#e5533d", text: "var(--primary)" },
  onhold: { bg: "#fbbf24", text: "var(--primary)" },
  delayed: { bg: "#f87171", text: "var(--primary)" },
  cancelled: { bg: "var(--background)", text: "var(--primary)" },
  recent: { bg: "var(--secondary)", text: "var(--primary)" },
};

const ProjectsTable = ({ projects, onView }) => {
  return (
    <Table
      columns={projectColumns}
      data={projects}
      thColor="from-[var(--primary)] to-[var(--primary-hover)]"
      trHoverColor="hover:bg-[var(--secondary)]/20 hover:text-white"
      renderCell={(project, key) => {
        if (key === "progress") {
          return (
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[120px] h-4 bg-[var(--primary)]/20 border rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${project.progress}%`,
                    backgroundColor: "var(--secondary)",
                  }}
                />
              </div>
              <span className="ml-2 text-xs font-medium text-[var(--text-primary)]">
                {project.progress}%
              </span>
            </div>
          );
        }

        if (key === "status") {
          const statusKey = project.status.toLowerCase();
          const style = statusStyles[statusKey] || { bg: "#ccc", text: "#000" };
          return (
            <div className="flex items-center justify-center">
              <span
                className="px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {project.status}
              </span>
            </div>
          );
        }

        if (key === "deadline") {
          return (
            <span className="text-sm text-[var(--text-primary)] font-medium">
              {new Date(project[key]).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          );
        }

        if (key === "actions") {
          return (
            <div className="flex justify-center">
              <PrimaryButton
                title="View"
                handler={() => onView && onView(project)}
                className="px-2 py-1 text-xs min-w-[65px] max-w-[90px] h-[30px] hover:bg-(--primary) hover:text-(--accent-light)"
                variant="outline"
              />
            </div>
          );
        }

        return (
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {project[key]}
          </span>
        );
      }}
    />
  );
};

export default ProjectsTable;
