// BugReportTable.jsx
import React from "react";
import { Table } from "../../molecules/Table";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import { FaBug } from "react-icons/fa";

const columns = [
  { key: "title", label: "Bug" },
  { key: "project", label: "Project", align: "center" },
  { key: "reportedBy", label: "Reported By", align: "center" },
  { key: "priority", label: "Priority", align: "center" },
  { key: "severity", label: "Severity", align: "center" },
  { key: "status", label: "Status", align: "center" },
  // { key: "tags", label: "Tags", align: "center" },
  // { key: "attachments", label: "Attachments", align: "center" },
  { key: "createdAt", label: "Created", align: "center" },
  { key: "actions", label: "Actions", align: "center" },
];

const statusStyles = {
  open: { bg: "#ef4444", text: "#fff" },
  pending: { bg: "#fbbf24", text: "#000" },
  resolved: { bg: "#22c55e", text: "#fff" },
  closed: { bg: "#9ca3af", text: "#fff" },
};

const priorityStyles = {
  high: { bg: "#dc2626", text: "#fff" },
  medium: { bg: "#f59e0b", text: "#000" },
  low: { bg: "#10b981", text: "#fff" },
};

const severityStyles = {
  critical: { bg: "#b91c1c", text: "#fff" },
  major: { bg: "#f97316", text: "#fff" },
  minor: { bg: "#eab308", text: "#000" },
};

const BugReportTable = ({ bugs = [], onView }) => {
  const isEmpty = bugs.length === 0;
  const tableData = isEmpty ? [{ __empty: true }] : bugs;

  return (
    <Table
      columns={columns}
      data={tableData}
      thColor="from-[var(--primary)] to-[var(--primary-hover)]"
      trHoverColor={isEmpty ? "" : "hover:bg-[var(--secondary)]/20"}
      renderCell={(report, key) => {
        /* ================= EMPTY STATE ================= */
        if (key === "__empty") {
          return (
            <div className="flex flex-col items-center justify-center py-8 w-full col-span-full">
               <FaBug className="text-4xl text-gray-400" />
              <span className="text-gray-400 text-sm">No reports found</span>
            </div>
          );
        }

        switch (key) {
          case "title":
            return <span>{report.title}</span>;

          case "project":
            return <span>{report.projectId?.name || "N/A"}</span>;

          case "reportedBy":
            return <span>{report.reportedBy?.name || "N/A"}</span>;

          case "priority": {
            const val = report.priority;
            const style =
              priorityStyles[val?.toLowerCase()] || { bg: "#ccc", text: "#000" };
            return (
              <span
                className="px-2 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {val}
              </span>
            );
          }

          case "severity": {
            const val = report.severity;
            const style =
              severityStyles[val?.toLowerCase()] || { bg: "#ccc", text: "#000" };
            return (
              <span
                className="px-2 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {val}
              </span>
            );
          }

          case "status": {
            const val = report.status;
            const style =
              statusStyles[val?.toLowerCase()] || { bg: "#ccc", text: "#000" };
            return (
              <span
                className="px-2 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {val}
              </span>
            );
          }

          case "createdAt":
            return <span>{new Date(report.createdAt).toLocaleDateString()}</span>;

          case "actions":
            return (
              <PrimaryButton
                title="View"
                variant="outline"
                className="px-2 py-1 text-xs h-[30px] hover:bg-(--primary) hover:text-(--accent-light)"
                handler={() => onView(report)}
              />
            );

          default:
            return null;
        }
      }}
    />
  );
};

export default BugReportTable;
