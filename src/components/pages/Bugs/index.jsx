import React, { useState } from "react";
import BugsTable from "../../organisms/Test/BugTable";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";

const BugPage = () => {
  const allBugs = Array.from({ length: 27 }, (_, i) => ({
    id: i + 1,
    title: `Bug issue #${i + 1}`,
    priority: ["High", "Medium", "Low"][i % 3],
    status: ["Open", "In Progress", "Closed"][i % 3],
    created: `2025-11-${(i % 28) + 1}`,
  }));

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allBugs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBugs = allBugs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleView = (bug) => {
    console.log("Viewing bug:", bug);
  };

  return (
    <div className="w-full h-full p-4 bg-[var(--accent-light)]/60 flex flex-col gap-4">
      {/* Bugs Table */}
      <BugsTable bugs={currentBugs} onView={handleView} />

      {/* Pagination aligned to bottom-right */}
      <div className="flex justify-end">
      <div className="max-w-[400px] w-full flex justify-end items-center gap-2">
  {/* Prev Button */}
  <PrimaryButton
    title="Prev"
    variant={currentPage === 1 ? "disabled" : "outline"}
    disabled={currentPage === 1}
    handler={() => setCurrentPage((p) => Math.max(p - 1, 1))}
    className={`w-auto min-w-[120px] px-3 py-1 h-8 text-xs ${
      currentPage !== 1 ? "hover:bg-(--primary) hover:text-(--accent-light)" : ""
    }`}
  />

  {/* Current Page Indicator */}
  <div className="flex items-center justify-center h-8 px-3 min-w-[60px] text-sm font-medium text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
    {currentPage} / {totalPages}
  </div>

  {/* Next Button */}
  <PrimaryButton
    title="Next"
    variant={currentPage === totalPages ? "disabled" : "outline"}
    disabled={currentPage === totalPages}
    handler={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
    className={`w-auto min-w-[120px] px-3 py-1 h-8 text-xs ${
      currentPage !== totalPages
        ? "hover:bg-(--primary) hover:text-(--accent-light)"
        : ""
    }`}
  />
</div>


      </div>
    </div>
  );
};

export default BugPage;
