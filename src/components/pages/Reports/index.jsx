import React, { useState, useEffect } from "react";
import ReportsTable from "../../organisms/Test/ReportsTable.jsx";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";

const ReportsPage = ({ searchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- DATA ---------------- */
  const allReports = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Report #${i + 1}`,
    type: ["Bug Report", "Project Report", "Performance Report"][i % 3],
    createdBy: ["Alice", "Bob", "John"][i % 3],
    createdAt: `2025-12-${(i % 28) + 1}`,
    status: ["Generated", "Pending", "Reviewed"][i % 3],
  }));

  /* ---------------- SEARCH ---------------- */
  const filteredReports = allReports.filter(
    (r) =>
      r.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      r.type.toLowerCase().includes(searchValue.toLowerCase()) ||
      r.createdBy.toLowerCase().includes(searchValue.toLowerCase()) ||
      r.status.toLowerCase().includes(searchValue.toLowerCase())
  );

  /* ---------------- PAGINATION ---------------- */
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentReports = filteredReports.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="w-full h-full p-4 bg-[var(--accent-light)]/60 flex flex-col gap-4 overflow-auto">
      {/* Table */}
      <ReportsTable reports={currentReports} />

      {/* Pagination */}
      <div className="flex justify-end">
        <div className="max-w-[420px] w-full flex justify-end items-center gap-2">
          <PrimaryButton
            title="Prev"
            variant={currentPage === 1 ? "disabled" : "outline"}
            disabled={currentPage === 1}
            handler={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="min-w-[120px] h-8 text-xs"
          />

          <div className="flex items-center justify-center h-8 px-3 min-w-[70px] text-sm font-medium text-(--accent-light) bg-(--primary) rounded-md">
            {currentPage} / {totalPages}
          </div>

          <PrimaryButton
            title="Next"
            variant={currentPage === totalPages ? "disabled" : "outline"}
            disabled={currentPage === totalPages}
            handler={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            className="min-w-[120px] h-8 text-xs"
          />
        </div>
      </div>
    </div>
  );
};

/* ✅ HEADER */
ReportsPage.header = ({ searchValue, setSearchValue }) => (
  <HeaderContent
    title="Reports"
    searchComponent={
      <PrimarySearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search reports..."
      />
    }
  />
);

export default ReportsPage;
