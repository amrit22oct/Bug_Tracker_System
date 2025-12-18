import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import PressedContainer from "../../atoms/PressedContainer";
import {
  FiUser,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
  FiArrowLeft,
} from "react-icons/fi";

import projectService from "../../../services/api/project.service.js";

const statusStyles = {
  active: { bg: "var(--primary)", text: "var(--accent-light)" },
  "in progress": { bg: "#fbbf24", text: "var(--primary)" },
  completed: { bg: "var(--accent)", text: "var(--primary)" },
  delayed: { bg: "#f87171", text: "var(--primary)" },
  onhold: { bg: "#9ca3af", text: "white" },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  /* ================= FETCH PROJECT ================= */
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectService.getProjectById(id);

        // ✅ Console log backend response
        console.log("📦 Project Detail API Response:", response);

        // ⚠️ Using backend response directly (NO UI CHANGES)
        setProject(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch project:", error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="w-full h-full bg-[var(--accent-light)] p-6">
        Loading...
      </div>
    );
  }

  const statusStyle =
    statusStyles[project.status?.toLowerCase()] || statusStyles.active;

  return (
    <div className="w-full h-full bg-[var(--accent-light)] p-6 overflow-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">
            {project.name}
          </h1>
          <p className="text-sm text-gray-500">{project.id}</p>
        </div>

        <div className="flex gap-2">
          <PrimaryButton
            title="Back"
            variant="outline"
            icon={FiArrowLeft}
            handler={() => navigate(-1)}
          />
        </div>
      </div>

      {/* STATUS BAR */}
      <PressedContainer className="p-4 bg-white rounded-xl border flex flex-wrap gap-4 items-center">
        <span
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
        >
          {project.status}
        </span>

        <span className="flex items-center gap-1 text-sm">
          <FiUser /> Manager: <strong>{project.manager}</strong>
        </span>

        <span className="flex items-center gap-1 text-sm">
          <FiCheckCircle /> Progress: <strong>{project.progress}%</strong>
        </span>
      </PressedContainer>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* INFO */}
        <PressedContainer className="p-6 bg-white rounded-xl border space-y-3">
          <h2 className="font-semibold text-lg text-[var(--primary)]">
            Project Information
          </h2>

          <p>
            <FiClock className="inline mr-1" />
            <strong>Start:</strong>{" "}
            {new Date(project.startDate).toLocaleDateString()}
          </p>

          <p>
            <FiAlertTriangle className="inline mr-1" />
            <strong>Deadline:</strong>{" "}
            {new Date(project.deadline).toLocaleDateString()}
          </p>

          <p>
            <strong>Team:</strong> {project.team?.join(", ")}
          </p>
        </PressedContainer>

        {/* DESCRIPTION */}
        <PressedContainer className="p-6 bg-white rounded-xl border space-y-4">
          <h2 className="font-semibold text-lg text-[var(--primary)]">
            Description
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {project.description}
          </p>
        </PressedContainer>
      </div>

      {/* MILESTONES */}
      <PressedContainer className="p-6 bg-white rounded-xl border space-y-4">
        <h2 className="font-semibold text-lg text-[var(--primary)]">
          Milestones
        </h2>

        <ul className="space-y-2">
          {project.milestones?.map((m, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span
                className={`w-3 h-3 rounded-full ${
                  m.done ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              {m.title}
            </li>
          ))}
        </ul>
      </PressedContainer>
    </div>
  );
};

/* HEADER */
ProjectDetail.header = () => <HeaderContent title="Project Details" />;

export default ProjectDetail;
