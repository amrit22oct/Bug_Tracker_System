import React, { useState, useEffect, lazy, Suspense  } from "react";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";
import bugService from "../../../services/api/bug.service.js";
import TableSkeleton from "../../Skleton/TableSkeleton.jsx";

const BugsTable = lazy(() => import ("../../organisms/Test/BugTable.jsx"))

const BugPage = ({ searchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= GET ALL BUGS ================= */
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        setLoading(true);
        const response = await bugService.getAllBugs();

        // Normalize backend data for UI
        const normalizedBugs = (response.data || []).map((bug) => ({
          ...bug,
          id: bug._id,
          created: bug.createdAt,
          status: bug.status?.toLowerCase(),
          priority: bug.priority?.toLowerCase(),
        }));

        // ✅ Console log backend response
        console.log("📦 Bug Detail API Response:", response);

        setBugs(normalizedBugs);
      } catch (error) {
        console.error("Failed to fetch bugs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  const handleViewBug = (bug) => {
    navigate(`/view-bug-detail/${bug.id}`);
  };

  /* ================= SEARCH FILTER ================= */
  const filteredBugs = bugs.filter((bug) =>
    bug.title?.toLowerCase().includes(searchValue.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredBugs.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBugs = filteredBugs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="w-full h-full p-4 bg-[var(--accent-light)]/60 flex flex-col gap-4 overflow-auto">
      {/* TABLE */}
      <Suspense fallback={<TableSkeleton rows={ITEMS_PER_PAGE} />}>
        {loading ? (
          <TableSkeleton rows={ITEMS_PER_PAGE} />
        ) : (
        <BugsTable bugs={currentBugs} onView={handleViewBug} />
      )}
      </Suspense>

      {/* Pagination */}
      <div className="flex justify-end">
        <div className="max-w-[400px] w-full flex justify-end items-center gap-2">
          <PrimaryButton
            title="Prev"
            variant={currentPage === 1 ? "disabled" : "outline"}
            disabled={currentPage === 1}
            handler={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="w-auto min-w-[120px] px-3 py-1 h-8 text-xs"
          />

          <div className="flex items-center justify-center h-8 px-3 min-w-[60px] text-sm font-medium text-(--accent-light) bg-(--primary) border border-(--accent-light) rounded-md shadow-sm">
            {currentPage} / {totalPages}
          </div>

          <PrimaryButton
            title="Next"
            variant={currentPage === totalPages ? "disabled" : "outline"}
            disabled={currentPage === totalPages}
            handler={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="w-auto min-w-[120px] px-3 py-1 h-8 text-xs"
          />
        </div>
      </div>
    </div>
  );
};

/* ================= HEADER ================= */
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
