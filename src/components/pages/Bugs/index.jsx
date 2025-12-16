import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BugsTable from "../../organisms/Test/BugTable.jsx";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";

const BugPage = ({ searchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const allBugs = Array.from({ length: 27 }, (_, i) => ({
    id: i + 1,
    title: `Bug issue #${i + 1}`,
    priority: ["High", "Medium", "Low"][i % 3],
    status: ["Open", "In Progress", "Closed"][i % 3],
    created: `2025-11-${(i % 28) + 1}`,
  }));

 

  const handleViewBug = (bug) => {
    navigate(`/view-bug-detail/${bug.id}`);
  };

  // ✅ Filter using searchValue from AppNavigator
  const filteredBugs = allBugs.filter((bug) =>
    bug.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredBugs.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBugs = filteredBugs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="w-full h-full p-4 bg-[var(--accent-light)]/60 flex flex-col gap-4 overflow-auto">
      <BugsTable bugs={currentBugs} onView={handleViewBug} />

      {/* Pagination */}
      <div className="flex justify-end">
        <div className="max-w-[400px] w-full flex justify-end items-center gap-2">
          {/* Prev Button */}
          <PrimaryButton
            title="Prev"
            variant={currentPage === 1 ? "disabled" : "outline"}
            disabled={currentPage === 1}
            handler={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className={`w-auto min-w-[120px] px-3 py-1 h-8 text-xs ${
              currentPage !== 1
                ? "hover:bg-(--primary) hover:text-(--accent-light)"
                : ""
            }`}
          />

          {/* Current Page Indicator */}
          <div className="flex items-center justify-center h-8 px-3 min-w-[60px] text-sm font-medium text-(--accent-light) bg-(--primary) border border-(--accent-light) rounded-md shadow-sm">
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

/* ✅ HEADER (uses AppNavigator state) */
BugPage.header = ({ searchValue, setSearchValue }) => (
  <HeaderContent
    title="Bugs"
    searchComponent={
      <PrimarySearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search bugs..."
      />
    }
  />
);

export default BugPage;
