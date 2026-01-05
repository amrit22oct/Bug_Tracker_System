import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Form from "../../organisms/Form/Form.jsx";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import projectService from "../../../services/api/project.service.js";
import userService from "../../../services/api/user.service.js";

export default function AddProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [projectManagers, setProjectManagers] = useState([]);
  const [qaUsers, setQaUsers] = useState([]);

  useEffect(() => {
    const fetchUsersByRole = async () => {
      try {
        const pmResponse = await userService.getUsersByRole("ProjectManager");
        const qaResponse = await userService.getUsersByRole("QA");

        setProjectManagers(
          (pmResponse.data || []).map((user) => ({
            label: user.name,
            value: user._id,
          }))
        );

        setQaUsers(
          (qaResponse.data || []).map((user) => ({
            label: user.name,
            value: user._id,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch users by role:", error);
      }
    };

    fetchUsersByRole();
  }, []);

  const sections = [
    {
      title: "Basic Information",
      description: "Core details about the project",
      fields: [
        { id: "name", label: "Project Name", type: "text", required: true, fullWidth: true },
        { id: "description", label: "Project Description", type: "textarea", fullWidth: true },
        { id: "manager", label: "Project Manager", type: "select", options: projectManagers },
        { id: "tester", label: "Tester", type: "select", options: qaUsers },
        { id: "type", label: "Project Type", type: "select", options: ["Internal", "Client", "Research", "Open Source"] },
        { id: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"], defaultValue: "Medium" },
        { id: "tags", label: "Tags", type: "text", placeholder: "comma,separated,tags", fullWidth: true },
      ],
    },
    {
      title: "Timeline",
      description: "Schedule and milestones",
      fields: [
        { id: "startDate", label: "Start Date", type: "date" },
        { id: "endDate", label: "End Date", type: "date" },
        { id: "status", label: "Status", type: "select", options: ["Planned", "In Progress", "On Hold", "Completed", "Archived", "Cancelled"], defaultValue: "Planned" },
      ],
    },
    {
      title: "Links & Files",
      description: "Project and documentation URLs, attachments",
      fields: [
        { id: "projectLink", label: "Project Link", type: "text", placeholder: "https://project.com" },
        { id: "documentationLink", label: "Documentation Link", type: "text", placeholder: "https://docs.com" },
        { id: "files", label: "Upload Files", type: "file", multiple: true, fullWidth: true },
      ],
    },
    {
      title: "Milestones",
      description: "Add project milestones",
      fields: [
        {
          id: "milestones",
          label: "Milestones",
          type: "array",
          fields: [
            { id: "name", label: "Milestone Name", type: "text" },
            { id: "dueDate", label: "Due Date", type: "date" },
            { id: "status", label: "Status", type: "select", options: ["Pending", "Completed"], defaultValue: "Pending" },
          ],
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      console.log("Raw Form Data:", data);

      const cleanedData = { ...data };

      // Convert tags string → array
      if (cleanedData.tags) {
        cleanedData.tags = cleanedData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
      }

      // Ensure archived is boolean
      cleanedData.archived = Boolean(cleanedData.archived);

      // ✅ Only send file paths returned by the uploader
      if (cleanedData.files && cleanedData.files.length > 0) {
        cleanedData.files = cleanedData.files.map((f) => ({
          fileUrl: f.fileUrl, // only send the path returned by your upload API
        }));
      } else {
        delete cleanedData.files;
      }

      // Remove empty milestones
      if (!cleanedData.milestones || cleanedData.milestones.length === 0) {
        delete cleanedData.milestones;
      }

      console.log("Sanitized Project Data:", cleanedData);

      // API call
      const createdProject = await projectService.createProject(cleanedData);

      console.log("Project Created:", createdProject);

      navigate("/projects", {
        state: {
          projectId: createdProject._id,
          projectName: createdProject.name,
        },
      });
    } catch (err) {
      console.error("Failed to create project:", err);
      alert(
        err.response?.data?.message ||
        "Failed to create project. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-[var(--accent-light)] flex justify-center overflow-auto">
      <div className="w-full max-w-7xl h-full px-6 py-10">
        <Form
          title="Create New Project"
          loading={loading}
          loadingtext="Creating Project..."
          sections={sections}
          onSubmit={handleSubmit}
          submitText="Create Project"
        />
      </div>
    </div>
  );
}

// Page header
AddProject.header = () => <HeaderContent title="Add Project" />;
