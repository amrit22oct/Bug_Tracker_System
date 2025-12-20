import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";

import projectService from "../../../services/api/project.service.js";
import TableSkeleton from "../../Skleton/TableSkeleton.jsx";

// ✅ Lazy-load table
const ProjectsTable = lazy(() =>
  import("../../organisms/Test/ProjectTable.jsx")
);

const ProjectsPage = ({ searchValue }) => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ================= VIEW ================= */
  const handleViewProject = (project) => {
    navigate(`/view-project-detail/${project.id}`);
  };

  /* ================= API CALL ================= */
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await projectService.getAllProjects();

        const normalizedProjects = (res.data || []).map((project) => ({
          id: project._id,
          name: project.name,
          manager: project.manager?.name || "N/A",
          deadline: project.endDate || project.createdAt,
          progress: project.progressPercentage || 0,
          status: project.status || "Unknown",
        }));

        setProjects(normalizedProjects);
      } catch (error) {
        console.error("❌ Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* ================= SEARCH ================= */
  const safeSearch = searchValue?.toLowerCase() || "";

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(safeSearch) ||
      p.manager.toLowerCase().includes(safeSearch) ||
      p.status.toLowerCase().includes(safeSearch)
  );

  /* ================= PAGINATION ================= */
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(
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
          <ProjectsTable
            projects={currentProjects}
            onView={handleViewProject}
          />
        )}
      </Suspense>

      {/* PAGINATION */}
      <div className="flex justify-end">
        <div className="max-w-[420px] w-full flex justify-end items-center gap-2">
          <PrimaryButton
            title="Prev"
            variant={currentPage === 1 ? "disabled" : "outline"}
            disabled={currentPage === 1}
            handler={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className={`min-w-[120px] h-8 text-xs ${
              currentPage !== 1
                ? "hover:bg-(--primary) hover:text-(--accent-light)"
                : ""
            }`}
          />

          <div className="flex items-center justify-center h-8 px-3 min-w-[70px] text-sm font-medium text-(--accent-light) bg-(--primary) rounded-md">
            {currentPage} / {totalPages}
          </div>

          <PrimaryButton
            title="Next"
            variant={currentPage === totalPages ? "disabled" : "outline"}
            disabled={currentPage === totalPages}
            handler={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className={`min-w-[120px] h-8 text-xs ${
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

/* ================= HEADER ================= */
ProjectsPage.header = ({ searchValue, setSearchValue }) => (
  <HeaderContent
    title="Projects"
    searchComponent={
      <PrimarySearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search projects..."
      />
    }
  />
);

export default ProjectsPage;
