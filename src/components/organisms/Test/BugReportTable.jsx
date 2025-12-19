import React from "react";
import { Table } from "../../molecules/Table";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";

const columns = [
  { key: "title", label: "Bug" },
  { key: "project", label: "Project", align: "center" },
  { key: "reportedBy", label: "Reported By", align: "center" },
  { key: "priority", label: "Priority", align: "center" },
  { key: "severity", label: "Severity", align: "center" },
  { key: "status", label: "Status", align: "center" },
  { key: "tags", label: "Tags", align: "center" },
  { key: "attachments", label: "Attachments", align: "center" },
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

const BugReportTable = ({ bugs, onView }) => {
  return (
    <Table
      columns={columns}
      data={bugs}
      thColor="from-[var(--primary)] to-[var(--primary-hover)]"
      trHoverColor="hover:bg-[var(--secondary)]/20"
      renderCell={(report, key) => {
        const bug = report.bugId || report;

        switch (key) {
          case "title":
            return <span>{bug.title || "N/A"}</span>;

            case "project":
               return <span>{report.projectId?.name || "N/A"}</span>;
             
          case "reportedBy":
            return <span>{bug.reportedBy?.name || report.reportedBy?.name || "N/A"}</span>;

          case "priority": {
            const val = report.priority || bug.priority || "N/A";
            const style = priorityStyles[val?.toLowerCase()] || { bg: "#ccc", text: "#000" };
            return (
              <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: style.bg, color: style.text }}>
                {val}
              </span>
            );
          }

          case "severity": {
            const val = bug.severity || report.severity || "N/A";
            const style = severityStyles[val?.toLowerCase()] || { bg: "#ccc", text: "#000" };
            return (
              <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: style.bg, color: style.text }}>
                {val}
              </span>
            );
          }

          case "status": {
            const val = report.status || bug.status || "N/A";
            const style = statusStyles[val?.toLowerCase()] || { bg: "#ccc", text: "#000" };
            return (
              <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: style.bg, color: style.text }}>
                {val}
              </span>
            );
          }

          case "tags": {
            const tags = bug.tags || [];
            return (
              <div className="flex gap-1 justify-center flex-wrap">
                {tags.length > 0
                  ? tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 text-[10px] rounded bg-gray-200">
                        #{tag}
                      </span>
                    ))
                  : <span className="text-gray-400 text-xs">N/A</span>
                }
              </div>
            );
          }

          case "attachments": {
            const attachments = bug.attachments || [];
            return attachments.length > 0 ? (
              <div className="flex flex-col gap-1 items-center">
                {attachments.map((att) => (
                  <a
                    key={att._id}
                    href={att.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-xs"
                  >
                    {att.fileName}
                  </a>
                ))}
              </div>
            ) : (
              <span className="text-gray-400 text-xs">N/A</span>
            );
          }

          case "createdAt":
            return <span>{new Date(bug.createdAt || report.createdAt).toLocaleDateString()}</span>;

          case "actions":
            return (
              <PrimaryButton
                title="View"
                variant="outline"
                className="px-2 py-1 text-xs h-[30px]"
                handler={() => onView?.(report)}
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
