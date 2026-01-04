import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaPlus } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks.js";
import { fetchAllBugs } from "../../../redux/slices/bugSlice.js";

import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";
import TableSkeleton from "../../Skleton/TableSkeleton.jsx";

// Lazy Loading
const BugsTable = lazy(() => import("../../organisms/Test/BugTable.jsx"));

const AdminBugPage = ({ searchValue }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { list: bugs, loading } = useAppSelector((state) => state.bugs);

  const [currentPage, setCurrentPage] = useState(1);

  const loggedInUserId = Cookies.get("bt_userId");
  const loggedInUserRole = Cookies.get("bt_role");

  /* ================= FETCH BUGS ================= */
  useEffect(() => {
    dispatch(fetchAllBugs());
  }, [dispatch]);

  /* ================= NORMALIZE + ROLE FILTER ================= */
  const visibleBugs = useMemo(() => {
    const normalized = (bugs || [])
      .map((bug) => ({
        ...bug,
        id: bug._id,
        created: bug.createdAt,
        status: bug.status?.toLowerCase(),
        priority: bug.priority?.toLowerCase(),
      }))
      .sort((a, b) => new Date(b.created) - new Date(a.created));

    if (loggedInUserRole === "Developer") {
      return normalized.filter((bug) => bug.assignedTo?._id === loggedInUserId);
    }

    return normalized;
  }, [bugs, loggedInUserId, loggedInUserRole]);

  /* ================= SEARCH FILTER ================= */
  const filteredBugs = useMemo(() => {
    return visibleBugs.filter((bug) =>
      bug.title?.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [visibleBugs, searchValue]);

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

  /* ================= ACTIONS ================= */
  const handleViewBug = (bug) => {
    navigate(`/view-bug-detail/${bug.id}`);
  };

  return (
    <div className="w-full h-full p-4 bg-[var(--accent-light)]/60 flex flex-col gap-4 overflow-auto">
      <div className="flex justify-between items-center">
        <div />
        <div className="flex gap-2">
          <PrimaryButton
            title="Add bug"
            variant="outline"
            icon={FaPlus}
            className="min-w-[120px] h-8 text-xs"
            handler={() => navigate("/add-bug")}
          />
          <PrimaryButton
            title="Back"
            variant="outline"
            className="min-w-[120px] h-8 text-xs"
            handler={() => navigate(-1)}
          />
        </div>
      </div>

      {/* TABLE */}
      <Suspense fallback={<TableSkeleton rows={ITEMS_PER_PAGE} />}>
        {loading ? (
          <TableSkeleton rows={ITEMS_PER_PAGE} />
        ) : (
          <BugsTable bugs={currentBugs} onView={handleViewBug} />
        )}
      </Suspense>

      {/* PAGINATION */}
      <div className="flex justify-end">
        <div className="max-w-[400px] w-full flex justify-end items-center gap-2">
          <PrimaryButton
            title="Prev"
            variant={currentPage === 1 ? "disabled" : "outline"}
            disabled={currentPage === 1}
            handler={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="min-w-[120px] h-8 text-xs"
          />

          <div className="flex items-center justify-center h-8 px-3 min-w-[60px] text-sm font-medium bg-(--primary) text-(--accent-light) rounded-md">
            {currentPage} / {totalPages}
          </div>

          <PrimaryButton
            title="Next"
            variant={currentPage === totalPages ? "disabled" : "outline"}
            disabled={currentPage === totalPages}
            handler={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="min-w-[120px] h-8 text-xs"
          />
        </div>
      </div>
    </div>
  );
};

/* ================= HEADER ================= */
AdminBugPage.header = ({ searchValue, setSearchValue }) => (
  <HeaderContent
    title="Admin Bugs"
    searchComponent={
      <PrimarySearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search bugs..."
      />
    }
  />
);

export default AdminBugPage;
