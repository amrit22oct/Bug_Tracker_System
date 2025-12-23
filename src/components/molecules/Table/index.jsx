// PressedTable.jsx
import React from "react";
import PressedContainer from "../../atoms/PressedContainer"; // adjust path

export const Table = ({
  columns,
  data,
  renderCell,
  thColor = "from-[var(--primary)] to-[var(--primary-hover)]",
  trHoverColor = "hover:bg-[var(--secondary)]/30 hover:text-white",
}) => {
  return (
    <PressedContainer className="p-3 rounded-2xl">
      {/* CLIPPING LAYER (fixes gap without changing design) */}
      <div className="overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border border-[var(--primary)] rounded-2xl border-separate border-spacing-0">
            <thead>
              <tr className={`bg-gradient-to-r ${thColor}`}>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`p-4 text-sm font-semibold text-[var(--accent-light)] uppercase tracking-wider ${
                      col.align === "center" ? "text-center" : "text-left"
                    } ${idx === 0 ? "rounded-tl-2xl" : ""} ${
                      idx === columns.length - 1 ? "rounded-tr-2xl" : ""
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
  {data.map((row, idx) => {
    /* ============ EMPTY ROW ============ */
    if (row?.__empty) {
      return (
        <tr key="empty-row" className="bg-[var(--background)]/30">
          <td
            colSpan={columns.length}
            className="p-10 text-center text-sm font-medium text-[var(--text-primary)]/60"
          >
            {renderCell(row, "__empty")}
          </td>
        </tr>
      );
    }

    /* ============ NORMAL ROWS ============ */
    return (
      <tr
        key={idx}
        className={`transition-all duration-300 cursor-pointer ${trHoverColor} ${
          idx % 2 === 0
            ? "bg-[var(--background)]/30"
            : "bg-[var(--accent-light)]/30"
        }`}
      >
        {columns.map((col, cIdx) => (
          <td
            key={cIdx}
            className={`p-4 text-sm font-medium ${
              col.align === "center" ? "text-center" : "text-left"
            } text-[var(--text-primary)]/60 ${
              idx === data.length - 1 && cIdx === 0
                ? "rounded-bl-2xl"
                : ""
            } ${
              idx === data.length - 1 && cIdx === columns.length - 1
                ? "rounded-br-2xl"
                : ""
            } border-b border-[var(--primary)] ${
              idx === data.length - 1 ? "border-b-0" : ""
            }`}
          >
            {renderCell(row, col.key)}
          </td>
        ))}
      </tr>
    );
  })}
</tbody>

          </table>
        </div>
      </div>
    </PressedContainer>
  );
};
