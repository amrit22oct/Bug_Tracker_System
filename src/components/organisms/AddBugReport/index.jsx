import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../../organisms/Form/Form";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import bugReportService from "../../../services/api/bugReportService";
import projectService from "../../../services/api/project.service";

export default function AddReport() {
  const [projectsWithBugs, setProjectsWithBugs] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [bugs, setBugs] = useState([]);
  const [selectedBugId, setSelectedBugId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* =========================
     1️⃣ Fetch projects
     ========================= */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectService.getAllProjects();
        const allProjects = res.data || [];

        const withBugs = allProjects.filter(
          (p) => Array.isArray(p.bugs) && p.bugs.length > 0
        );

        setProjectsWithBugs(withBugs);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, []);

  /* ====================================
     2️⃣ When project changes → load bugs
     ==================================== */
  useEffect(() => {
    if (!selectedProjectId) {
      setBugs([]);
      setSelectedBugId("");
      return;
    }

    const project = projectsWithBugs.find((p) => p._id === selectedProjectId);

    const projectBugs = project?.bugs || [];

    console.log("Selected project ID:", selectedProjectId);
    console.log("Project bugs:", projectBugs);

    setBugs(projectBugs);
    setSelectedBugId(""); // ❗ force user to select bug
  }, [selectedProjectId, projectsWithBugs]);

  /* =====================
     Handlers (VALUE based)
     ===================== */
  const handleProjectChange = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleBugChange = (bugId) => {
    setSelectedBugId(bugId);
  };

  /* =====================
     Form sections
     ===================== */
  const sections = [
    {
      title: "Project & Bug",
      description: "Select project and bug",
      fields: [
        {
          id: "project",
          label: "Project",
          type: "select",
          required: true,
          options: [
            { label: "Select a project", value: "" },
            ...projectsWithBugs.map((p) => ({
              label: p.name,
              value: p._id,
            })),
          ],
          value: selectedProjectId,
          onChange: (value) => {
            console.log("Project selected value:", value);
            setSelectedProjectId(value);
          },
        },

        {
          id: "bug",
          label: "Bug",
          type: "select",
          required: true,
          options: [
            { label: "Select a bug", value: "" },
            ...bugs.map((b) => ({
              label: b.title,
              value: b._id, // 🔴 THIS IS CRITICAL
            })),
          ],
          value: selectedBugId, // 🔴 MUST BE bug._id
          onChange: (value) => {
            console.log("Bug selected value:", value);
            setSelectedBugId(value);
          },
        },
      ],
    },
    {
      title: "Report Details",
      fields: [
        {
          id: "stepsToReproduce",
          label: "Steps to Reproduce",
          type: "textarea",
        },
        { id: "expectedResult", label: "Expected Result", type: "textarea" },
        { id: "actualResult", label: "Actual Result", type: "textarea" },
      ],
    },
  ];

  /* =====================
     Submit
     ===================== */
  const handleSubmit = async (data) => {
    if (!selectedProjectId || !selectedBugId) {
      alert("Please select project and bug");
      return;
    }

    const selectedBug = bugs.find((b) => b._id === selectedBugId);

    setLoading(true);
    try {
      await bugReportService.createBugReport({
        projectId: selectedProjectId,
        bugId: selectedBugId,
        title: selectedBug.title,
        stepsToReproduce: data.stepsToReproduce ? [data.stepsToReproduce] : [],
        expectedResult: data.expectedResult,
        actualResult: data.actualResult,
      });

      // ✅ SUCCESS → NAVIGATE
      navigate("/bug-report"); // change path if needed
    } catch (err) {
      console.error("Submit failed:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to submit bug report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex justify-center overflow-auto">
      <div className="w-full max-w-7xl px-6 py-10">
        <Form
          title="Create Bug Report"
          sections={sections}
          onSubmit={handleSubmit}
          submitText={loading ? "Submitting..." : "Submit Report"}
        />
      </div>
    </div>
  );
}

AddReport.header = () => <HeaderContent title="Add Report" />;
