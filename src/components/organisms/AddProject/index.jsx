import Form from "../../organisms/Form/Form";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";

export default function AddProject() {
  const sections = [
    {
      title: "Basic Information",
      description: "Core details about the project",
      fields: [
        {
          id: "name",
          label: "Project Name",
          type: "text",
          placeholder: "Website Redesign",
          required: true,
          fullWidth: true,
        },
        {
          id: "owner",
          label: "Project Owner",
          type: "text",
          placeholder: "John Doe",
        },
        {
          id: "type",
          label: "Project Type",
          type: "select",
          options: ["Internal", "Client", "Research", "Open Source"],
        },
      ],
    },
    {
      title: "Timeline",
      description: "Schedule and milestones",
      fields: [
        {
          id: "startDate",
          label: "Start Date",
          type: "date",
        },
        {
          id: "endDate",
          label: "End Date",
          type: "date",
        },
        {
          id: "status",
          label: "Status",
          type: "select",
          options: ["Planned", "In Progress", "On Hold", "Completed"],
          defaultValue: "Planned",
        },
      ],
    },
    {
      title: "Description",
      description: "Details about the project",
      fields: [
        {
          id: "description",
          label: "Project Description",
          type: "textarea",
          fullWidth: true,
        },
      ],
    },
  ];

  const handleSubmit = (data) => {
    console.log("FULL PROJECT DATA:", data);
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
