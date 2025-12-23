// BugsTable.jsx
import React from "react";
import { Table } from "../../molecules/Table";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import { FaBug } from "react-icons/fa";

/* ================= COLUMNS ================= */
const bugColumns = [
  { key: "title", label: "Bug" },
  { key: "project", label: "Project", align: "center" },
  { key: "priority", label: "Priority", align: "center" },
  { key: "status", label: "Status", align: "center" },
  { key: "created", label: "Created", align: "center" },
  { key: "actions", label: "Actions", align: "center" },
];

/* ================= STYLES ================= */
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

/* ================= TABLE ================= */
const BugsTable = ({ bugs = [], onView }) => {
  const isEmpty = bugs.length === 0;

  // 👇 Inject ONE fake row when empty
  const tableData = isEmpty ? [{ __empty: true }] : bugs;

  return (
    <Table
      columns={bugColumns}
      data={tableData}
      thColor="from-[var(--primary)] to-[var(--primary-hover)]"
      trHoverColor={
        isEmpty ? "" : "hover:bg-[var(--secondary)]/20 hover:text-white"
      }
      renderCell={(bug, key) => {
        if (key === "__empty") {
          return (
            <div className="flex flex-col items-center justify-center gap-2">
              <FaBug className="text-4xl text-gray-400" />
              <span>No bugs found</span>
            </div>
          );
        }

        /* ================= STATUS ================= */
        if (key === "status") {
          const style = statusStyles[bug.status?.toLowerCase()] || {
            bg: "#ccc",
            text: "#000",
          };
          return (
            <div className="flex justify-center">
              <span
                className="px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {bug.status || "—"}
              </span>
            </div>
          );
        }

        /* ================= PRIORITY ================= */
        if (key === "priority") {
          const style = priorityStyles[bug.priority?.toLowerCase()] || {
            bg: "#ccc",
            text: "#000",
          };
          return (
            <div className="flex justify-center">
              <span
                className="px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {bug.priority || "—"}
              </span>
            </div>
          );
        }

        /* ================= CREATED ================= */
        if (key === "created") {
          return (
            <span className="text-sm font-medium">
              {bug.created
                ? new Date(bug.created).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—"}
            </span>
          );
        }

        /* ================= PROJECT ================= */
        if (key === "project") {
          return (
            <span className="text-sm font-medium">
              {bug.projectId?.name || "N/A"}
            </span>
          );
        }

        /* ================= ACTIONS ================= */
        if (key === "actions") {
          return (
            <div className="flex justify-center">
              <PrimaryButton
                title="View"
                handler={() => onView?.(bug)}
                className="px-2 py-1 text-xs min-w-[65px] max-w-[90px] h-[30px] hover:bg-(--primary) hover:text-(--accent-light)"
                variant="outline"
              />
            </div>
          );
        }

        /* ================= DEFAULT ================= */
        return <span>{bug[key] ?? "—"}</span>;
      }}
    />
  );
};

export default BugsTable;
