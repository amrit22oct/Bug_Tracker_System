import React from "react";
import { Table } from "../../molecules/Table";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import { FaBug } from "react-icons/fa";

/* ================= COLUMNS ================= */
const bugColumns = [
  { key: "title", label: "Bug" },
  { key: "projectId", label: "Project", align: "center" },
  { key: "parentBug", label: "Parent bug", align: "center" },
  { key: "priority", label: "Priority", align: "center" },
  { key: "status", label: "Status", align: "center" },
  { key: "createdAt", label: "Created", align: "center" },
  { key: "actions", label: "Actions", align: "center" },
];

/* ================= STYLES ================= */
const statusStyles = {
  open: { bg: "#e5533d", text: "var(--primary)" },
  "in progress": { bg: "var(--secondary-hover)", text: "var(--primary)" },
  resolved: { bg: "var(--accent)", text: "var(--primary)" },
  closed: { bg: "#9ca3af", text: "white" },
};

const priorityStyles = {
  high: { bg: "#f87171", text: "var(--primary)" },
  medium: { bg: "#fbbf24", text: "var(--primary)" },
  low: { bg: "var(--accent-light)", text: "var(--primary)" },
};

/* ================= TABLE ================= */
const SubBugsTable = ({ bugs = [], onView }) => {
  const isEmpty = bugs.length === 0;

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
        /* ============ EMPTY STATE ============ */
        if (bug.__empty) {
          return (
            <div className="flex flex-col items-center justify-center gap-2 py-6">
              <FaBug className="text-4xl text-gray-400" />
              <span className="text-sm text-gray-500">No sub-bugs found</span>
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
                className="px-2 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {bug.status}
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
                className="px-2 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {bug.priority}
              </span>
            </div>
          );
        }

        /* ================= CREATED ================= */
        if (key === "createdAt") {
          return (
            <span className="text-sm font-medium">
              {new Date(bug.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          );
        }

        /* ================= PROJECT ================= */
        if (key === "projectId") {
          return (
            <span className="text-sm font-medium">
              {bug.projectId?.name || "N/A"}
            </span>
          );
        }

      //   parentBug

       /* ================= PARENT BUG ================= */
       if (key === "parentBug") {
         return (
           <span className="text-sm font-medium">
             {bug.parentBug?.title || "N/A"}
           </span>
         );
       }

        /* ================= ACTIONS ================= */
        if (key === "actions") {
          return (
            <div className="flex justify-center">
              <PrimaryButton
                title="View"
                handler={() => onView?.(bug._id)}
                className="px-2 py-1 text-xs min-w-[65px] h-[30px]"
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

export default SubBugsTable;
