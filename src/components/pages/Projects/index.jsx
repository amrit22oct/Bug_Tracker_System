import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProjectsTable from "../../organisms/Test/ProjectTable.jsx";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";

const ProjectsPage = ({ searchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

const handleViewProject = (project) => {
  navigate(`/view-project-detail/${project.id}`);
};


  /* ---------------- DATA ---------------- */
  const allProjects = Array.from({ length: 27 }, (_, i) => ({
    id: i + 1,
    name: `Project ${i + 1}`,
    manager: ["Alice", "Bob", "John"][i % 3],
    deadline: `2025-12-${(i % 28) + 1}`,
    progress: (i * 7) % 100,
    status: [
      "Active",
      "In Progress",
      "Completed",
      "Delayed",
      "OnHold",
    ][i % 5],
  }));

  /* ---------------- SEARCH ---------------- */
  const filteredProjects = allProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.manager.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.status.toLowerCase().includes(searchValue.toLowerCase())
  );

  /* ---------------- PAGINATION ---------------- */
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="w-full h-full p-4 bg-[var(--accent-light)]/60 flex flex-col gap-4 overflow-auto">
      {/* Table */}
      <ProjectsTable
  projects={currentProjects}
  onView={handleViewProject}
/>


      {/* Pagination */}
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
            handler={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
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

/* ✅ HEADER */
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
