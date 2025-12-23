import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "../../organisms/Form/Form";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import bugService from "../../../services/api/bug.service";
import projectService from "../../../services/api/project.service";
import Cookies from "js-cookie";

export default function AddBug() {
  const navigate = useNavigate();
  const location = useLocation();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ CONTROLLED STATES
  const [selectedProjectId, setSelectedProjectId] = useState(
    location.state?.projectId || ""
  );
  const [selectedProjectPriority, setSelectedProjectPriority] = useState("Low");

  /* ================= FETCH PROJECTS ================= */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectService.getAllProjects();
        const projectList = res.data || res;
        setProjects(projectList);

        // Handle preselected project
        if (selectedProjectId) {
          const project = projectList.find(
            (p) => p._id === selectedProjectId
          );
          if (project?.priority) {
            setSelectedProjectPriority(project.priority);
          }
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
        alert("Failed to load projects. Refresh page.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedProjectId]);

  /* ================= HANDLERS ================= */
  const handleProjectChange = (projectId) => {
    setSelectedProjectId(projectId);

    const project = projects.find((p) => p._id === projectId);
    setSelectedProjectPriority(project?.priority || "Low");
  };

  const projectOptions = projects.map((p) => ({
    label: p.name,
    value: p._id,
  }));

  /* ================= FORM SECTIONS ================= */
  const sections = [
    {
      title: "Basic Information",
      fields: [
        {
          id: "title",
          label: "Bug Title",
          type: "text",
          required: true,
          fullWidth: true,
        },
        {
          id: "projectId",
          label: "Project",
          type: "select",
          required: true,
          options: projectOptions,
          value: selectedProjectId, // ✅ CONTROLLED
          onChange: handleProjectChange,
        },
        {
          id: "type",
          label: "Bug Type",
          type: "select",
          options: ["UI", "Backend", "Performance", "Security", "Crash", "Logic"],
        },
      ],
    },
    {
      title: "Classification",
      fields: [
        {
          id: "priority",
          label: "Priority",
          type: "select",
          options: ["Low", "Medium", "High", "Critical"],
          value: selectedProjectPriority, // ✅ AUTO-UPDATES
        },
        {
          id: "severity",
          label: "Severity",
          type: "select",
          options: ["Minor", "Major", "Critical"],
        },
        {
          id: "status",
          label: "Status",
          type: "select",
          options: ["Open", "In Progress", "Resolved", "Closed"],
          defaultValue: "Open",
        },
      ],
    },
    {
      title: "Details",
      fields: [
        {
          id: "description",
          label: "Description",
          type: "textarea",
          fullWidth: true,
        },
        {
          id: "steps",
          label: "Steps to Reproduce",
          type: "textarea",
          fullWidth: true,
        },
        {
          id: "tags",
          label: "Tags",
          type: "text",
          placeholder: "comma,separated,tags",
        },
      ],
    },
  ];

  /* ================= SUBMIT ================= */
  const handleSubmit = async (data) => {
    try {
      const userId = Cookies.get("bt_userId");
      if (!userId) {
        alert("User not logged in!");
        return;
      }

      const payload = {
        title: data.title,
        description: data.description || "",
        priority: selectedProjectPriority, // ✅ ALWAYS CORRECT
        severity: data.severity || "Minor",
        type: data.type || "UI",
        projectId: selectedProjectId,
        reportedBy: userId,
        tags: data.tags
          ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        status: data.status || "Open",
        steps: data.steps || "",
      };

      const createdBug = await bugService.createBug(payload);
      navigate("/bug-report", { state: { bugId: createdBug._id } });
    } catch (err) {
      console.error("Bug creation failed:", err);
      alert(err.response?.data?.message || "Bug creation failed");
    }
  };

  if (loading) return <div className="p-10">Loading projects...</div>;

  return (
    <div className="h-full w-full bg-[var(--accent-light)] flex justify-center overflow-auto">
      <div className="w-full max-w-7xl px-6 py-10">
        <Form
          title="Create New Bug"
          sections={sections}
          onSubmit={handleSubmit}
          submitText="Create Bug"
        />
      </div>
    </div>
  );
}

AddBug.header = () => <HeaderContent title="Add Bug" />;
