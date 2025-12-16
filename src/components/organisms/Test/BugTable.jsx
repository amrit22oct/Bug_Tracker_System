// BugsTable.jsx
import React from "react";
import { Table } from "../../molecules/Table";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";

const bugColumns = [
  { key: "title", label: "Bug" },
  { key: "priority", label: "Priority", align: "center" },
  { key: "status", label: "Status", align: "center" },
  { key: "created", label: "Created", align: "center" },
  { key: "actions", label: "Actions", align: "center" },
];

const statusStyles = {
  open: { bg: "#e5533d", text: "var(--primary)" },
  "in progress": { bg: "var(--secondary-hover)", text: "var(--primary)" },
  closed: { bg: "var(--accent)", text: "var(--primary)" },
};

const priorityStyles = {
  high: { bg: "#f87171", text: "var(--primary)" },
  medium: { bg: "#fbbf24", text: "var(--primary)" },
  low: { bg: "var(--accent-light)", text: "var(--primary)" },
};

const BugsTable = ({ bugs, onView }) => {
  return (
    <Table
      columns={bugColumns}
      data={bugs}
      thColor="from-[var(--primary)] to-[var(--primary-hover)]"
      trHoverColor="hover:bg-[var(--secondary)]/20 hover:text-white"
      renderCell={(bug, key) => {
        if (key === "status") {
          const style =
            statusStyles[bug.status.toLowerCase()] || {
              bg: "#ccc",
              text: "#000",
            };
          return (
            <div className="flex items-center justify-center">
              <span
                className="px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
                style={{
                  backgroundColor: style.bg,
                  color: style.text,
                }}
              >
                {bug.status}
              </span>
            </div>
          );
        }

        if (key === "priority") {
          const style =
            priorityStyles[bug.priority.toLowerCase()] || {
              bg: "#ccc",
              text: "#000",
            };
          return (
            <div className="flex items-center justify-center">
              <span
                className="px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
                style={{
                  backgroundColor: style.bg,
                  color: style.text,
                }}
              >
                {bug.priority}
              </span>
            </div>
          );
        }

        if (key === "created") {
          return (
            <span className="text-sm text-[var(--text-primary)] font-medium">
              {new Date(bug.created).toLocaleDateString("en-US", {
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
                onClick={() => onView && onView(bug)}
                className="px-2 py-1 text-xs min-w-[65px] max-w-[90px] h-[30px] hover:bg-(--primary) hover:text-(--accent-light)"
                variant="outline"
              />
            </div>
          );
        }

        return (
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {bug[key]}
          </span>
        );
      }}
    />
  );
};

export default BugsTable;
