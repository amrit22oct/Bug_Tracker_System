import { useNavigate } from "react-router-dom";
import React from "react";
import Form from "../../organisms/Form/Form";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import projectService from "../../../services/api/project.service.js";

export default function AddProject() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Basic Information",
      description: "Core details about the project",
      fields: [
        { id: "name", label: "Project Name", type: "text", required: true, fullWidth: true },
        { id: "description", label: "Project Description", type: "textarea", fullWidth: true },
        // { id: "owner", label: "Project Owner", type: "text" },
        { id: "manager", label: "Manager", type: "text" },
        { id: "teamLeader", label: "Team Leader", type: "text" },
        { id: "type", label: "Project Type", type: "select", options: ["Internal", "Client", "Research", "Open Source"] },
        // { id: "client", label: "Client", type: "text" },
        // { id: "category", label: "Category", type: "text" },
        { id: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"], defaultValue: "Medium" },
        { id: "tags", label: "Tags", type: "text", placeholder: "comma,separated,tags", fullWidth: true },
        // { id: "archived", label: "Archived", type: "checkbox" },
      ],
    },
    {
      title: "Timeline",
      description: "Schedule and milestones",
      fields: [
        { id: "startDate", label: "Start Date", type: "date" },
        { id: "endDate", label: "End Date", type: "date" },
        // { id: "estimatedStartDate", label: "Estimated Start Date", type: "date" },
        // { id: "estimatedEndDate", label: "Estimated End Date", type: "date" },
        // { id: "actualStartDate", label: "Actual Start Date", type: "date" },
        // { id: "actualEndDate", label: "Actual End Date", type: "date" },
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
    try {
      console.log("Raw Form Data:", data);
  
      // ✅ CLEAN DATA BEFORE SENDING
      const cleanedData = { ...data };
  
      // Remove empty strings
      Object.keys(cleanedData).forEach((key) => {
        if (cleanedData[key] === "" || cleanedData[key] === null) {
          delete cleanedData[key];
        }
      });
  
      // Convert tags string → array
      if (cleanedData.tags) {
        cleanedData.tags = cleanedData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
      }
  
      // Ensure archived is boolean
      cleanedData.archived = Boolean(cleanedData.archived);
  
      // Remove empty files
      if (!cleanedData.files || cleanedData.files.length === 0) {
        delete cleanedData.files;
      }
  
      // Remove empty milestones
      if (!cleanedData.milestones || cleanedData.milestones.length === 0) {
        delete cleanedData.milestones;
      }
  
      console.log("Sanitized Project Data:", cleanedData);
  
      // ✅ Call API
      const createdProject = await projectService.createProject(cleanedData);
  
      console.log("Project Created:", createdProject);
  
      // ✅ Redirect to Add Bug with selected project
      navigate("/add-bug", {
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
    }
  };
  

  return (
    <div className="h-full w-full bg-[var(--accent-light)] flex justify-center overflow-auto">
      <div className="w-full max-w-7xl h-full px-6 py-10">
        <Form
          title="Create New Project"
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
