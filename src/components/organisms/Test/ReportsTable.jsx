import React from "react";
import { Table } from "../../molecules/Table";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";

const reportColumns = [
  { key: "title", label: "Report" },
  { key: "type", label: "Type", align: "center" },
  { key: "createdBy", label: "Created By", align: "center" },
  { key: "createdAt", label: "Created", align: "center" },
  { key: "status", label: "Status", align: "center" },
  { key: "actions", label: "Actions", align: "center" },
];

const statusStyles = {
  generated: { bg: "var(--accent)", text: "var(--primary)" },
  pending: { bg: "#fbbf24", text: "var(--primary)" },
  reviewed: { bg: "var(--secondary)", text: "var(--primary)" },
};

const ReportsTable = ({ reports, onView }) => {
  return (
    <Table
      columns={reportColumns}
      data={reports}
      thColor="from-[var(--primary)] to-[var(--primary-hover)]"
      trHoverColor="hover:bg-[var(--secondary)]/20 hover:text-white"
      renderCell={(report, key) => {
        if (key === "status") {
          const style =
            statusStyles[report.status.toLowerCase()] || {
              bg: "#ccc",
              text: "#000",
            };
          return (
            <div className="flex justify-center">
              <span
                className="px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {report.status}
              </span>
            </div>
          );
        }

        if (key === "createdAt") {
          return (
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {new Date(report.createdAt).toLocaleDateString("en-US", {
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
                onClick={() => onView && onView(report)}
                className="px-2 py-1 text-xs min-w-[65px] max-w-[90px] h-[30px] hover:bg-(--primary) hover:text-(--accent-light)"
                variant="outline"
              />
            </div>
          );
        }

        return (
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {report[key]}
          </span>
        );
      }}
    />
  );
};

export default ReportsTable;
