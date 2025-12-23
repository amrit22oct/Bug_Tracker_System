import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";
import bugReportService from "../../../services/api/bugReportService.js";
import TableSkeleton from "../../Skleton/TableSkeleton.jsx";
import { FaPlus, FaProjectDiagram, FaBug, FaUsers } from "react-icons/fa";

// Lazy loding 
const BugReportTable = lazy(() => import("../../organisms/Test/BugReportTable.jsx"));

const BugReportPage = ({ searchValue = "", setSearchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await bugReportService.getAllReports();
        const data = response.data || [];

        const normalizedBugs = data.map((report) => {
          const bug = report.bugId || {};
          const reporter = bug.reportedBy || report.reportedBy || {};

          return {
            id: report._id, // ✅ top-level report ID
            title: bug.title || report.title || "N/A",
            projectId: { name: report.projectId?.name || "N/A" }, // top-level project
            reportedBy: { name: reporter.name || "N/A" },
            priority: report.priority || bug.priority || "N/A",
            severity: bug.severity || report.severity || "N/A",
            status: report.status || bug.status || "N/A",
            tags: bug.tags || report.tags || [],
            attachments: bug.attachments || report.attachments || [],
            createdAt: bug.createdAt || report.createdAt,
          };
        });

        setBugs(normalizedBugs);
      } catch (error) {
        console.error("Failed to fetch bug reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleViewBug = (bug) => {
    navigate(`/view-report-detail/${bug.id}`);
  };

  const ITEMS_PER_PAGE = 10;
  const filteredBugs = bugs.filter((bug) =>
    bug.title?.toLowerCase().includes(searchValue.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filteredBugs.length / ITEMS_PER_PAGE));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBugs = filteredBugs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full h-full p-4 bg-[var(--accent-light)]/60 flex flex-col gap-4 overflow-auto">

        {/* Action Buttons */}
        <div className="flex justify-end">
        <div className="flex gap-2">
          <PrimaryButton title="Add Bug Report" variant="outline" icon={FaPlus} className=" max-w-[160px] h-8 text-xs  hover:bg-(--primary) hover:text-(--accent-light)"  handler={() => navigate("/add-bug-report")} />
         
          <PrimaryButton
            title="Back"
            variant="outline"
            className=" min-w-[120px] h-8 text-xs  hover:bg-(--primary) hover:text-(--accent-light)"
            handler={() => navigate(-1)}
          />
        </div>
      </div> 
      <Suspense fallback={<TableSkeleton rows={ITEMS_PER_PAGE} />}>
        {loading ? (
          <TableSkeleton rows={ITEMS_PER_PAGE} />
        )  : (
        <BugReportTable bugs={currentBugs} onView={handleViewBug} />
      )}
      </Suspense>
      
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

BugReportPage.header = ({ searchValue, setSearchValue }) => (
  <HeaderContent
    title="Bug Reports"
    searchComponent={
      <PrimarySearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search bugs..."
      />
    }
  />
);

export default BugReportPage;
